
var asyncAdd = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (typeof a === 'number' && typeof b === 'number'){
                resolve(a+b);
            } else {
                reject('Arguments must be numbers');
            }
        },1500);
    });
};

asyncAdd(50,100).then((result) => {
    console.log('Result:', result);
}, (errorMessage) => {
    console.log('Error: ', errorMessage);
});

// promise is something that needs to be done; it is either resolved successfully or rejected with error
// once a promise is resolved or rejected, execution returns
// a promise is pending until resolve or reject is executed
// var somePromise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         //resolve('Hey it worked');
//         reject('rejected!');
//     },2500);
// });
//
// somePromise.then((message) => {
//     console.log('success', message);
// }, (errorMessage) => {
//     console.log('Error: ', errorMessage);
// });

