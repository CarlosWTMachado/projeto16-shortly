import {signupSchema} from '../Schemas/schemas.js';
//import db from '../dbStrategy/db.js';

export function ValidateSignup(req, res, next) {
	const validation = signupSchema.validate(req.body, {abortEarly: false});
	if(validation.error) return res.status(422).send(
		validation.error.details.map(value => value.message)
	);
	next();
}