//always signular version of routes

const mongoose = require('mongoose')
const Book = require('./book')
const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
})

// Pre runs before anything when remove is called
authorSchema.pre('remove', function (next) {
  Book.find({ author: this.id }, (err, books) => {
    if (err) {
      next(err) // pass error to next func
    } else if (books.length > 0) {
      // do not want to delete author because author has books
      next(new Error('This author has a book still'))
    } else {
      // tells mongoose that its ok to move on to next function
      next()
    }
  })
})

module.exports = mongoose.model('Author', authorSchema)
