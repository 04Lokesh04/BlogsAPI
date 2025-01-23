const express = require('express');
const {
    createBlog,
    getAllBlogs,
    getBlogById,
    updateBlog,
    deleteBlog,
    assignEditor,
} = require('../controllers/blogController');
const { protect, restrictTo } = require('../middlewares/authMiddleware');

const router = express.Router();

router.route('/')
    .post(protect, restrictTo('Admin', 'Editor'), createBlog)
    .get(getAllBlogs);

router.route('/:id')
    .get(getBlogById)
    .patch(protect, restrictTo('Admin', 'Editor'), updateBlog)
    .delete(protect, restrictTo('Admin', 'Editor'), deleteBlog);

router.route('/:id/assign')
  .patch(protect, restrictTo('Admin'), assignEditor);

module.exports = router;