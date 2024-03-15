import { Request, Response, NextFunction } from "express";
import { userModel, UserDocument } from "../models/user";
import { jwtToken } from "../utils/jwt";
import appError from "../utils/errorHandler";
import EmailSender from "../utils/email";
import SendResponse from "../utils/sendResponse";


async function signUp(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const body = req.body;
    const newUser = (await userModel.create(body)) as UserDocument;

    if (!newUser) {
      return next(new appError("Please fill in correct details", 400));
    }

    const token = await jwtToken(newUser._id);
    res.cookie("jwt", token, { httpOnly: true });

    res
      .status(201)
      .json({
        status: "SUCCESS",
        message: "Welcome to Scissors!",
        token,
        user: newUser,
      });
  } catch (err: any) {
    next(new appError(err, 500));
  }
}

async function login(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const loginDetails = req.body;
    const isValidUser = (await userModel.findOne({
      email: loginDetails.email,
    })) as UserDocument;

    if (!isValidUser) {
      return next(new appError("This user is not found! Kindly sign up", 404));
    }

    const isValidPassword: boolean = await isValidUser.checkValidPassword(
      loginDetails.password,
      isValidUser.password
    );

    if (!isValidPassword) {
      return next(new appError("Invalid password or email", 401));
    }

    const token = await jwtToken(isValidUser._id);

    res.cookie("jwt", token, { httpOnly: true });
    res
      .status(200)
      .json({
        result: "SUCCESSFUL",
        message: "You are logged in",
        token,
        user: isValidUser,
      });
  } catch (err: any) {
    next(new appError(err.message, 500));
  }
}

async function updateProfile(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const updateDetials = req.body;
    const updatedUser = await userModel.findByIdAndUpdate(
      req.params.id,
      updateDetials,
      {
        new: true,
        runValidators: true,
      }
    );

    if (updatedUser) {
      res
        .status(200)
        .json({
          result: "YAAAAAAAAH!",
          message: "Update made successfully!!!",
        });
    }
  } catch (err: any) {
    next(new appError(err, 500));
  }
}

async function deleteAccount(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const deleteUser = await userModel.findByIdAndDelete(req.params.id);

    if (deleteUser) {
      res
        .status(200)
        .json({ result: "Awwwwwwwwwnnnn", message: "Please come back" });
    }
  } catch (err: any) {
    next(new appError(err, 500));
  }
}

const logout = (req: Request, res: Response): void => {
  res.clearCookie("jwt", {
    httpOnly: true,
  });

  res.status(200).json({ message: "You are logged out" });
};

async function forgetPassword(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const user = await userModel
      .findOne({ email: req.body.email })
      .select("-password");
    if (!user) return next(new appError("This user does not exist", 404));
    const resetToken = await user.createResetToken();

    console.log(resetToken);
    const url: string = `${req.protocol}://${req.get(
      "host"
    )}/resetPassword/${resetToken}`;
    const sendMail = new EmailSender();
    await sendMail.sendPasswordResetEmail(user, resetToken, url);
    await user.save({ validateBeforeSave: false });
    res.status(200).json({
      message: "Your password reset token has been sent. Check your mailbox",
    });
  } catch (err: any) {
    new appError(err, 500);
  }
}

async function resetPassword(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const resetToken = req.params.Token;
    const user = await userModel
      .findOne({
        resetPasswordToken: resetToken,
        resetTimeExp: { $gt: Date.now() },
      })
      .select("-password");
    if (!user) return next(new appError("Invalid token or expired token", 404));

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetTimeExp = undefined;

    await user.save();
    const token = await jwtToken(user._id);
    res.cookie("jwt", token, { httpOnly: true });
    res
      .status(200)
      .json({ message: "A new password has been set", token, user });
  } catch (err: any) {
    new appError(err, 500);
  }
}

async function reactivateAccount(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const sendResponse = new SendResponse(res);

  try {
    const user: any = await userModel
      .findOne({ email: req.body.email })
      .select("-password");
    if (!user) next(new appError("This user does not exist", 404));
    user.active = true;
    await user.save();
    sendResponse.sendJson(
      user,
      `Welcome back ${user.username}. Your account has been re-activated`,
      200
    );
  } catch (err: any) {
    new appError(err, 500);
  }
}

export {
  signUp,
  updateProfile,
  deleteAccount,
  login,
  logout,
  forgetPassword,
  resetPassword,
  reactivateAccount,
};
