import React from "react";
import LoadingPage from "./LoadingPage"
class BookShelf extends React.Component {
  state = { }; 
  render() {
    return (
    
         <div className="app"> 
            <div className="list-books-content">
              <div>
               <div className="bookshelf">
        <h2 className="bookshelf-title"> {this.props.shelftitle}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
{this.props.books.length === 0 && (<LoadingPage className="Loadingballs"/>)}
           {this.props.books.map(book =>
              <li key={book.id} className="book">
                <div className="book-top">
                  <div
                    className="book-cover"
                    style={{
                      width: 128,
                      height: 193,
                      backgroundImage: "url(" + book.imageLinks.thumbnail + ")"
                    }} />
                  <div className="book-shelf-changer">
                    <select value={book.shelf} onChange={eve => this.props.onChangeShelf(book.id, eve)}   
                    >
                      <option value="none" disabled
              // though both "none" & "move to..." have none as value but the first is disabled therefore its diffrent
                      >  Move to...   </option>
                      <option value="currentlyReading">Currently Reading</option>
                      <option value="wantToRead">Want to Read</option>
                      <option value="read">Read</option>
                      <option value="none">None</option>
                    </select>
                  </div>
                </div>
                <div className="book-title">  {book.title}  </div>
                <div className="book-authors"> {book.authors && <div className="book-authors">  {book.authors[0]}  </div>}
                </div>
              </li>
            )}
          </ol>
        </div>
      </div>
              </div>    
      </div> 
</div>
  ) ;
  }
}
export default BookShelf;
