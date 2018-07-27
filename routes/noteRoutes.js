const server = require('express').Router();
const User = require('../models/User');
const Note = require('../models/Note');
const { restricted } = require('./auth');

// need to change code so that only those notes
// associated with logged in user are displayed
// server.get('/', restricted, (req, res) => {
//     console.log(req.batman);
//     Note.find()
//         .then(notes => {
//             res.status(200).json(notes);
//         })
//         .catch(err => {
//             res
//                 .status(500)
//                 .json({ message: 'There was a problem getting your notes', error: err });
//         });
// });

server.get('/', restricted, (req, res) => {
    User.findOne({username: req.batman.username})
      .then(user => {
          res.status(200).json(user.notes);
      })
      .catch(err => {
          res.status(500).json({message: 'There was a problem getting your notes', error: err.message});
      })
})

server.get('/:id', (req, res) => {
    const { id } = req.params;

    Note.findById(id)
        .then(note => {
            if (note !== null) {
                res.status(200).json(note);
            } else {
                res.status(404).json({ message: "That not could not be found." })
            }
        })
        .catch(err => {
            res
                .status(500)
                .json({ message: 'There was a problem getting your note', error: err });
        });
});

// restricted middleware intercepts request first
// has access to req and res
// function stack in this case is '/create', restricted, and callback (req, res)...
server.post('/create', restricted, (req, res) => {
    // console.log(req.batman);
    // so it looks for the user first
    User.findOne({ username: req.batman.username })
        .then(user => {
            console.log(user);
            if (user) {
                const newNote = {title: req.body.title, content: req.body.content, postedBy: user._id};
                Note.create(newNote)
                    .then(note => {
                        user.notes.push(note);
                        user.save();
                        res.status(201).json(note);
                    })
                    .catch(err => {
                        res
                            .status(500)
                            .json({ message: 'Error saving note to the DB', error: err });
                    });
            }
        })
        .catch(err => {
            console.log(err);
        })
});

server.put('/edit/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    // //All we care about is the game title and id. Don't worry about genre or date.
    // if (!changes.title || !id) {
    //     return res.status(422).json({ error: 'Must Provide a title && Id' });
    // }

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
                .json({ message: 'There was a problem finding that note', error: err });
        });
});

server.delete('/delete/:id', (req, res) => {
    const { id } = req.params;

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
