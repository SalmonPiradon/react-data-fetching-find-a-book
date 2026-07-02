import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState([]);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setBooks([]);
      return;
    }

    axios
      .get("https://openlibrary.org/search.json", {
        params: { q: searchTerm, limit: 10 },
      })
      .then((response) => setBooks(response.data.docs ?? []))
      .catch((error) => console.error(error));
  }, [searchTerm]);

  return (
    <div className="App">
      <h1>Find a Book</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />
      <ul>
        {books.map((book) => (
          <li key={book.key}>{book.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
