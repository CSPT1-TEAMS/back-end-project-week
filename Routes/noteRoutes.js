const router = require('express').Router();
const Note = require('../Models/noteModel');
const User = require('../Models/userModel');

router.get('/notes', (req, res) => {
    Note.find()
        .then(foundNotes => {
            res.status(200).json(foundNotes);
        })
        .catch(err => {
            res.status(500).json(err);
        })
})
    .post('/notes/new', async (req, res) => {

        const user = await User.findById(/* user token */)
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


module.exports = router;