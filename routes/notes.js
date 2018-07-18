const express = require('express');
const Note = require('../models/note');

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
  .post()

router.route('/:id')
  .get()
  .put()
  .delete()


module.exports = router;