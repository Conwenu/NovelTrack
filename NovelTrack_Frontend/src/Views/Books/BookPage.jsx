import React, { useState, useEffect } from "react";
import axios from "axios";
const BookPage = () => {
  const [bookData, setBookData] = useState(null);
  const getBooks = async () => {
    try {
      const data = await axios.get(
        "https://openlibrary.org/api/books?bibkeys=ISBN:9780140328721&jscmd=details&format=json"
      );
      setBookData(data.data["ISBN:9780140328721"]);
      console.log(data.data["ISBN:9780140328721"]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <div>
      <h2>BookPage</h2>
      <div>
        {bookData == null ? (
          <p>Doesn't Exist</p>
        ) : (
          <div>
            <p>{bookData.details.title}</p>
            <img src={bookData.thumbnail_url}></img>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookPage;
