function hello(req, res) {
    res.json({ message: 'hello from backend' });
}

module.exports = {
    hello: hello
}
