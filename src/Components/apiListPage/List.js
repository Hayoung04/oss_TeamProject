import React, { useState } from "react";
import "./List.css";
import { useNavigate } from "react-router-dom";

const List = ({ lectures }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const navigate = useNavigate();

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentLectures = lectures.slice(startIndex, startIndex + itemsPerPage);

  const totalPages = Math.ceil(lectures.length / itemsPerPage);

  const handleLectureClick = (lecture) => {
    navigate("/apidetail", { state: lecture });
  };

  return (
    <>
      <div className="listContainer">
        {currentLectures.length > 0 ? (
          currentLectures.map((lecture) => (
            <div
              key={lecture.id}
              className="lectureCard"
              onClick={() => handleLectureClick(lecture)}
            >
              <h2>{lecture.title}</h2>
              <div>
                <p>
                  <strong>기간:</strong> {lecture.startDate} ~ {lecture.endDate}
                </p>
              </div>
              <p>
                <strong>모집 인원:</strong> {lecture.person}명
              </p>
            </div>
          ))
        ) : (
          <p>No lectures found</p>
        )}
      </div>
      {totalPages > 1 && (
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              className={currentPage === i + 1 ? "active" : ""}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </>
  );
};

export default List;
