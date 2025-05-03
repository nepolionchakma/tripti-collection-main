import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useShopContext } from "@/context/Context";
import { useState } from "react";
const ImageSlide = () => {
  const { selectedItem } = useShopContext();
  const [img, setImg] = useState(selectedItem?.images[0]);
  return (
    <div className="flex flex-col justify-between h-full p-2">
      <div className="flex items-center justify-center">
        <img src={img} alt="Selected Image" className="w-30 md:w-52" />
      </div>
      <Carousel
        className="px-4 sm:hidden flex justify-center items-center gap-2"
        orientation="vertical"
      >
        <CarouselContent className="px-8">
          {selectedItem?.images.map((img, index) => (
            <CarouselItem
              key={index}
              className="pl-1 md:basis-1/2 lg:basis-1/4"
            >
              <img
                src={img}
                alt="img"
                onClick={() => setImg(img)}
                className={`${
                  img === img ? " border border-amber-400 bg-amber-100" : ""
                } cursor-pointer w-20`}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        {selectedItem?.images && selectedItem?.images.length > 4 && (
          <>
            <CarouselPrevious className="left-2 w-5 h-5 cursor-pointer" />
            <CarouselNext className="right-2 w-5 h-5 cursor-pointer" />
          </>
        )}
      </Carousel>
      <Carousel className="px-4 hidden sm:block">
        <CarouselContent className="px-8">
          {selectedItem?.images.map((img, index) => (
            <CarouselItem
              key={index}
              className="pl-1 md:basis-1/2 lg:basis-1/4"
            >
              <img
                src={img}
                alt="img"
                onClick={() => setImg(img)}
                className={`${
                  img === img ? " border border-amber-400 bg-amber-100" : ""
                } cursor-pointer`}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        {selectedItem?.images && selectedItem?.images.length > 4 && (
          <>
            <CarouselPrevious className="left-2 w-5 h-5 cursor-pointer" />
            <CarouselNext className="right-2 w-5 h-5 cursor-pointer" />
          </>
        )}
      </Carousel>
    </div>
  );
};

export default ImageSlide;
