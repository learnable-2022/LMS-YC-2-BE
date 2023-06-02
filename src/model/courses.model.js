const mongoose = require('mongoose')
const Schema = mongoose.Schema
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
    video: {
      type: String,
      required: true
    }
},{ timestamps: true });


const Course = mongoose.model('Course', courseSchema);
module.exports = Course;

