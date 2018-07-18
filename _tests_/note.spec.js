const mongoose = require('mongoose');
const Note = require('../models/note');

describe('Note Model', () => {
  const note = new Note({
    title: 'Note 1',
    content: 'this is a note',
  });

  beforeAll(() => {
    return mongoose
      .connect('mongodb://alexbotello:passfortestdb1@ds239911.mlab.com:39911/lambda-notes-testdb')
      .then(() => {})
      .catch(err => {
        console.log('Error connectiong to TEST db, instance is not running');
      })
  });

  afterAll(() => {
    return mongoose
      .disconnect()
      .then(() => console.log('Successfully disconnected from TEST db'));
  });

  afterEach(async () => {
    await Note.remove();
  })

  it('should run the tests', () => {})

  it('should successfully create a Note model', () => {
    expect(note._id).toBeTruthy();
    expect(note.title).toBe('Note 1');
    expect(note.content).toBe('this is a note');
  })

  it('should save the note to the database', async () => {
    await Note.create(note);
  })
})