import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ApiListPage from "./Pages/ApiListPage";
import MockListPage from "./Pages/MockListPage";
import ApiDetailPage from "./Pages/ApiDetailPage";
import MockAddPage from "./Pages/MockAddPage";
import MockUpdatePage from "./Pages/MockUpdatePage";
import MockDetailPage from "./Pages/MockDetailPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MockListPage />} />
        <Route path="/mocklist" element={<MockListPage />} />
        <Route path="/apilist" element={<ApiListPage />} />
        <Route path="/apidetail" element={<ApiDetailPage />} />
        <Route path="/mockadd" element={<MockAddPage />} />
        <Route path="/mockupdate" element={<MockUpdatePage />} />
        <Route path="/mockdetail" element={<MockDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
