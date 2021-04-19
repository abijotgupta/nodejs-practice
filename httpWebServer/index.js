const http = require('http');
const port = 5050;

const server = http.createServer((req, res) => {
    //res.end("Hello from server");
    switch(req.url) {
        case'/': res.end(`
            <html>
                <head>
                    <title>Homepage</title>
                </head>
                <body>
                    <h1>This is Homepage of my app.</h1>
                </body>
            </html>
        `);
        break;
    
        case'/admin': res.end(`Welcome to the Admin page`);
        break;

        case'/user': res.end(`Welcome to the User page`);
        break;

        default:
            res.end(`Error!! Page not found`);

      };
    
});

server.listen(port, "127.0.0.1", () => {
    console.log(`Server is listening to port no ${port}`);
});