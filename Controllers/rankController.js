import db from '../dbStrategy/db.js';
import {querySelectUserRank} from '../Queries/queries.js';

export async function Rank(req, res) {
	try {
		const {rows: rank} = await db.query(querySelectUserRank);
		res.status(200).send(rank);
	} catch (error) {
		res.status(500).send(error);
	}
}