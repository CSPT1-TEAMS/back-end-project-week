const server = require('express').Router();
const Note = require('../Models/Note');

server.get('/', (req, res) => {
  Note.find()
    .then(notes => {
      res.status(200).json(notes);
    })
    .catch(error => {
      res.status(500).json({message: "Problem retrieving notes from database.", error: error});
    });
});

server.get('/:id', (req, res) => {
  const {id} = req.params;
  Note.findById(id)
    .then(note => {
      if (note !== null) {
        res.status(200).json(note);
      } else {
        res.status(404).json({message: "Data not found!"});
      }
    })
    .catch(error => {
      res.status(500).json({message: "Error retrieving from database", error: error});
    });
});

server.post('/create', (req, res) => {
  Note.create(req.body)
    .then(note => {
      res.status(201).json(note);
    })
    .catch(error => {
      res.status(500).json({message: "error saving to db", error: error});
    });
});

server.put('/edit/:id', (req, res) => {
  const {id} = req.params;
  const changes = req.body;

  if (!changes.title || !id) {
    return res.status(422).json({error: "Provide TITLE and ID!"});
  }

  const options = {
    new: true,
  };

  Note.findByIdAndUpdate(id, changes, options)
    .then(note => {
      if (note) {
        res.status(200).json(note);
      } else {
        res.status(404).json({messsage: 'Not found in db'});
      }
    })
    .catch(error => {
      res.status(500).json({message: 'error finding note', error: error});
    });
});

server.delete('/delete/:id', (req, res) => {
  const {id} = req.params;
  if(!id) {
    res.status(422).json({message: 'ID needed!'});
  } else {
    Note.findByIdAndRemove(id) 
      .then(note => {
        if (note) {
          res.status(204).end();
        } else {
          res.status(404).json({message: 'not found in db'});
        }
      })
      .catch(error => {
        res.status(500).json(error);
      });
  }
});


module.exports = server;