const express = require('express')
const Author = require('../models/author')
const router = express.Router()

// ALL Authors Route
router.get('/', (req, res) => {
  console.log('HELLLLLLLLLO')
  let searchOptions = {}
  //query is the url/ query string
  //case insensitive 'i'
  if (req.query.name != null && req.query.anme !== '') {
    //regukar exprestions lets you search part of the words not just words
    searchOptions.name = new RegExp(req.query.name, 'i')
  }
  Author.find(searchOptions)
    .then((authors) => {
      res.render('authors/index', {
        authors: authors,
        searchOptions: req.query,
      })
    })
    .catch((err) => {
      res.redirect('/')
    })
})

// root of application

//New Author Route
router.get('/new', (req, res) => {
  res.render('authors/new', { author: new Author() })
}) // root of application

//Create Author Route
router.post('/', (req, res) => {
  const author = new Author({
    name: req.body.name,
  })
  console.log(author)
  author
    .save()
    .then((newAuthor) => {
      // res.redirect(`authours/${newAuthor.id}`)
      res.redirect('authors')
    })
    .catch((err) => {
      console.log(err)
      res.render('authors/new', {
        author: author,
        errorMessage: 'Error creating Author',
      })
    })

  // author.save((err, newAuthor) => {
  //   if (err) {
  //     res.render('authors/new', {
  //       author: author,
  //       errorMessage: 'Error creating Author',
  //     })
  //   } else {
  //     // res.redirect(`authours/${newAuthor.id}`)
  //     res.redirect('authors')
  //   }
  // })
})
module.exports = router
