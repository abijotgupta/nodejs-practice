//Using Promises create API

// 1: AFTER 2S get student roll no
// 2: AFTER 2S get student name and age
// 3: AFTER 2S get student gender



//pass executor func in promise constructor having 2 args, resolve & reject
//Ist way of using Promise (By using obj)
const promise = new Promise( (resolve, reject) => {
    setTimeout( () => {
        console.log('API getting roll no');
        let roll_no = [1,2,3,4,5];
        if(roll_no) {
            resolve(roll_no);
        } else{
            reject('Error while communicating with API');
        }
    }, 2000);
});

//2nd way of using Promise (By return Promise)
const getBioData = (roll_no) => {
    return new Promise( (resolve, reject) => {
        setTimeout((roll_no) => {
            console.log('API getting name and age');
            const bioData = {
                name : "Abijot Gupta",
                age : 21,
            }
            resolve(bioData);
        }, 2000, roll_no);
    });
};

promise.then( (rollno) => {
    console.log(rollno);
    return getBioData(rollno[2]);
}).then( (biodata) => {
    console.log(biodata)
}).catch( (err) => {
    console.log(err);
})

//OR 

// promise.then( (rollno) => {
//     console.log(rollno);

//     getBioData(rollno[2]).then( (biodata) => {
//         console.log(biodata)
//     });
// }).catch( (err) => {
//     console.log(err);
// })


// const check = false;
// const promise = new Promise((resolve, reject) => {
//     if(check) {
//         resolve('Done');
//     } else{
//         reject('Undone');
//     }
// });
// // console.log(promise);
// promise
// .then((res) => {
//     console.log(res);
// })
// .catch((rej) => {
//     console.log('Undone');
// })




// const users = require('./users.json');
// const movies = require('./movies.json');
// const reviews = require('./reviews.json');

// const getMovie = (id) => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             const movie = movies.find((movie) => movie.id === id);
//             if(movie) {
//                 resolve(movie);
//             } else {
//                 reject('Movie Not Found');
//             }
//         }, 1000);
//     }); 
// };

// getMovie(9)
//     .then (movie => {
//         console.log(movie);
//     })
//     .catch (err => {
//         console.log(err);
//     })


