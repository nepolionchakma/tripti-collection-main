import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Product } from "@/types/Types";
import { useEffect, useState } from "react";

interface ImageSlideProps {
  data: Product;
}

const ImageSlide = ({ data }: ImageSlideProps) => {
  const [img, setImg] = useState(data?.images[0]);

  useEffect(() => {
    setImg(data?.images[0]);
  }, [data]);

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
          {data?.images.map((img, index) => (
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
        {data?.images && data?.images.length > 4 && (
          <>
            <CarouselPrevious className="left-2 w-5 h-5 cursor-pointer" />
            <CarouselNext className="right-2 w-5 h-5 cursor-pointer" />
          </>
        )}
      </Carousel>
      <Carousel className="px-4 hidden sm:block">
        <CarouselContent className="px-8">
          {data?.images.map((img, index) => (
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
        {data?.images && data?.images.length > 4 && (
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
