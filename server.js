const express = require('express');

const port = process.env.PORT || 5050;

express.get('/', (req, res) => {
  res.json("It's kind of working!")
})
.listen(port, (req, res) => {
  console.log(`Listening on port ${port}`);
})