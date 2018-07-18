const express = require('express');
const userRouters = require('./Routes/userRoutes');
const noteRouters = require('./Routes/noteRoutes');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(morgan('dev'));

server.get('/', (req, res) => {
        res.json({ Connected : "!=== Connected ===!" })
    });

    server.use('/', userRouters);
    server.use('/', noteRouters);

module.exports = server;