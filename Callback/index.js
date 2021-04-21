// const fun1 = () => {
//     setTimeout(() => {
//         console.log(`Fun1 called`);
//         //fun2();
//     } ,3000); 
// }

// const fun2 = () => {
//     console.log(`Fun2 called`);
// }

// fun1();
// fun2();


const istPerson = (friend, callback) => {
    console.log(`I'm busy right now. I'm talking to ${friend}. I will call you later.`);
    callback();
}

const secPerson = () => {
    console.log(`See!!! I called back you.`);
}

istPerson(`Ram`, secPerson);