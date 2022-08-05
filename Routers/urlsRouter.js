import express from 'express';
import {UrlShorten, UrlById, OpenUrl} from '../Controllers/urlsController.js';
import {ValidateUrlShorten, ValidateUrlId, ValidateOpenUrl} from '../Middlewares/urlsMiddleware.js';

const router = express.Router();

router.post('/urls/shorten', ValidateUrlShorten, UrlShorten);
router.get('/urls/:id', ValidateUrlId, UrlById);
router.get('/urls/open/:shortUrl', ValidateOpenUrl, OpenUrl);

export default router;