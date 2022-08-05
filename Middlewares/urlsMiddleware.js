import {authorizationSchema, urlSchema} from '../Schemas/schemas.js';
import db from '../dbStrategy/db.js';
import {querySelectUrlById,querySelectShortUrlByName} from '../Queries/queries.js';
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

function VerifyUrl(body){
	const validation = urlSchema.validate(body, {abortEarly: false});
	if(validation.error) throw {
		code: 422,
		message: validation.error.details.map(value => value.message)
	};
}

export async function ValidateUrlId(req, res, next) {
	try{
		res.locals.url = await VerifyShortUrl(req.params.id);
		next();
	}catch (error){
		if(error.code) return res.status(error.code).send(error.message);
		return res.status(500).send(error);
	}
}

async function VerifyShortUrl(id){
	try{
		const {rows: url} = await db.query(querySelectUrlById, [id]);
		if(url.length < 1) throw {code: 404, message: ""};
		return url[0];
	}catch(error){
		throw error;
	}
}

export async function ValidateOpenUrl(req, res, next) {
	try{
		res.locals.shortUrl = await VerifyShortUrlByName(req.params.shortUrl);
		next();
	}catch (error){
		if(error.code) return res.status(error.code).send(error.message);
		return res.status(500).send(error);
	}
}

async function VerifyShortUrlByName(name){
	try{
		const {rows: shortUrl} = await db.query(querySelectShortUrlByName, [name]);
		if(shortUrl.length < 1) throw {code: 404, message: ""};
		return shortUrl[0];
	}catch(error){
		throw error;
	}
}