const express = require('express');
const session = require('express-session');
const cors = require('cors');
const redis = require('redis');
const connectRedis = require('connect-redis');
var bodyParser = require('body-parser');
const {FunctionNotImplementedError} = require("./errors");
const REDIS_HOST = process.env.REDIS_HOST || 'localhost';
const REDIS_PORT = process.env.REDIS_PORT || 6379;
const REDIS_USERNAME = process.env.REDIS_USERNAME;
const REDIS_PASSWORD = process.env.REDIS_PASSWORD;
const {StatusCodes, ReasonPhrases} = require('http-status-codes');
const YAML = require('yamljs');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = YAML.load('./api-doc.yml');
const app = express();
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
// enable this if you run behind a proxy (e.g. nginx)
app.set('trust proxy', 1);

let redisUrl = process.env.REDIS_URL;
if (!redisUrl) {
    redisUrl = `redis://${REDIS_USERNAME ? REDIS_USERNAME + ':' : ''}${REDIS_PASSWORD ? REDIS_PASSWORD + '@' : ''}${REDIS_HOST}:${REDIS_PORT}`
}
const RedisStore = connectRedis(session);
const redisClient = redis.createClient({
    url: redisUrl
})

redisClient.on('error', function (err) {
    console.log('Could not establish a connection with redis. ' + err);
});
redisClient.on('connect', function (err) {
    console.log('Connected to redis successfully');
});

//Configure session middleware
app.use(session({
    store: new RedisStore({ client: redisClient }),
    secret: 'secret$%^134',
    resave: false,
    name: 'weather-app',
    saveUninitialized: false,
    cookie: {
        secure: false, // if true only transmit cookie over https
        httpOnly: false, // if true prevent client side JS from reading the cookie
        maxAge: 1000 * 60 * 10 // session max age in miliseconds
    }
}));

function getMessageFromError(err) {
    if (err.errors) {
        return err.errors.map(err => {
            return `path: '${err.path}', errorCode: '${err.errorCode}', message: '${err.message}'`
        }).join('\n');
    }
    return err && err.message ? err.message : ReasonPhrases.INTERNAL_SERVER_ERROR;
}

function errorHandler(err, req, res, next) {
    let statusCode = err.status ? err.status : StatusCodes.INTERNAL_SERVER_ERROR;
    let message = getMessageFromError(err);
    if (err instanceof FunctionNotImplementedError) {
        statusCode = StatusCodes.NOT_IMPLEMENTED;
        message = ReasonPhrases.NOT_IMPLEMENTED;
    }
    res.status(statusCode).json({ message: message });
}

const { initialize } = require('express-openapi');
initialize({
    app,
    apiDoc: './api-doc.yml',
    paths: [
        { path: '/weather/{id}', module: require('./paths/weather') },
        { path: '/weather', module: require('./paths/weather')},
        { path: '/map', module: require('./paths/map')},
        { path: '/users', module: require('./paths/users')},
        { path: '/auth/login', module: require('./paths/auth')},
        { path: '/auth/logout', module: require('./paths/auth')},
        { path: '/geolocation', module: require('./paths/location')}
    ],
    exposeApiDocs: false,
    securityHandlers: {
        cookieAuth: function(req, scopes, definition) {
            return Promise.resolve(req.session.user);
        }
    },
    errorMiddleware: errorHandler
});

app.listen(4000);