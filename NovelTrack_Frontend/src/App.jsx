import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Profile from "./Views/Profile/Profile";
import BookSearch from "./Views/Browse/BookSearch";
import BookDetails from "./Views/BookPage/BookDetails";
import TestNavbar from "./Components/Navbar/NewNavbar";
import Recommendation from "./Views/Recommendation/Recommendation";
import Home from "./Views/Home/Home";
function App() {
  return (
    <>
      <Router>
        <div className="App">
          {/* <AuthNavbar /> */}
          <TestNavbar/>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/home" element={<Home />} />
            <Route path="/profile/:userId" element={<Profile />} />
            <Route path="/books/:bookId" element={<BookDetails />} />
            <Route path = "browse" element={<BookSearch/>}/>
            <Route path="/recommendation" element={<Recommendation />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
