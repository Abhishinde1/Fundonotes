import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator } from '../validators/user.validator';

const router = express.Router();

//routes to register a new user
router.post('/Register', newUserValidator, userController.RegisterNewUser);

export default router;
