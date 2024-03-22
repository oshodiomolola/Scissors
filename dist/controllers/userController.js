"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reactivateAccount = exports.resetPassword = exports.forgetPassword = exports.logout = exports.login = exports.deleteAccount = exports.updateProfile = exports.signUp = void 0;
const user_1 = require("../models/user");
const jwt_1 = require("../utils/jwt");
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
const email_1 = __importDefault(require("../utils/email"));
const sendResponse_1 = __importDefault(require("../utils/sendResponse"));
function signUp(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const body = req.body;
            const userExist = (yield user_1.userModel.findOne({ email: req.body.email }));
            if (userExist) {
                return next(new errorHandler_1.default("User already exist", 400));
            }
            const newUser = (yield user_1.userModel.create(body));
            if (!newUser) {
                return next(new errorHandler_1.default("Please fill in correct details", 400));
            }
            const token = yield (0, jwt_1.jwtToken)(newUser._id);
            res.cookie("jwt", token, { httpOnly: true });
            res
                .status(201)
                .json({
                status: "SUCCESS",
                message: "Welcome to Scissors!",
                token,
                user: newUser,
            });
        }
        catch (err) {
            next(new errorHandler_1.default(err, 500));
        }
    });
}
exports.signUp = signUp;
function login(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const loginDetails = req.body;
            const isValidUser = (yield user_1.userModel.findOne({
                email: loginDetails.email,
            }));
            if (!isValidUser) {
                return next(new errorHandler_1.default("This user is not found! Kindly sign up", 404));
            }
            const isValidPassword = yield isValidUser.checkValidPassword(loginDetails.password, isValidUser.password);
            if (!isValidPassword) {
                return next(new errorHandler_1.default("Invalid password or email", 401));
            }
            const token = yield (0, jwt_1.jwtToken)(isValidUser._id);
            res.cookie("jwt", token, { httpOnly: true });
            res
                .status(200)
                .json({
                result: "SUCCESSFUL",
                message: "You are logged in",
                token,
                user: isValidUser,
            });
        }
        catch (err) {
            next(new errorHandler_1.default(err.message, 500));
        }
    });
}
exports.login = login;
function updateProfile(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const updateDetials = req.body;
            const updatedUser = yield user_1.userModel.findByIdAndUpdate(req.params.id, updateDetials, {
                new: true,
                runValidators: true,
            });
            if (updatedUser) {
                res
                    .status(200)
                    .json({
                    result: "YAAAAAAAAH!",
                    message: "Update made successfully!!!",
                });
            }
        }
        catch (err) {
            next(new errorHandler_1.default(err, 500));
        }
    });
}
exports.updateProfile = updateProfile;
function deleteAccount(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const deleteUser = yield user_1.userModel.findByIdAndDelete(req.params.id);
            if (deleteUser) {
                res
                    .status(200)
                    .json({ result: "Awwwwwwwwwnnnn", message: "Please come back" });
            }
        }
        catch (err) {
            next(new errorHandler_1.default(err, 500));
        }
    });
}
exports.deleteAccount = deleteAccount;
const logout = (req, res) => {
    res.clearCookie("jwt", {
        httpOnly: true,
    });
    res.status(200).json({ message: "You are logged out" });
};
exports.logout = logout;
function forgetPassword(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield user_1.userModel
                .findOne({ email: req.body.email })
                .select("-password");
            if (!user)
                return next(new errorHandler_1.default("This user does not exist", 404));
            const resetToken = yield user.createResetToken();
            console.log(resetToken);
            const url = `${req.protocol}://${req.get("host")}/resetPassword/${resetToken}`;
            const sendMail = new email_1.default();
            yield sendMail.sendPasswordResetEmail(user, resetToken, url);
            yield user.save({ validateBeforeSave: false });
            res.status(200).json({
                message: "Your password reset token has been sent. Check your mailbox",
            });
        }
        catch (err) {
            new errorHandler_1.default(err, 500);
        }
    });
}
exports.forgetPassword = forgetPassword;
function resetPassword(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const resetToken = req.params.Token;
            const user = yield user_1.userModel
                .findOne({
                resetPasswordToken: resetToken,
                resetTimeExp: { $gt: Date.now() },
            })
                .select("-password");
            if (!user)
                return next(new errorHandler_1.default("Invalid token or expired token", 404));
            user.password = req.body.password;
            user.resetPasswordToken = undefined;
            user.resetTimeExp = undefined;
            yield user.save();
            const token = yield (0, jwt_1.jwtToken)(user._id);
            res.cookie("jwt", token, { httpOnly: true });
            res
                .status(200)
                .json({ message: "A new password has been set", token, user });
        }
        catch (err) {
            new errorHandler_1.default(err, 500);
        }
    });
}
exports.resetPassword = resetPassword;
function reactivateAccount(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const sendResponse = new sendResponse_1.default(res);
        try {
            const user = yield user_1.userModel
                .findOne({ email: req.body.email })
                .select("-password");
            if (!user)
                next(new errorHandler_1.default("This user does not exist", 404));
            user.active = true;
            yield user.save();
            sendResponse.sendJson(user, `Welcome back ${user.username}. Your account has been re-activated`, 200);
        }
        catch (err) {
            new errorHandler_1.default(err, 500);
        }
    });
}
exports.reactivateAccount = reactivateAccount;
//# sourceMappingURL=userController.js.map