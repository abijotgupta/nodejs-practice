// const abi = "Abijot Gupta";
// console.log(abi);

//Working with File System
const fs = require('fs');


//creating a new file

//fs.writeFileSync('read.txt', "Hi Abijot!!");
//fs.writeFileSync('read.txt', " Gupta");
//fs.appendFileSync('read.txt', " How are You?");



//readind a data from file

//const buf_data = fs.readFileSync('read.txt');
//console.log(buf_data);

//Node js include an additional datatype called Buffer
//which is not available in Browser's JS
//Buffer is mainly used to used to store binary data,
//while reading from a file or receiving packets over the internet.

// org_data = buf_data.toString();
// console.log(org_data);

 
//rename a file
fs.renameSync('read.txt', 'readWrite.txt');