import express from 'express';
import { signupValidate, loginValidate, forgotPasswordValidate, resetPasswordValidate } from '../middlewares/validation';
import { signup, login, forgotPassword, resetPassword, getProfile, Books, editProfile } from '../controllers/auth';
import tokenValidate from '../middlewares/tokenValidate';
import upload from '../upload';

const authRouter = express.Router();

authRouter.post('/signup', signupValidate, signup);
authRouter.post('/login', loginValidate, login);
authRouter.post('/forgot_password', forgotPasswordValidate, forgotPassword);
authRouter.post('/reset_password', resetPasswordValidate, resetPassword);
authRouter.get('/profile', tokenValidate, getProfile);
authRouter.patch('/profile', tokenValidate, upload.single('image'), editProfile);
authRouter.get('/books', tokenValidate, Books)
export default authRouter;