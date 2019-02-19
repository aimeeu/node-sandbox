console.log('Starting app.js');

const fs = require('fs');
const os = require('os');
const util = require('util');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

var titleOptions = {
    describe: 'Title of the note',
    demand: true,
    alias: 't'
};
var bodyOptions = {
    describe: 'Body of the note',
    demand: true,
    alias: 'b'
};

const argv = yargs
    .command('add', 'Add a new note', {
        title: titleOptions,
        body: bodyOptions
    })
    .command('remove', 'Remove an existing note', {
        title: titleOptions
    })
    .command('read', 'Read an existing note', {
        title: titleOptions
    })
    .command('list', 'List all notes')
    .help()
    .argv;
var command = argv._[0];
console.log('Yargs: ', argv);
console.log('Command: ', command);

if (command === 'add') {
    var note = notes.addNote(argv.title, argv.body);
    // if (_.isUndefined(note) || _.isNull(note)) {
    //     console.log("note not added");
    // }else {
    //     console.log("Note added with title: ", note.title);
    // }
    if (note){
        console.log("Note created");
        notes.logNote(note);
    } else {
        console.log("Note not added; duplicate title");
    }
} else if (command === 'list') {
    var allNotes = notes.getAll();
    console.log(`Printing ${allNotes.length} note(s)`);
    allNotes.forEach((note) => notes.logNote(note));
} else if (command === 'read') {
    var noteRead = notes.getNote(argv.title);
    if (noteRead){
        console.log("Note");
        notes.logNote(noteRead);
    } else {
        console.log("no note with title ", argv.title);
    }
} else if (command === 'remove') {
    var noteRemoved = notes.removeNote(argv.title);
    var msg = noteRemoved ? 'Note was removed' : 'Note not found';
} else {
    console.log('command not recognized');
}
