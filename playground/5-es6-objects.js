//object property shorthand

const name = 'aimee';
const userAge = 51;

// const user = {
//     name: name,
//     age: userAge,
//     location: 'Milwaukee'
// }

// shorthand syntax
const user = {
    name,
    age: userAge,
    location: 'Milwaukee'
}

console.log(user);

//Object destructuring
const product = {
    label: 'red notebook',
    price: 3.00,
    stock: 201,
    salePrice: undefined
}

// const label = product.label;
// const stock = product.stock;
//console.log(label, stock);

//destructuring syntax example 1
// const {label, stock} = product;
//
// console.log(label, stock);

//destructuring syntax example 2
//rating default will only be used if product.rating is undefined
// const {label:productLabel, stock, rating = 5} = product;
// console.log(productLabel);
// console.log(stock);
// console.log(rating);

//destructuring with function arguments
const transaction = (type, { label, stock}) => {
    console.log(type, label, stock);
};

transaction('order', product);