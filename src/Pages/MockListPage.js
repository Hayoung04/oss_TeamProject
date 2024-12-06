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

  const deleteBook = (id) => {
    const isConfirmed = window.confirm("이 도서를 삭제하시겠습니까?");
    if (isConfirmed) {
      fetch(`https://674853885801f51535905794.mockapi.io/books/${id}`, {
        method: "DELETE",
      })
        .then((response) => {
          console.log("Response status:", response.status);
          if (response.ok) {
            setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
            alert("삭제되었습니다!");
          } else {
            alert("삭제에 실패했습니다.");
          }
        })
        .catch((error) => {
          console.error("Error deleting book:", error);
          alert("에러가 발생했습니다.");
        });
      
    }
  };

  return <MockListPage books={books} onDelete={deleteBook} />;
};

const MockListPage = ({ books, onDelete }) => {
  const location = useLocation();

  if (!books || books.length === 0) {
    return <p>No books available.</p>;
  }

  return (
    <div className="container">
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
        <button className="add-button">Add</button>
      </a>
      <div className="book_intro">
        <h1>Book List</h1>
        <ul className="List">
          {books.map((book) => (
            <li key={book.id} className="book-item">
              <div className="detailRow">
                <div className="detailImageContainer">
                  <img
                    id="detailImage"
                    src={book.image}
                    alt={book.title}
                    width="200"
                  />
                </div>
                <div className="detailTextContainer">
                  <Link to={`/mockdetail/${encodeURIComponent(book.title)}`}>
                    <h6>{book.title}</h6>
                  </Link>
                  <div className="detailTextRow">
                    <span className="detailLabel">저자:</span>
                    <span className="detailValue">{book.author}</span>
                  </div>
                  <div className="detailTextRow">
                    <span className="detailLabel">출판사:</span>
                    <span className="detailValue">{book.publisher}</span>
                  </div>
                  <div className="detailTextRow">
                    <span className="detailLabel">발행년도:</span>
                    <span className="detailValue">{book.publicationDate}</span>
                  </div>
                </div>
              </div>
              <button
                className="delete-button"
                onClick={() => onDelete(book.id)}
              >
                삭제
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ShowList;
