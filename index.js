import express, { json } from 'express';
import cors from 'cors';
import {aplicationPort} from './variaveisDeAmbiente.js'
import AuthRouter from './Routers/authRouter.js';


const server = express();
server.use(cors());
server.use(json());

server.use(AuthRouter);

server.listen(aplicationPort, () => {
	console.log("Rodando ...");
});