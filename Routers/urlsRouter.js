import express from 'express';
import {urlShorten} from '../Controllers/urlsController.js';
import {ValidateUrlShorten} from '../Middlewares/urlsMiddleware.js';

const router = express.Router();

router.post('/urls/shorten', ValidateUrlShorten, urlShorten);

export default router;