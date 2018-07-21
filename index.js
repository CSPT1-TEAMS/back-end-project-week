const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const cors = require('cors');
//declare routes used

const server = express()

server.cors()

server
  .use(express.static(path.join(__dirname, 'public'))
  
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => 
  res.json({ hello: "world"})
  
  // res.render('pages/index')
)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
