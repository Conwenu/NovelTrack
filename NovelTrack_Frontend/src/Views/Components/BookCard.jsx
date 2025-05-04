// David
export default function BookCard({ book }) {
  const progressPercentage = (book.progress / book.episodes) * 100;

  const statusColors = {
    Reading: "bg-green-500",
    Completed: "bg-blue-500",
    Planning: "bg-gray-500",
  };

  return (

    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative w-full h-[300px]">
        {" "}
        <img
          src={book.image || "/placeholder.svg"}
          alt={book.title}
          className="object-contain w-full h-full"
          // className="object-cover w-full h-full"
        />
        <div
          className={`absolute top-2 right-2 ${
            statusColors[book.status]
          } text-white text-xs font-bold px-2 py-1 rounded`}
        >
          {book.status}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 truncate">{book.title}</h3>
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>
            Episodes: {book.progress}/{book.episodes}
          </span>
          <span>Score: {book.score || "N/A"}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
