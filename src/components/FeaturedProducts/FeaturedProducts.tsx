import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Items from "../../JSON/Items.json";
import { ShoppingCart } from "lucide-react";
import { useShopContext } from "@/context/Context";
import CustomModal from "../CustomModal/CustomModal";
import CustomModalDetails from "../CustomModalDetails/CustomModalDetails";

const FeaturedProducts = () => {
  const { selectedItem, setSelectedItem } = useShopContext();
  return (
    <div className="px-4 py-4">
      <Carousel
      // opts={{
      //   align: "start",
      // }}
      >
        <div className="text-2xl font-normal uppercase relative flex items-center py-8">
          <h3>Featured Products</h3>
          <div className="absolute flex gap-1 end-16">
            <CarouselPrevious className=" cursor-pointer hover:bg-amber-200" />
            <CarouselNext className=" cursor-pointer hover:bg-amber-200" />
          </div>
        </div>

        <CarouselContent>
          {Items.map((item, index) => (
            <CarouselItem
              key={index}
              className="md:basis-1/2 lg:basis-1/4"
              onClick={() => setSelectedItem(item)}
            >
              <div className="p-5">
                <div
                  key={item.id}
                  className="shadow p-4 rounded-md hover:shadow-lg duration-300 cursor-pointer hover:bg-amber-100 hover:scale-110"
                >
                  <figure className="flex items-center justify-center relative">
                    <img src={item.img} alt="Shoes" className="w-40" />
                    <div>
                      <p
                        className={`absolute top-0 left-0 py-1 px-2 rounded text-[9px] ${
                          item.edition !== "" ? " bg-green-300" : ""
                        }`}
                      >
                        {item.edition}
                      </p>

                      {/* <button className="absolute top-0 right-2 cursor-pointer bg-amber-200 p-1 rounded-full ">
                      <Star size={15} />
                    </button> */}
                    </div>
                  </figure>
                  <div className="flex justify-between gap-2 w-full">
                    <div className="flex flex-col gap-1">
                      <h3 className="font-semibold"> {item.name}</h3>
                      <div className="flex gap-3 items-center">
                        {item["newPrice"] && (
                          <p className="text-amber-500 font-semibold">
                            ${item["newPrice"]}
                          </p>
                        )}
                        <p
                          className={`${
                            item["newPrice"]
                              ? "line-through text-slate-500 text-[11px]"
                              : ""
                          }`}
                        >
                          ${item["originalPrice"]}
                        </p>
                      </div>
                      <p className="text-sm text-slate-400">{item.category}</p>
                    </div>
                    <div className="flex items-end">
                      <button className="bg-amber-200 p-2 rounded-full">
                        <ShoppingCart size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      {selectedItem && (
        <CustomModal w="w-1/2" h="h-2/3">
          <CustomModalDetails />
        </CustomModal>
      )}
    </div>
  );
};

export default FeaturedProducts;
