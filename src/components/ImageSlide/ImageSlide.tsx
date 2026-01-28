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
        <img src={img} alt="Selected Image" className="w-64 md:w-72 lg:w-80" />
      </div>
      <Carousel className="px-4">
        <CarouselContent className="px-8 py-4">
          {data?.images.map((img, index) => (
            <CarouselItem
              key={index}
              className="pl-1 basis-1/3 sm:basis-1/4 md:basis-1/3 lg:basis-1/4"
            >
              <img
                src={img}
                alt="img"
                onClick={() => setImg(img)}
                className={`${
                  img === img ? " border border-amber-400 bg-amber-100" : ""
                } cursor-pointer w-20 md:w-24 lg:w-28`}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        {data?.images && data?.images.length > 2 && (
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
