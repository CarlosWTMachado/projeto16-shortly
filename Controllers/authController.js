import db from '../dbStrategy/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {jwtSecret} from '../variaveisDeAmbiente.js'
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
	const {email, password} = req.body;
	try {
		const dados = {email};
		const configuracoes = { expiresIn: 60*60*2}
		const token = jwt.sign(dados, jwtSecret, configuracoes);
		res.status(200).send(token);
	} catch (error) {
		return res.status(500).send(error);
	}
}