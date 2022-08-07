import express from 'express';
import {
	UrlShorten,
	UrlById,
	OpenUrl,
	DeleteUrl
} from '../Controllers/urlsController.js';
import {
	ValidateUrlShorten,
	ValidateUrlId,
	ValidateOpenUrl,
	ValidateDeleteUrl
} from '../Middlewares/urlsMiddleware.js';

const router = express.Router();

router.post('/urls/shorten', ValidateUrlShorten, UrlShorten);
router.get('/urls/:id', ValidateUrlId, UrlById);
router.get('/urls/open/:shortUrl', ValidateOpenUrl, OpenUrl);
router.delete('/urls/:id', ValidateDeleteUrl, DeleteUrl);

export default router;