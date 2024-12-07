import React from "react";
import { useLocation } from "react-router-dom";
import "./ApiDetailPage.css";

const ApiDetailPage = () => {
  const location = useLocation();
  const lecture = location.state || {};

  if (!lecture.title) {
    return <p>강좌 정보를 찾을 수 없습니다.</p>;
  }

  return (
    <div className="wrap">
      <div className="detailContainer">
        <h3 className="title">{lecture.title}</h3>
        <div class="detail">
          <table class="info" id="table" summary="강의 상세내용입니다">
            <colgroup>
              <col width="20%" className="col1"></col>
              <col width="30%" className="col2"></col>
              <col width="20%" className="col3"></col>
              <col width="30%" className="col4"></col>
            </colgroup>
          <tbody>
            <tr>
              <th className="item"><strong>대상</strong></th>
              <td colspan="3">{lecture.target}</td>
            </tr>
            <tr>
              <th className="item"><strong>기간</strong></th>
              <td colspan="3"> {lecture.startDate} ~ {lecture.endDate}</td>
            </tr>
            <tr>
              <th className="item"><strong>장소</strong></th>
              <td colspan="3"> {lecture.place}</td>
            </tr>
            <tr>
              <th className="item"><strong>모집 인원</strong></th>
              <td colspan="3"> {lecture.person}명</td>
            </tr>
            <tr>
              <th className="item"><strong>모집 방법</strong></th>
              <td colspan="3"> {lecture.method}</td>
            </tr>
          </tbody>
        </table>
        </div>
        <p>
          <strong>강좌 내용:</strong>
        </p>
        <div
          dangerouslySetInnerHTML={{
            __html: lecture.description,
          }}
        />
      </div>
    </div>
  );
};

export default ApiDetailPage;