import React from 'react';


const Book = ({ book, controlShelfChange }) => {
 
const imageThumb = book.imageLinks ? book.imageLinks.smallThumbnail : null;

return (
 <li>
   <div className="book">
      <div className="book-top">
        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${imageThumb})` }}></div>
           <div className="book-shelf-changer">
              <select onChange={eve => controlShelfChange(book, eve.target.value)} value="none" >
              <option value="none" disabled
              // though both "none" & "move to..." have none as value but the first is disabled therefore its diffrent
              >Move to...</option>
                <option value="currently Reading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
             </select>
       </div>
     </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors}</div>
    </div>
  </li>
        );
};

export default Book;