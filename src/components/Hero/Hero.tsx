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
          {HeroHeader.map((item, index) => (
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
                        {item.learMore}
                      </p>
                      <p>{item.price}</p>
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
