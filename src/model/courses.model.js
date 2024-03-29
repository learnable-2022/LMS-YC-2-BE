const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const Admin = require('./admin.model')
const { ENUM } = require('../config/constant.config')

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

  week: {
    type: Number,
    trim: true,
    default: ENUM.WEEK
  },

  resources: {
    type: String,
    trim: true,
    default: ENUM.RESOURCES
  },

  track: {
    type: String,
    trim: true,
    default: ENUM.PATH,
  },

  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Admin,
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

