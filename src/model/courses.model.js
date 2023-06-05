const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const Admin = require('./admin.model')

const courseSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },

  description: {
    type: String,
    required: true,
    trim: true
  },

  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Admin, // Reference the Admin model
    required: true
  },

  cloudinary_id: {
    type: String,
    required: true
  },

  url: {
    type: String,
    required: true
  }
},

  { timestamps: true });

const Course = mongoose.model('course', courseSchema);
module.exports = Course;

