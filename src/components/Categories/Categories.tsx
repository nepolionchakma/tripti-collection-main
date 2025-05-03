import CategoryItems from "../../JSON/Categories.json";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
const Categories = () => {
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
          {CategoryItems.map((item, index) => (
            <CarouselItem
              key={index}
              className="basis-1/3 md:basis-1/5 lg:basis-1/6 p-3"
            >
              <div>
                <div
                  key={item.id}
                  className="bg-amber-200 p-2 rounded flex flex-col items-center justify-center"
                >
                  <h1>{item.category}</h1>
                  <img src={item.img} alt="Image" className="w-20 h-20" />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default Categories;
