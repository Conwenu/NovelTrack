// David
const AddToListModal = ({ onClose, onAdd, book, rating, userId, currStatus }) => {
  const statuses = ["READING", "COMPLETED", "PLANNING"];



    const handleAdd = (status) => {
      onAdd(status);  // delegate to BookDetails
    };



    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Add to Reading List</h2>
          {statuses.map((status) => (
            <button
              key={status}
              onClick={() => handleAdd(status)}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md mb-2 flex items-center justify-between"
            >
              <span>{status}</span>
              {currStatus === status && (
                <span className="h-2 w-2 rounded-full bg-green-500 inline-block mr-2"></span>
              )}
            </button>
          ))}
          <button
            onClick={onClose}
            className="mt-4 bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition duration-300"
          >
            Cancel
          </button>
        </div>
      </div>
    );
    
    
};
export default AddToListModal;
