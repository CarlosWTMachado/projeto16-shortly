export const queryInsertUsers = `
	INSERT INTO users (name, email, password)
	VALUES ($1, $2, $3)
`;

export const querySelectUserByEmail = `
	SELECT *
	FROM users
	WHERE email = $1
`;