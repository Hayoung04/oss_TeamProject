import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./MockListPage.css";

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
  const location = useLocation();

  if (!books || books.length === 0) {
    return <p>No books available.</p>;
  }

  return (
    <div style={{ textAlign: "center" }}>
      <div className="section2">
        <div
          className={`tab2 ${
            location.pathname === "/" ? "active" : "inactive"
          }`}
        >
          <Link to="/">도서 목록</Link>
        </div>
        <div
          className={`tab2 ${
            location.pathname === "/apilist" ? "active" : "inactive"
          }`}
        >
          <Link to="/apilist">도서관 강좌</Link>
        </div>
      </div>
      <a href="/mockadd">
        <button>Add</button>
      </a>
      <h1>Book List</h1>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {books.map((book) => (
          <li key={book.id} style={{ marginBottom: "30px" }}>
            <Link to={`/mockdetail/${encodeURIComponent(book.title)}`}>
              <img src={book.image} alt={book.title} width="100" />
              <h3>{book.title}</h3>
            </Link>
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
