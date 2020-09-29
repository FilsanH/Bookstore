const express = require('express')
const Author = require('../models/author')
const Book = require('../models/book')
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
      res.redirect(`authors/${newAuthor.id}`)
      // res.redirect('authors')
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
router.get('/:id', (req, res) => {
  Author.findById(req.params.id)
    .then((author) => {
      Book.find({ author: author.id })
        .limit(6)
        .then((books) => {
          res.render('authors/show', {
            author: author,
            booksByAuthor: books,
          })
        })
        .catch((err) => {
          console.log(err)
          res.redirect('/')
        })
    })
    .catch((err) => {
      console.log(err)
      res.redirect('/')
    })
})
router.get('/:id/edit', (req, res) => {
  Author.findById(req.params.id)
    .then((author) => {
      res.render('authors/edit', { author: author })
    })
    .catch((err) => {
      res.redirect('/authors')
    })
})

// Update Route
router.put('/:id', (req, res) => {
  Author.findById(req.params.id).then((author) => {
    author.name = req.body.name

    author
      .save()
      .then(() => {
        res.redirect(`/authors/${author.id}`)
      })
      .catch((err) => {
        console.log(err)
        res.render('authors/new', {
          author: author,
          errorMessage: 'Error creating Author',
        })
      })
      .catch((err) => {
        res.redirect('/')
      })
  })
})

//never use delete to delete something
router.delete('/:id', (req, res) => {
  //constraint should not be able to delte an author without also deleting the books it is associated with
  Author.findById(req.params.id).then((author) => {
    author
      .remove()
      .then(() => {
        res.redirect(`/authors`)
      })
      .catch((err) => {
        console.log(err)
        res.redirect(`/`)
      })
      .catch((err) => {
        res.redirect(`/authors/${author.id}`)
      })
  })
})

module.exports = router
