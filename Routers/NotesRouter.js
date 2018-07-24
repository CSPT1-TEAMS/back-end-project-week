const express = require('express')
const router = express.Router()
const Note = require('../models/Notes')

router.get("/", (req, res) => {
    Note.find({})
        .then(notes => {
            return res.status(200).json(notes)
        })
        .catch(error => {
            return res.status(500).json({errorMessage: "Error fetching data from db."})
        })
})

router.get("/:id", (req, res) => {
    const { id } = req.params
    Note.findById(id)
        .then(note => {
            if (note === null) {
                return res.status(404).json({message: `Unable to find note with id: ${id}`})
            } else {
                return res.status(200).json(note)
            }
        })
        .catch(error => {
            return res.status(500).json({
                errorMessage: "Valid id is required."
            })
        })
})

router.post("/new", (req, res) => {
    console.log(req.body)
    Note.create(req.body)
        .then(newNote => {
            res.status(201).json(newNote)
        })
        .catch(error => {
            res.status(500).json({errorMessage: 'Unable to add note.'})
        })
})

router.put("/edit/:id", (req, res) => {
    const { id } = req.params
    const { title, content } = req.body
    Note.findByIdAndUpdate(id, req.body)
        .then(note => {
            if (note === null) {
                return res.status(404).json({message: `Unable to find note with Id ${id}`})
            } else {
                return res.status(200).json({...note.toObject(), title, content })
            }
        })
        .catch(error => {
            return res.status(500).json({
                errorMessage: "Something went wrong."
            })
        })
})

router.delete("/delete/:id", (req, res) => {
    const { id } = req.params
    Note.findByIdAndRemove(id)
        .then(note => {
            if (note === null) {
                return res.status(404).json({message: `Unable to find note with Id ${id}`})
            } else {
                return res.status(204).json({message: 'Note deleted.'})
            }
        })
        .catch(error => {
            res.status(500).json({errorMessage: "Something went wrong."})
        })
})

module.exports = router