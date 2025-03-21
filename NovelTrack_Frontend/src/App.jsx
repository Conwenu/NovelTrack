import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./index.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Views/Home/Home";
import Profile from "./Views/Profile/Profile";
import BookPage from "./Views/Books/BookPage";
import AuthNavbar from "./Components/Navbar/AuthNavbar";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <div className="App">
          <AuthNavbar />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  {" "}
                  <div>
                    <a href="https://vite.dev" target="_blank">
                      <img src={viteLogo} className="logo" alt="Vite logo" />
                    </a>
                    <a href="https://react.dev" target="_blank">
                      <img
                        src={reactLogo}
                        className="logo react"
                        alt="React logo"
                      />
                    </a>
                  </div>
                  <h1>Novel Track</h1>
                  <div className="card">
                    <button onClick={() => setCount((count) => count + 1)}>
                      count is {count}
                    </button>
                    <p>
                      Edit <code>src/App.jsx</code> and save to test HMR
                    </p>
                  </div>
                  <p className="read-the-docs">
                    Click on the Vite and React logos to learn more
                  </p>
                </>
              }
            />
            <Route path="/home" element={<Home />} />
            <Route path="/profile/:userId" element={<Profile />} />
            <Route path="/book/:bookId" element={<BookPage />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
