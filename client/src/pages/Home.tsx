
import KalasrijanHero from '../components/Hero'
import TestimonialsSection from '../components/Testimonials'
// import JourneySuman from '../components/JourneySuman'
import WhyChooseSumanJain from '../components/WhyChoose'
import JourneyOfSumanJain from '../components/Journey'
import ModernGallery from '../components/Gallery'
import KalasrijanPremium from '../components/Hero'

const Home = () => {
  return (
    <div>
        <KalasrijanPremium/>
        {/* <KalasrijanHero /> */}
        <ModernGallery/>
        <WhyChooseSumanJain />
        <TestimonialsSection />
        <JourneyOfSumanJain />
        {/* <JourneySuman /> */}
    </div>
  )
}

export default Home