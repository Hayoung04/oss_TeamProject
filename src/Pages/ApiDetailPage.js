import React from "react";
import { useLocation } from "react-router-dom";

const ApiDetailPage = () => {
  const location = useLocation();
  const lecture = location.state || {};

  if (!lecture.title) {
    return <p>강좌 정보를 찾을 수 없습니다.</p>;
  }

  return (
    <div className="detailContainer">
      <h1>{lecture.title}</h1>
      <p>
        <strong>대상:</strong> {lecture.target}
      </p>
      <p>
        <strong>기간:</strong> {lecture.startDate} ~ {lecture.endDate}
      </p>
      <p>
        <strong>장소:</strong> {lecture.place}
      </p>
      <p>
        <strong>모집 인원:</strong> {lecture.person}명
      </p>
      <p>
        <strong>모집 방법:</strong> {lecture.method}
      </p>
      <p>
        <strong>강좌 내용:</strong>
      </p>
      <div
        dangerouslySetInnerHTML={{
          __html: lecture.description,
        }}
      />
    </div>
  );
};

export default ApiDetailPage;