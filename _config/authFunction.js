const jwt = require('jsonwebtoken');
const SECRET = "How secret is this thing?";

const createToken = (user) => {
    const payload = {
        sub: user._id,
        name: user.username
    }
    const options = {
        expiresIn: '24h'
    }
    return jwt.sign(payload, SECRET, options)
}

const verifyCred = (req, res, next) => {
    const token = req.headers.authorization;
    if(token === undefined) {
        res.sendStatus(401);
        return;
    }

    jwt.verify(token, SECRET, (err, payload) => {
        if(err) {
            res.sendStatus(401);
            return;
        }

        req.decodedPayload = payload;
        next();
    })
}

module.exports = {
    createToken,
    verifyCred
}