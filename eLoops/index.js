const {pbkdf2} = require('crypto');
const {createServer} = require('http');
const port = 5060;
const start = Date.now();

const hash = () => {
    pbkdf2('Password', 'SecretString', 10000, 1000, 'sha256', () => {
        console.log('Hash', Date.now() - start);
    });
};

const lis = ()=> {
    createServer().listen(port, ()=> {
        console.log(`Listening to port number ${port}`, Date.now()-start);
    });
};

hash();
hash();
hash();
hash();
lis();

//any sync statement will execute first 
console.log('Hii!!! i executed first at ' , Date.now() - start);