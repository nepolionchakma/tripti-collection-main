import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
const RecentlyAdded = () => {
  return (
    <div className="bg-amber-50 px-4 py-4">
      <Carousel
      // opts={{
      //   align: "start",
      // }}
      >
        <div className="text-2xl font-normal uppercase relative flex items-center py-8">
          <h3>Recently Added</h3>
          <div className="absolute flex gap-1 end-16">
            <CarouselPrevious className=" cursor-pointer hover:bg-amber-200" />
            <CarouselNext className=" cursor-pointer hover:bg-amber-200" />
          </div>
        </div>

        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-3xl font-semibold">{index + 1}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default RecentlyAdded;
