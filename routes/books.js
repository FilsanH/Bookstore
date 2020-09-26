const express = require('express')
const router = express.Router()
const Book = require('../models/book')
const Author = require('../models/author')

//All Books Route
router.get('/', async (req, res) => {
  res.send('All Books')
})

//New Book route
router.get('/new', (req, res) => {
  const book = new Book() //create new book then the forms fills it out and the details will then be saved in the post route of the form
  //use selection on find to input spefic authors
  Author.find({})
    .then((authors) => {
      // finds all books
      res.render('books/new', {
        authors: authors,
        book: book,
      })
    })
    .catch((err) => {
      res.redirect('/books')
    })
})

//Create Book route
router.post('/', async (req, res) => {
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    publishDate: new Date(req.nody.publishDate),
    pageCount: req.body.pageCount,
    description: req.body.description,
  })
})

module.exports = router
