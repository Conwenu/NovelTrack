import { X } from "lucide-react"

const filters = ["All", "Reading", "Completed", "Planning"]

export default function Sidebar({ filter, setFilter, isOpen, setIsOpen }) {
  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0`}
    >
      <div className="p-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Filters</h2>
          <button className="lg:hidden" onClick={() => setIsOpen(false)}>
            <X size={24} />
          </button>
        </div>
        <nav>
          <ul>
            {filters.map((filterOption) => (
              <li key={filterOption} className="mb-2">
                <button
                  className={`w-full text-left p-2 rounded ${filter === filterOption ? "bg-blue-500 text-white" : "hover:bg-gray-100"}`}
                  onClick={() => {
                    setFilter(filterOption)
                    setIsOpen(false)
                  }}
                >
                  {filterOption}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  )
}

