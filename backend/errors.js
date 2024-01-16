class FunctionNotImplementedError extends Error {
    constructor(message) {
        super(`function ${message} does not exist`);
        this.name = "FunctionNotImplementedError";
    }
}

class UserAlreadyExists extends Error {
    constructor(message) {
        super(`username ${message} already taken`);
        this.name = "UserAlreadyExists"
    }
}

module.exports = {
    FunctionNotImplementedError: FunctionNotImplementedError,
    UserAlreadyExists: UserAlreadyExists
}