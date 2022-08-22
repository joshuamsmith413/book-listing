import React, { FC, useState, useEffect } from 'react';
import './App.css';
import BookList from './BookList';
import getBooks from './apiService';

export interface IBook {
  authorName?: string;
  imageUrl?: string;
  title?: string;
};
interface IBooks {
  list: Array<IBook>;
  total: number;
}
const App: FC = function() {
  const [books, setbooks] = useState<IBooks | null>(null);
  const [searchText, setSearchText] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleChange = (value: string): void => {
    setSearchText(value);
  }

  const getPage = async (type: string) => {
    let data;
    let nextPage = currentPage
    switch (type) {
      case 'search':
        data = await getBooks(searchText, currentPage);
        setCurrentPage(1);
        break;
      case 'next':
        data = await getBooks(searchText, nextPage + 1);
        setCurrentPage(currentPage + 1);
        break;
      case 'prev':
        data = await getBooks(searchText, nextPage - 1);
        setCurrentPage(currentPage - 1);
        break;
    }

    if (data) {
      setbooks(data);
    }
  }


  return (
    <div className='App'>
      <div className='search-container'>
        <input type='text' placeholder='Search' onChange={(v) => handleChange(v.target.value)} className='search-input'/>
        <button onClick={() => getPage('search')} className='search-button'>Search</button>
      </div>
      {books && 
        <div className='pagination-container'>
          {currentPage !== 1 &&
            <button onClick={() => getPage('prev')}>Prev</button>
          }
          <button onClick={() => getPage('next')}>next</button>
        </div>
      }
      {books !== null && 
        <BookList books={books?.list} />
      }
    </div>
  );
}

export default App;
