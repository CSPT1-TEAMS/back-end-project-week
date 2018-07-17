const router = require('express').Router();
const User = require('../Models/userModel');

router.post('/register', (req, res) => {
            const user = new User(req.body);
            user.save()
            .then(savedUser => {
                res.status(201).json(savedUser)
            })
            .catch(err => {
                res.status(500).json(err);
            })
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