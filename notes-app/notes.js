console.log('Starting notes.js');

const fs = require('fs');
const winston = require('winston');

var addNote = (title, body) => {
  console.log('adding note', title, body);

  var note = {
    title,
    body
  };

  var notes = fetchNotesFileAsArray();

    if (isNotDuplicateTitle(title, notes)) {
      notes.push(note);
      fs.writeFileSync('notes-data.json', JSON.stringify(notes));
    } else {
      console.log('duplicate title -- note not added');
    }

  // if (! isDuplicateTitle(title, notes)) {
  //   notes.push(note);
  //   fs.writeFileSync('notes-data.json', JSON.stringify(notes));
  // } else {
  //   console.log('duplicate title - note not added');
  // }
};

var getNote = (title) => {
  console.log('getting note', title);
};

var removeNote = (title) => {
  console.log('remove note', title);
};

var getAll = () => {
  console.log('get all notes');
};

var fetchNotesFileAsArray = () => {
  var notes = null;
  try {
    var notesStr = fs.readFileSync('notes-data.json');
    notes = JSON.parse(notesStr);
  }catch (e) {
    notes = [];
  }

  return notes;
};

var isNotDuplicateTitle = (title, notes) => {
  let dupes = notes.filter((note) => note.title === title);
  return dupes.length === 0;
};

var isDuplicateTitle = (title, notes) => {
  for (var i = 0; i < notes.length; i++) {
    var note = notes[i];
    if (note.title === title){
      return true;
    }
  }
  return false;
};

module.exports = {
  addNote,
  getAll,
  getNote,
  removeNote
};

