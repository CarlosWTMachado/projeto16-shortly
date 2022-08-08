CREATE TABLE "users" (
	"id" serial NOT NULL,
	"name" TEXT NOT NULL,
	"email" TEXT NOT NULL,
	"password" TEXT NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
);

CREATE TABLE "shortUrls" (
	"id" serial NOT NULL,
	"shortUrl" TEXT NOT NULL,
	"visitCount" integer NOT NULL DEFAULT '0',
	CONSTRAINT "shortUrls_pk" PRIMARY KEY ("id")
);

CREATE TABLE "urls" (
	"id" serial NOT NULL,
	"url" TEXT NOT NULL,
	"shortUrlId" integer NOT NULL,
	"userId" integer NOT NULL,
	CONSTRAINT "urls_pk" PRIMARY KEY ("id")
);

ALTER TABLE "urls" ADD CONSTRAINT "urls_fk0" FOREIGN KEY ("shortUrlId") REFERENCES "shortUrls"("id");
ALTER TABLE "urls" ADD CONSTRAINT "urls_fk1" FOREIGN KEY ("userId") REFERENCES "users"("id");
