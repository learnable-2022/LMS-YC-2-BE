const mongoose = require('mongoose')
const Schema = mongoose.Schema
;

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
  duration: {
    type: String,
    required: true
  },
  difficultyLevel: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    required: true
  },
  lessons: [{
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
    content: {
      type: String,
      required: true
    },
    videoUrl: {
      type: String,
      required: true
    }
  }],
  
},{ timestamps: true });


const Course = mongoose.model('Course', courseSchema);
module.exports = Course;

