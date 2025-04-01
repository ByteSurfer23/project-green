import { BrowserRouter as Router, Routes, Route  } from "react-router-dom";
import "./App.css";
import Admin from "./main_pages/admin";
import Home from "./main_pages/Home";
import SearchPage from "./main_pages/SearchPage";

function App() {
  return (
    <>
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
