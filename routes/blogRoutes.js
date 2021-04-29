const express = require('express');
const blogController = require('../controllers/blogController');
// create new instance of express router object
const router = express.Router(); // this is like a mini-app but it works inside a main app. we are attaching our route handlers to this 'router' object now.

router.get('/', blogController.blog_index);

router.post('/', (req, res) => {
    // console.log(req.body);
    const blog = new Blog(req.body);
    blog.save()
        .then((result) => {
            res.redirect('/blogs'); //here we can redirect the user because the request is coming from a web form. we can also redirect requests made in the browser's addrses bar. But in node.js, we cannot make a redirect when we receive an ajax request.(a request done on the front-end with javascript(with fetch api))
        })
        .catch((err) => {
            console.log(err);
        });
});
// the route handler below was not working because it was below another get handler that used a route parameter. so it made this one behave as if it was coming in as a route parameter. always check to see that your handler is not being stopped by a route parameter.
router.get('/create', blogController.blog_create_get);   

router.get('/:id', blogController.blog_details);

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then(result => {
            // here, we cannot redirect the user to another page like the blogs page because the request was done on the front-end with javascrip(an ajax request) and was not done with a web form or anything like that
            res.json({ redirect: '/blogs' }) // we can send JSON data to the browser using res.json(), res.json() takes in a javascript object, but it will later parse it into JSON format
        })
        .catch(err => console.log(err));
})




module.exports = router;