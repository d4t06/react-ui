import Button from "@/components/Button";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import useSlider from "./useImageSlider";

interface ImageSliderProps {
   images: string[];
   className?: string;
   autoPlay?: boolean;
}

export default function ImageSlider({
   images,
   autoPlay = false,
   className = "",
}: ImageSliderProps) {
   const { next, previous, goToSlide, currentIndex } = useSlider({
      images,
      autoPlay,
   });

   if (!images || images.length === 0) {
      return (
         <div className="flex items-center justify-center h-96 bg-gray-100 rounded-lg">
            <p className="text-gray-500">No images to display</p>
         </div>
      );
   }

   return (
      <div className={`relative h-full ${className}`}>
         {/* Main image container */}
         <div className="relative h-full overflow-hidden rounded-lg bg-gray-100">
            <div
               className="flex transition-transform duration-500 ease-in-out h-full"
               style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
               {images.map((image, index) => (
                  <div key={index} className="w-full h-full flex-shrink-0 relative">
                     <img
                        src={image || "/placeholder.svg"}
                        className="w-full h-full object-cover object-center"
                     />
                  </div>
               ))}
            </div>

            {/* Navigation buttons */}
            {images.length > 1 && (
               <>
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                     <Button
                        size={"clear"}
                        colors={"second"}
                        className=" p-1.5"
                        onClick={previous}
                        aria-label="Previous image"
                     >
                        <ChevronLeftIcon className="w-4" />
                     </Button>
                  </div>

                  <div className="!absolute right-4 top-1/2 transform -translate-y-1/2">
                     <Button
                        size={"clear"}
                        colors={"second"}
                        className="p-1.5"
                        onClick={next}
                        aria-label="Next image"
                     >
                        <ChevronRightIcon className="w-4" />
                     </Button>
                  </div>
               </>
            )}
         </div>

         {/* Indicators */}
         {images.length > 1 && (
            <div className="flex justify-center space-x-2 mt-4">
               {images.map((_, index) => (
                  <button
                     key={index}
                     className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                        index === currentIndex
                           ? "bg-blue-600"
                           : "bg-gray-300 hover:bg-gray-400"
                     }`}
                     onClick={() => goToSlide(index)}
                     aria-label={`Go to slide ${index + 1}`}
                  />
               ))}
            </div>
         )}

         {/* Image counter */}
         <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
            {currentIndex + 1} / {images.length}
         </div>
      </div>
   );
}
