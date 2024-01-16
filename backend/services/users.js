const db = require("../models");
const User = db.user;
const { UserAlreadyExists } = require("../errors");

async function findUser(username, password) {
    return User.findOne({ where: { username: username, password: password } });
}

async function createUser(username, password, res) {
    const existingUser = await User.findOne({ where: { username: username } });
    if (existingUser) {
        console.log("Username already exists");
        throw new UserAlreadyExists(`${username}`);
    } else {
        const now = new Date().toISOString();
        return User.create({ username: username, password: password, createdAt: now, updatedAt: now });
    }

}

async function findPassword(username) {
    const user = await User.findOne({ where: { username: username } });
    return user.password;
}

module.exports = {
    findUser: findUser,
    createUser: createUser,
    findPassword: findPassword
}