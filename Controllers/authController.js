import db from '../dbStrategy/db.js';
import bcrypt from 'bcrypt';
import {queryInsertUsers} from '../Queries/queries.js';

export async function Signup(req, res) {
	const {name, email, password} = req.body;
	const encryptedPassword = bcrypt.hashSync(password, 10);
	try {
		await db.query(queryInsertUsers, [name, email, encryptedPassword]);
		res.sendStatus(201);
	} catch (error) {
		return (error.code === '23505') ?
			res.sendStatus(409) :
			res.status(500).send(error);
	}
}

export async function Signin(req, res) {
	try {
		res.sendStatus(200);
	} catch (error) {
		return res.status(500).send(error);
	}
}