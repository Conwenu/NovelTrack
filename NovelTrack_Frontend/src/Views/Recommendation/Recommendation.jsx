import React, { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";

import ChatHistory from "../ChatHistory";
import Loading from "../Loading";



// Mock Book Data
const mockBookData = [
  {
    id: 1,
    title: "Attack on Titan",
    pages: 75,
    progress: 75,
    score: 9,
    image: "https://m.media-amazon.com/images/I/61JOgQ4DbAL._AC_UF894,1000_QL80_.jpg",
    status: "Completed",
  },
  {
    id: 2,
    title: "My Hero Academia",
    pages: 113,
    progress: 113,
    score: 8,
    image: "https://m.media-amazon.com/images/I/815rJRMLqqL._AC_UF1000,1000_QL80_.jpg",
    status: "Completed",
  },
  {
    id: 3,
    title: "Demon Slayer",
    pages: 26,
    progress: 26,
    score: 9,
    image: "https://m.media-amazon.com/images/I/81DjuU26RrL.jpg",
    status: "Completed",
  },
  {
    id: 4,
    title: "One Punch Man",
    pages: 24,
    progress: 12,
    score: 8,
    image: "https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781421596204/one-punch-man-vol-12-9781421596204_hr.jpg",
    status: "Reading",
  },
  {
    id: 5,
    title: "Death Note",
    pages: 37,
    progress: 37,
    score: 10,
    image: "https://m.media-amazon.com/images/I/81IR1i0DpaL.jpg",
    status: "Completed",
  },
  {
    id: 6,
    title: "Fullmetal Alchemist: Brotherhood",
    pages: 64,
    progress: 0,
    score: null,
    image: "https://m.media-amazon.com/images/I/819gbwpjLcL._AC_UF1000,1000_QL80_.jpg",
    status: "Planning",
  },
  {
    id: 7,
    title: "Steins;Gate",
    pages: 24,
    progress: 12,
    score: 9,
    image: "https://m.media-amazon.com/images/I/81dS6Mj4GHL.jpg",
    status: "Planning",
  },
  {
    id: 8,
    title: "Kagurabachi",
    pages: 25,
    progress: 14,
    score: 6,
    image: "https://m.media-amazon.com/images/I/912V2U+luQL._AC_UF1000,1000_QL80_.jpg",
    status: "Planning",
  },
];



const Recommendation = () => {

    const [userBooks, setUserBooks] = useState([]);

      useEffect(() => {
        const fetchBooks = async () => {
          try {
            const response = await axios.get("http://localhost:8080/api/track-item/user/1"); // adjust as needed
            setUserBooks(response.data);
          } catch (err) {
            console.error("Failed to fetch user books:", err);
          }
        };

        fetchBooks();
      }, []);
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const apiKey = "your_key"; // Replace this with your key
  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const sendMessage = async (message) => {
    if (message.trim() === "") return;

    setIsLoading(true);
    try {
      const result = await model.generateContent(message);
      const response = result.response;
      console.log(response);
      setChatHistory([
        ...chatHistory,
        { type: "user", message: message },
        { type: "bot", message: response.text() },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setUserInput("");
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setChatHistory([]);
  };

  const handleAutoRecommend = () => {
    const topRated = [...userBooks]
      .filter((item) => item.status === "READING" && item.rating != null)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 5);

    if (topRated.length === 0) {
      alert("No reading books found with a rating.");
      return;
    }

    const autoPrompt = `Based on the following highly rated books you're reading: ${topRated
      .map((book) => `${book.bookTitle} (Rating: ${book.rating})`)
      .join(", ")}\nRecommend more books that are similar in genre and tone.`;

    sendMessage(autoPrompt);
  };



  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 flex flex-col items-center px-4 py-8">
      <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-6 drop-shadow-md">
        AI Book Recommendation Chatbot
      </h1>

      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6 space-y-4">
        <ChatHistory chatHistory={chatHistory} />
        <Loading isLoading={isLoading} />

        <div className="flex gap-2">
          <input
            type="text"
            className="flex-grow px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
            placeholder="Ask for book recommendations..."
            value={userInput}
            onChange={handleUserInput}
          />
          <button
            className="px-5 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition duration-150 disabled:opacity-50"
            onClick={() => sendMessage(userInput)}
            disabled={isLoading}
          >
            Send
          </button>
        </div>

        <div className="flex gap-2">
          <button
            className="w-full py-2 rounded-xl bg-green-600 text-white hover:bg-green-700 transition duration-150"
            onClick={handleAutoRecommend}
            disabled={isLoading}
          >
            Auto Recommend
          </button>
          <button
            className="w-full py-2 rounded-xl bg-gray-400 text-white hover:bg-gray-500 transition duration-150"
            onClick={clearChat}
          >
            Clear Chat
          </button>
        </div>
      </div>
    </div>
  );
};

export default Recommendation;
