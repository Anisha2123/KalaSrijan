
import KalasrijanHero from '../components/Hero'
import TestimonialsSection from '../components/Testimonials'
// import JourneySuman from '../components/JourneySuman'
import WhyChooseSumanJain from '../components/WhyChoose'
import JourneyOfSumanJain from '../components/Journey'
import ModernGallery from './Gallery'
import Hero from '../components/Hero'
import AboutUs from "../components/AboutUs";
import ServicesSection from '../components/Services'
import FeaturedJourney from '../components/FeaturedJourney'
import TrainingClasses from './TrainingClasses'
import ContactUs from './ContactUs'

const Home = () => {
  return (
    <div>
        <Hero/>
        <AboutUs/>
        <ServicesSection />
        <TrainingClasses />
        <FeaturedJourney />
        <WhyChooseSumanJain />
        <ModernGallery/>
        <ContactUs />
    </div>
  )
}

export default Home