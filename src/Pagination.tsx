import React, { useState, useEffect } from 'react';

interface IProps {
  getPage: any;
  currentPage: number;
  totalBooks: number;
}

export default function Pagination({ totalBooks, getPage, currentPage }: IProps) {
  const [pagesToDisplay, setPagesToDisplay] = useState<JSX.Element[]>([]);
  const [start, setStart] = useState<number>(1);
  const [offset, setOffset] = useState<number>(10);
  const [firstBook, setFirstBook] = useState<number>(1);
  const [lastBook, setLastBook] = useState<number>(20);
  
  const handlePages = (type: string, pageNumber: number = 0) => {
    // setFirstBook();
    setStart(pageNumber);
    setOffset(pageNumber + 10);
    getPage(type, pageNumber);
  }

  useEffect(() => {
    getPagesToDisplay(currentPage);
  }, [start])

  function getPagesToDisplay(currentPage: number) {
    let pages = []
    for (let i = start; i <= offset; i++) {
      let page = (
          <>
            <button key={i} onClick={() => getPage('search', i)}>{i}</button>
          </>
        )
      pages.push(page);
    }
    setPagesToDisplay(pages);
  }

  const currentPageText = (currentPage: number, total: number) => {
    return <p>displaying {firstBook} ... {lastBook} of {total}</p>
  }


  const numOfPages = (totalBooks: number): number => {
    return Math.round(totalBooks / 20)
  }

  return (
    <div className='pagination-container'>
      {currentPageText(currentPage, totalBooks)}
      <button onClick={() => handlePages('prev', currentPage - 1)}>Prev</button>
      <button onClick={() => handlePages('next', currentPage + 1)}>next</button>
      <>{pagesToDisplay}</> ...<button onClick={() => handlePages('last', numOfPages(totalBooks))}>{totalBooks}</button>
      <button>last</button>
    </div>
  )
}