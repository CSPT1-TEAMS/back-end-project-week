const PORT = process.env.PORT || 5000
const express = require('express');
//const morgan = require('morgan');

const User = require('./user.js');
const Note = require('./note.js');

const server = express();
server.use(express.json());
//server.use(morgan('combined'));

server
  .get('/', (req, res) => res.json({ hello: 'world'}))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

server.post('/api/notes', (req, res) => {
  Note.create(req.body)
    .then(note => {
      res.status(201).json(note);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: 'Error saving data to the DB', error: err });
    });
});

server.get('/api/notes', (req, res) => {
  Note.find({})
    .then(notes => {
      res.status(200).json(notes);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: 'Something really bad happened', error: err });
    });
});

server.put('/api/notes/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  if (!changes.title || !id) {
    return res.status(422).json({ error: 'Must Provide a title && Id' });
  }

  const options = {
    new: true,
  };

  Note.findByIdAndUpdate(id, changes, options)
    .then(note => {
      if (note) {
        res.status(200).json(note);
      } else {
        res.status(404).json({ message: 'Note not found' });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: 'Something really bad happened', error: err });
    });
});

server.delete('/api/notes/:id', (req, res) => {
  const { id } = req.params;
  console.log('Here is the ID:', id)

  if (!id) {
    res.status(422).json({ message: 'You need to give me an ID' });
  } else {
    Note.findByIdAndRemove(id)
      .then(note => {
        if (note) {
          res.status(204).end();
        } else {
          res.status(404).json({ message: 'Note not found' });
        }
      })
      .catch(err => res.status(500).json(err));
  }
});

module.exports = server;
