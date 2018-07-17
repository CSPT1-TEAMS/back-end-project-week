const express = require('express');
const userRouters = require('./Routes/userRoutes');
const morgan = require('morgan');

const server = express();
server.use(express.json());
server.use(morgan('dev'));

server.get('/', (req, res) => {
        res.json({ Connected : "!=== Connected ===!" })
    });

    server.use('/', userRouters);

module.exports = server;