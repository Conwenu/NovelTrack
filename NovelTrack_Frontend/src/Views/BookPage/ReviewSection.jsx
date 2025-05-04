// David
import { useState } from "react";
import AddReviewModal from "./AddReviewModal";

const ReviewSection = ({ reviews, bookId, bookTitle, bookImageUrl, onAddReview }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddReview = async (reviewContent) => {
    try {
      const response = await fetch(`http://localhost:8080/api/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: 1,
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
              <p className="text-gray-700">{review.content}</p>
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

