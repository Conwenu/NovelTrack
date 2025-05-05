import React, { useEffect, useState } from "react";
import { BarChart2 } from 'lucide-react';
import ReviewComponent from "./ReviewComponent";
import { useParams } from 'react-router-dom';

const RecentReviews = () => {
  const {userId} = useParams();
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/reviews/user/${userId}`);
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className="mt-8 mb-8">
      <div className="flex items-center mb-4">
        <BarChart2 className="w-5 h-5 text-primary mr-2" />
        <h2 className="text-xl font-semibold text-foreground">
          Recent Activity
        </h2>
      </div>

      <div className="space-y-4">
        {reviews.map((review, index) => (
            <ReviewComponent
              key={review.id}
              username={review.user.username}
              text={review.content}
              index={index}
              bookId={review.bookId}
              review={review}
              flag={true}
            />
        ))}
      </div>
    </div>
  );
};

export default RecentReviews;
