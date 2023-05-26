const Joi = require('joi')
const userSchema = Joi.object({
  parent_name: Joi.string().required(),
  email: Joi.string().required(),
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
  email_address: Joi.string().required(),
  password: Joi.string().required()

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
      console.log("user login validated successfully");
      next()
    }
  } catch (err) {
    console.error(err)
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
      console.log("User signup validated successfully");
      next()
    }
  } catch (err) {
    console.error(err)
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
      console.log("Admin Validated successfully");
      next()
    }
  } catch (err) {
    console.error(err)

  }
}
module.exports = { validateUserInputs, validateAdminInputs, validateUserLoginInputs }



