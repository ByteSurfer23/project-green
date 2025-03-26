import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Admin from "./main_pages/admin";
import Home from "./main_pages/Home";
import About from "./main_pages/About";
import Search from "./main_pages/Search";
import GreenCover from "./main_pages/GreenCover";
import SearchPage from "./main_pages/SearchPage";

function App() {
  return (
    <>
      <Router>
        {/* <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/search">Search</Link>
            </li>
          </ul>
        </nav> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchPage/>} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
