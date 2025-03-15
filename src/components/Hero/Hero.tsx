import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const HeroHeader = [
  {
    id: 1,
    title: "First slide",
    description:
      "Nulla vitae elit libero, a pharetra augue mollis interdum.Nulla vitae elit libero, a pharetra augue mollis interdum.Nulla vitae elit libero, a pharetra augue mollis interdum.Nulla vitae elit libero, a pharetra augue mollis interdum.",
    price: "$19.99",
    learMore: "Learn more",
    img: "https://www.pngall.com/wp-content/uploads/2016/04/Women-Bag-PNG-HD.png",
  },
  {
    id: 2,
    title: "Second slide",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.a pharetra augue mollis interdum.Nulla vitae elit libero, a pharetra augue mollis interdum.Nulla vitae elit libero, a pharetra augue mollis interdum.",
    price: "$29.99",
    learMore: "Learn more",
    img: "https://www.pngall.com/wp-content/uploads/2016/04/Women-Bag-PNG-HD.png",
  },
  {
    id: 3,
    title: "Third slide",
    description:
      "Praesent commodo cursus magna, vel scelerisque nisl consectetur.a pharetra augue mollis interdum.Nulla vitae elit libero, a pharetra augue mollis interdum.Nulla vitae elit libero, a pharetra augue mollis interdum.",
    price: "$39.99",
    learMore: "Learn more",
    img: "https://www.pngall.com/wp-content/uploads/2016/04/Women-Bag-PNG-HD.png",
  },
];
const Hero = () => {
  return (
    <div className="py-9 bg-amber-100 ">
      <Carousel
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
      >
        <CarouselContent>
          {HeroHeader.map((item, index) => (
            <CarouselItem key={index}>
              <div className="py-9 grid grid-cols-3 w-[800px] mx-auto">
                <div
                  className="col-span-2 flex items-center "
                  // style={{
                  //   backgroundImage: `url(${item.img})`,
                  //   backgroundSize: "cover",
                  //   backgroundPosition: "center",
                  // }}
                >
                  <div className="flex flex-col justify-between h-full">
                    <h1 className="text-3xl uppercase">{item.title}</h1>
                    <p className=" ">{item.description}</p>
                    <div className="flex gap-4 items-center">
                      <p className="bg-amber-300 text-white px-4 py-2 rounded cursor-pointer">
                        {item.learMore}
                      </p>
                      <p>{item.price}</p>
                    </div>
                  </div>
                </div>
                <div className="col-span-1 grid justify-center items-center">
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
