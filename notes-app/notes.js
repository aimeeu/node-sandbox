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
      saveNotes(notes);
      return note;
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
  var notes = fetchNotesFileAsArray();
  let modNotes = notes.filter(note => note.title === title);
  return modNotes[0];
};

var removeNote = (title) => {
  console.log('remove note', title);
  var notes = fetchNotesFileAsArray();
  let modNotes = notes.filter(note => note.title !== title);
  saveNotes(modNotes);
};

var getAll = () => {
  console.log('get all notes');
  return fetchNotesFileAsArray();
};

var fetchNotesFileAsArray = () => {
  try {
    var notesStr = fs.readFileSync('notes-data.json');
    return JSON.parse(notesStr);
  }catch (e) {
    return [];
  }
};

var saveNotes = (notes) => {
  try {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
  }catch(e){
    console.log("unable to save notes");
    console.log(e);
  }
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

var logNote = (note) => {
  console.log('-----');
  console.log(`Title: ${note.title}`);
  console.log(`Body: ${note.body}`);
}

module.exports = {
  addNote,
  getAll,
  getNote,
  removeNote,
  logNote
};

