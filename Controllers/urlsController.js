import db from '../dbStrategy/db.js';
import { nanoid } from 'nanoid'
import {queryInsertShortUrl, queryInsertUrl, querySelectUrlById} from '../Queries/queries.js';

export async function UrlShorten(req, res) {
	const {url} = req.body;
	const shortUrl = nanoid();
	const dados = res.locals.tokenData;
	try {
		await db.query(queryInsertShortUrl, [shortUrl]);
		await db.query(queryInsertUrl, [url, shortUrl, dados.email]);
		res.sendStatus(201);
	} catch (error) {
		res.status(500).send(error);
	}
}

export async function UrlById(req, res) {
	try {
		const url = res.locals.url;
		res.status(200).send(url);
	} catch (error) {
		res.status(500).send(error);
	}
}