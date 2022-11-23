/* eslint-disable prettier/prettier */
import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator } from '../validators/user.validator';
import { userAuthentication } from '../middlewares/auth.middleware';
//import { resetPassword } from '../services/user.service';

const router = express.Router();

//routes to register a new user
 router.post('/Register', newUserValidator, userController.RegisterNewUser);

// //route to login user
 router.post('/logins', userController.Userlogin);

//route to forgot password
router.post('/forgotPassword',userController.Forgotpwd);

//route to reset the password
router.post('/resetPassword',userAuthentication, userController.resetPassword);

export default router;
