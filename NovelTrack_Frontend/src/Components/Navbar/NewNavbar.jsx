// David
import { useState, useEffect } from "react";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { FaBookBookmark } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const userData = localStorage.getItem('user');
  const user = JSON.parse(userData);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = (event) => {
    if (event && event.type === "keydown" && event.key !== "Escape") return;
    setIsSearchOpen(!isSearchOpen);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
      navigate(`/browse?q=${searchQuery}`);
      setIsSearchOpen(false);
      //setSearchQuery("");
    }
  };

  const logout = () => 
  {
    localStorage.removeItem('user');
    navigate("/")
  }

  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (isSearchOpen && event.key === "Escape") {
        toggleSearch(event);
      }
    };

    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isSearchOpen]);

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div
          className="flex hover:text-blue-300 cursor-pointer"
          onClick={() => {
            navigate(`/`);
          }}
        >
          <FaBookBookmark className="text-2xl" />
          <div className="text-xl font-bold">NovelTrack</div>
        </div>

        <div className="hidden md:flex space-x-4 items-center">
      <button
        onClick={() => navigate('/')}
        className="hover:text-gray-300"
      >
        Home
      </button>
      <button
        onClick={() => navigate(`/profile/${user.id}`)}
        className="hover:text-gray-300"
      >
        Profile
      </button>
      <button
        onClick={() => navigate(`/profile/${user.id}`)}
        className="hover:text-gray-300"
      >
        Tracking List
      </button>
      <button
        onClick={() => navigate('/browse')}
        className="hover:text-gray-300"
      >
        Browse
      </button>
      <button
        onClick={() => navigate('/recommendation')}
        className="hover:text-gray-300"
      >
        Recommendation
      </button>
      <button
        onClick={toggleSearch}
        className="hover:text-gray-300 cursor-pointer"
      >
        <FaSearch />
      </button>
    </div>

        {userData ? (
          <div className="hidden md:flex space-x-2">
            <button className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded" onClick={logout}>
              Log Out
            </button>
          </div>
        ) : (
          <div className="hidden md:flex space-x-2">
            <a href="/login">
              <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded">
                Sign In
              </button>
            </a>
            <a href="/register">
              <button className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded">
                Register
              </button>
            </a>
          </div>
        )}

        <div className="md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
       <div className="md:hidden">
       <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
         <button
           onClick={() => navigate('/')}
           className="block w-full text-left hover:bg-gray-700 px-3 py-2 rounded-md"
         >
           Home
         </button>
         <button
           onClick={() => navigate(`/profile/${user.id}`)}
           className="block w-full text-left hover:bg-gray-700 px-3 py-2 rounded-md"
         >
           Profile
         </button>
         <button
           onClick={() => navigate(`/profile/${user.id}`)}
           className="block w-full text-left hover:bg-gray-700 px-3 py-2 rounded-md"
         >
           Tracking List
         </button>
         <button
           onClick={() => navigate('/browse')}
           className="block w-full text-left hover:bg-gray-700 px-3 py-2 rounded-md"
         >
           Browse
         </button>
         <button
           onClick={toggleSearch}
           className="block w-full text-left hover:bg-gray-700 px-3 py-2 rounded-md"
         >
           Search
         </button>
       </div>

       <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
         {userData ? (
           <button
             onClick={() => {
               localStorage.removeItem('user');
               navigate('/login'); // or just reload if needed
             }}
             className="w-full bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
           >
             Log Out
           </button>
         ) : (
           <>
             <button
               onClick={() => navigate('/login')}
               className="w-full bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"
             >
               Sign In
             </button>
             <button
               onClick={() => navigate('/register')}
               className="w-full bg-green-500 hover:bg-green-600 px-4 py-2 rounded"
             >
               Register
             </button>
           </>
         )}
       </div>
     </div>
      )}

      {isSearchOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-20 z-50"
          onClick={toggleSearch}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <form onSubmit={handleSearchSubmit}>
              <div className="flex items-center border-b border-gray-300 pb-2">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full text-gray-800 focus:outline-none bg-transparent"
                  autoFocus
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <button type="submit" className="text-gray-500">
                  <FaSearch className="text-gray-500" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
