const express = require('express')
const cors = require('cors')
const server = express()
const PORT = process.env.PORT || 5000
const mongoose = require('mongoose')
const Note = require('./models/Notes')
const NotesRouter = require('./Routers/NotesRouter')
const UserRouter = require('./Routers/UserRouter')

server.use(express.json())
server.use(cors())

mongoose.connect("mongodb://ravanibhavik:asdfgf1234@ds239911.mlab.com:39911/backend-project")
    .then(() => {
        console.log("=== Connected to Database ===")
        server.listen(PORT, () => {
            console.log(`Listening on port ${PORT}`)
        })
    })
    .catch((error) => {
        console.log(">>> Error Connecting to Database <<<")
    })

server.use('/notes', NotesRouter)