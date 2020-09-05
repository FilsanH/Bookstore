const express = require('express')
const Author = require('../models/author')
const router = express.Router()

// ALL Authors Route
router.get('/', (req, res) => {
  res.render('authors/index')
}) // root of application

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
  try{
const newAuthor = await author.save()
   // res.redirect(`authours/${newAuthor.id}`)
      res.redirect('authors')
  } catch{
         res.render('authors/new', {
        author: author,
        errorMessage: 'Error creating Author',
      })   
  }

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
