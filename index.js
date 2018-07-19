const express = require("express");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;
const server = require('./server');

// express()
//   .get('/', (req, res) => res.json({ hello: 'world' }))
//   .listen(PORT, () => console.log(`Listening on ${ PORT }`))

mongoose
  .connect('mongodb://SeanValdivia:littleloki911@ds141671.mlab.com:41671/lambda-notes-sean')
  .then(() => {
    console.log("Connected to the database!");
    server.listen(PORT, () => {
      console.log(`Listening on ${PORT}`);
    });
  })
  .catch(err => {
    console.log(err);
  });
