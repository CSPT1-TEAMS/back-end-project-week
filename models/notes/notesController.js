const router = require('express').Router();

const Notes = require('./note.js');
//get all

let notId = Notes.length

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

    })
    //app.get(/notes)
    //app.put('./note/:id)
    //app.post('/notes')
    //app.delete('/note/:id')


module.exports = router;