import joi from 'joi';

export const signupSchema = joi.object({
	name: joi.string().trim().required(),
	email: joi.string().email().required(),
	password: joi.string().required(),
	confirmPassword: joi.ref("password")
}).with('password', 'confirmPassword');