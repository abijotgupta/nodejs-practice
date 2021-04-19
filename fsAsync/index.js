const fs = require('fs');

// fs.writeFile('read.txt', 'Today is awesome day :) ' , (err) => {
//     console.log("Completed");
//     console.log(err);
// });


// fs.appendFile('read.txt', '  Hii Abijot Gupta!!!', (err) => {
//     console.log("Appended");
// });


fs.readFile('read.txt', 'utf-8', (err, data) => {
    console.log(data);
});