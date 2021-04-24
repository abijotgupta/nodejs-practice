const callbackFunc = (delay) => {
    console.log(`Hello after ${delay} seconds`);
};

setTimeout(callbackFunc, 4000, 4);
setTimeout(callbackFunc, 8000, 8);


setInterval( () => {
    console.log('It will print after every 3 seconds');
}, 3000);




let counter = 0;
const intervalId = setInterval( () => {
    console.log('HELLO WORLD');
    counter += 1;

    if(counter === 5) {
        console.log('Done');
        clearInterval(intervalId);
    }
}, 1000);