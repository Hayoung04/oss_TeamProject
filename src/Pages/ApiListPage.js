import React, { useState } from "react";
import axios from "axios";
import Search from "../Components/apiListPage/Search";
import List from "../Components/apiListPage/List";

const ApiListPage = () => {
  const [lectures, setLectures] = useState([]);

  const LecturesList = async (query) => {
    try {
      const response = await axios.get(
        `http://openapi.seoul.go.kr:8088/6941464777676b6433336c77696e71/xml/SeoulLibraryLectureInfo/1/100/`,
        {
          params: { TITLE: query },
          responseType: "document",
        }
      );

      const xml = response.data;
      const rows = Array.from(xml.getElementsByTagName("row"));

      const formatDate = (date) => {
        if (!date) return "정보 없음";
        const year = date.slice(0, 4);
        const month = date.slice(4, 6);
        const day = date.slice(6, 8);
        return `${year}.${month}.${day}`;
      };

      const lectureData = rows.map((row) => ({
        id: row.getElementsByTagName("LECTURE_ID")[0]?.textContent,
        title: row.getElementsByTagName("TITLE")[0]?.textContent,
        startDate: formatDate(
          row.getElementsByTagName("TERM_START_DATE")[0]?.textContent
        ),
        endDate: formatDate(
          row.getElementsByTagName("TERM_END_DATE")[0]?.textContent
        ),
        person:
          row.getElementsByTagName("PERSON")[0]?.textContent || "정보 없음",
        place: row.getElementsByTagName("PLACE")[0]?.textContent || "정보 없음",
        method:
          row.getElementsByTagName("METHOD")[0]?.textContent || "정보 없음",
        target:
          row.getElementsByTagName("SUBJECT")[0]?.textContent || "정보 없음",
        description:
          row.getElementsByTagName("CONTENT")[0]?.textContent || "내용 없음",
      }));

      const filteredData = lectureData.filter((lecture) =>
        lecture.title.toLowerCase().includes(query.toLowerCase().trim())
      );

      setLectures(filteredData);
    } catch (error) {
      console.error("Error fetching lecture data:", error);
    }
  };

  return (
    <div>
      <Search onSearch={LecturesList} />
      <List lectures={lectures} />
    </div>
  );
};

export default ApiListPage;
