const config = require('config');
const Sequelize = require("sequelize");
const pool = config.get('database.pool');

const dbName = 'databaseforweatherwebsite';//config.get('database.db');
const host = 'ldpg-crth9d3tq21c73aojapg-a.ohio-postgres.render.com';//config.get('database.host');
const port = '5432';//config.get('database.port');
const dialect = config.get('database.dialect');
console.log(`Using db: ${dialect}://${host}:${port}/${dbName}`);
const sequelize = new Sequelize(
    dbName,
    'databaseforweatherwebsite_user',//config.get('database.user'),
    'a02fUuDkcM3OLItU4Rk8jlkydnqZYtDG',//config.get('database.password'),
    {
        host: host,
        port: port,
        dialect: dialect,
        pool: {
            max: pool.max,
            min: pool.min,
            acquire: pool.acquire,
            idle: pool.idle
        },
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);

module.exports = db;