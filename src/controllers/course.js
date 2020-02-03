const courseService = require('../services/course');
// const studentService = require('../services/student');
// const teacherService = require('../services/teacher');

const {
  convertUpdateBody,
  convertQuery,
  formatResponse
} = require('../utils/helper');

async function getAllCourses(req, res) {
  const total = await courseService.countAll();
  const { pagination, sort, search } = convertQuery(req.query, total);

  const courses = await courseService.getAll(pagination, sort, search);

  return formatResponse(res, { data: courses, pagination });
}

async function getCourse(req, res) {
  const { code } = req.params;
  const course = await courseService.getOneWithPopulate(code, {
    teachers: 'firstName lastName',
    students: 'firstName lastName'
  });
  if (!course) {
    return formatResponse(res, 'Course not found', 404);
  }

  return formatResponse(res, course);
}

async function addCourse(req, res) {
  const { name, code, description } = req.body;
  const course = await courseService.createOne({
    name,
    description,
    _id: code
  });
  return formatResponse(res, course, 201);
}

async function updateCourse(req, res) {
  const { code } = req.params;
  const keys = ['name', 'description'];
  const course = await courseService.updateOne(
    code,
    convertUpdateBody(req.body, keys)
  );
  if (!course) {
    return formatResponse(res, 'Course not found', 404);
  }

  return formatResponse(res, course);
}

async function deleteCourse(req, res) {
  const { code } = req.params;
  const course = await courseService.deleteOne(code);
  if (!course) {
    return formatResponse(res, 'Course not found', 404);
  }

  // clean the refs
  // await studentService.removeCourseRefs(course._id);
  // await teacherService.removeCourseRefs(course._id);

  return formatResponse(res, course);
}

module.exports = {
  getAllCourses,
  addCourse,
  getCourse,
  updateCourse,
  deleteCourse
};
