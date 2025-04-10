const ReviewSection = ({ reviews, onAddReview }) => {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-4">Reviews</h2>
      {reviews.map((review, index) => (
        <div key={index} className="bg-gray-100 p-4 rounded-lg mb-4">
          <p>{review}</p>
        </div>
      ))}
      <button
        onClick={onAddReview}
        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300"
      >
        Add a Review
      </button>
    </div>
  )
}

export default ReviewSection

