import { useState, useEffect } from "react";
import StarRating from "./StarRating";
import ReviewSection from "./ReviewSection";
import AddToListModal from "./AddToListModal";
import AddReviewModal from "./AddReviewModal";
import { useParams } from "react-router-dom";
import axios from "axios";
import { getDefaultCover } from "../Components/DefaultBookCover";

const BookDetails = () => {
  const { bookId } = useParams(); 
  const [showAddToListModal, setShowAddToListModal] = useState(false);
  const [showAddReviewModal, setShowAddReviewModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [book, setBook] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  console.log("bookId", bookId)
  
  useEffect(() => {
    const fetchBookData = async () => {
      try {
        setLoading(true);

        
        //const isbnUrl = `https://openlibrary.org/api/books?bibkeys=ISBN:${bookId}&format=json&jscmd=data`;
        const isbnUrl = `https://openlibrary.org/works/${bookId}.json`;
        const response = await axios.get(isbnUrl);
        // const bookData = response.data[`ISBN:${bookId}`];
        const bookData = response.data;
        console.log("BookData", bookData)
        
        if (bookData) {
          const workId = bookData.work; 
          console.log(bookData.covers[0])
          const coverUrl = `https://covers.openlibrary.org/b/id/${bookData.covers[0]}.jpg`;
          
          let bookDetails = {
            title: bookData.title || undefined,
            description: bookData.description?.value || undefined,
            //authors: bookData.authors && bookData.authors.length > 0 ? bookData.authors.map((author) => author.name).join(", ") : undefined,
            authors: bookData.authors && bookData.authors.length > 0
              ? (await Promise.all(
                  bookData.authors.map(async (authorObj) => {
                    const authorKey = authorObj.author?.key;
                    if (authorKey) {
                      try {
                        const authorRes = await axios.get(`https://openlibrary.org${authorKey}.json`);
                        return authorRes.data.name;
                      } catch (err) {
                        console.warn(`Failed to fetch author ${authorKey}`);
                        return "Unknown Author";
                      }
                    }
                    return "Unknown Author";
                  })
                )).join(", ")
              : undefined,
            // coverImage: bookData.cover ? bookData.cover.large || bookData.cover.medium: undefined,
            coverImage: coverUrl
          };
          console.log(bookData.cover)

          
          if (!bookDetails.title || !bookDetails.description || !bookDetails.authors || !bookDetails.coverImage) {
            if (workId) {
              const workUrl = `https://openlibrary.org/works/${workId}.json`;
              const workResponse = await axios.get(workUrl);
              const workData = workResponse.data;
              console.log("WorkData", workData)
             
              bookDetails.title = bookDetails.title || workData.title;
              bookDetails.description = bookDetails.description || workData.description?.value;
              bookDetails.authors = bookDetails.authors || (workData.authors && workData.authors.length > 0 ? workData.authors.map((author) => author.name).join(", ") : undefined);
              bookDetails.coverImage = bookDetails.coverImage || (workData.cover ? workData.cover.large || workData.cover.medium || workData.cover.small : undefined);

            } else {
              console.log("No Work ID found, unable to fetch additional data.");
            }
          }

          bookDetails.title = bookDetails.title || "Unknown Title";
          bookDetails.description = bookDetails.description || "No description available";
          bookDetails.authors = bookDetails.authors || "Unknown Author";
          bookDetails.coverImage = bookDetails.coverImage || getDefaultCover(bookDetails.title, bookDetails.authors);
          
          setBook(bookDetails);
        } else {
          setError("Book not found");
        }
      } catch (err) {
        console.log("Failed to fetch book data", err);
        setError("Failed to fetch book data");
      } finally {
        setLoading(false);
      }
    };

    fetchBookData();
  }, [bookId]);



  const handleAddToList = (status) => {
    console.log(`Added to list with status: ${status}`);
    setShowAddToListModal(false);
  };

  const handleAddReview = (review) => {
    setReviews([...reviews, review]);
    setShowAddReviewModal(false);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const coverImage = book.coverImage || getDefaultCover(book.title, book.authors);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
          <img src={coverImage} alt={book.title} className="w-full rounded-lg shadow-lg" />
        </div>
        <div className="md:w-2/3">
          <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
          <h2 className="text-xl text-gray-600 mb-4">{book.authors}</h2>
          <p className="text-gray-700 mb-6">{book.description}</p>
          <button
            onClick={() => setShowAddToListModal(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Add to Reading List
          </button>
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Rate this book:</h3>
            <StarRating rating={rating} onRate={setRating} />
          </div>
        </div>
      </div>

      <ReviewSection reviews={reviews} onAddReview={() => setShowAddReviewModal(true)} />

      {showAddToListModal && <AddToListModal onClose={() => setShowAddToListModal(false)} onAdd={handleAddToList} />}
      {showAddReviewModal && (
        <AddReviewModal onClose={() => setShowAddReviewModal(false)} onAddReview={handleAddReview} />
      )}
    </div>
  );
};

export default BookDetails;

