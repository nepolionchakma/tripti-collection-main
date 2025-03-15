import Categories from "@/components/Categories/Categories";
import FeaturedProducts from "@/components/FeaturedProducts/FeaturedProducts";
import Footer from "@/components/Footer/Footer";
import Features from "@/components/Features/Features";
import Hero from "@/components/Hero/Hero";
import OurProducts from "@/components/OurProducts/OurProducts";
import RecentlyAdded from "@/components/RecentlyAdded/RecentlyAdded";

const Home = () => {
  return (
    <div>
      <Hero />
      <FeaturedProducts />
      <Categories />
      <OurProducts />
      <RecentlyAdded />
      <Features />
      <Footer />
    </div>
  );
};

export default Home;
