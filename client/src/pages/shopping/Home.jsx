import BrowseBystyle from "../../components/shopping-view/BrowseBystyle";
import HeroSection from "../../components/shopping-view/HeroSection";
import LogoBanner from "../../components/shopping-view/LogoBanner";
import RecentProducts from "../../components/shopping-view/RecentProducts";
import Testimonials from "../../components/shopping-view/Testimonials";
import TopSelling from "../../components/shopping-view/TopSelling";

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <LogoBanner />
      <RecentProducts />
      <TopSelling />
      <BrowseBystyle />
      <Testimonials />
    </>
  );
};

export default HomePage;
