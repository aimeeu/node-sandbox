console.log('Starting app.js');

const fs = require('fs');
const os = require('os');
const util = require('util');
const _ = require('lodash');
const notes = require('./notes.js');

// console.log(_.isString(true));
// console.log(_.isString('Andrew'));
// console.log(_.isString(35));

var filteredArray = _.uniq(['mike', 'aimee', 1, 1, 2, 3, 'aimee', 3]);
console.log(filteredArray);


// var user = os.userInfo();
// console.log('user= ' + util.inspect(user, false, null));
//
// console.log('Result: ', notes.add(10,-12));



// fs.appendFile('greetings.txt', `Hello ${user.username}!`, function (err) {
//     if (err) {
//         console.log('Unable to write to log');
//     }
// });
