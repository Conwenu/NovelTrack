import React from "react";

const ReviewComponent = ({username, text, index}) => {
  return (
    <div key={index} className="bg-card p-4 rounded-md shadow-sm">
      <div className="flex items-start">
        <img
          src="https://contentful.harrypotter.com/usf1vwtuqyxm/3SQ3X2km8wkQIsQWa02yOY/8801d7055a3e99dae8e60f54bb4b1db8/HarryPotter_WB_F4_HarryPotterMidshot_Promo_080615_Port.jpg?q=75&fm=jpg&w=914"
          alt="User avatar"
          className="w-10 h-10 rounded-full mr-3"
        />
        <div>
          <div className="flex items-center">
            <span className="font-medium text-foreground">{username}</span>
            <span className="mx-2 text-muted-foreground">•</span>
            <span className="text-sm text-muted-foreground">2 days ago</span>
          </div>
          <p className="mt-1 text-foreground">
              {text}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReviewComponent;
