// var obj = {
//     name: 'Aimee'
// };
// var stringObj = JSON.stringify(obj);
// console.log(typeof stringObj);
// console.log(stringObj);

// var personStr = '{"name": "Andrew", "age" : 25}';
// var person = JSON.parse(personStr);
// console.log(person);

const fs = require('fs');
const winston = require('winston');
const logger = winston.createLogger({
    level: 'info',
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'combined.log' })
    ]
});

var originalNote = {
    title: 'a title',
    body: 'the body'
};

var originalNoteStr = JSON.stringify(originalNote);
logger.log('info', 'writing notes file');
fs.writeFileSync('notes.json', originalNoteStr);

var noteStr = fs.readFileSync('notes.json');
var note = JSON.parse(noteStr);
console.log(typeof note);
console.log(note.title);