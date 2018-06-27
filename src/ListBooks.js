import React from "react";
import { Link } from "react-router-dom";
import BookShelf from "./BookShelf";
import * as BooksAPI from "./BooksAPI";
import "./App.css";


class ListBooks extends React.Component {
   
state = {};
   
// methode that handles the change if accored in a shelf. called in <BookShelf/> 
  controlShelfChanges = (bookId: string, eve: any) => {
    let temp = this.props.booksOnShelf;
    const book = temp.filter(t => t.id === bookId)[0];
    book.shelf = eve.target.value;
    BooksAPI.update(book, eve.target.value).then(() => { this.setState({books: temp}
  
      );
    });
  };

  render() {
    return (
      
      <div className="list-books">
        <div className="list-books-title"> <h1>MyReads</h1> </div>
        <div key="1" className="list-books-content">
         <BookShelf
            key="currentlyReading"
            // Filter to check that the shelf has the right books
            books={this.props.booksOnShelf.filter(book => book.shelf === "currentlyReading")}
            //call the controlShelfChanges() whenever a change has happened
            onChangeShelf={this.controlShelfChanges}
            shelftitle="Currently Reading"
          />
         <BookShelf
            key="wantToRead"
            // Filter to check that the shelf has the right books
            books={this.props.booksOnShelf.filter(book => book.shelf === "wantToRead")}
            //call the controlShelfChanges() whenever a change has happened
            onChangeShelf={this.controlShelfChanges}
            shelftitle="Want to Read"
          />
            <BookShelf
            key="read"
            // Filter to check that the shelf has the right books
            books={this.props.booksOnShelf.filter(book => book.shelf === "read")}
            //call the controlShelfChanges() whenever a change has happened
            onChangeShelf={this.controlShelfChanges}
            shelftitle="Read"
          />
        </div>
        <div className="open-search"> <Link to="/search">Add a book</Link> </div>
      </div>
    );
  }
}
export default ListBooks;
