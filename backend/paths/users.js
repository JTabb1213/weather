const userService = require('../services/users');
const {StatusCodes} = require('http-status-codes');
function createUser(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;
    userService.createUser(username, password).then(result => {
        res.status(StatusCodes.CREATED).json({ message: 'User added' });
    }).catch(next);
}

module.exports = {
    createUser: createUser
}