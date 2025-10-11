import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useShopContext } from "@/context/Global/GlobalContext";
import Autoplay from "embla-carousel-autoplay";
import { NavLink } from "react-router";

const Hero = () => {
  const { heroProducts } = useShopContext();
  return (
    <div className="py-9 bg-amber-100 mx-2 rounded">
      <Carousel
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
        className=" "
      >
        <CarouselContent>
          {heroProducts.map((item, index) => (
            <CarouselItem key={index}>
              <div className="py-9 px-6 md:px-auto grid grid-cols-3 ">
                <div
                  className="col-span-3 md:col-span-2 flex items-center "
                  // style={{
                  //   backgroundImage: `url(${item.img})`,
                  //   backgroundSize: "cover",
                  //   backgroundPosition: "center",
                  // }}
                >
                  <div className="flex flex-col justify-between h-full">
                    <h1 className="text-3xl uppercase">{item.title}</h1>
                    <div className=" md:hidden flex gap-4 items-center">
                      <p className="col-span-2 sm:hidden">
                        {item.description.slice(0, 90) + " ..."}
                      </p>
                      <p className="col-span-2 sm:block hidden">
                        {item.description.slice(0, 150) + " ..."}
                      </p>
                      <img
                        src={item.img}
                        alt="Image"
                        className="w-30 h-30 sm:w-40 sm:h-40"
                      />
                    </div>
                    <p className="hidden md:block">{item.description}</p>
                    <div className="flex gap-4 items-center">
                      <p className="bg-amber-300 text-white px-4 py-2 rounded cursor-pointer">
                        <NavLink to={`/product/${item.product_id}`}>
                          Load More
                        </NavLink>
                      </p>
                      <div className="flex gap-3 items-center">
                        {item.prices.new_price && (
                          <p className="text-amber-500 font-semibold">
                            ${item.prices.new_price}
                          </p>
                        )}
                        <p
                          className={`${
                            item.prices.new_price
                              ? "line-through text-slate-500 text-[11px]"
                              : ""
                          }`}
                        >
                          ${item.prices.original_price}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-span-1 md:grid justify-center items-center hidden">
                  <img src={item.img} alt="Image" className="w-56 h-48" />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4 cursor-pointer hover:bg-amber-200" />
        <CarouselNext className="right-4 cursor-pointer hover:bg-amber-200" />
      </Carousel>
    </div>
  );
};

export default Hero;
