// // David
// import { useNavigate } from "react-router-dom";

// export default function BookCard({ book }) {
//   const progressPercentage = (book.progress / book.episodes) * 100;
// const navigate = useNavigate();
//   const statusColors = {
//     Reading: "bg-green-500",
//     Completed: "bg-blue-500",
//     Planning: "bg-gray-500",
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'Reading':
//         return 'bg-green-600';
//       case 'Completed':
//         return 'bg-blue-600';
//       case 'Planning':
//         return 'bg-gray-400';
//       default:
//         return 'bg-gray-200';
//     }
//   };

//   return (

//     <div className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer">
//       <div className="relative w-full h-[300px]" onClick={() => navigate(`/books/${ book.id}`)}>
//         {" "}
//         <img
//           src={book.image || "/placeholder.svg"}
//           alt={book.title}
//           className="object-contain w-full h-full"
//         />
//         <div
//           className={`absolute top-2 right-2 ${
//             statusColors[book.status]
//           } text-white text-xs font-bold px-2 py-1 rounded`}
//         >
//           {book.status}
//         </div>
//       </div>
//       <div className="p-4">
//         <h3 className="font-semibold text-lg mb-2 truncate">{book.title}</h3>
//         <div className="flex justify-between text-sm text-gray-600 mb-2">
//           <span>Score: {book.score || "N/A"}</span>
//         </div>
//         <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
//           <div
//              className={`h-2.5 rounded-full ${getStatusColor(book.status)}`}
//             style={{ width: `${100}%` }}
//           ></div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MoreVertical } from "lucide-react";

export default function BookCard({ book, onStatusChange, onRemove }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const userData = localStorage.getItem("user");
  const user = JSON.parse(userData);

  const statusColors = {
    Reading: "bg-green-500",
    Completed: "bg-blue-500",
    Planning: "bg-gray-500",
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Reading":
        return "bg-green-600";
      case "Completed":
        return "bg-blue-600";
      case "Planning":
        return "bg-gray-400";
      default:
        return "bg-gray-200";
    }
  };

  const handleStatusChange = async (newStatus) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/track-item/user/${user.id}/book/${book.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: String(newStatus).toUpperCase(),
            userId: user.id,
            bookId: book.id,
            bookTitle: book.title,
            rating: book.score,
            bookImageUrl: book.bookImageUrl,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      // Call the parent component's callback to update the UI
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating book status:", error);
      alert("Failed to update book status");
    }
  };

  const handleRemoveBook = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/track-item/${book.trackId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to remove book");
      }

      // Call the parent component's callback to update the UI
      
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error removing book:", error);
      alert("Failed to remove book");
    }
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer relative">
      <div
        className="relative w-full h-[300px]"
        onClick={() => navigate(`/books/${book.id}`)}
      >
        <img
          src={book.image || "/placeholder.svg"}
          alt={book.title}
          className="object-contain w-full h-full"
        />
        <div
          className={`absolute top-2 right-2 ${
            statusColors[book.status]
          } text-white text-xs font-bold px-2 py-1 rounded`}
        >
          {book.status}
        </div>

        {/* Vertical ellipsis button */}
        <button
          className="absolute top-2 left-2 bg-white bg-opacity-70 p-1 rounded-full hover:bg-opacity-100 transition-all"
          onClick={(e) => {
            e.stopPropagation();
            setIsModalOpen(true);
          }}
        >
          <MoreVertical size={18} className="text-gray-700" />
        </button>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 truncate">{book.title}</h3>
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Score: {book.score || "N/A"}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
          <div
            className={`h-2.5 rounded-full ${getStatusColor(book.status)}`}
            style={{ width: `${100}%` }}
          ></div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white rounded-lg p-6 w-80 shadow-xl"
            onClick={stopPropagation}
          >
            <h3 className="text-lg font-semibold mb-4">Book Options</h3>

            <div className="mb-4">
              <h4 className="font-medium mb-2">Change Status</h4>
              <div className="grid grid-cols-3 gap-2">
                {["Reading", "Completed", "Planning"].map((status) => {
                  const isActive = book.status === status;
                  const baseStyles =
                    "py-2 px-3 rounded text-sm font-semibold text-center transition-colors duration-200";
                  const activeStyles = {
                    Reading: "bg-green-600 text-white",
                    Completed: "bg-blue-600 text-white",
                    Planning: "bg-gray-500 text-white",
                  };
                  const inactiveStyles =
                    "bg-gray-200 text-gray-800 hover:bg-gray-300";

                  return (
                    <button
                      key={status}
                      onClick={() => handleStatusChange(status)}
                      className={`${baseStyles} ${
                        isActive ? activeStyles[status] : inactiveStyles
                      }`}
                    >
                      {status.toUpperCase()}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="border-t pt-4">
              <button
                className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition-colors"
                onClick={handleRemoveBook}
              >
                Remove Book
              </button>
            </div>

            <button
              className="w-full mt-3 border border-gray-300 py-2 rounded hover:bg-gray-100 transition-colors"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
