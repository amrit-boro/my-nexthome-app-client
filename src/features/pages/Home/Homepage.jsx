import HeroSection from "./HeroSection";
import Header from "./Header";
import RoomList from "./RoomList";
import HowItWorks from "./HowItWorks";
import PopularLocal from "./PopularLocal";
import Footer from "./Footer";

function Homepage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Header />
      <HeroSection />
      <RoomList />
      <HowItWorks />
      <PopularLocal />
      <Footer />
    </div>
  );
}

export default Homepage;
