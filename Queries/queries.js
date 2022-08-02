export const queryInsertUsers = `
	INSERT INTO users (name, email, password)
	VALUES ($1, $2, $3)
`;