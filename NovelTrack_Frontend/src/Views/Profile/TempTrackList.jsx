// David
import { useState } from "react"
import Sidebar from "../Components/SideBar"
import BookList from "../Components/BookList"
import SearchBar from "../Components/SearchBar"
import { useSearchParams } from 'react-router-dom';
// fake data for book list
const mockBookData = [
  {
    id: 1,
    title: "Attack on Titan",
    pages: 75,
    progress: 75,
    score: 9,
    image: "https://m.media-amazon.com/images/I/61JOgQ4DbAL._AC_UF894,1000_QL80_.jpg",
    status: "Reading",
  },
  {
    id: 2,
    title: "My Hero Academia",
    pages: 113,
    progress: 113,
    score: 8,
    image: "https://m.media-amazon.com/images/I/815rJRMLqqL._AC_UF1000,1000_QL80_.jpg",
    status: "Completed",
  },
  {
    id: 3,
    title: "Demon Slayer",
    pages: 26,
    progress: 26,
    score: 9,
    image: "https://m.media-amazon.com/images/I/81DjuU26RrL.jpg",
    status: "Completed",
  },
  {
    id: 4,
    title: "One Punch Man",
    pages: 24,
    progress: 12,
    score: 8,
    image: "https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781421596204/one-punch-man-vol-12-9781421596204_hr.jpg",
    status: "Reading",
  },
  {
    id: 5,
    title: "Death Note",
    pages: 37,
    progress: 37,
    score: 10,
    image: "https://m.media-amazon.com/images/I/81IR1i0DpaL.jpg",
    status: "Completed",
  },
  {
    id: 6,
    title: "Fullmetal Alchemist: Brotherhood",
    pages: 64,
    progress: 0,
    score: null,
    image: "https://m.media-amazon.com/images/I/819gbwpjLcL._AC_UF1000,1000_QL80_.jpg",
    status: "Planning",
  },
  {
    id: 7,
    title: "Steins;Gate",
    pages: 24,
    progress: 12,
    score: 9,
    image: "https://m.media-amazon.com/images/I/81dS6Mj4GHL.jpg",
    status: "Planning",
  },
  {
    id: 8,
    title: "Kagurabachi",
    pages: 25,
    progress: 14,
    score: 6,
    image: "https://m.media-amazon.com/images/I/912V2U+luQL._AC_UF1000,1000_QL80_.jpg",
    status: "Planning",
  },
];


export default function BookTrackingPage() {
  const [filter, setFilter] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const filteredBookList = mockBookData.filter(
    (book) =>
      (filter === "All" || book.status === filter) && book.title.toLowerCase().includes(searchQuery.toLowerCase()),
  )

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
  )
}

