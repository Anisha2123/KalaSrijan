

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import './App.css'
import AboutUsPage from "./pages/AboutUs";
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";
function App() {


  return (
    <>
    <BrowserRouter>
     <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aboutus" element={<AboutUsPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
    </>
  )
}

export default App
