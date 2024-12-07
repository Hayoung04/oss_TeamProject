import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import Search from "../Components/apiListPage/Search";
import List from "../Components/apiListPage/List";
import "./ApiListPage.css";

const ApiListPage = () => {
  const [lectures, setLectures] = useState([]);
  const [filteredLectures, setFilteredLectures] = useState([]);
  const [filters, setFilters] = useState({
    personRange: "",
    method: "",
  });

  const location = useLocation();

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const response = await axios.get(
          `http://openapi.seoul.go.kr:8088/6941464777676b6433336c77696e71/xml/SeoulLibraryLectureInfo/5/105/`,
          { responseType: "document" }
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
          person: parseInt(
            row.getElementsByTagName("PERSON")[0]?.textContent || "0"
          ),
          place:
            row.getElementsByTagName("PLACE")[0]?.textContent || "정보 없음",
          method:
            row.getElementsByTagName("METHOD")[0]?.textContent || "정보 없음",
          target:
            row.getElementsByTagName("SUBJECT")[0]?.textContent || "정보 없음",
          description:
            row.getElementsByTagName("CONTENT")[0]?.textContent || "내용 없음",
        }));

        setLectures(lectureData);
        setFilteredLectures(lectureData);
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    };

    fetchInitialData();
  }, []);

  const handleSearch = (query) => {
    const lowerCaseQuery = query.toLowerCase().trim();
    const filtered = lectures.filter((lecture) =>
      lecture.title.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredLectures(filtered);
  };

  useEffect(() => {
    const applyFilters = () => {
      let filtered = [...lectures];

      if (filters.personRange) {
        const [min, max] = filters.personRange.split("-").map(Number);
        filtered = filtered.filter(
          (lecture) => lecture.person >= min && lecture.person <= max
        );
      }

      if (filters.method) {
        filtered = filtered.filter((lecture) =>
          lecture.method.includes(filters.method)
        );
      }

      setFilteredLectures(filtered);
    };

    applyFilters();
  }, [filters, lectures]);

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  return (
    <div>
      <div className="section">
        <div
          className={`tab ${location.pathname === "/" ? "active" : "inactive"}`}
        >
          <Link to="/">도서 목록</Link>
        </div>
        <div
          className={`tab ${
            location.pathname === "/apilist" ? "active" : "inactive"
          }`}
        >
          <Link to="/apilist">도서관 강좌</Link>
        </div>
      </div>
      <div className="boxContainer">
        <Search onSearch={handleSearch} />
        <div className="filterContainer">
          <div className="person">
            <select
              onChange={(e) =>
                handleFilterChange("personRange", e.target.value)
              }
            >
              <option value="">모집 인원</option>
              <option value="0-20">0~20명</option>
              <option value="21-40">21~40명</option>
              <option value="41-60">41~60명</option>
              <option value="61-80">61~80명</option>
            </select>
          </div>
          <div className="method">
            <select
              onChange={(e) => handleFilterChange("method", e.target.value)}
            >
              <option value="">모집 방법</option>
              <option value="사전신청">사전 신청</option>
              <option value="선착순">선착순</option>
              <option value="홈페이지 접수">홈페이지 접수</option>
              <option value="현장 접수 가능">현장 접수 가능</option>
            </select>
          </div>
        </div>
        <List lectures={filteredLectures} />
      </div>
    </div>
  );
};

export default ApiListPage;
