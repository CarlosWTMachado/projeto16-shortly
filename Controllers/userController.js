import db from '../dbStrategy/db.js';
import {querySelectUserShortUrls} from '../Queries/queries.js';

export async function Profile(req, res) {
	try {
		const dados = res.locals.tokenData;
		const user = res.locals.user;
		const {rows: urls} = await db.query(querySelectUserShortUrls, [dados.email]);
		res.status(200).send({
			id: user.id,
			name: user.name,
			shortUrl: user.shortUrl,
			visitCount: user.visitCount,
			shortenedUrls: urls
		});
	} catch (error) {
		res.status(500).send(error);
	}
}