const mongoose = require('mongoose');
const Note = require('../models/Note');

describe('The Note Model', () => {
    beforeAll(() => {
        return mongoose
            .connect('mongodb://SeanValdivia:littleloki911@ds141671.mlab.com:41671/lambda-notes-sean')
            .then(() => console.log('\n=== connected to TEST DB ==='))
            .catch(err => {
                console.log('error connecting to TEST database');
            });
    });

    afterAll(() => {
        return mongoose
            .disconnect()
            .then(() => console.log('\n=== disconnected from TEST DB ==='));
    });

    afterEach(() => {
        return Note.remove()
    })

    it('runs the tests', () => { });
    it('contains a title field', async () => {
        const titleNote = {
            title: 'Note 1',
            content: 'Note 1 content'
        }

        const newNote = await Note.create(titleNote);
        expect(newNote.title).toBe('Note 1')
    })
    it('contains gives a content field', async () => {
        const contentNote = {
            title: 'Note Title',
            content: 'Note Content'
        }
      
        const newNote = await Note.create(contentNote);
        expect(newNote.content).toBe('Note Content')
    })

});