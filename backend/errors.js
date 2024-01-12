class FunctionNotImplementedError extends Error {
    constructor(message) {
        super(`function ${message} does not exist`);
        this.name = "FunctionNotImplementedError";
    }
}

module.exports = {
    FunctionNotImplementedError: FunctionNotImplementedError
}