import joi from 'joi';

export const signupSchema = joi.object({
	name: joi.string().trim().required(),
	email: joi.string().email().required(),
	password: joi.string().required(),
	confirmPassword: joi.ref("password")
}).with('password', 'confirmPassword');

export const signinSchema = joi.object({
	email: joi.string().email().required(),
	password: joi.string().required()
});

export const authorizationSchema = joi.object({
	authorization: joi.string().pattern(/^Bearer .*/).required()
});

export const urlSchema = joi.object({
	url: joi.string().required()
});