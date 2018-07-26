const router = require('express').Router();
const Note = require('../Models/noteModel');
const User = require('../Models/userModel');
const { verifyCred } = require('../_config/authFunction');

router.get('/notes', (req, res) => {
    Note.find()
        .then(foundNotes => {
            res.status(200).json(foundNotes);
        })
        .catch(err => {
            res.status(500).json(err);
        })
})
    .post('/notes/new', verifyCred, async (req, res) => {
        const { decodedPayload } = req;

        const user = await User.findById(decodedPayload.sub)
        const createdNote = await Note.create(req.body)
        user.notes.push(createdNote)
        await user.save()
        res.status(201).json(createdNote)

            .then(async createdNote => {
                res.status(201).json(createdNote);
            })
            .catch(err => {
                res.status(500).json(err);
            })
    })

    .get('/notes/:id', (req,res) => {
        const { id } = req.params;

            Note.findById(id)
            .then(foundNote => {
                if(foundNote === null) {
                    return res.status(404).json({ Error: "No such note exists." });
                } else {
                    res.status(200).json(foundNote);
                }
            })
            .catch(err => {
                res.status(500).json(err);
            })
    })

    .put('/notes/edit/:id', (req, res) => {
        const { id } = req.params;
        const { title, content } = req.body;

        Note.findByIdAndUpdate(id, req.body)
            .then(note => {
                if(note === null) {
                    return res.status(404).json({ Error: "No such note exists to edit." });
                } else {
                    res.status(200).json(note);
                }
            })
            .catch(err => {
                res.status(500).json(err);
            })
    })

    .delete('/notes/remove/:id', (req, res) => {
        const { id } = req.params;
        Note.findByIdAndRemove(id)
            .then(note => {
                if(note === null) {
                    return res.status(404).json({ Error: "No such note exists to delete." });
                } else {
                    res.status(200).json(note);
                }
            })
            .catch(err => {
                res.status(500).json(err);
            })
    })


module.exports = router;