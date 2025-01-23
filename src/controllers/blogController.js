const Blog = require('../models/Blog');

exports.createBlog = async (req, res) => {
    const { title, content } = req.body;
    try {
        const blog = new Blog({
            title,
            content,
            author: req.user.id,
        });
        await blog.save();
        res.status(201).json({ blog });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().populate('author', 'name email');
        res.status(200).json({ blogs });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.getBlogById = async (req, res) => {
    const { id } = req.params;
    try {
        const blog = await Blog.findById(id).populate('author', 'name email');
        if (!blog) return res.status(404).json({ error: 'Blog not found' });
        res.status(200).json({ blog });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.updateBlog = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    try {
        const blog = await Blog.findById(id);
        if (!blog) return res.status(404).json({ error: 'Blog not found' });

        if (req.user.role === 'Editor' && blog.assignedTo?.toString() !== req.user.id) {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        blog.title = title || blog.title;
        blog.content = content || blog.content;
        await blog.save();

        res.status(200).json({ blog });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.deleteBlog = async (req, res) => {
    const { id } = req.params;
    try {
        const blog = await Blog.findById(id);
        if (!blog) return res.status(404).json({ error: 'Blog not found' });

        if (req.user.role === 'Editor' && blog.assignedTo?.toString() !== req.user.id) {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        await blog.remove();
        res.status(200).json({ message: 'Blog deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.assignEditor = async (req, res) => {
    const { id } = req.params; // Blog ID
    const { editorId } = req.body; // Editor ID
    try {
        const blog = await Blog.findById(id);
        if (!blog) return res.status(404).json({ error: 'Blog not found' });

        blog.assignedTo = editorId;
        await blog.save();

        res.status(200).json({ message: 'Editor assigned successfully', blog });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
