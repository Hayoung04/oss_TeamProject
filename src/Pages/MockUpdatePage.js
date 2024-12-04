import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import './MockUpdatePage.css';

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
      <h1 id="updateHeading">도서 수정</h1>
      <div class="updateOuterDiv">
        <div class="updateInnerDiv">
          <form onSubmit={handleSubmit}>

          <table id="updateTable">
              <tr>
                <td id="updateTd">
                  <label id="updateLabel">제목</label><br />
                  <input id="updateInput" type="text" name="title" value={book.title} onChange={handleChange} /><br /><br />
                </td>
                <td id="updateTd">
                  <label id="updateLabel">저자</label><br />
                  <input id="updateInput" type="text" name="author" value={book.author} onChange={handleChange} /><br /><br />
                </td>
              </tr>

              <tr>
                <td id="updateTd">
                  <label id="updateLabel">출판사</label><br />
                  <input id="updateInput" type="text" name="publisher" value={book.publisher} onChange={handleChange} /><br /><br />
                </td>
                <td id="updateTd">
                  <label id="updateLabel">발행년도</label><br />
                  <input id="updateInput" type="text" name="publicationDate" value={book.publicationDate} onChange={handleChange} /><br /><br />
                </td>
              </tr>

              <tr>
                <td id="updateTd">
                  <label id="updateLabel">청구기호</label><br />
                  <input id="updateInput" type="text" name="callNumber" value={book.callNumber} onChange={handleChange} /><br /><br />
                </td>
                <td id="updateTd">
                  <label id="updateLabel">분류 기준</label><br />
                  <input id="updateInput" type="text" name="classificationCriteria" value={book.classificationCriteria} onChange={handleChange} /><br /><br />
                </td>
              </tr>

              <tr><td id="updateTd" colspan="2">
                <label id="updateLabel">사진 URL</label><br />
                <input type="text" name="updateImage" id="updateImage" value={book.image} onChange={handleChange} /><br /><br />
              </td></tr>

              <tr><td id="updateTd" colspan="2">
                <label id="updateLabel">추천 글</label><br />
                <textarea id="updateTextarea" name="recommendation" value={book.recommendation} onChange={handleChange} /><br /><br />
              </td></tr>
            </table>

            <div class="button-container">
              <button id="updateButtons" type="submit">수정</button>
              <button id="updateButtons"><a id="updateCancelButton" href="/">취소</a></button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Update;
