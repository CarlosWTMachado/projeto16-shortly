import express, { json } from 'express';
import cors from 'cors';
import {aplicationPort} from './variaveisDeAmbiente.js'
import AuthRouter from './Routers/authRouter.js';
import UrlsRouter from './Routers/urlsRouter.js';


const server = express();
server.use(cors());
server.use(json());

server.use(AuthRouter);
server.use(UrlsRouter);

server.listen(aplicationPort, () => {
	console.log("Rodando ...");
});