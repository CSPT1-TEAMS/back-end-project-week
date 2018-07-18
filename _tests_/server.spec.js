const request = require('supertest');
const server = require('../server');
const mongoose = require('mongoose');
const Note = require('../models/note');

describe('Server API', () => {
  beforeAll(async () => {
    await mongoose
      .connect('mongodb://alexbotello:passforapp1@ds239911.mlab.com:39911/heroku_m948f5xs')
      .then(() => {})
      .catch(err => {
        console.log('error connecting to TEST db')
      })
  });

  beforeEach(async () => {
    await Note.create({
      title: 'Note 1',
      content: 'This is a note',
    });
    await Note.create({
        title: 'Note 2',
        content: 'This is another note',
      });
  })

  afterAll(async () => {
    await mongoose
      .disconnect()
      .then(() => console.log('TEST db was successfully disconnected'));
  });

  afterEach(async () => {
    await Note.remove();
  });

  it('should run the tests', () => {});

  describe('GET /notes', () => {
    it('should return a success status of 200', async () => {
      await request(server)
        .get('/api/notes')
        .expect(200)
    })

    it('should return a list of notes', async () => {
      const response = await request(server).get('/api/notes')
      expect(response.body).toHaveLength(2);
      expect(response.body[0]).toMatchObject({title: 'Note 1', content: 'This is a note'})
    })
  });

  describe('GET /notes/:id', () => {
    it('should return a success status of 200', async () => {
      const response = await request(server).get('/api/notes')
      const note = response.body[0];
      await request(server)
        .get(`api/notes/${note._id}`)
        .expect(200);
    })

    it('should return a note', async() => {
      const response = await request(server).get('/api/notes')
      const note = response.body[0];
      const newResponse = await request(server).get(`api/notes/${note._id}`)
      expect(newResponse.body).toMatchObject({title: 'Note 1', content: 'This is a note'})
    })

    it('should return 404 if note is not found', async() => {
      const id = '5b4a435988a2ca366e40aa8'
      await request(server)
       .get(`/api/notes/${note._id}`)
       .expect(404)
    })
  })

  describe('POST /notes', () => {
    const note = {
      title: 'Note 5',
      content: 'Check out this note'
    }

    const badNote = {
      title: 'Note 6'
    }
    it('should return a success status of 201', async() => {
      await request(server)
        .post('/api/notes')
        .send(note)
        .expect(201);
    })

    it('should return the Note that was posted', async() => {
      const response = await request(server)
        .post('/api/notes')
        .send(note);
      expect(response.body).toMatchObject(note);
    })

    it('should return a failure status of 500 if invalid data is given', async() => {
      await request(server)
        .post('/api/notes')
        .send(badNote)
        .expect(500);
    })
  });

  describe('PUT', () => {

  });

  describe('DELETE', () => {

  });
});