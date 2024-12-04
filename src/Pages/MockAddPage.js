import React, { useState } from "react";
import './MockAddPage.css';

const MockAddPage = () => {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const {
      title,
      author,
      publisher,
      publicationDate,
      image,
    } = book;

    if (!title || !author || !publisher || !publicationDate || !image) {
      alert("제목, 저자, 출판사, 발행년도 그리고 이미지는 필수 항목입니다. 모든 항목을 작성해 주세요.");
      return;
    }

    fetch("https://674853885801f51535905794.mockapi.io/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("오류가 발생하였습니다. 다시한번 입력해주세요.");
        }
        return response.json();
      })
      .then(() => {
        alert("도서가 정상적으로 추가되었습니다!");
        window.location.href = "/";
      })
      .catch((err) => alert(err.message));
  };

  return (
    <>
      <h1>도서 추가</h1>
      <div class="outerDiv">
        <div class="innerDiv">
          <form onSubmit={handleSubmit}>

            <table>
              <tr>
                <td>
                  <label>제목</label><br />
                  <input type="text" name="title" value={book.title} onChange={handleChange} /><br /><br />
                </td>
                <td>
                  <label>저자</label><br />
                  <input type="text" name="author" value={book.author} onChange={handleChange} /><br /><br />
                </td>
              </tr>

              <tr>
                <td>
                  <label>출판사</label><br />
                  <input type="text" name="publisher" value={book.publisher} onChange={handleChange} /><br /><br />
                </td>
                <td>
                  <label>발행년도</label><br />
                  <input type="text" name="publicationDate" value={book.publicationDate} onChange={handleChange} /><br /><br />
                </td>
              </tr>

              <tr>
                <td>
                  <label>청구기호</label><br />
                  <input type="text" name="callNumber" value={book.callNumber} onChange={handleChange} /><br /><br />

                </td>
                <td>
                  <label>분류 기준</label><br />
                  <input type="text" name="classificationCriteria" value={book.classificationCriteria} onChange={handleChange} /><br /><br />

                </td>
              </tr>

              <tr><td colspan="2">
                <label>사진 URL</label><br />
                <input type="text" name="image" id="image" value={book.image} onChange={handleChange} /><br /><br />
              </td></tr>

              <tr><td colspan="2">
                <label>추천 글</label><br />
                <textarea name="recommendation" value={book.recommendation} onChange={handleChange} /><br /><br />
              </td></tr>
            </table>

            <div class="button-container">
              <button type="submit">추가</button>
              <button><a href="/">취소</a></button>
            </div>

          </form>
        </div>
      </div>
    </>
  );
};

export default MockAddPage;
