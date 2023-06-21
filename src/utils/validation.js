const Joi = require('joi')
const userSchema = Joi.object({
  parent_name: Joi.string().required(),
  email: Joi.string().required(),
  gender: Joi.string().required(),
  track: Joi.string(),
  register: Joi.string(),
  course: Joi.string(),
  quiz: Joi.number(),
  watchedVideos: Joi.array(),
  progress: Joi.string(),
  badges: Joi.number(),
  relationship: Joi.string().required(),
  child_name: Joi.string().required(),
  child_class: Joi.string().required(),
  DOB: Joi.string().required(),
  password: Joi.string().required()

})

const loginUserSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required()
})

const adminSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required()

})

const courseSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  week: Joi.number(),
  resources: Joi.string(),
  track: Joi.string(),
  file: Joi.object(),
})

const validateUserLoginInputs = (req, res, next) => {
  try {
    const validateInput = loginUserSchema.validate(req.body)

    if (validateInput.error) {
      return res.status(404).send({
        success: false,
        status: 'failed',
        errormessage: validateInput.error.details[0].message
      })
    } else {

      next()
    }
  } catch (err) {
    res.status(500).send(err)
  }
}

const validateUserInputs = (req, res, next) => {
  try {
    const validateInput = userSchema.validate(req.body)

    if (validateInput.error) {
      return res.status(404).send({
        success: false,
        status: 'failed',
        errormessage: validateInput.error.details[0].message
      })
    } else {
      next()
    }
  } catch (err) {
    res.status(500).send(err)
  }
}

const validateAdminInputs = (req, res, next) => {
  try {
    const validateInput = adminSchema.validate(req.body)

    if (validateInput.error) {
      return res.status(404).send({
        success: false,
        status: 'failed',
        errormessage: validateInput.error.details[0].message
      })
    } else {
      next()
    }
  } catch (err) {
    res.status(500).send(err)
  }
}

const validateCourseInputs = (req, res, next) => {
  try {
    const validateInput = courseSchema.validate(req.body)

    if (validateInput.error) {
      console.log("Validation failed")
      return res.status(404).send({
        success: false,
        status: 'failed',
        errormessage: validateInput.error.details[0].message,
      })
    } else {
      next()
    }
  } catch (err) {
    res.status(500).send(err)
  }
}
module.exports = { validateUserInputs, validateAdminInputs, validateUserLoginInputs, validateCourseInputs }



