import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Update = () => {
  const { title } = useParams();
  const [book, setBook] = useState({
    title: "",
    author: "",
    publisher: "",
    publicationDate: "",
    image: "",
    callNumber: "",
    classificationCriteria: "",
    recommendation: "",
  });

  useEffect(() => {
    axios
      .get(`https://674853885801f51535905794.mockapi.io/books`)
      .then((response) => {
        const foundBook = response.data.find(
          (book) => book.title === decodeURIComponent(title)
        );
        if (foundBook) {
          setBook(foundBook);
        } else {
          console.error("도서를 찾을 수 없습니다.");
        }
      })
      .catch((error) => {
        console.error("도서를 가져오는중 에러가 발생했습니다:", error);
      });
  }, [title]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`https://674853885801f51535905794.mockapi.io/books/${book.id}`, book)
      .then(() => {
        alert("도서 정보가 성공적으로 수정되었습니다!");
        window.location.href = "/";
      })
      .catch((error) => {
        console.error("도서를 수정하는중 에러가 발생했습니다:", error);
        alert("도서 정보를 수정하는 데 실패하였습니다.");
      });
  };

  return (
    <div>
      <h3>도서 수정</h3>
      <form onSubmit={handleSubmit}>
        <label>제목</label><br />
        <input type="text" name="title" value={book.title} onChange={handleChange} /><br /><br />

        <label>저자</label><br />
        <input type="text" name="author" value={book.author} onChange={handleChange} /><br /><br />

        <label>출판사</label><br />
        <input type="text" name="publisher" value={book.publisher} onChange={handleChange} /><br /><br />

        <label>발행년도</label><br />
        <input type="text" name="publicationDate" value={book.publicationDate} onChange={handleChange} /><br /><br />

        <label>사진 URL</label><br />
        <input type="text" name="image" value={book.image} onChange={handleChange} /><br /><br />

        <label>청구기호</label><br />
        <input type="text" name="callNumber" value={book.callNumber} onChange={handleChange} /><br /><br />

        <label>분류 기준</label><br />
        <input type="text" name="classificationCriteria" value={book.classificationCriteria} onChange={handleChange} /><br /><br />

        <label>추천 글</label><br />
        <textarea name="recommendation" value={book.recommendation} onChange={handleChange} /><br /><br />

        <button type="submit">수정</button>
        <button>
          <a href="/mocklist">
            취소
          </a>
        </button>
      </form>
    </div>
  );
};

export default Update;
