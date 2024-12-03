import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

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
            <h1>도서 디테일</h1>
            {book ? (
                <div>
                    <h3>{book.title}</h3>
                    <img src={book.image} alt={book.title} width="200" />
                    <p>
                         Author:  {book.author}
                    </p>
                    <p>
                         Publisher:  {book.publisher}
                    </p>
                    <p>
                         Published:  {book.publicationDate}
                    </p>
                    <p>
                         Recommendation:  {book.recommendation}
                    </p>
                    <p>
                         Call Number:  {book.callNumber}
                    </p>
                    <p>
                         Classification Criteria:  {book.classificationCriteria}
                    </p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
            <button><Link to={`/mockupdate/${encodeURIComponent(title)}`}>수정</Link></button>
            <button><Link to="/mocklist">뒤로</Link></button>
        </div>
    );
};

export default MockDetailPage;
