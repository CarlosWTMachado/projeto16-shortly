import express from 'express';
import {UrlShorten, UrlById} from '../Controllers/urlsController.js';
import {ValidateUrlShorten, ValidateUrlId} from '../Middlewares/urlsMiddleware.js';

const router = express.Router();

router.post('/urls/shorten', ValidateUrlShorten, UrlShorten);
router.get('/urls/:id', ValidateUrlId, UrlById);

export default router;