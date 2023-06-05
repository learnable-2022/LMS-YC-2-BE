const Course = require('../model/courses.model');

class courseService {

    async createCourse(newCourse) {
        // create a course
        return await Course.create(newCourse)
    }

    // get all courses
    async getAllCourses() {
        return await Course.find()
    }

    // get a single course 
    async getCourse(filter) {
        return await Course.findOne(filter);
    }

    // edit a course by id
    async editCourseById(id, data) {
        return await Course.findByIdAndUpdate({ _id: id }, data);
    }

    // delete a course by id
    async deleteCourseById(id) {
        return await Course.findByIdAndDelete({ _id: id });
    }
}
module.exports = new courseService();
