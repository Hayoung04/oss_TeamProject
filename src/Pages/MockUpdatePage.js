import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./MockUpdatePage.css";

const MockUpdatePage = () => {
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
          alert("도서를 찾을 수 없습니다.");
        }
      })
      .catch((error) => {
        console.error("도서를 가져오는 중 에러가 발생했습니다:", error);
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
        console.error("도서를 수정하는 중 에러가 발생했습니다:", error);
        alert("도서 정보를 수정하는 데 실패하였습니다.");
      });
  };

  return (
    <>
      <h1 id="addHeading">도서 수정</h1>
      <div className="addOuterDiv">
        <form onSubmit={handleSubmit}>
          <div className="formGroup">
            <label className="addLabel">제목</label>
            <input
              className="addInputTitle"
              type="text"
              name="title"
              value={book.title}
              onChange={handleChange}
            />
          </div>

          <div className="formRow">
            <div className="formGroup">
              <label className="addLabel">저자</label>
              <input
                className="addInput"
                type="text"
                name="author"
                value={book.author}
                onChange={handleChange}
              />
            </div>
            <div className="formGroup">
              <label className="addLabel">출판사</label>
              <input
                className="addInput"
                type="text"
                name="publisher"
                value={book.publisher}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="formRow">
            <div className="formGroup">
              <label className="addLabel">발행년도</label>
              <input
                className="addInput"
                type="text"
                name="publicationDate"
                value={book.publicationDate}
                onChange={handleChange}
              />
            </div>
            <div className="formGroup">
              <label className="addLabel">청구기호</label>
              <input
                className="addInput"
                type="text"
                name="callNumber"
                value={book.callNumber}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="formRow">
            <div className="formGroup">
              <label className="addLabel">분류 기준</label>
              <input
                className="addInput"
                type="text"
                name="classificationCriteria"
                value={book.classificationCriteria}
                onChange={handleChange}
              />
            </div>
            <div className="formGroup">
              <label className="addLabel">사진 URL</label>
              <input
                className="addInput"
                type="text"
                name="image"
                value={book.image}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="formGroup">
            <label className="addLabelRecommend">추천 글</label>
            <textarea
              className="addTextareaRecommend"
              name="recommendation"
              value={book.recommendation}
              onChange={handleChange}
            />
          </div>

          <div className="buttonContainer">
            <button className="addButton btn btn-light" type="submit">
              수정
            </button>
            <button className="addButton btn btn-light">
              <a className="addCancelButton" href="/">
                취소
              </a>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default MockUpdatePage;
