import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./MockDetailPage.css";

const MockDetailPage = () => {
  const { title } = useParams();
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://674853885801f51535905794.mockapi.io/books`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("도서 디테일을 불러오는중 에러가 발생했습니다.");
        }
        return response.json();
      })
      .then((data) => {
        const foundBook = data.find(
          (book) => book.title === decodeURIComponent(title)
        );
        if (foundBook) {
          setBook(foundBook);
        } else {
          setError("도서를 찾을수 없습니다.");
        }
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [title]);

  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
        <Link to="/mocklist">뒤로</Link>
      </div>
    );
  }

  return (
    <div id="DetailContainerBox">
      <h1 id="detailHeading">Book Detail</h1>
      <hr id="detailFirstLine"></hr>
      <div className="detailColumnFull">
        {book ? (
          <>
            <h3 id="detailTitleHeader">{book.title}</h3>
            <hr id="detailSecondLine"></hr>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>

      <div className="detailInnerDiv">
        {book ? (
          <div>
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
                <div className="detailTextRow">
                  <span className="detailLabel">저자 : </span>
                  <span className="detailValue">{book.author}</span>
                </div>
                <div className="detailTextRow">
                  <span className="detailLabel">출판사 : </span>
                  <span className="detailValue">{book.publisher}</span>
                </div>
                <div className="detailTextRow">
                  <span className="detailLabel">발행년도 : </span>
                  <span className="detailValue">{book.publicationDate}</span>
                </div>
                <div className="detailTextRow">
                  <span className="detailLabel">청구기호 : </span>
                  <span className="detailValue">{book.callNumber}</span>
                </div>
                <div className="detailTextRow">
                  <span className="detailLabel">분류 기준 : </span>
                  <span className="detailValue">
                    {book.classificationCriteria}
                  </span>
                </div>
              </div>
            </div>

            <hr id="detailThirdLine"></hr>

            <div className="detailRecommendation">
              <h4 className="detailRecomHeader">추천 글</h4>
              <p className="detailRecomText">{book.recommendation}</p>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>

      <hr id="detailFourthLine"></hr>
      <div id="detailButtonsContainer">
        <button className="btn btn-light" id="detailButtons">
          <Link
            id="detailButtonsLink"
            to={`/mockupdate/${encodeURIComponent(title)}`}
          >
            수정
          </Link>
        </button>
        <button className="btn btn-light" id="detailButtons">
          <Link id="detailButtonsLink" to="/mocklist">
            뒤로
          </Link>
        </button>
      </div>
    </div>
  );
};

export default MockDetailPage;
