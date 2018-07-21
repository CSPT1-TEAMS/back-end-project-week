const router = require('express').Router();

const Notes = require('./note.js');
//get all

let noteId = Notes.length

router.route('/notes')
    .get((req, res) => {
        Notes.find()
        .then( notes => {
            res.status(200).json(notes)
        })
        .catch( err => {
            res.status(500).json({error: 'error getting notes'})
        })
    })
    .post((req, res) => {
        const { title, content } = req.body;
        const noteData = req.body;
        const note = new Note(noteData);
        note.save()
            .then(note => {
                res.status(201).json(note);
            })
            .catch(err => {
                res.status(500).json({error: 'error getting notes'})
            })





    })
router.route('/note/:id')
    .get((req, res) => {
        const { id } = req.params.id
        const note = Notes.filter(note => note.id.toString() === id)[0]
        res.status(200).json(note)
    })


router.route('/notes')
    .post((req, res) => {
      const { title, content } = req.body;
      const newNote = {id: noteId, title, content };
      Notes.push(newNote)
      noteId++;
      res.status(201).json(notes)
    });

router.route('/note/:id')
    .put((req, res) => {
        const {title, content, id} = req.body;
        let note = Notes.filter(note => noteId === id);
        Notes.splice(id, 1, {id: Number(id), title, content})
        res.status(201).json(Notes);

    //need to change this if I do logged in users and access
    })

router.route('/note/:id')
    .delete((req, res) => {
        const { id } = req.params;
        const foundNote = Notes.find(note => note.id == id);
    if(foundNote) {
        const noteremoved = {...foundNote}
        Notes = Notes.filter(note => note.id != id);
        res.status(200).json({ noteremoved });
    }
    })

    //app.delete('/note/:id')


module.exports = router;