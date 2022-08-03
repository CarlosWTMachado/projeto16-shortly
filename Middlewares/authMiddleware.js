import {signupSchema, signinSchema} from '../Schemas/schemas.js';
import db from '../dbStrategy/db.js';
import bcrypt from 'bcrypt';
import {querySelectUserByEmail} from '../Queries/queries.js';

export function ValidateSignup(req, res, next) {
	const validation = signupSchema.validate(req.body, {abortEarly: false});
	if(validation.error) return res.status(422).send(
		validation.error.details.map(value => value.message)
	);
	next();
}

export function ValidateSignin(req, res, next){
	const validation = signinSchema.validate(req.body, {abortEarly: false});
	if(validation.error) return res.status(422).send(
		validation.error.details.map(value => value.message)
	);
	next();
}

export async function VerifySignin(req, res, next){
	try {
		if(!await VerifyUserExists(req.body)) return res.sendStatus(401);
		else next();
	} catch (error) {
		return res.status(500).send(error);
	}
}

async function VerifyUserExists({email, password}){
	try {
		const {rows: user} = await db.query(querySelectUserByEmail, [email]);
		if(user.length > 0){
			if(await VerifyPassword(password, user[0].password)) return true;
		}
		else return false;
	} catch (error) {
		throw error;
	}
}

async function VerifyPassword(password, encryptedPassword){
	const compare = bcrypt.compareSync(password, encryptedPassword);
	return compare;
}