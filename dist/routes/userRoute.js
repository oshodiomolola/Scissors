"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const userController_1 = require("../controllers/userController");
const userRouter = express_1.default.Router();
userRouter.post('/signup', userController_1.signUp);
userRouter.post('/login', userController_1.login);
userRouter.patch('/update/:id', authController_1.isAuthenticated, userController_1.updateProfile);
userRouter.patch('/reset_Password/:Token', authController_1.isAuthenticated, userController_1.resetPassword);
userRouter.post('/forget_Password', authController_1.isAuthenticated, userController_1.forgetPassword);
userRouter.delete('/Deactivate_acct/:id', authController_1.isAuthenticated, userController_1.deleteAccount);
userRouter.post('/reactivate_account', userController_1.reactivateAccount);
userRouter.post('/logout', authController_1.isAuthenticated, userController_1.logout);
exports.default = userRouter;
//# sourceMappingURL=userRoute.js.map