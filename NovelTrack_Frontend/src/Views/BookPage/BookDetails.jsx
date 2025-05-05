// David
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
  const [isInReadingList, setIsInReadingList] = useState(false);
  const [trackData, setTrackData] = useState(null);
  console.log("bookId", bookId)
  const userData = localStorage.getItem("user");
  const user = JSON.parse(userData);
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

useEffect(() => {
  const fetchTrackingData = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/track-item/user/${user.id}/book/${bookId}`);
      if (response.ok) {
        const data = await response.json();
        setIsInReadingList(true);
        setTrackData(data);
        if (data.rating) {
          setRating(data.rating);
        }
      }
    } catch (err) {
      console.error("Error fetching tracking data:", err);
    }
  };

  fetchTrackingData();
}, [bookId]);


useEffect(() => {
  const fetchReviews = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/reviews/book/${bookId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch reviews");
      }
      const data = await response.json();
      console.log("rev", data);
      setReviews(data);
    } catch (err) {
      console.error("Error fetching reviews:", err);
    }
  };

  fetchReviews();
}, [bookId]);


  const handleAddToList = async (status) => {
    if (!book) return;
    console.log(bookId, book.title)
    const trackingData = {
      userId: user.id, 
      bookId: bookId,
      bookTitle: book.title,
      bookImageUrl: book.coverImage,
      status: status,
      rating: rating
    };

    try {
      const response = await fetch(`http://localhost:8080/api/track-item/user/${trackingData.userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(trackingData)
      });

      if (!response.ok) {
        throw new Error("Failed to save book to tracking list");
      }

      console.log("Book successfully added to tracking list");
    } catch (error) {
      console.error("Error adding book to tracking list:", error);
    } finally {
      setShowAddToListModal(false);
    }
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
            className={`px-4 py-2 rounded-md transition duration-300 ${
              isInReadingList
                ? "bg-gray-400 text-white"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
            disabled={false}
          >
            {isInReadingList ? "Already in Reading List" : "Add to Reading List"}
          </button>
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Rate this book:</h3>
            <StarRating rating={rating} onRate={setRating} bookId={bookId} bookTitle={book.title} bookImageUrl={book.coverImage || ""} />
          </div>
        </div>
      </div>

      <ReviewSection
        reviews={reviews}
        onAddReview={handleAddReview}
        bookId={bookId}
        bookTitle={book?.title}
        bookImageUrl={book?.coverImage}
      />


      {showAddToListModal && (
        <AddToListModal
          onClose={() => setShowAddToListModal(false)}
          onAdd={(status) => handleAddToList(status)}
          book={book} 
          currStatus={(trackData && trackData.status) || ""}
        />
      )}

      {showAddReviewModal && (
        <AddReviewModal onClose={() => setShowAddReviewModal(false)} onAddReview={handleAddReview} />
      )}
    </div>
  );
};

export default BookDetails;

