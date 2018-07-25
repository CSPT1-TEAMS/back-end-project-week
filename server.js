const express = require('express')
const cors = require('cors');
const helmet = require('helmet');

const notesRoute = require('./routes/notes');

const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());

server.use('/api/notes', notesRoute);

server.get('/', (req, res) => {
  res.status(200).json({ api: 'Running' })
})

module.exports = server;