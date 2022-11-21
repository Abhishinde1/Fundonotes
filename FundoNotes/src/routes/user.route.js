/* eslint-disable prettier/prettier */
import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator } from '../validators/user.validator';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//routes to register a new user
router.post('/Register', newUserValidator, userController.RegisterNewUser);

//route to login user
router.post('/logins', userController.Userlogin);

//route to get all users
router.get('', userController.getAllUsers);

//route to get a single user by their user id
router.get('/:_id', userController.getUser);

//route to update a single user by their user id
router.put('/:_id', userController.updateUser);

//route to delete a single user by their user id
router.delete('/:_id', userController.deleteUser);

//route to forgot password
router.post('/forgotPassword',userController.Forgotpwd);

//route to reset the password
router.put('/resetPassword',userAuth,userController.resetPassword);

export default router;
