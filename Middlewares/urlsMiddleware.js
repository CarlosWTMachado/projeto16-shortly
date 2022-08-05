import {authorizationSchema, urlSchema} from '../Schemas/schemas.js';
import db from '../dbStrategy/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {jwtSecret} from '../variaveisDeAmbiente.js';
//import {querySelectUserByEmail} from '../Queries/queries.js';

export function ValidateUrlShorten(req, res, next) {
	try{
		VerifyAuthorization(req.headers);
		res.locals.tokenData = VerifyToken(req.headers);
		VerifyUrl(req.body);
		next();
	}catch (error){
		return res.status(error.code).send(error.message);
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

function VerifyUrl(body){
	const validation = urlSchema.validate(body, {abortEarly: false});
	if(validation.error) throw {
		code: 422,
		message: validation.error.details.map(value => value.message)
	};
}