const userService = require('../services/users');
const { StatusCodes } = require('http-status-codes');
const { UserAlreadyExists } = require('../errors');

function createUser(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;
    userService.createUser(username, password).then(result => {
        res.status(StatusCodes.CREATED).json({ message: 'User added' });
    }).catch(error => {
        if (error instanceof UserAlreadyExists) {
            res.status(StatusCodes.CONFLICT).json({ message: 'Username already taken' });
        } else {
            error.message = `This is the error: ${error.message}`;
            next(error);
        }
    });
}

module.exports = {
    createUser: createUser
}