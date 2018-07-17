const userRouters = require('../Routes/userRoutes');
const signup = require('../Routes/register');

module.exports = function(server) {
    server.use('/users', userRouters);
    server.use('/register', signup);
};