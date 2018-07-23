const server = require('express').Router();
const cors = require('cors');
const User = require('../models/User');

server.use(cors());

server.get('/', (req, res) => {
    User.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500)
                .json({ message: 'There was a problem getting the users' });
        });
});



server.post('/signup', (req, res) => {
    User.create(req.body)
        .then(user => {
            res.status(201).json(user);
        })
        .catch(err => {
            res
                .status(500)
                .json({ message: 'Error saving that user to the DB' });
        });
});

module.exports = server;
