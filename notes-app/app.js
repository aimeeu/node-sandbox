console.log('Starting app.js');

const fs = require('fs');
const os = require('os');
const util = require('util');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const argv = yargs.argv;
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
        console.log("Note added with title: ", note.title);
    } else {
        console.log("note not added");
    }

} else if (command === 'list') {
    var myNotes = notes.getAll();
    console.log(myNotes);
} else if (command === 'read') {
    var note = notes.getNote(argv.title);
    if (note){
        console.log("Note fetched: ", note.title, note.body);
    } else {
        console.log("no note with title ", argv.title);
    }
} else if (command === 'remove') {
    var noteRemoved = notes.removeNote(argv.title);
    var msg = noteRemoved ? 'Note was removed' : 'Note not found';
} else {
    console.log('command not recognized');
}
