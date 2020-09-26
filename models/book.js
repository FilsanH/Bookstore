//always signular version of routes

const mongoose = require('mongoose')
const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  publishDate: {
    type: Date,
    required: true,
  },
  pageCount: {
    type: Number,
    require: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now, // dont have to maually set this
  },
  coverImageName: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Author',
  },
})

module.exports = mongoose.model('Book', bookSchema)
