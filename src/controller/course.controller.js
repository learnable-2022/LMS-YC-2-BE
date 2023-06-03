const courseService = require('../services/courses.services')
const adminService = require('../services/admin.services')

class CourseController{
    // create a course by an admin
    async createCourses (req, res){
        const  {title, description, video} = req.body
        const adminId = req.params.id
        try{
            const admin = await adminService.getAdmin({
                _id:adminId
             });
             if(admin !== null){
                return res.status(200).send({
                    message: 'You can create a course' , success: true
                })
             }
             if (!admin){
                return res.status(404).send({
                    message: 'You are not eligible to create a course' , success: false
                })
             }
             
             const course = await courseService.createCourse({ 
                title: title, 
                description: description,
                video: video,
                admin: admin._id
             });
            return res.status(200).send({
                message: 'Course created successfully', course, success: true 
            })
        }catch{
            return res.status(500).send({
                message: 'An Error occured: ' + error.message,
                success: false
            })
        }
    }
    
    // get all lessons associated with a particular course
    async getAllCourses(req, res){
        const { title } = req.params;
        try {
            const courses = await courseService.getCourse ({title})
            if (!courses){
                return res.status(404).send({
                    message: 'Courses not found' || err.message, success: false
                })
            }else{
                return res.status(200).send({
                    message: 'Courses found successfully', courses, success: true
                })
            } 

        }catch{
            return res.status(500).send({
                message: 'An Error occured: ' + error.message,
                success: false
            })
        }

    }

    // get a single course
    async getSingleCourse(req, res){
        const { titleId} = req.params;
        try{
            const course = await courseService.getCourse({ 
            _id: titleId, 
        })
        if (!course) {
            return res.status(404).send({ 
                message: 'Course not found' || err.message, success: false 
            });
       }else{
           // returns true if a particular lesson for a course
           return res.status(200).send({
            message: 'Course fetched successfully', success: true 
        });
       }

      }catch{
        return res.status(500).send({
            message: 'An Error occured: ' + error.message,
            success: false
        })
      }
    }

    // edit a single course by id
    async editCourse(req, res){
            const {id}= req.params
            const {title, video} = req.body
            try{
                const course = await courseService.getCourse({ 
                    _id: id
                });
                 if (!course) {
                     return res.status(404).json({
                         message: 'Course not found' || err.message, success: false 
                        });
                }

                // update the course details to the current one
                const updatedCourse = await courseService.editCourseById({
                    title: title, 
                    videoUrl: video
                })
                return res.status(200).send({
                    message: 'Course updated successfully', success: true, data:updatedCourse
                });      
            }catch(error){
                return res.status(500).send({
                    message: 'An Error occured: ' + error.message,
                    success: false
                })
            }
    }

    
    // delete a single course by admin
    async deleteCourse(req, res){
        const {id} = req.params
        // check if a course exist before deleting
        try{
            const existingCourse = await courseService.getCourse({
                _id: id  
            })
            if (!existingCourse){
                return res.status(404).send({
                    message: 'No course found' , success: false
                })
    
            }
            
            // delete course if the above condition was met
            await courseService.deleteCourseById(id)
                return res.status(200).send({
                    message: 'Course deleted',
                    success: true,
                })

        }catch(error){
            return res.status(500).send({
                message: 'An Error occured: ' + error.message,
                success: false
            })
        }

    }
}
module.exports = new CourseController()