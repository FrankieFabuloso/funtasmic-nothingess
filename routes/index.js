var express = require('express')
var router = express.Router()
const Books = require('../database/db').Books

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ASS' })
});

router.get('/book', function(req, res, next) {
  const id = req.params.id
  Books.getBook(1)
    // .catch(error => {
    //   console.log(error);
    //   res.redirect('/')
    // })
    .then( thisBook => {
      res.render('book', { book: thisBook})
    })
});

module.exports = router
