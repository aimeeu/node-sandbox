const notes = require('../notes.js');
const assert = require('assert');
const expect = require('chai').expect;

describe('addNote()', function () {
    it('should write a note to a file', function() {
        var title = 'test title';
        var body = 'test body';
        notes.addNote(title, body);

        var note = notes.getNote(title);

        expect(note.title).to.be.equal(title);
        expect(note.body).to.be.equal(body);
    });
});