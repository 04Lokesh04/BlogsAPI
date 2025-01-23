const Comment = require('../models/Comment');
const Blog = require('../models/Blog');

exports.addComment = async (req, res) => {
    const { content } = req.body;
    const { blogId } = req.params;

    try {
        const blog = await Blog.findById(blogId);
        if (!blog) return res.status(404).json({ error: 'Blog not found' });

        const comment = new Comment({
            content,
            blog: blogId,
            author: req.user.id,
        });
        await comment.save();

        res.status(201).json({ comment });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.deleteComment = async (req, res) => {
    const { id } = req.params;

    try {
        const comment = await Comment.findById(id);
        if (!comment) return res.status(404).json({ error: 'Comment not found' });
        if (comment.author.toString() !== req.user.id) {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        await comment.deleteOne();
        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
