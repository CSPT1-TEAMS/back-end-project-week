const express = require('express')
const server = express()
const PORT = process.env.PORT || 5000
const mongoose = require('mongoose')
const Note = require('./models/Notes')

server.use(express.json())

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

server.get("/notes", (req, res) => {
    Note.find({})
        .then(notes => {
            return res.status(200).json(notes)
        })
        .catch(error => {
            return res.status(500).json({errorMessage: "Error fetching data from db."})
        })
})

server.post("/notes/new", (req, res) => {
    Note.create(req.body)
        .then(newNote => {
            res.status(201).json(newNote)
        })
        .catch(error => {
            res.status(500).json({errorMessage: 'Unable to add note.'})
        })
})
