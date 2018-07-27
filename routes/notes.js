const express = require('express');
const Note = require('../schemas/note');

const router = express.Router();

router.route('/')
  .get((req, res) => {
    Note.find()
      .then(notes => {
        res.status(200).json(notes);
      })
      .catch(error => {
        res.status(500).json(error);
      })
  })
  .post((req, res) => {
    const note = req.body;
    Note.create(note)
      .then(note => {
        res.status(201).json(note)
      })
      .catch(error => {
        res.status(500).json(error);
      })
  })

router.route('/:id')
  .get((req, res) => {
    const { id } = req.params;
    Note.findById(id)
      .then(note => {
        if (note === null) {
          return res.status(404).json({error: 'Note with specified ID does not exist'})
        }
        res.status(200).json(note);
      })
      .catch(error => {
        res.status(500).json(error)
      })
  })
  .put((req, res) => {
    const { id } = req.params;
    Note.findByIdAndUpdate(id, req.body)
      .then(note => {
        if (note === null) {
          return res.status(404).json({msg: 'Note with specified ID does not exist'})
        }
        res.status(200).json(req.body)
      })
      .catch(error => {
        res.status(500).json(error);
      })
  })
  .delete((req, res) => {
    const { id } = req.params;
    Note.findByIdAndRemove(id)
      .then(note => {
        if (note === null) {
          return res.status(404).json({error: "Note with specified ID does not exist"})
        }
        res.status(200).json(note);
      })
      .catch(error => {
        res.status(500).json(error);
      })
  })


module.exports = router;