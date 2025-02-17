const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: String,
    content: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
});

module.exports = mongoose.model('Blog', blogSchema);