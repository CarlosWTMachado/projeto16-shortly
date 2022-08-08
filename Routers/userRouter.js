import express from 'express';
import {Profile} from '../Controllers/userController.js';
import {ValidateUser} from '../Middlewares/userMiddleware.js';

const router = express.Router();

router.get('/users/me', ValidateUser, Profile);

export default router;