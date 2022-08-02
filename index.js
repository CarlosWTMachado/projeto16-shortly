import express, { json } from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import AuthRouter from './Routers/authRouter.js';

dotenv.config();
const server = express();
server.use(cors());
server.use(json());

server.use(AuthRouter);

server.listen(process.env.PORT, () => {
	console.log("Rodando ...");
});