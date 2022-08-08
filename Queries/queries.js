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

export const querySelectUrlById = `
	SELECT s.id, s."shortUrl", u.url
	FROM "shortUrls" s
	JOIN urls u
	ON s.id = u."shortUrlId"
	WHERE s.id = $1
`;

export const querySelectShortUrlByName = `
	SELECT s.*, u.url
	FROM "shortUrls" s
	JOIN urls u
	ON s.id = u."shortUrlId"
	WHERE "shortUrl" = $1
`;

export const queryUpdateShortUrlVisitCount = `
	UPDATE "shortUrls"
	VALUES SET "visitCount" = $1
	WHERE id = $2
`;

export const querySelectShortUrlByEmail = `
	SELECT us.email, s."shortUrl"
	FROM urls u
	JOIN "shortUrls" s
	ON u."shortUrlId" = s.id
	JOIN users us
	ON u."userId" = us.id
	WHERE us.email = $1
	AND s.id = $2
`;

export const queryDeleteShortUrlById = `
	DELETE FROM "shortUrls"
	WHERE id = $1
`;

export const queryDeleteUrlByShortUrlId = `
	DELETE FROM urls
	WHERE "shortUrlId" = $1
`;

export const querySelectUserWithVisitCount = `
	SELECT
		us.id,
		us.name,
		SUM(s."visitCount") as "visitCount"
	FROM users us
	JOIN urls u
	ON u."userId" = us.id
	JOIN "shortUrls" s
	ON s.id = u."shortUrlId"
	WHERE us.email = $1
	GROUP BY us.id
`;

export const querySelectUserShortUrls = `
	SELECT 
		s.id,
		s."shortUrl",
		u.url,
		s."visitCount"
	FROM users us
	JOIN urls u
	ON u."userId" = us.id
	JOIN "shortUrls" s
	ON s.id = u."shortUrlId"
	WHERE us.email = $1
`;

export const querySelectUserRank = `
	SELECT 
		us.id,
		us.name,
		COALESCE(COUNT(u."shortUrlId"),0) as "linksCount",
		SUM(s."visitCount") as "visitCount"
	FROM users us
	JOIN urls u
	ON u."userId" = us.id
	JOIN "shortUrls" s
	ON s.id = u."shortUrlId"
	GROUP BY us.id
	ORDER BY "visitCount"
	LIMIT 10
`;