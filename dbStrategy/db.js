import pg from 'pg';
import {databaseUrl} from '../variaveisDeAmbiente.js'

const { Pool } = pg;

const connection = new Pool({
	connectionString: databaseUrl,
	ssl: {
		rejectUnauthorized: false
	}
});

export default connection;