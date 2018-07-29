const server = require('express').Router();

const User = require('../models/User');
const { createToken } = require('./auth');
const { restricted } = require('./auth');

// I don't like that a user can view all other users with his/her
// valid token
server.get('/', restricted, (req, res) => {
    User.find().populate('notes')
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

server.post('/login', (req, res) => {
    const { username, password } = req.body;
    console.log(req.body);
    User.findOne({ username })
        .then(user => {
            if (user) {
                user
                    .validatePassword(password)
                    .then(passwordsMatch => {
                        console.log(passwordsMatch);
                        if (passwordsMatch) {
                            const token = createToken(user);
                            // send token back to client
                            res.status(200).json(token);
                        }
                        else {
                            res.status(401).send('Unauthorized.');
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json(err.messsage);
                    })
            }
            else {
                res.status(401).json('Invalid credentials.');
            }
        })
        .catch(err => {
            res.status(500).json('Error validating credentials.');
        })
});

server.put('/edit/:id', (req, res) => {
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
                .json({ message: 'There was a problem finding that user', error: err });
        });
});

server.delete('/delete/:id', (req, res) => {
    const { id } = req.params;

    if (!id) {
        res.status(422).json({ message: 'You need to give me an ID' });
    } else {
        User.findByIdAndRemove(id)
            .then(user => {
                if (user) {
                    res.status(204).end();
                } else {
                    res.status(404).json({ message: 'User not found' });
                }
            })
            .catch(err => res.status(500).json(err));
    }
});

module.exports = server;
