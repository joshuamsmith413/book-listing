import React from 'react';
import { IBook } from './App'

interface IProps {
  books: Array<IBook> | undefined;
}

export default function BookList({ books }: IProps) {
  const renderBooks = (booksArr: any) => {
    return booksArr.map((book: any) => {
      return (
        <div className='book-container' key={book.title}>
          <img className='book-img' src={book.imageUrl} alt={book.title} />
          <p className='book-title'>"{book.title}"</p>
          <p className='book-author'>by {book.authorName}</p>
        </div>
      )
    })
  }

  return (
    <div className='book-list'>
      {renderBooks(books)}
    </div>
  )
}