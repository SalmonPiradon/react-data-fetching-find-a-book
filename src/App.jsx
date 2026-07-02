import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {

  const [searchText, setSearchText] = useState("");
  const [searchedBook, setSearchedBook] = useState([]);

  const getBook = async () => {
    try {
      const filteredBooks = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchText}`);
      console.log(filteredBooks)
      setSearchedBook(filteredBooks.data.items || []);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (searchText.trim() === "") {
      setSearchedBook([]);
      return;
    }
    getBook();
  }, [searchText]);
   

  return (
  <div className="App">
    <h1>Find a book</h1>
    <input type="text" placeholder="Search for a book" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
    <ul>
      {searchedBook.map((book) => {
        return <li key={book.id}>{book.volumeInfo.title}</li>
      })}
    </ul>
  </div>
  );
}

export default App;
