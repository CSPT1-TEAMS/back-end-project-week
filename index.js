const express = require('express')
const path = require('path')
const helmet = require('helmit');
const PORT = process.env.PORT || 5000
const cors = require('cors');
const mongoose = require('mongoose');
//declare routes used

mongoose.connect('mongodb://localhost:27017/notesdb')
.then()
.catch(err => {
  return error;
})

const notesController = require('./notes/notesController');

const server = express()
server.use(helmet());
server.use(cors());
server.use(express.json());


server
  .use(express.static(path.join(__dirname, 'public'))
  
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => 
  res.json({ hello: "world"})
  
  // res.render('pages/index')
)

// server.use('/api/', notesController);
  // server
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
