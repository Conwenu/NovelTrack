import React from "react";
import { BarChart2 } from 'lucide-react';
import ReviewComponent from "./ReviewComponent";
const RecentReviews = () => {
  const reviews = [
    {text : "Just finished watching Attack on Titan Season 4!"},
    {text : "Started reading Chainsaw Man manga. So good!"},
    {text : "Added 5 new books to my watchlist for the upcoming season. "},
    {text : "FMA is so overrated 💔💔💔 "}
  ]
  const username = "BookReader99"
  return (
    <div className="mt-8 mb-8">
      <div className="flex items-center mb-4">
        <BarChart2 className="w-5 h-5 text-primary mr-2" />
        <h2 className="text-xl font-semibold text-foreground">
          Recent Activity
        </h2>
      </div>

      <div className="space-y-4">
        {reviews.map((item, index) => (
          <ReviewComponent username={username} text={item.text} index = {index}/>
        ))}
      </div>
    </div>
  );
};

export default RecentReviews;
