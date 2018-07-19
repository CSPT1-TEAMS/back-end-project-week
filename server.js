const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

const noteEndpoints = require('./Routes/noteEndpoints');
const userEndpoints = require('./Routes/userEndpoints');

const server = express();

server.use(express.json());
server.use(helmet());
server.use(morgan('combined'));
server.use(cors());

server.get('/', (req, res) => {
  res.json({message: "Connected to server!"})
});
server.use('/notes', noteEndpoints);
//server.use('/user', userEndpoints);

module.exports = server;
