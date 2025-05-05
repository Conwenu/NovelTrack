// David
import { useState } from "react";
import AddReviewModal from "./AddReviewModal";
import ReviewComponent from "../Profile/ReviewComponent";
import { useNavigate } from "react-router-dom";

const ReviewSection = ({ reviews, bookId, bookTitle, bookImageUrl, onAddReview }) => {
  const userData = localStorage.getItem("user");
  const user = JSON.parse(userData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleAddReview = async (reviewContent) => {
    try {
      const response = await fetch(`http://localhost:8080/api/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          bookId,
          bookTitle,
          bookImageUrl,
          content: reviewContent,
        }),

      });

      if (!response.ok) {
        throw new Error("Failed to submit review");
      }

      const newReview = await response.json();
      onAddReview(newReview); // update parent state
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Reviews</h2>


        {reviews.length === 0 ? (
          <p>No reviews yet. Be the first to review this book!</p>
        ) : (
          reviews.map((review, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md mb-4">
              <ReviewComponent username={review.user.username} text={review.content} index={index} bookId={bookId} flag={false} review={review} />
              {/* <p className="text-gray-700">{review.content}</p> */}
            </div>
          ))
        )}


        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300 mt-4"
        >
          Add a Review
        </button>


        {isModalOpen && (
          <AddReviewModal
            onClose={() => setIsModalOpen(false)}
            onAddReview={handleAddReview}
          />
        )}
      </div>
    );
  };

export default ReviewSection;

