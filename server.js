const express = require('express');

const server = express();

server
    .get('/', (req, res) => {
        res.json({ Connected : "!=== Connected ===!" })
    })

module.exports = server;