const fs = require( 'fs' )

if( fs.existsSync('.env') ) {
  require('dotenv').config()
}

const connectionString = process.env.DATABASE_URL
const pgp = require('pg-promise')()
const db = pgp(connectionString) // ()

const getOneBook = 'SELECT * FROM books WHERE id = 1'
const getAuthors = 'SELECT * FROM authors JOIN book_authors ON author_id=authors.id WHERE book_id IN ($1:csv)'
const getGenres = 'SELECT * FROM genres JOIN book_genres ON genre_id=genres.id WHERE book_id IN ($1:csv)'

const Books = {
  getBook: id => db.one( getOneBook, [id] )
    .then( oneBook => {
      return Promise.all( [Books.getAuthors(id), Books.getGenres(id), oneBook] );
    })
    .then( allBookInfo => {
      const authors = allBookInfo[0]
      const genres = allBookInfo[1]
      const thisBook = allBookInfo[2]
      thisBook.authors = authors
      thisBook.genres = genres
      return thisBook
    }),
  getAuthors: ( id ) => db.any( getAuthors, [id] ),
  getGenres: ( id ) => db.any( getGenres, [id] ),
}

module.exports = {Books}
