import React from "react";
import "./List.css";
import { useNavigate } from "react-router-dom";

const List = ({ lectures }) => {
  const navigate = useNavigate();

  const handleLectureClick = (lecture) => {
    navigate("/apidetail", { state: lecture });
  };

  return (
    <div className="listContainer">
      {lectures.length > 0 ? (
        lectures.map((lecture) => (
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
  );
};

export default List;
