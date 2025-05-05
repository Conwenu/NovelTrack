import React, { useState, useEffect } from "react";
import axios from "axios";

const StarRating = ({  bookId, bookTitle, bookImageUrl}) => {
  const userData = localStorage.getItem("user");
  const user = JSON.parse(userData);
  const [rating, setRating] = useState(0);
  const [trackItem, setTrackItem] = useState(null);

  useEffect(() => {
    const fetchUserRating = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/track-item/user/${user.id}/book/${bookId}`
        );
        const data = response.data;
        if (data && data.rating !== null) {
          setRating(data.rating);
        }
        if (data && data.id) {
          setTrackItem(data); 
        }
      } catch (error) {
        console.error("Error fetching rating:", error);
      }
    };

    if (user && user.id) {
      fetchUserRating();
    }
  }, [user.id, bookId]);

  const handleAddRating = async (newRating) => {
    console.log("newR", newRating);
    setRating(newRating);
    const payload = {
      userId: user.id,
      bookId,
      bookTitle,
      bookImageUrl,
      status : (trackItem && trackItem.status )|| "COMPLETED",
      rating: newRating,
    };

    try {
      console.log(payload)
      const resp = await axios.put(
        `http://localhost:8080/api/track-item/user/${user.id}/book/${bookId}/rate`,
        payload
      );
      console.log(resp)
    } catch (error) {
      console.error("Error updating rating:", error);
    }
  };

  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => handleAddRating(star)}
          className={`text-2xl ${
            star <= rating ? "text-yellow-400" : "text-gray-300"
          }`}
        >
          ★
        </button>
      ))}
    </div>
  );
};

export default StarRating;
