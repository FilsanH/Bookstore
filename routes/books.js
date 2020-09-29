const express = require('express')
const router = express.Router()
const fs = require('fs')
const Book = require('../models/book')
const Author = require('../models/author')
const path = require('path')
const uploadPath = path.join('public', Book.coverImageBasePath)
const imageMineTypes = ['image/jpeg', 'image/png', 'image/gif']
// const multer = require('multer')
const book = require('../models/book')
// const upload = multer({
//   dest: uploadPath,
//   fileFilter: (req, file, callback) => {
//     callback(null, imageMineTypes.includes(file.mimetype))
//     //filter files to accept
//   },
// })

//All Books
router.get('/', (req, res) => {
  //make it so that the loaded books change according to the title search/ change dynamically
  let query = Book.find()
  if (req.query.title != null && req.query.title != '') {
    query = query.regex('title', new RegExp(req.query.title, 'i'))
  }
  if (req.query.publishedBefore != null && req.query.publishedBefore != '') {
    query = query.lte('pubishDate', req.query.publishedBefore)
  }
  if (req.query.publishedAfter != null && req.query.publishedAfter != '') {
    query = query.lte('pubishDate', req.query.publishedAfter)
  }

  query
    .exec()
    .then((books) => {
      console.log(books)
      res.render('books/index', {
        books: books,
        searchOptions: req.query,
      })
    })
    .catch((err) => {
      res.redirect('/')
    })
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
//tells multer that you uploading a single file of the name 'cover'
router.post('/', (req, res) => {
  console.log(req.file)

  const fileName = req.file != null ? req.file.filename : null
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    publishDate: new Date(req.body.publishDate),
    pageCount: req.body.pageCount,
    // coverImageName: fileName,
    description: req.body.description,
  })
  saveCover(book, req.body.cover)
  book
    .save()
    .then((newBook) => {
      res.redirect('books')
    })
    .catch((err) => {
      console.log(err)
      // if (book.coverImageName) {
      //   removeBookcover(book.coverImageName)
      // }
      Author.find({})
        .then((authors) => {
          // finds all books
          // console.log('HERERERR')
          res.render('books/new', {
            authors: authors,
            book: book,
            errorMessage: 'Error Creating Book',
          })
        })
        .catch((err) => {
          // console.log('books')
          res.redirect('/books')
        })
    })
  //upload book file into actual book model
})

function saveCover(book, coverEncoded) {
  if (coverEncoded == null) return
  const cover = JSON.parse(coverEncoded)
  if (cover != null && imageMineTypes.includes(cover.type)) {
    book.coverImage = new Buffer.from(cover.data, 'base64') //creates a buffer
    book.coverImageType = cover.type
  }
}
//file is now uploaded in json format as usinf fileuploadpluggin to save the file, the pluggin lets you preview files and save the actual image into the database so that upon each refresh the public folder doesn't empty
// function removeBookcover(fileName) {
//   // remove the bookcover with the error in it
//   fs.unlink(path.join(uploadPath, fileName), (errr) => {
//     if (err) {
//       console.log(err)
//     }
//   })
// }

module.exports = router
