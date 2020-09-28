const express = require('express')
const book = require('../models/book')
const Book = require('../models/book')
const router = express.Router()

router.get('/', (req, res) => {
  let books
  Book.find()
    .sort({ createAt: 'desc' })
    .limit(10)
    .exec((err, books) => {
      if (err) {
        books = []
      }
      res.render('index', { books: books })
    }) // sort in descending order of created date
}) // root of application

module.exports = router
