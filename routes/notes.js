const notes = require('express').Router();
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');

// Get route to retrieve all the notes
notes.get('/', (req, res) => {
    readFromFile('.db/db.json')
    .then((data) => {
        res.json(JSON.parse(data))
    });
});

// Post route
notes.post('/', (req, res) => {
    const { title, text } = req.body;
  
    if (title && text) {
      let id = Date.now();
      // add a note with title, text and id
      const newNote = {
        title,
        text,
        id
      };

      readAndAppend(newNote, './db/db.json');
      res.json(`Note added`);
    } else {
      res.error('Error adding a Note');
    }
  });     

// Delete route for a note
notes.delete('/:id', (req, res) => {
    const noteId = req.params.id;
    readFromFile('./db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        // Create a new array containing all notes except the note that matches the id in the route
        const result = json.filter((note) => note.id != noteId);
  
        // Save the array back to the file system
        writeToFile('.db/db.json', result);
  
        // Respond to the DELETE request
        res.json(`Your note ${noteId} is now deleted`);
      });
  });

// export notes to be required in index  
module.exports = notes;