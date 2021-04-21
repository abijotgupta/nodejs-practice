//Using Promises create API

// 1: AFTER 2S get student roll no
// 2: AFTER 2S get student name and age
// 3: AFTER 2S get student gender



//pass executor func in promise constructor having 2 args, resolve & reject
//Ist way of using Promise (By using obj)
//promise produce
// const promise = new Promise( (resolve, reject) => {
//     setTimeout( () => {
//         console.log('API getting roll no');
//         let roll_no = [1,2,3,4,5];
//         if(roll_no) {
//             resolve(roll_no);
//         } else{
//             reject('Error while communicating with API');
//         }
//     }, 2000);
// });

//2nd way of using Promise (By return Promise)
// const getBioData = (roll_no) => {
//     return new Promise( (resolve, reject) => {
//         setTimeout((roll_no) => {
//             console.log('API getting name and age');
//             const bioData = {
//                 name : "Abijot Gupta",
//                 age : 21,
//             }
//             resolve(bioData);
//         }, 2000, roll_no);
//     });
// };


//promise consume/receiving values
// promise.then( (rollno) => {
//     console.log(rollno);
//     return getBioData(rollno[2]);
// }).then( (biodata) => {
//     console.log(biodata)
// }).catch( (err) => {
//     console.log(err);
// })

// OR 

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




const users = require('./users.json');
const movies = require('./movies.json');
const reviews = require('./reviews.json');

const getMovie = (id) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const movie = movies.find((movie) => movie.id === id);
            if(movie) {
                resolve(movie);
            } else {
                reject('Movie Not Found');
            }
        }, 2000);
    }); 
};

const getUser = (name) => {
    return new Promise( (resolve, reject) => {
        setTimeout( () => {
            const user = users.find((user) => user.name === name);
            if(user) {
                resolve(user);
            } else {
                reject('User Not Found');
            }
        }, 2000);
    });
};

const getReview = (movieId) => {
    return new Promise( (resolve, reject) => {
        setTimeout( () => {
            const review = reviews.find((review) => review.movie_id === movieId);
            if(review) {
                resolve(review);
            } else {
                reject('Reviews Not Found');
            }
        }, 2000);
    });
};

getMovie(3)
    .then ( (movie) => {
       return getReview(movie.id);
    })
    .then ( (review) => {
        return getUser(review.reviewer);
    })
    .then ( (user) => {
        console.log(user);
    })
    .catch ( (err) => {
        console.log(err);
    })


