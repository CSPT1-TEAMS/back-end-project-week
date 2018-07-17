const mongoose = require('mongoose');
const server = require('./server');

const port = 8080;

mongoose
  .connect('mongodb://localhost/placeholderDB')
  .then(() => {
    console.log('Connected to mongo database')
    server.listen(port, () => {
      console.log(`Server is listening on port ${port}`)
    })
  })
  .catch(err => {
    console.log('Error connecting to mongo database')
  })