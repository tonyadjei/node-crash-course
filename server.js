//to create a server, we need to require the http core node module.
const http = require('http');
const fs = require('fs');
const _ = require('lodash');

const server = http.createServer((req, res) => {
    // console.log(req.url, req.method);

    // lodash

    const num = _.random(0, 20);
    console.log(num);

    const greet = _.once(() => {
        console.log('hello');
    });

    greet();
    greet();

    //set header content type
    res.setHeader('Content-Type', 'text/html');

    let path = './views/';
    switch(req.url){
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html'
            res.statusCode = 200;
            break;
        case '/about-blah':
            res.statusCode = 301; //this signifies that the resource has been permanently moved.
            res.setHeader('Location', '/about'); //we make a redirect: when the browser sees the 'Location' header, it navigates to that path(which is the value of the location header). But we still gave it a response.
            res.end(); //so we have to end our response.
            break;
        default:
            path += '404.html';
            res.statusCode = 404;
            break;
    }


    //send an html file
    fs.readFile(path, (err, data) => {
        if(err){
            console.log(err)
            res.end();
        } else {
            //res.write(data);
            res.end(data); //we can do this if we are writing a single response 
        }
    })
});

server.listen(3000, 'localhost', () => { //the callback function fires when we begin listening
    console.log('listening for requests on port 3000'); 
})