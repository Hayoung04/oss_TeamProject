import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import './MockDetailPage.css';

const MockDetailPage = () => {
    const { title } = useParams();
    const [book, setBook] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`https://674853885801f51535905794.mockapi.io/books`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("도서 디테일을 불러오는중 에러사 발생했습니다.");
                }
                return response.json();
            })
            .then((data) => {
                const foundBook = data.find((book) => book.title === decodeURIComponent(title));
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
        <div>
            <h1 id="detailHeading">도서 디테일</h1>
            <hr id="detailFirstLine"></hr>
            <hr id="detailSecondLine"></hr>
            <div class="detailOuterDiv">
                <div class="detailInnerDiv">
                    {book ? (
                        <div>
                            <table id="detailTable">
                                <tr>
                                    <td colspan="4"><h3 id="detailTitleHeader">{book.title}</h3></td>
                                </tr>
                                <tr>
                                    <td rowspan="5">
                                        <img id="detailImage" src={book.image} alt={book.title} width="200" />
                                    </td>
                                    <td id="detailTd">저자</td>
                                    <td colspan="2">{book.author}</td>
                                </tr>
                                <tr>
                                    <td id="detailTd">출판사</td>
                                    <td colspan="2">{book.publisher}</td>
                                </tr>
                                <tr>
                                    <td id="detailTd">발행년도</td>
                                    <td colspan="2">{book.publicationDate}</td>
                                </tr>
                                <tr>
                                    <td id="detailTd">청구기호</td>
                                    <td colspan="2">{book.callNumber}</td>
                                </tr>
                                <tr>
                                    <td id="detailTd">분류 기준</td>
                                    <td colspan="2">{book.classificationCriteria}</td>
                                </tr>
                                </table>
                                
                                <hr id="detailThirdLine"></hr>

                                <table id="detailTable">
                                <tr>
                                    <td id="detailRecom" colspan="5">추천 글</td>
                                </tr>
                                <tr>
                                    <td colspan="5">{book.recommendation}</td>
                                </tr>
                            </table>

                        </div>
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </div>

            <hr id="detailFourthLine"></hr>
            <div id="detailButtonsContainer">
                <button id="detailButtons">
                    <Link id="detailButtonsLink" to={`/mockupdate/${encodeURIComponent(title)}`}>수정</Link>
                </button>
                <button id="detailButtons">
                    <Link id="detailButtonsLink" to="/mocklist">뒤로</Link>
                </button>
            </div>
        </div>
    );
};

export default MockDetailPage;

