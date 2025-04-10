import { useNavigate } from "react-router-dom"
import { getDefaultCover } from "../Components/DefaultBookCover";

const BookItem = ({ book }) => {
  const navigate = useNavigate();
  const coverUrl = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
  const extractWorkId = (key) => {
    const parts = key.split('/');
    return parts[parts.length - 1]; 
  };
  const workId = extractWorkId(book.key)

    return (
      <div className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer" onClick={() => navigate(`/books/${workId}`)}>
        <img src={coverUrl || getDefaultCover(book.title, book.author)} alt={book.title} className="w-full h-48 object-contain" />
        <div className="p-4">
          <h2 className="text-lg font-semibold truncate">{book.title}</h2>
        </div>
      </div>
    )
  }
  
  export default BookItem
  
  