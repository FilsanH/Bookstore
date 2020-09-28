//always signular version of routes
const path = require('path')
const mongoose = require('mongoose')
const coverImageBasePath = 'uploads/bookCover' //folder to store images
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

//do this so that you can acced coverimagepath as though it is a property of book. use virtual schema when want to make a new property from existsing properties
bookSchema.virtual('coverImagePath').get(function () {
  if (this.coverImageName != null) {
    return path.join('/', coverImageBasePath)
  }
})

module.exports = mongoose.model('Book', bookSchema)
module.exports.coverImageBasePath = coverImageBasePath
