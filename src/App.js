import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ApiListPage from "./Pages/ApiListPage";
import MockListPage from "./Pages/MockListPage";
import ApiDetailPage from "./Pages/ApiDetailPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MockListPage />} />
        <Route path="/mocklist" element={<MockListPage />} />
        <Route path="/apilist" element={<ApiListPage />} />
        <Route path="/apidetail" element={<ApiDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
