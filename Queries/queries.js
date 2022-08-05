export const queryInsertUsers = `
	INSERT INTO users (name, email, password)
	VALUES ($1, $2, $3)
`;

export const querySelectUserByEmail = `
	SELECT *
	FROM users
	WHERE email = $1
`;

export const queryInsertUrl = `
	INSERT INTO urls (url, "shortUrlId", "userId")
	VALUES (
		$1,
		(SELECT id FROM "shortUrls" WHERE "shortUrl" = $2),
		(SELECT id FROM users WHERE email = $3)
	);
`;

export const queryInsertShortUrl = `
	INSERT INTO "shortUrls" ("shortUrl")
	VALUES ($1)
`;