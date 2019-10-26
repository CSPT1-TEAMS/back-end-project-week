require('dotenv').config()
const express = require('express')
const path = require('path')
const helmet = require('helmet');
const PORT = process.env.PORT || 5000
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const cors = require('cors');
const mongoose = require('mongoose');
//declare routes used
//something to help me push code
//`mongodb://localhost:27017/localnotesdb`
//`mongodb://${DB_USER}:${DB_PASS}@ds145871.mlab.com:45871/jpnotesdb`



mongoose.connect(`mongodb://jplambda:Database1@ds145871.mlab.com:45871/jpnotesdb`, {useFindAndModify: false})
.then(
  console.log('connected to mongodb server online')
)
.catch(err => {
  //res.status(500).json(err)
  return console.log('something wrong with local mongo');
})

const notesController = require('./models/notes/notesController');

const server = express()
server.use(helmet());
server.use(cors());
server.use(express.json());


// server
//   // .use(express.static(path.join(__dirname, 'public'))
  
//   // .set('views', path.join(__dirname, 'views'))
//   // .set('view engine', 'ejs')
//   .get('/', (req, res) => 
//   res.json({ hello: "world"})
  
//   // res.render('pages/index')
// )

server.use('/notes', notesController);
  server
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
