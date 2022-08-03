import express from 'express';
import {Signup, Signin} from '../Controllers/authController.js';
import {ValidateSignup, ValidateSignin, VerifySignin} from '../Middlewares/authMiddleware.js';

const router = express.Router();

router.post('/signup', ValidateSignup, Signup);
router.post('/signin', ValidateSignin, VerifySignin, Signin);

export default router;