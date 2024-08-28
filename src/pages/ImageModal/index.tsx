import { MouseEventHandler, useRef, useState } from "react";
import ImageItem from "./ImageItem";
import useMagnifier from "./useMagnifier";
import { createPortal } from "react-dom";

export default function ImageModal() {
   const [isOpenModal, setIsOpenModal] = useState("");
   const magnifierRef = useRef<HTMLDivElement>(null);

   // hooks
   const { attrs } = useMagnifier({
      magnifierRef: magnifierRef,
   });
   const closeModal = () => setIsOpenModal("");

   const handleImageClick: MouseEventHandler<HTMLImageElement> = (e) => {
      const imageEle = e.target as HTMLImageElement;

      setIsOpenModal(imageEle.src);
   };

   return (
      <>
         <img
            className={
               "select-none touch-none cursor-zoom-in"
            }
            onClick={handleImageClick}
            {...attrs}
            src="https://res.cloudinary.com/dalg3ayqh/image/upload/v1720193214/mobile-wars/eaywqttlk5pzmdckvy4f.jpg"
            alt=""
         />

         {createPortal(
            <div
               ref={magnifierRef}
               className="top-[200px] left-[300px] pointer-events-none fixed bg-no-repeat"
            ></div>,
            document.querySelector("#portals")!
         )}

         <ImageItem closeModal={closeModal} isOpenModal={isOpenModal} />
      </>
   );
}
