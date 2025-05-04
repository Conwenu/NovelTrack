// David
const AddToListModal = ({ onClose, onAdd }) => {
  const statuses = ["Reading", "Planning To", "Already Read"]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Add to Reading List</h2>
        {statuses.map((status) => (
          <button
            key={status}
            onClick={() => onAdd(status)}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md mb-2"
          >
            {status}
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
  )
}

export default AddToListModal

