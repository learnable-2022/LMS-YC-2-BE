const courseService = require('../services/courses.services')
const cloudinary = require('../lib/cloudinary')
const dotenv = require('dotenv')
dotenv.config();
const getAdminId = require('../lib/adminId')

// const storage = require('../lib/multer')

class CourseController {
    // create a course by an admin
    async createCourses(req, res) {
        try {
            // calling the getAdminId function
            const adminId = await getAdminId(req);

            if (!adminId) {
                return res.status(401).json({
                    message: 'Unauthorized Access',
                    success: false
                });
            }
            const file = req.file

            // Implementing Cloudinary
            const uploadResult = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload(
                    file.path,
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
                cloudinary_id: uploadResult.public_id,
                admin: adminId,
                ...req.body,
                url: uploadResult.url,
            });
            await newCourse.populate("admin", "email")
            return res.status(200).json({
                message: 'Video uploaded and course created successfully',
                newCourse,
                success: true
            });
        } catch (error) {
            return res.status(500).json({
                message: 'An error occurred: ' + error,
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
                    message: 'Courses not found',
                    success: false
                })
            } else {
                return res.status(200).send({
                    message: 'Courses found successfully', courses,
                    success: true
                })
            }

        } catch (error) {
            return res.status(500).send({
                message: 'An Error occured: ' + error,
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
                    message: 'Course not found',
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

        } catch (error) {
            return res.status(500).send({
                message: 'An Error occured: ' + error,
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
                    message: 'Course not found',
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
                message: 'An Error occured: ' + error,
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
                message: 'An Error occured: ' + error,
                success: false
            })
        }

    }
}
module.exports = new CourseController()