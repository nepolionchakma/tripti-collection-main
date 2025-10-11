import Categories from "@/components/Categories/Categories";
import FeaturedProducts from "@/components/FeaturedProducts/FeaturedProducts";
import Footer from "@/components/Footer/Footer";
import Features from "@/components/Features/Features";
import Hero from "@/components/Hero/Hero";
import OurProducts from "@/components/OurProducts/OurProducts";
import RecentlyAdded from "@/components/RecentlyAdded/RecentlyAdded";
import { useShopContext } from "@/context/Global/GlobalContext";
import Spinner from "@/components/Spinner/Spinner";

const Home = () => {
  const { isLoading } = useShopContext();
  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center h-screen">
          <Spinner size="100" color="orange" speed="1.75" />
        </div>
      ) : (
        <div>
          <Hero />
          <FeaturedProducts />
          <Categories />
          <OurProducts />
          <RecentlyAdded />
          <Features />
          <Footer />
        </div>
      )}
    </>
  );
};

export default Home;
