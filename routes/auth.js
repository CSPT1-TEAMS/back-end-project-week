const jwt = require('jsonwebtoken');
const secret = 'I am an anarchist.';

// this is a middleware function
function restricted(req, res, next) {
  // value of authorization is the token
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secret, (error, decoded) => {
      if (error) {
        res.status(401).json('You cannot view users/notes without a valid token.');
        // so I'm assuming the return here stops the code from continuing to execute
        // but how do I know when to return?
        return;
      }
      // calling next here passes the function on to the next 
      // piece of middleware in the stack
      req.batman = decoded;
      next();
    });
  }
  else {
    res.status(401).json('You cannot view users with a valid token.');
  }
}

function createToken(user) {
    const options = {
      expiresIn: '1h'
    };
    // payload is user name
    const payload = { username: user.username, data: "Batman Rules" };
  
    return jwt.sign(payload, secret, options);
  }

module.exports = {restricted, createToken};