const express = require('express');
const { protect } = require('../middlewares/authMiddleware');
const { addComment, deleteComment } = require('../controllers/commentController');

const router = express.Router();

router.post('/:blogId', protect, addComment);
router.delete('/:id', protect, deleteComment);

module.exports = router;