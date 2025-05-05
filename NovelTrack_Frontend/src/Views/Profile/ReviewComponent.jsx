// // David
// import React from "react";
// import { useParams } from 'react-router-dom';
// import { useNavigate } from "react-router-dom";
// const ReviewComponent = ({username, text, index, bookId, flag, review}) => {
//   const navigate = useNavigate();
//   let toBook = false
//   if(flag == undefined || flag == null || flag == true)
//   {
//     toBook = true 
//   }
  
//   return (
//     <div key={index} className="bg-card p-4 rounded-md shadow-sm" onClick={() => {toBook ? navigate(`/books/${bookId}`) : navigate(`/profile/${review.user.id}`)}}>
//       <div className="flex items-start cursor-pointer">
//         <img
//           src="https://contentful.harrypotter.com/usf1vwtuqyxm/3SQ3X2km8wkQIsQWa02yOY/8801d7055a3e99dae8e60f54bb4b1db8/HarryPotter_WB_F4_HarryPotterMidshot_Promo_080615_Port.jpg?q=75&fm=jpg&w=914"
//           alt="User avatar"
//           className="w-10 h-10 rounded-full mr-3"
//         />
//         <div>
//           <div className="flex items-center " >
//             <span className="font-medium text-foreground">{username}</span>
//             <span className="mx-2 text-muted-foreground">•</span>
//             {/* <span className="text-sm text-muted-foreground">2 days ago</span> */}
//           </div>
//           <p className="mt-1 text-foreground">
//               {text}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ReviewComponent;


import React, { useState } from "react";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const ReviewComponent = ({username, text, index, bookId, flag, review}) => {
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const userData = localStorage.getItem("user");
  const user = JSON.parse(userData);
  
  let toBook = false;
  if(flag === undefined || flag === null || flag === true) {
    toBook = true;
  }
  
  // Check if the review belongs to the current user
  const isCurrentUserReview = review.user.id === Number(user.id);
  
  const handleDeleteClick = (e) => {
    e.stopPropagation(); // Prevent navigation when clicking the X
    setShowDeleteModal(true);
  };
  
  const handleDeleteReview = async () => {
    try {
      setIsDeleting(true);
      
      // Make API call to delete the review
      const response = await fetch(`http://localhost:8080/api/reviews/user/${user.id}/review/${review.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        // Include credentials if your API requires authentication
        credentials: 'include',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete review');
      }
      

      setShowDeleteModal(false);

      window.location.reload();
      
    } catch (error) {
      console.error('Error deleting review:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  function timeAgo(isoString) {
    const date = new Date(isoString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);
  
    if (seconds < 60) return `${seconds} seconds ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    return `${Math.floor(seconds / 86400)} days ago`;
  }
  

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/reviews/user/${user.id}/review/${review.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Review deleted successfully, you might want to refresh the reviews list
        console.log("Review deleted successfully");
        window.location.reload(); // Simple refresh, consider a more elegant solution
      } else {
        console.error("Failed to delete review:", response.status);
      }
    } catch (error) {
      console.error("Error deleting review:", error);
    }
    setShowModal(false);
  };
  
  return (
    <div key={index} className="bg-card p-4 rounded-md shadow-sm relative cursor-pointer" onClick={() => {toBook ? navigate(`/books/${bookId}`) : navigate(`/profile/${review.user.id}`)}}>
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
            <span className="text-sm text-muted-foreground">{timeAgo(review.lastChanged)}</span>
          </div>
          <p className="mt-1 text-foreground">{text}</p>
        </div>
      </div>
      <button
        className="absolute top-2 right-2 text-gray-500 hover:text-red-700"
        onClick={(e) => {
          e.stopPropagation(); 
          setShowModal(true);
        }}
      >
        X
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Delete Review
              </h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  Are you sure you want to delete this review? This action
                  cannot be undone.
                </p>
              </div>
              <div className="items-center px-4 py-3">
                <button
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md text-base font-medium hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="ml-2 px-4 py-2 bg-red-500 text-white rounded-md text-base font-medium hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewComponent;