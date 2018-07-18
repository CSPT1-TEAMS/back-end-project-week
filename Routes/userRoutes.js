const router = require('express').Router();
const User = require('../Models/userModel');

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
    
    .get('/users', (req, res) => {
        User.find()
        .select('-password')
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json(err);
        })
    })

    module.exports = router;