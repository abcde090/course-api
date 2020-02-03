const Course = require('../models/course');
const Service = require('./service');

class CourseService extends Service {
  async removeTeacherRefs(teacherId) {
    return this.Model.updateMany(
      {
        teachers: teacherId
      },
      {
        $pull: {
          teachers: teacherId
        }
      }
    );
  }

  async removeStudentRefs(studentId) {
    return this.Model.updateMany(
      {
        students: studentId
      },
      {
        $pull: {
          students: studentId
        }
      }
    );
  }

  // this is for students/:id/courses/:code
  async removeSingleStudentRef(studentId, courseId) {
    return this.Model.findByIdAndUpdate(courseId, {
      $pull: {
        students: studentId
      }
    });
  }

  // this is for teachers/:id/courses/:code
  async removeSingleTeacherRef(teacherId, courseId) {
    return this.Model.findByIdAndUpdate(courseId, {
      $pull: {
        teachers: teacherId
      }
    });
  }
}

module.exports = new CourseService(Course);
