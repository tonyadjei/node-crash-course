const express = require('express');

// using a 3rd party middleware: morgan is a logger middleware for node.js
const morgan = require('morgan');

const mongoose = require('mongoose');

// create an express app

const app = express();

// const Blog = require('./models/blog');

const blogRoutes = require('./routes/blogRoutes')

// connect to mongodb
const dbURI = 'mongodb+srv://tonygrace:Tonyadjei2402@nodejs.4fw0l.mongodb.net/nodeJS?retryWrites=true&w=majority';
// mongoose.connect is async and returns a promise
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));


// register view engine
app.set('view engine', 'ejs') //app.set() is a method for configuring the web app
// app.set('views', 'myViewsFolder') this can be used when your views are in a different folder other than the default expected place which is a 'views' directory in your project.

// listen for requests
// app.listen(3000); // now that we are connecting to the MongoDB database with mongoose, we want to only listen for requests when we know that we are connected to the database.(this is done on line 18)

// using morgan(3rd party middleware package installed from npm)
app.use(morgan('dev'));

// there is also middleware that comes built-in with express.
// an example is the static middleware. when we have static files like css or images, we cannot access them in the front-end(the browser will not have access to them)
//this is because, our server(node/express) protects all our files and prevents the browser from accessing any file at all
// we therefore have to indicate which static files we want to server to the browser or make public to the browser for access.
//to do this, we use the static middleware that comes with express

app.use(express.static('public')); // here, we indicate which folder we are making public and that will contain our static files. the browser has access to all files inside this folder, e.g. 'localhost:3000/styles.css' will display the css file to the browser

// built-in express middleware for parsing url encoded data from forms into an object on the req object
app.use(express.urlencoded({ extended: true }));

// mongoose and MongoDB sandbox routes (these routes were just to practice with how we can use our Blog model to interact with MonogoDB)

app.get('/add-blog', (req, res) => {
    // create a blog instance from the Blog model we have imported and save it to the database. NB. mongoose will automatically find the corresponding collection to save it to
    const blog = new Blog({
        title: 'cook my fav cake',
        snippet: 'about my new blog',
        body: 'more about my new blog'
    });
    blog.save()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err);
        });

});

// retrieve all blogs from the database
app.get('/all-blogs', (req, res) => {
    // here, we use a static method on the Blog model to get all the documents in the blogs collection
    Blog.find()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
});

// finding a single blog in the blogs collection

app.get('/single-blog', (req, res) => {
    Blog.findById('608a9120aaf961111bcc1412') // the id's which are automatically generated for us by MonogDB for each document in a collection is not a string. Its type is an ' Object id'. However, mongoose automatically parses this into strings and also from strings into the Object id for us.
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
});

// app.use((req, res, next) => {
//     console.log('new request made:');
//     console.log('host: ', req.hostname);
//     console.log('path: ', req.path);
//     console.log('method: ', req.method);
    // next(); express does not know where to go next after a middleware has been executed, hence we have to tell express to continue down with a function that we get access to.
// });

// app.use((req, res, next) => {
//     console.log('in the next middleware');
//     next();
// })

// note: once a route handler sends a response to the browser, code execution does not continue for the other route handlers
app.get('/', (req, res) => {
    // res.send('<p>home page </p>');  send() method automatically deduces the Content-Type header and also the status codes(in most cases)
    // res.sendFile('./views/index.html', { root: __dirname });
    // const blogs = [
    //     {title: 'Fry some eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    //     {title: 'Cook some chicken', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    //     {title: 'Drink some soup', snippet: 'Lorem ipsum dolor sit amet consectetur'}
    // ];
    // res.render('index', { title: 'Home', blogs });
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    // res.send('<p>About page </p>');
    // res.sendFile('./views/about.html', { root: __dirname });
    res.render('about', { title: 'About' });
});

//blog routes
app.use('/blogs', blogRoutes); // we now use our express router that we created for all our blog routes, and also, we are saying that that express router should only be used for routes that begin with '/blogs'


// redirects
app.get('/about-us', (req, res) => {
    res.redirect('/about');
});

// 404 page
// app.use() is a method that runs everytime a request comes in(every kind of request, including post requests). But it will not run if code execution does not reach it(that is, if there has already been a match with an existing route handler)
//this is because, anytime a response is sent, code execution will not continue down to the other middleware if a response was sent by that previous middleware.(middleware is any code that runs(on the server) between receiving a request and sending a response).
// it's position is important, it must always be placed below all your route handlers that go to actual pages.
// also, express does not automatically add status codes when we use app.use(), so we have to set it manually, we can do this by using the res.status() method and pass in an integer representing the status code
// note: res.status() returns the response (res) object. This allows us to perform method chaining. res.status(200) sets the status code.
app.use((req, res) => {
    // res.status(404).sendFile('./views/404.html', { root: __dirname });
    res.status(404).render('404', { title: '404' });
})