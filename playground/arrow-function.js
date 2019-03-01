var square = (x) => {
  var result = x * x;
  return result;
};
console.log(square(9));

var square2 = (x) => x * x;
console.log(square2(9));

var square3 = x => x * x;
console.log(square3(9));

var user = {
    name: 'Andrew',
    sayHi: () => {
        console.log(arguments); // this will print global arguments
        console.log(`Hi ${user.name}`);
        console.log(`Hi ${this.name}`); //this will be undefined
    },
    sayHiAlt () {
        console.log(arguments); // this prints arguments to the method
        console.log(`Hi alt ${this.name}`);
    }

};

user.sayHi();
user.sayHiAlt();

user.sayHi(1,2,3);
user.sayHiAlt(1,2,3);