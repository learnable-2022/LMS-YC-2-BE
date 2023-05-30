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
  email: Joi.string().required(),
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
module.exports = { validateUserInputs, validateAdminInputs, validateUserLoginInputs }



