// David
import { useState, useEffect } from "react";
import Sidebar from "../Components/SideBar";
import BookList from "../Components/BookList";
import SearchBar from "../Components/SearchBar";

export default function BookTrackingPage() {
  const [books, setBooks] = useState([]);
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchTrackingList = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/track-item/user/1");
        if (!response.ok) throw new Error("Failed to fetch tracking list");
        const data = await response.json();

        const transformed = data
          .filter(item => item.bookTitle && item.bookImageUrl && item.status)
          .map(item => ({
            id: item.bookId,
            title: item.bookTitle,
            image: item.bookImageUrl,
            score: item.rating,
            progress: item.pagesRead ?? 0,
            pages: item.totalPages ?? 0,
            status: item.status.charAt(0) + item.status.slice(1).toLowerCase(), // "READING" -> "Reading"
          }));

        setBooks(transformed);
      } catch (error) {
        console.error("Error loading tracking list:", error);
      }
    };

    fetchTrackingList();
  }, []);

  const filteredBookList = books.filter(
    (book) =>
      (filter === "All" || book.status === filter) &&
      book.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar filter={filter} setFilter={setFilter} isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">My Book List</h1>
          <button className="lg:hidden bg-blue-500 text-white p-2 rounded" onClick={() => setSidebarOpen(true)}>
            Menu
          </button>
        </div>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <BookList bookList={filteredBookList} />
      </div>
    </div>
  );
}
