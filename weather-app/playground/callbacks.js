var getUser = (userId, callback) => {
    var user = {
        id: userId,
        name: 'Bubba'
    };
    setTimeout(() => {
        callback(user);
    }, 3000);

};

// the callback function expects a user returned from the getUser function
getUser(1, (userObj) => {
    console.log(userObj);
});