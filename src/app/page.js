import Navbar from "./Components/Navbar";
import HeroSection from "./Components/HeroSection";
import HomeAfterHeroSection from "./Components/HomeAfterHeroSection";
import HomeAbout from "./Components/HomeAbout";
import HomeCommunitySection from "./Components/HomeCommunitySection";
import HomeCourseSection from "./Components/HomeCourseSection";
import HomeFAQSection from "./Components/HomeFAQSection";
import Footer from "./Components/Footer";


export default function Home() {
  return (
   <>
   <Navbar/>
   <HeroSection/>
   <HomeAfterHeroSection/>
   <HomeAbout/>
   <HomeCommunitySection/>
   <HomeCourseSection/>
   <HomeFAQSection/>
   <Footer/>
   </>
  );
}
