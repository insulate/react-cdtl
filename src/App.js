import React from "react";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import AboutPage from "./pages/AboutPage";
function App() {
  return (
    <>

      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* exact ให้ใส้เฉพาะหน้าแรก */}
          <Route exact path="/" element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
        </Routes>
        <footer className="container">
          <p>© Company 2017-2021</p>
        </footer>
      </BrowserRouter>

    </>
  );
}

export default App;
