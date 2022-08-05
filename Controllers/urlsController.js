import db from '../dbStrategy/db.js';
import { nanoid } from 'nanoid'
import {queryInsertShortUrl, queryInsertUrl} from '../Queries/queries.js';

export async function urlShorten(req, res) {
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