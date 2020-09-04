const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.render('index')
}) // root of application

module.exports = router
