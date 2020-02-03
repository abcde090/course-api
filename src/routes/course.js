const router = require('express').Router();
const {
  getAllCourses,
  addCourse,
  getCourse,
  updateCourse,
  deleteCourse
} = require('../controllers/course');

router.get('/', getAllCourses);
router.get('/:code', getCourse);
router.put('/:code', updateCourse);
router.post('/', addCourse);
router.delete('/:code', deleteCourse);

module.exports = router;
