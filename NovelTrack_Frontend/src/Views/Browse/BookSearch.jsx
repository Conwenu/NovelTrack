// David
import { useState, useEffect } from "react";
import axios from "axios"; // Import axios
import BookList from "./BookList";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";
import { useLocation, useNavigate  } from "react-router-dom";

const BookSearch = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("title");
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 
  const [currentPage, setCurrentPage] = useState(1)
  const [booksPerPage] = useState(10)

  const location = useLocation();
  const navigate = useNavigate(); 

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("q"); 
    if (query) {
      setSearchTerm(query);
    }
  }, [location.search]);

  useEffect(() => {

    if (searchTerm.length > 0) {
      fetchBooks(searchTerm);
    }
  }, [searchTerm]);


  const fetchBooks = async (term) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`https://openlibrary.org/search.json?q=${term}`);
      setBooks(response.data.docs);
      console.log(response.data)
      setCurrentPage(1) 
    } catch (err) {
      setError("Failed to fetch books from OpenLibrary.");
      console.error(err); 
    } finally {
      setLoading(false);
    }
  };


  const handleSearch = (term) => {
    setSearchTerm(term);
    navigate(`?q=${term}`);
  };


  const handleSort = (option) => {
    setSortOption(option);
  };


  const sortedBooks = [...books].sort((a, b) => {
    if (sortOption === "title") {
      return a.title.localeCompare(b.title);
    }
   
    return 0;
  });

  const indexOfLastBook = currentPage * booksPerPage
  const indexOfFirstBook = indexOfLastBook - booksPerPage
  console.log("index",indexOfFirstBook, indexOfLastBook)
  const currentBooks = sortedBooks.slice(indexOfFirstBook, indexOfLastBook)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  console.log("Sorted: ", sortedBooks)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Book Search</h1>
      <SearchBar onSearch={handleSearch} onSort={handleSort} />

      {loading && <div>Loading...</div>} 
      {error && <div>{error}</div>} 

      <BookList books={currentBooks} /> 
      <Pagination booksPerPage={booksPerPage} totalBooks={books.length} paginate={paginate} currentPage={currentPage} />
    </div>
  );
};

export default BookSearch;
