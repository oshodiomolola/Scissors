import express from 'express';
import { isAuthenticated, isLoggedIn } from '../controllers/authController';

import {
  signUp,
  login,
  updateProfile,
  reactivateAccount,
  deleteAccount,
  logout,
  resetPassword,
  forgetPassword,
} from '../controllers/userController';

const userRouter = express.Router();

userRouter.post('/signup', signUp);
userRouter.post('/login', login);
userRouter.patch('/Update/:id', isAuthenticated, updateProfile);
userRouter.patch('/reset_Password/:Token', isAuthenticated, resetPassword);
userRouter.post('/forget_Password', isAuthenticated, forgetPassword);
userRouter.delete('/Deactivate_acct/:id', isAuthenticated, deleteAccount);
userRouter.post('/reactivate_account', reactivateAccount);
userRouter.post('/ logout', isAuthenticated, logout);

export default userRouter;