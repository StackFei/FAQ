let fs = require('fs');
let Promise = require('./promise');

// console.log(Promise.defer())

function read(url) {
    let defer = Promise.defer();
    fs.readFile(url, 'utf8', (err, data) => {
        if (err) defer.reject(err);
        defer.resolve(data);
    });
    return defer.promise;
}

read('./doc/test.txt').then(data => {
    console.log(data)
})