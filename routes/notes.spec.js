const mongoose = require('mongoose');
const Note = require('../schemas/note');

describe('Notes', () => {

  const note = new Note({
    title: 'NOTE TITLE',
    content: 'NOTE CONTENT',
  });

  beforeAll(() => {
    return mongoose
      .connect('mongodb://caroline:lambda1@ds141611.mlab.com:41611/backend-week')
      .then(() => console.log('\n=== connected to TEST DB ==='))
      .catch(err => {
        console.log('Error connecting to test db, instance is not running');
      })
  });

  afterAll(() => {
    return mongoose
      .disconnect()
      .then(() => console.log('\n=== disconnected from TEST DB ==='));
  });

  afterEach(async () => {
    await Note.remove();
  })

  it('should run the tests', () => {})

  it('should successfully create a Note model', () => {
    expect(note._id).toBeTruthy();
    expect(note.title).toBe('NOTE TITLE');
    expect(note.content).toBe('NOTE CONTENT');
  })

  it('should save the note to the db', async () => {
    await Note.create(note);
  })
}) 