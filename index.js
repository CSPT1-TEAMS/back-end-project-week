const express = require('express')();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000;

const dbUser = "alemre";
const dbpw = "reveeQ255";
const db = "arey-back-end-project";

express
    .get('/', (req, res) => {
        res.json({ Connected : "!=== Connected ===!" })
    })
    .listen(PORT, () => {
        console.log(`Listening on ${PORT}`)
    })

mongoose
    .connect(`mongodb://${dbUser}:${dbpw}@ds239911.mlab.com:39911/${db}`)
    .then(() => {
        console.log("Connected to the mongoose database")
    })
    .catch(err => {
        console.log(err)
    })