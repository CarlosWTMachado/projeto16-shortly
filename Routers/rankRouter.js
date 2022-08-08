import express from 'express';
import {Rank} from '../Controllers/rankController.js';

const router = express.Router();

router.get('/ranking', Rank);

export default router;