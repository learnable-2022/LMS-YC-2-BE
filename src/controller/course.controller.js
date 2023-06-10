const courseService = require('../services/courses.services')
const adminService = require('../services/admin.services')
const Course = require('../model/courses.model');
const cloudinary = require('../lib/cloudinary')
// const storage = require('../lib/multer')

class CourseController {
    // create a course by an admin
    async createCourses(req, res) {
        const { title } = req.body;
        try {
            // Implementing Cloudinary
            const uploadResult = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload(
                    req.file.path,
                    {
                        resource_type: 'video',
                        folder: 'video'
                    },
                    (err, result) => {
                        if (err) {
                            console.log(err);
                            return reject(err);
                        }
                        resolve(result);
                    }
                );
            });

            const newCourse = await courseService.createCourse({
                title: title,
                ...req.body,
                url: uploadResult.url,
                cloudinary_id: uploadResult.public_id,                
            });

            return res.status(200).json({
                message: 'Video uploaded and course created successfully',
                newCourse,
                success: true
            });
        } catch (error) {
            return res.status(500).json({
                message: 'An error occurred: ' + error.message,
                success: false
            });
        }
    }


    // get all lessons associated with a particular course
    async fetchAllCourses(req, res) {
        try {
            const courses = await courseService.getAllCourses()
            if (!courses) {
                return res.status(404).send({
                    message: 'Courses not found' || err.message,
                    success: false
                })
            } else {
                return res.status(200).send({
                    message: 'Courses found successfully', courses,
                    success: true
                })
            }

        } catch {
            return res.status(500).send({
                message: 'An Error occured: ' + error.message,
                success: false
            })
        }

    }

    // get a single course
    async getSingleCourse(req, res) {
        const { id } = req.params;
        try {
            const course = await courseService.getCourse({
                _id: id
            })
            if (!course) {
                return res.status(404).send({
                    message: 'Course not found' || err.message,
                    success: false
                });
            } else {
                // returns true if a particular lesson for a course
                return res.status(200).send({
                    message: 'Course fetched successfully',
                    course,
                    success: true
                });
            }

        } catch {
            return res.status(500).send({
                message: 'An Error occured: ' + error.message,
                success: false
            })
        }
    }

    // edit a single course by id
    async editCourse(req, res) {
        try {
            const { id } = req.params
            const { title, description, video } = req.body
            const course = await courseService.getCourse({ _id: id });

            if (!course) {
                return res.status(404).json({
                    message: 'Course not found' || err.message,
                    success: false
                });
            }

            // update the course details to the current one
            const updatedCourse = await courseService.editCourseById(id, {

                title: title,
                description: description,
                video: video
            })
            return res.status(200).send({
                message: 'Course updated successfully',
                success: true,
                data: updatedCourse
            });
        } catch (error) {
            return res.status(500).send({
                message: 'An Error occured: ' + error.message,
                success: false
            })
        }
    }


    // delete a single course by admin
    async deleteCourse(req, res) {
        // check if a course exist before deleting
        try {
            const { id } = req.params
            const existingCourse = await courseService.getCourse({
                _id: id
            })
            if (!existingCourse) {
                return res.status(404).send({
                    message: 'No course found',
                    success: false
                })

            }

            // delete course if the above condition was met
            await courseService.deleteCourseById(id)
            return res.status(200).send({
                message: 'Course deleted',
                success: true,
            })

        } catch (error) {
            return res.status(500).send({
                message: 'An Error occured: ' + error.message,
                success: false
            })
        }

    }
}
module.exports = new CourseController()