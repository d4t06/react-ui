import { useRef, useState } from "react";
// import songImage from '@/assets/song-image.png'

type Props = {
   src?: string;
   className?: string;
   width?: string;
   onError?: () => void;
};

export default function Image({
   src,
   className = "",
   onError,
}: Props) {
   const [imageLoaded, setImageLoaded] = useState(false);
   const imageRef = useRef<HTMLImageElement>(null);

   const handleLoadImage = () => {
      setImageLoaded(true);

      if (!src) return;
      if (src?.includes("blob")) {
         URL.revokeObjectURL(src);
      }
   };

   const defaultHandleError = () => {
      const imageEle = imageRef.current as HTMLImageElement;
      imageEle.src = "https://placehold.co/400";
      setImageLoaded(true);
   };

   const handleError = () => {
      console.log("image error");
      !!onError ? [onError(), defaultHandleError()] : defaultHandleError();
   };

   return (
      <>
         <img
            onLoad={handleLoadImage}
            onError={handleError}
            className={`${className} ${!imageLoaded ? "hidden" : ""}`}
            src={src || "https://placehold.co/400"}
            ref={imageRef}
         />
      </>
   );
}
