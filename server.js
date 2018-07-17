const express = require('express');
const Routes = require('./_config/router');


const server = express();

server
    .get('/', (req, res) => {
        res.json({ Connected : "!=== Connected ===!" })
    })

    Routes(server);

module.exports = server;