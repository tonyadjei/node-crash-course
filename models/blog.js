const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create blog schema to define the structure of each blog document
const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, { timestamps: true });

// create the blog model based on the blog schema to communicate with the 'blogs' database collection
// the name of the model should be the singular form of the name of the collection in the database. That means that our collection names should be plural
const Blog = mongoose.model('Blog', blogSchema);

// export the Blog model so that we can use it in other parts of our projects.
module.exports = Blog;