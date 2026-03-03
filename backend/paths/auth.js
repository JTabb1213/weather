const userService = require('../services/users');

function login(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;
    userService.findUser(username, password).then(result => {
        if (!result) {
            res.status(404).json({ message: "User not found" });
        } else {
            req.session.user = result.dataValues;
            req.session.save(err => {
                if (err) return next(err);
                res.status(200).send();
            });
        }
    }).catch(next);
}

function logout(req, res, next) {
    req.session.destroy(err => {
        if (err) {
            return next(err);
        }
        res.clearCookie('__session');
        res.json({});
    });
}

module.exports = {
    login: login,
    logout: logout
}