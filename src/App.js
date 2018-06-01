import React from "react";
import { Route } from "react-router-dom"; 
import "./App.css";
import SearchPage from "./SearchPage";
import ListBooks from "./ListBooks";
import * as BooksAPI from "./BooksAPI";

class BooksApp extends React.Component {    

  state = {  books: [] };

//to load data from a remote endpoint(BooksAPI) after a component is mounted.
  componentDidMount() {
    BooksAPI.getAll().then(data => {
      this.setState({ books: data });
    });
  }

//the methode to change shelfes, called from render() in <SearchPage/> 
   ChangeShelf = (book: any, shelf: string) => {
    BooksAPI.update(book, shelf)
    //if requste seccede then call getBooks
     .then(response => {this.getBooks();});
  }; // End ChaneShelf

  getBooks() {
    BooksAPI.getAll()
    //if requste seccede then call getBooks
    .then(data => { this.setState({ books: data }); });
  } //End getBooks()


/* used the URL in the browser's address bar to keep track of which page we're on (<Route/>).
 * This will ensure that users can use the browser's back and forward buttons to navigate between
 * pages, as well as provide a good URL they can bookmark and share.*/

render() {
 return (
  <div className="app">
    <Route exact path="/" render={() => <ListBooks booksOnShelf={this.state.books} />}/>
    <Route  path="/search"render={() =><SearchPage onChangeShelf={this.ChangeShelf} booksOnShelf={this.state.books} />} />
 <hr/>
  <footer>My Reads Project. By Maram Al-Khatib</footer>
  </div>
    ); //end return
  } //end render
} //end class

export default BooksApp;
