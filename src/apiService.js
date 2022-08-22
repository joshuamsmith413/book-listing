
const apiUrl = `https://goodreads-server-express--dotdash.repl.co/search/`;
const key = '?Key=RDfV4oPehM6jNhxfNQzzQ&Secret=fu8fQ5oGQEDlwiICw45dGSuxiu13STyIrxY0Rb6ibI'

export default async function getBooks(searchText, currentPage) {

  const response = await fetch(`${apiUrl}${searchText}${key}&page=${currentPage}`);
  const data = await response.json()
  return data;
}