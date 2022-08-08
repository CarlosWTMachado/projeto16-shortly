import {authorizationSchema} from '../Schemas/schemas.js';
import db from '../dbStrategy/db.js';
import {querySelectUserWithVisitCount} from '../Queries/queries.js';
import jwt from 'jsonwebtoken';
import {jwtSecret} from '../variaveisDeAmbiente.js';

export async function ValidateUser(req, res, next) {
	try{
		VerifyAuthorization(req.headers);
		const tokenData = VerifyToken(req.headers);
		res.locals.tokenData = tokenData;
		res.locals.user = await VerifyUserExists(tokenData.email);
		next();
	}catch (error){
		if(error.code) return res.status(error.code).send(error.message);
		return res.status(500).send(error);
	}
}

function VerifyAuthorization({authorization}){
	const validation = authorizationSchema.validate({authorization}, {abortEarly: false});
	if(validation.error) throw {code: 401, message: ""};
	return;
}

function VerifyToken({authorization}){
	try{
		const token = authorization.replace('Bearer ', '');
		const dados = jwt.verify(token, jwtSecret);
		return dados;
	}catch (error){
		throw {code: 401, message: ""};
	}
}

async function VerifyUserExists(email){
	try {
		const {rows: user} = await db.query(querySelectUserWithVisitCount, [email]);
		if(user.length > 0)
			return user[0];
		else throw {code: 404, message: ""};
	} catch (error) {
		throw error;
	}
}