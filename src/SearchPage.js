import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';
import * as BooksAPI from './BooksAPI';

class SearchPage extends Component {
  state = {
      books: [],
      query: ''
  };
// when input is updated the methode is called (at line 53) to handle the changes
  handleUpdate(query) {
      BooksAPI.search(query).then(books => books ? this.setState({ books }) : []);
      this.setState({ query });
  }

  controlShelfChange(book, shelf){
   BooksAPI.update(book, shelf).then(() => {
      book.shelf = shelf        
      this.setState(state => ({
        books: state.books.filter(b => b.id !== book.id).concat(book)
      }))     
    }) //end of .then
    }// End ChaneShelf

//takes care of showing the search results in the book-grid (called in line 58)
  displaySearchResults() {
      const { books, query } = this.state;
      if (query) {
        //if nothing is typed or there is an error or no matching books then display "no results found"
        // display the books that match the input
          return books.error ?
              <div>No results found</div>
              : books.map((book, index) => {
                  return (
                      <Book
                          key={index}
                          book={book}
                          controlShelfChange={this.controlShelfChange.bind(this)}
                      />
                  );
              });}}
              
handle(){window.location.reload(true);}

    render() {
      return (
        <div className="search-books">
          <div className="search-books-bar">
            <Link to='/' className='close-search' onClick={this.handle}> Close </Link>
            <div className="search-books-input-wrapper">
              <input
                  type="text"
                  placeholder="Search by title or author"
                  value={this.state.query}
                  onChange={e => this.handleUpdate(e.target.value)}
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">{this.displaySearchResults()}</ol>
          </div>
        </div>
      );
  }
}

export default SearchPage;