const express = require('express');

// create an express app

const app = express();

// register view engine
app.set('view engine', 'ejs') //app.set() is a method for configuring the web app
// app.set('views', 'myViewsFolder') this can be used when your views are in a different folder other than the default expected place which is a 'views' directory in your project.
// listen for requests

app.listen(3000);

// note: once a route handler sends a response to the browser, code execution does not continue for the other route handlers
app.get('/', (req, res) => {
    // res.send('<p>home page </p>');  send() method automatically deduces the Content-Type header and also the status codes(in most cases)
    // res.sendFile('./views/index.html', { root: __dirname });
    const blogs = [
        {title: 'Fry some eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'Cook some chicken', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'Drink some soup', snippet: 'Lorem ipsum dolor sit amet consectetur'}
    ];
    res.render('index', { title: 'Home', blogs });
});

app.get('/about', (req, res) => {
    // res.send('<p>About page </p>');
    // res.sendFile('./views/about.html', { root: __dirname });
    res.render('about', { title: 'About' });
});

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a new Blog' });
});

// redirects
app.get('/about-us', (req, res) => {
    res.redirect('/about');
});

// 404 page
// app.use() is a method that runs everytime a request comes in(every kind of request, including post requests). But it will not run if code execution does not reach it(that is, if there has already been a match with an existing route handler)
// it's position is important, it must always be placed below all your route handlers that go to actual pages.
// also, express does not automatically add status codes when we use app.use(), so we have to set it manually, we can do this by using the res.status() method and pass in an integer representing the status code
// note: res.status() returns the response (res) object. This allows us to perform method chaining. res.status(200) sets the status code.
app.use((req, res) => {
    // res.status(404).sendFile('./views/404.html', { root: __dirname });
    res.status(404).render('404', { title: '404' });
})