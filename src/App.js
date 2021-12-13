import React from "react";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import AboutPage from "./pages/AboutPage";
import ProductPage from "./pages/ProductPage";
import DetailPage from "./pages/DetailPage"
import HospitalPage from "./pages/hospital/HospitalPage";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient()

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            {/* exact ให้ใส้เฉพาะหน้าแรก */}
            <Route exact path="/" element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="product" element={<ProductPage />} />
            <Route path="detail/:id/title/:title" element={<DetailPage />} />
            <Route path="hospital" element={<HospitalPage />} />
            <Route
              path="*"
              element={
                <main style={{ padding: "1rem" }}>
                  <p>There's nothing here!</p>
                </main>
              }
            />
          </Routes>
          <footer className="container">
            <p>© Company 2017-2021</p>
          </footer>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
