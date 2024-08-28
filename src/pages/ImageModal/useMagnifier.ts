import { HTMLAttributes, MouseEvent, MouseEventHandler, RefObject, useRef } from "react";

type Props = {
   magnifierRef: RefObject<HTMLDivElement>;
};

const ZOOM_FACTOR = 1.8;
const MAG_HEIGHT = 1 / 3;
const MAG_WIDTH = 1 / 2;
const SPACER = 20;
const MAG_IMAGE_PADDING = {
   left: 1 / 2,
   top: 1 / 2,
};

export default function useMagnifier({ magnifierRef }: Props) {
   const bgPos = useRef({
      x: 0,
      y: 0,
   });

   const update = (e: MouseEvent) => {
      const magnifierEle = magnifierRef.current;
      const imageEle = e.target as HTMLImageElement;

      if (!magnifierEle) return;

      const imageRect = imageEle.getBoundingClientRect();
      const mousePosInImage = { x: 0, y: 0 };
      const newBgPos = { x: 0, y: 0 };
      const newMagPos = {
         x: e.clientX + SPACER,
         y: e.clientY + SPACER,
      };

      mousePosInImage.x = e.clientX - imageRect.left;
      mousePosInImage.y = e.clientY - imageRect.top;

      newBgPos.x =
         mousePosInImage.x * ZOOM_FACTOR -
         magnifierEle.clientWidth * MAG_IMAGE_PADDING.left;
      newBgPos.y =
         mousePosInImage.y * ZOOM_FACTOR -
         magnifierEle.clientHeight * MAG_IMAGE_PADDING.top;

      const imageSizeInMag = {
         width: +(magnifierEle.clientWidth / ZOOM_FACTOR).toFixed(0),
         height: +(magnifierEle.clientHeight / ZOOM_FACTOR).toFixed(0),
      };

      if (newBgPos.x < 0) newBgPos.x = 0; // near left
      if (newBgPos.y < 0) newBgPos.y = 0; // near top

      if (
         imageEle.clientWidth -
            mousePosInImage.x +
            imageSizeInMag.width * MAG_IMAGE_PADDING.left <
         imageSizeInMag.width
      )
         // near right
         newBgPos.x = bgPos.current.x;
      if (
         imageEle.clientHeight -
            mousePosInImage.y +
            imageSizeInMag.height * MAG_IMAGE_PADDING.top <
         imageSizeInMag.height
      )
         // near bottom
         newBgPos.y = bgPos.current.y;

      if (e.clientX + magnifierEle.clientWidth + SPACER > window.innerWidth)
         newMagPos.x = newMagPos.x - (magnifierEle.clientWidth + 2 * SPACER);

      if (e.clientY + magnifierEle.clientHeight + SPACER > window.innerHeight)
         newMagPos.y = newMagPos.y - (magnifierEle.clientHeight + 2 * SPACER);

      magnifierEle.style.left = newMagPos.x + "px";
      magnifierEle.style.top = newMagPos.y + "px";

      magnifierEle.style.backgroundPosition = `${-newBgPos.x}px ${-newBgPos.y}px`;

      bgPos.current.x = newBgPos.x;
      bgPos.current.y = newBgPos.y;
   };

   const handleMouseEnter: MouseEventHandler = (e) => {
      const magnifierEle = magnifierRef.current;
      if (!magnifierEle) return;

      const imageEle = e.target as HTMLImageElement;
      if (!imageEle) return;

      magnifierEle.style.width = (imageEle.clientWidth * MAG_WIDTH).toFixed(0) + "px";
      magnifierEle.style.height = (imageEle.clientHeight * MAG_HEIGHT).toFixed(0) + "px";
      magnifierEle.style.display = "block";
      magnifierEle.style.backgroundImage = `url(${imageEle.src})`;
      magnifierEle.style.backgroundSize = `
      ${imageEle.width * ZOOM_FACTOR}px ${imageEle.clientHeight * ZOOM_FACTOR}px`;

      update(e);
   };

   const handleMouseMove: MouseEventHandler = (e) => {
      update(e);
   };

   const handleMouseLeave: MouseEventHandler = () => {
      const magnifierEle = magnifierRef.current;
      if (!magnifierEle) return;

      magnifierEle.style.display = "none";
   };

   const attrs: HTMLAttributes<HTMLImageElement> = {
      onMouseEnter: handleMouseEnter,
      onMouseMove: handleMouseMove,
      onMouseLeave: handleMouseLeave,
   };

   return { attrs };
}
