DROP TABLE IF EXISTS "users";
DROP SEQUENCE IF EXISTS users_id_seq;
CREATE SEQUENCE users_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."users" (
                                  "id" integer DEFAULT nextval('users_id_seq') NOT NULL,
                                  "username" character varying(255),
                                  "password" character varying(255),
                                  "createdAt" timestamptz NOT NULL,
                                  "updatedAt" timestamptz NOT NULL,
                                  CONSTRAINT "users_pkey" PRIMARY KEY ("id")
) WITH (oids = false);


DROP TABLE IF EXISTS "weather";
DROP SEQUENCE IF EXISTS weather_id_seq;
CREATE SEQUENCE weather_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;


CREATE TABLE "public"."weather" (
                                  "id" integer DEFAULT nextval('weather_id_seq') NOT NULL,
                                  "name" character varying(255) UNIQUE,
                                  "tempActual" float,
                                  "humidity" float,
                                  "windSpeed" integer,
                                  "tempFeelsLike" float,
                                  "skies" character varying(255),
                                  "createdAt" timestamptz NOT NULL,
                                  "updatedAt" timestamptz NOT NULL,
                                  CONSTRAINT "weather_pkey" PRIMARY KEY ("id")
) WITH (oids = false);