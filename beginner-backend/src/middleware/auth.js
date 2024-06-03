var sha256 = require('js-sha256');

module.exports = function (req, res, next) {
    console.log(req.headers)
    if (sha256("password123") === req.headers.authorization) {
        next()
    } else {
        let error = new Error("Unauthorized.")
        next(error)
    }
}