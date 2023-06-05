const courseService = require('../services/courses.services')
const adminService = require('../services/admin.services')

class CourseController {
    // create a course by an admin
    async createCourses(req, res) {
        const { title, description, video } = req.body
        try {
            const admin = req.session.passport.user.id
            
            
            
            //implementing cloudinary 

            // try {
            //     const uploadResult = await cloudinary.uploader.upload(req.body.videoUrl, {
            //         resource_type: 'video'
            //     });
            //     const course = await courseService.createCourse({
            //         title: title,
            //         description: description,
            //         video: uploadResult.secure_url,
            //         admin: admin._id
            //     });
            // } catch (error) {
            //     return res.status(404).send({
            //         message: 'video creation unsuccessfully',
            //         success: false
            //     })
            // }
            const course = await courseService.createCourse({
                title: title,
                description: description,
                video: video,
                admin: admin
            });
            return res.status(200).send({
                message: 'Course created successfully', course, success: true
            })
        } catch {
            return res.status(500).send({
                message: 'An Error occured: ' + error.message,
                success: false
            })
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
                description:description,
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