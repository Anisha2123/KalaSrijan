import React, { useEffect } from 'react';
import { useLocation } from "react-router-dom";
import AboutUsComponent from "../components/AboutUs";
import WhyChooseKalasrijan from '../components/WhyChoose';
// import FeaturedJourney from '../components/Journey';
import FeaturedJourney from '../components/FeaturedJourney';


const AboutUs = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [location]);
  return (
    <div>
      <AboutUsComponent/>
      <FeaturedJourney />
      <WhyChooseKalasrijan />
      
    </div>
  )
}

export default AboutUs