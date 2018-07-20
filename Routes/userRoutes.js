const router = require('express').Router();
const { createToken, verifyCred } = require('../_config/authFunction');
const User = require('../Models/userModel');
const Note = require('../Models/noteModel');

router.post('/register', (req, res) => {
    const { username, password } = req.body;
    if(!username || !password) {
        res.status(400).json({ Error: "Username and password are required to proceed." });
    } else {

        User.create({ username, password })
        .then(savedUser => {
            res.status(201).json({ message: `You have successfully registered!`})
        })
        .catch(err => {
            res.status(500).json(err);
        });
    }
    })

    .post('/user/login', (req, res) => {
        const { username, password } = req.body;
        if(!username || !password) {
            res.status(401).json({ Error: 'Enter log-in credentials (username and password).' })
        }

        User.findOne({ username })
            .then(user => {
                user.verifyPassword(password)
                    .then(validatedUser => {
                        if(validatedUser) {
                            const token = createToken(user)
                            res.status(201).json({ user, token })
                        } else {
                            res.status(401).json({ Error: 'Ah ah ah, you did not say the magic word!' })
                        }
                    })
                    .catch(err => {
                        res.status(500).json(err)
                    })
                    .catch(err => {
                        res.status(500).json(err)
                    })
            })
    })
    
    .get('/users', verifyCred, (req, res) => {
        User.find()
        .select('-password')
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json(err);
        })
    })

    .get('/users/:id', (req, res) => {
        const { id } = req.params;

        User.findById(id)
        .select('-password')
        .populate('notes')
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(500).json(err);
        })
    })

    module.exports = router;