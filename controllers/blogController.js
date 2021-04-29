const Blog = require('../models/blog');
// blog_index, blog_details, blog_create_get, blog_create_post, blog_delete

const blog_index = (req, res) => {
    Blog.find().sort({ createdAt: -1 }) // we tag along a sort() method to sort the documents. We are sorting by the 'createdAt' property, the -1 means descending order.
    .then((result) => {
        res.render('blogs/index', { title: 'All Blogs', blogs: result })
    })
    .catch((err) => {
        console.log(err);
    });
}

const blog_details = (req, res) => {
    const id = req.params.id; // here, we are saying that look at the url, take whatever comes after '/blogs/' and store it in a property called 'id' inside the req object's params property.(req.params) 
    // console.log(id);
    Blog.findById(id)
        .then((result) => {
            res.render('blogs/details', { blog: result, title: 'Blog Details' });
        })
        .catch((err) => {
            console.log(err);
        });
}

const blog_create_get = (req, res) => {
    res.render('blogs/create', { title: 'Create a new Blog' });
}

const blog_create_post = (req, res) => {
    const blog = new Blog(req.body);
    blog.save()
        .then((result) => {
            res.redirect('/blogs');
        })
        .catch((err) => {
            console.log(err);
        });
}

const blog_delete = (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then((result) => {
            res.json({ redirect: '/blogs' });
        })
        .catch((err) => {
            console.log(err);
        })
}

module.exports = {
    blog_index, blog_details, blog_create_get, blog_create_post, blog_delete
}