const express = require('express');
const Blog = require('../models/blog')
const blogController = require('../controllers/blogController');

// create new instance of express router object
const router = express.Router(); // this is like a mini-app but it works inside a main app. we are attaching our route handlers to this 'router' object now.

router.get('/', blogController.blog_index);

router.post('/', blogController.blog_create_post);
// the route handler below was not working because it was below another get handler that used a route parameter. so it made this one behave as if it was coming in as a route parameter. always check to see that your handler is not being stopped by a route parameter.
router.get('/create', blogController.blog_create_get);   

router.get('/:id', blogController.blog_details);

router.delete('/:id', blogController.blog_delete);




module.exports = router;