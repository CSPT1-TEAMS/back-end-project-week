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

server.get('/:id', (req, res) => {
    const id = req.params.id;
    User.findById(id)
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: "User does not exist!" });
            }
            res.json({ user });
        })
        .catch(err => {
            res.status(500).json({ message: "Error retrieving user from database!", error: err });
        })
})

server.post('/signup', (req, res) => {
    console.log(req.body);
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

server.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    const options = {
        new: true,
    };

    User.findByIdAndUpdate(id, changes, options)
        .then(user => {
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        })
        .catch(err => {
            res
                .status(500)
                .json({ message: 'There was a problem finding that user.', error: err });
        });
});

server.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    console.log(id);
    console.log("hello");
    User.remove(id)
        .then(response => {
            if (response === 0) {
                return res.status(404).json({ message: `User ${id} not found in database` })
            }
            res.status(200).json({ message: "===USER DELETED===" })
        })
        .catch(err => res.status(500).json({ err }))

})

module.exports = server;
