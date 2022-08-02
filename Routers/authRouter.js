import express from 'express';
import {Signup, Signin} from '../Controllers/authController.js';
import {ValidateSignup} from '../Middlewares/authMiddleware.js';

const router = express.Router();

router.post('/signup', ValidateSignup, Signup);
router.post('/signin', Signin);

export default router;