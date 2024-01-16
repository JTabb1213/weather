const userService = require('../services/users');

function getPassword(req, res, next) {
    const username = req.body.username;
    userService.findPassword(username).then(result => {
        if (!result) {
            res.status(404).json({ message: "User not found" });
        } else {
            req.session.user = result.dataValues;
            res.status(200).send({ password: result });
        }
    }).catch(next);
}


module.exports = {
    getPassword: getPassword
}