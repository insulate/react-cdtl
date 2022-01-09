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
import IndexPage from "./pages/category/IndexPage";
import CreatePage from "./pages/category/CreatePage";
import EditPage from "./pages/category/EditPage";
import UploadPage from "./pages/UploadPage";
import { ToastProvider } from 'react-toast-notifications';

const queryClient = new QueryClient()

function App() {
  return (
    <ToastProvider>
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
            <Route path="category" element={<IndexPage />} />
            <Route path="category/create" element={<CreatePage />} />
            <Route path="category/edit/:id" element={<EditPage />} />
            <Route path="upload" element={<UploadPage />} />
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
    </ToastProvider>
  );
}

export default App;
