import {
   HTMLAttributes,
   MouseEvent,
   MouseEventHandler,
   RefObject,
} from "react";

type Props = {
   magnifierRef: RefObject<HTMLDivElement>;
};

const ZOOM_FACTOR = 3;
// const MAG_HEIGHT = 3 / 5;
// const MAG_WIDTH = 3 / 5;
const SPACER = 20;

export default function useMagnifier({ magnifierRef }: Props) {
   const update = (e: MouseEvent) => {
      const magnifierEle = magnifierRef.current;
      const imageEle = e.target as HTMLImageElement;

      if (!magnifierEle) return;

      const imageRect = imageEle.getBoundingClientRect();
      const mousePosInImage = { x: 0, y: 0 };
      const newBgPosCssProp = { x: "0px", y: "0px" };
      const newMagPos = {
         x: e.clientX - (magnifierEle.clientWidth + SPACER),
         y: e.clientY + SPACER,
      };

      mousePosInImage.x = e.clientX - imageRect.left;
      mousePosInImage.y = e.clientY - imageRect.top;

      // because the image in mag bigger ZOOM_FACTOR times
      // magnifierEle.clientWidth / 2 -> move the zoom area center the pointer
      const newBgPosX =
         mousePosInImage.x * ZOOM_FACTOR - magnifierEle.clientWidth / 2;

      const newBgPosY =
         mousePosInImage.y * ZOOM_FACTOR - magnifierEle.clientHeight / 2;

      newBgPosCssProp.x = `-${newBgPosX}px`;
      newBgPosCssProp.y = `-${newBgPosY}px`;

      if (newBgPosX < 0) newBgPosCssProp.x = "0px"; // near left
      if (newBgPosY < 0) newBgPosCssProp.y = "0px"; // near top

      // near right
      // imageWidthRest * ZOOM_FACTOR -> actually size
      // magnifierEle.clientWidth / 2
      // -> because we had move the zoom area to the center of pointer
      const imageWidthRest = imageEle.clientWidth - mousePosInImage.x;
      if (
         imageWidthRest * ZOOM_FACTOR + magnifierEle.clientWidth / 2 <
         magnifierEle.clientWidth
      ) {
         newBgPosCssProp.x = "100%";
      }

      // near bottom
      const imageHeightRest = imageEle.clientHeight - mousePosInImage.y;
      if (
         imageHeightRest * ZOOM_FACTOR + magnifierEle.clientHeight / 2 <
         magnifierEle.clientHeight
      ) {
         newBgPosCssProp.y = "100%";
      }

      if (magnifierEle.clientWidth + SPACER > e.clientX)
         newMagPos.x = newMagPos.x + (magnifierEle.clientWidth + 2 * SPACER);

      if (e.clientY + magnifierEle.clientHeight + SPACER > window.innerHeight)
         newMagPos.y = newMagPos.y - (magnifierEle.clientHeight + 2 * SPACER);

      magnifierEle.style.left = newMagPos.x + "px";
      magnifierEle.style.top = newMagPos.y + "px";

      magnifierEle.style.backgroundPosition = `${newBgPosCssProp.x} ${newBgPosCssProp.y}`;
   };

   const handleMouseEnter: MouseEventHandler = (e) => {
      const magnifierEle = magnifierRef.current;
      if (!magnifierEle) return;

      const imageEle = e.target as HTMLImageElement;
      if (!imageEle) return;

      magnifierEle.style.width =
         imageEle.width * ZOOM_FACTOR >= 0.4 * window.innerWidth
            ? "40vw"
            : // (imageEle.clientWidth * MAG_WIDTH).toFixed(0) + "px";
              imageEle.width * ZOOM_FACTOR + "px";

      magnifierEle.style.height =
         imageEle.height * ZOOM_FACTOR >= 0.4 * window.innerWidth
            ? "40vh"
            : // (imageEle.clientHeight * MAG_HEIGHT).toFixed(0) + "px";
              imageEle.height * ZOOM_FACTOR + "px";

      magnifierEle.style.display = "block";
      magnifierEle.style.backgroundImage = `url(${imageEle.src})`;
      magnifierEle.style.backgroundSize = `
      ${imageEle.width * ZOOM_FACTOR}px ${
         imageEle.clientHeight * ZOOM_FACTOR
      }px`;

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
