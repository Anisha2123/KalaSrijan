

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import './App.css'
import AboutUsPage from "./pages/AboutUs";
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";
import ServicesSection from "./pages/Services";
import ContactUs from "./pages/ContactUs";
import PhotoGallery from "./pages/Gallery";
import TrainingClasses from "./pages/TrainingClasses";
function App() {


  return (
    <>
    <BrowserRouter>
     <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<ServicesSection />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/gallery" element={<PhotoGallery />} />
        <Route path="/training&classes" element={<TrainingClasses />} />
        <Route path="/aboutus" element={<AboutUsPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
    </>
  )
}

export default App
