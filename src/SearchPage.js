import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from './BooksAPI' 

class SearchPage extends Component {

    state = {
      books: [],
      theCurrentBooks: []
    }

    componentDidMount() {
      BooksAPI.getAll()
        .then(books => {
          // Get rid of all other properties except book id
          const booksId = books.map(book => ({ id: book.id,shelf: book.shelf }))
          this.setState({ theCurrentBooks: booksId })
        })
    }

    handleSearch = (event) => {
      const value = event.target.value
      
      if(value) {
        BooksAPI.search(value).then(books => {
          if(!books || books.hasOwnProperty('error')) {
            this.setState({ books: [] })
          } else {
              this.setState({ books: books })
          }  
        })
      } else {
        this.setState( { books: [] })
      }
    }

    handleShelfChange = (book, shelf) => {
      const newBooks = []
      BooksAPI.update(book, shelf)
        .then(books => {
          Object.keys(books)
            .forEach(shelf => {
              return books[shelf].map(id => ({ id: id, shelf: shelf}))
              .forEach(book => {
                newBooks.push(book)
              })
            })
            return newBooks
        })
        .then(newBooks => {
          this.setState({ theCurrentBooks: newBooks })
        })
    }
    handle(){ window.location.reload(true); alert("Book(s) added");}
    render() {
        const { books, theCurrentBooks } = this.state
        let bookList

        if (books.length > 0) {
          bookList = books.map((book, index) => {
            theCurrentBooks.forEach(ebook => {
              if(ebook.id === book.id) {
                book.shelf = ebook.shelf
              }
            })

            return (
              <li key={index}>
                <Book
                  handleShelfChange={this.handleShelfChange}
                  book={book} />
              </li>
            ) 
          })
        } else {
          bookList = null
        }

        return(
            <div className="search-books">
            <div className="search-books-bar">
              <Link to="/" className="close-search" onClick={this.handle}>Close</Link>
              <div className="search-books-input-wrapper">
                <input 
                  type="text" 
                  onChange={this.handleSearch}
                  placeholder="Search books here by title or author"/>
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
               {bookList}
              </ol>
            </div>
          </div>
        )
    }
}

export default SearchPage