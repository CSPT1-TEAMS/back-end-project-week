const mongoose = require('mongoose');
const server = require('./server');
const PORT = process.env.PORT || 5000;

mongoose
  .connect('mongodb://SeanValdivia:littleloki911@ds141671.mlab.com:41671/lambda-notes-sean')
  .then(() => {
    console.log("Connected to the DATABASE!")
    server.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`)
    });
  });
  .catch(error => {
    console.log('Error connecting to DATABASE!');
  });