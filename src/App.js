import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ApiListPage from "./Pages/ApiListPage";
import MockListPage from "./Pages/MockListPage";
import ApiDetailPage from "./Pages/ApiDetailPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MockListPage />} />
        <Route path="/mocklist" element={<MockListPage />} />
        <Route path="/apilist" element={<ApiListPage />} />
        <Route path="/apidetail" element={<ApiDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
