import React, { useState, useEffect } from "react";

const ShowList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("https://674853885801f51535905794.mockapi.io/books")
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((error) => console.error("Error fetching books:", error));
  }, []);

  return <MockListPage books={books} />;
};

const MockListPage = ({ books }) => {
  if (!books || books.length === 0) {
    return <p>No books available.</p>;
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Book List</h1>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {books.map((book) => (
          <li key={book.id} style={{ marginBottom: "30px" }}>
            <img src={book.image} alt={book.title} width="100" />
            <p>{book.num}. {book.title}</p>
            <p>저자 : {book.author}</p>
            <p>출판사 : {book.publisher}</p>
            <p>발행년도 : {book.publicationDate}</p>
            <p>한줄평 : {book.recommendation}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShowList;