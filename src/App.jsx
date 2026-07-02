import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {

  const [searchText, setSearchText] = useState("");
  const [searchedBook, setSearchedBook] = useState([]);

  const getBook = async (searchText) => {
    try {
      const filteredBooks = await axios.get(`https://openlibrary.org/search.json?title=${searchText}`);
      const strictlyFiltered = (filteredBooks.data.docs || []).filter((book) =>
        book.title.toLowerCase().includes(searchText.toLowerCase())
      );
      setSearchedBook(strictlyFiltered);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (searchText.trim() === "") {
      setSearchedBook([]);
      return;
    }

    const timer = setTimeout(() => {
      getBook(searchText);
    }, 500);
  
    return () => clearTimeout(timer);
  }, [searchText]);
   

  return (
  <div className="App">
    <h1>Find a book</h1>
    <input type="text" placeholder="Search for a book" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
    <ul>
      {searchedBook.map((book) => {
        return <li key={book.key}>{book.title}</li>
      })}
    </ul>
  </div>
  );
}

export default App;
