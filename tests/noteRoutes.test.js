const request = require('supertest');
const server = require('../server');
const Note = require('../models/Note')
const mongoose = require('mongoose');

const options = {
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    useNewUrlParser: true
}

describe('noteRoutes', () => {
    beforeAll(() => {
        return mongoose
            .connect('mongodb://SeanValdivia:littleloki911@ds141671.mlab.com:41671/lambda-notes-sean')
            .then(() => console.log('\n=== connected to TEST DB ==='))
            .catch(err => {
                console.log('error connecting to TEST database', err);
            });
    });

    afterAll(() => {
        return mongoose
            .disconnect()
            .then(() => console.log('\n=== disconnected from TEST DB ==='));
    });

    afterEach(() => {
        return Note.remove();
    })

    it('has a GET / endpoint', async () => {
        await request(server)
            .get('/')
            .expect(200)
    })

    it('has a GET / endpoint that returns 200', async () => {
        await request(server)
            .get('/notes')
            expect(200)
    })

    it('has a POST / endpoint that returns 201', async () => {
        const titleNote = {
            title: 'Note 1',
            content: 'Note 1 content'
        }

    await request(server).post('/notes/create')
      .send(titleNote)
        expect(201)
    })

    it('returns the note object after posting', async () => {
        const titleNote = {
            title: 'Note 1',
            content: 'Note 1 content'
        }

        const response = await request(server).post('/notes/create')
            .send(titleNote)
            expect(response.body.title).toBe(titleNote.title)
    })
    
    it('should return an error for an incomplete note', async () => {
        const incomplete = {
            username: 'Sean'
        }
        await request(server)
            .post('/notes/create')
            .send(incomplete)
        expect(500)
        expect({ message: 'Error saving note to the DB' })
    })

    it('deletes a note from the database', async () => {
        const deletedNote = await Note.create({
            title: 'sean',
            content: 'SeanValdivia'
        })

        await request(server)
            .delete(`/notes/delete/${deletedNote._id}`)
        expect(204)
    })

    it('returns an error when deleting a non-existant user', async () => {
        const deletedNote = await Note.create({
            title: 'sean',
            content: 'SeanValdivia'
        })

        const response = await request(server)
            .delete(`/notes/delete/${deletedNote._id}`)
            console.log(response.statusCode)
        expect(204);

        await request(server)
            .delete(`/notes/delete/${deletedNote._id}`)
        expect(404)
    })
})
