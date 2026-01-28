import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useShopContext } from "@/context/Global/GlobalContext";
import { NavLink } from "react-router";
const Categories = () => {
  const { categories } = useShopContext();

  return (
    <div className="bg-amber-50 px-4 py-8">
      <Carousel
      // opts={{
      //   align: "start",
      // }}
      >
        <div className="text-2xl font-normal uppercase relative flex items-center pb-8">
          <h3>Categories</h3>
          <div className="absolute flex gap-1 end-16">
            <CarouselPrevious className=" cursor-pointer hover:bg-amber-200" />
            <CarouselNext className=" cursor-pointer hover:bg-amber-200" />
          </div>
        </div>

        <CarouselContent>
          {categories.map((item, index) => (
            <CarouselItem
              key={index}
              className="basis-1/3 md:basis-1/5 lg:basis-1/9 p-3 hover:scale-105 transition-transform duration-200 first:ml-4 last:mr-4 relative"
            >
              <NavLink to={`/categories/${item.category_name}`}>
                <div
                  key={item.category_id}
                  className="group bg-amber-200 p-2 rounded flex flex-col items-center justify-center"
                >
                  <h1 className="font-bold absolute bottom-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    {item.category_name}
                  </h1>
                  <img
                    src={item.category_image}
                    alt="Image"
                    className="w-20 h-20 p-2 bg-amber-400"
                  />
                </div>
              </NavLink>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default Categories;
