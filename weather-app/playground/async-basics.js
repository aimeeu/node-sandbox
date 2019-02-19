console.log('starting app');

setTimeout(() => {
    // this will get fired after timeout is up
    console.log("inside of setTimeout callback; 2 second delay");
}, 2000);


setTimeout( () => {
    console.log("setTimeout with zero delay");
}, 0);

console.log('finishing app');