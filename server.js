const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const noteRoutes = require('./routes/notes');
const userRoutes = require('./routes/users');

const server = express();

server.use(express.json());
server.use(helmet());
server.use(morgan('combined'));
server.use(cors());

server.get('/', (req, res) => {
    res.json({ msg: "Connected" })
});

server.use('/notes', noteRoutes);
server.use('/user', userRoutes);

module.exports = server; 