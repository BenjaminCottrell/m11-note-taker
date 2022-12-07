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


  
modules.exports = notes;