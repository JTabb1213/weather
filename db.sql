-- =============================================================
-- Users Table
-- Stores registered user accounts for the CityInfo application.
-- Managed by Sequelize model: backend/models/user.model.js
-- Table name: usersWeather (freezeTableName: true)
-- =============================================================

DROP TABLE IF EXISTS "usersWeather";
DROP SEQUENCE IF EXISTS users_id_seq;

CREATE SEQUENCE users_id_seq
    INCREMENT 1
    MINVALUE 1
    MAXVALUE 2147483647
    START 1
    CACHE 1;

CREATE TABLE "public"."usersWeather" (
    -- Auto-incrementing primary key
    "id"        integer                     DEFAULT nextval('users_id_seq') NOT NULL,

    -- User's login name, must be unique across all accounts
    "username"  character varying(255)      NOT NULL,

    -- User's password (store a hashed value in production)
    "password"  character varying(255)      NOT NULL,

    -- Sequelize-managed timestamps (set by services/users.js on create/update)
    "createdAt" timestamp with time zone    NOT NULL,
    "updatedAt" timestamp with time zone    NOT NULL,

    CONSTRAINT "usersWeather_pkey"     PRIMARY KEY ("id"),
    CONSTRAINT "usersWeather_username" UNIQUE ("username")
);

-- =============================================================
-- Weather Cache Table (commented out - currently unused)
-- =============================================================
/*
DROP TABLE IF EXISTS "weather";
DROP SEQUENCE IF EXISTS cities_id_seq;
CREATE SEQUENCE cities_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."weather" (
    "id"           integer                  DEFAULT nextval('cities_id_seq') NOT NULL,
    "name"         character varying(255)   UNIQUE,
    "tempActual"   float,
    "humidity"     float,
    "windSpeed"    integer,
    "tempFeelsLike" float,
    "skies"        character varying(255),
    "createdAt"    timestamptz              NOT NULL,
    "updatedAt"    timestamptz              NOT NULL,
    CONSTRAINT "cities_pkey" PRIMARY KEY ("id")
) WITH (oids = false);
*/