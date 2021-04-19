// const tutorial = require('./tutorial');

// console.log(tutorial);
// console.log(tutorial.sum(1,1));
// console.log(tutorial.PI);
// console.log(new tutorial.Abijot());



//The Events Module and EventEmitter Class
// const EventEmitter = require('events');
// const eventEmitter = new EventEmitter();

// eventEmitter.on('tutorial', () => {
//     console.log('Tutorial event has occured');
// });

// eventEmitter.emit('tutorial');

// eventEmitter.on('tutorial', (num1, num2) => {
//     console.log(num1 + num2);
// });

// eventEmitter.emit('tutorial', 1, 2);

// class Person extends EventEmitter {
//     constructor(name) {
//         super();
//         this._name = name;
//     }
//     get name() {
//         return this._name;
//     }
// }

// let abi = new Person('Abijot');
// let Ram = new Person('Ram');
// Ram.on('name', () => {
//     console.log('My name is ' + Ram.name);
// });



// abi.on('name' , () => {
//     console.log('My name is ' + abi.name);
// });

// Ram.emit('name');
// abi.emit('name');


// ReadLine Module
const readline = require('readline');
const rl = readline.createInterface({input : process.stdin,
                          output : process.stdout});

let num1 = Math.floor((Math.random() * 10) + 1);
let num2 = Math.floor((Math.random() * 10) + 1);
let answer = num1 + num2;
rl.question(`What is ${ num1 } + ${ num2 }? \n`, 
    (userInput) => {
    if(userInput.trim() == answer) {
        rl.close();
    } else{
        rl.setPrompt('Incorrect Response.....Please try again!!\n');
        rl.prompt();
        rl.on('line', (userInput) => {
            if(userInput.trim() == answer) {
                rl.close();
            } else {
                rl.setPrompt(`Your answer of ${ userInput } is incorrect....Try Again!!!\n`);
                rl.prompt();
            }
                
        });
    }
});

rl.on('close', () => {
    console.log("Correct!!");
});