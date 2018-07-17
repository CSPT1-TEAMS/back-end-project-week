const router = require('express').Router();
const User = require('../Models/userModel');

router
    .get('/users', (req, res) => {
        User.find()
        .select('-password')
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json(err);
        })
    });

    module.exports = router;