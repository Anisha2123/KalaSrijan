
import KalasrijanHero from '../components/Hero'
import TestimonialsSection from '../components/Testimonials'
// import JourneySuman from '../components/JourneySuman'
import WhyChooseSumanJain from '../components/WhyChoose'
// import JourneyOfSumanJain from '../components/Journey'
import ModernGallery from './Gallery'
import Hero from '../components/Hero'
import AboutUs from "../components/AboutUs";
import ServicesSection from '../components/FeaturedServices'
import FeaturedJourney from '../components/FeaturedJourney'
import TrainingClasses from './TrainingClasses'
import ContactUs from './ContactUs'
import TrainingTeaserEditorial from '../components/TrainingTeaser'
// import { TrainingTeaserCinematic, TrainingTeaserEditorial, TrainingTeaserMosaic } from '../components/TrainingTeaser'
// import GalleryTeaser from '../components/GalleryTeaser'

const Home = () => {
  return (
    <div>
        <Hero/>
        
        <ServicesSection />
        <TrainingTeaserEditorial />
        {/* <TrainingTeaserCinematic /> */}
        {/* <TrainingTeaserEditorial /> */}
        {/* <TrainingTeaserMosaic /> */}
        {/* <TrainingClasses /> */}
        <ModernGallery/>
        <AboutUs/>
        {/* <FeaturedJourney /> */}
        <WhyChooseSumanJain />
        {/* <GalleryTeaser /> */}
        
        {/* <ContactUs /> */}
    </div>
  )
}

export default Home