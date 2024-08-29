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
const MAG_HEIGHT = 3 / 5;
const MAG_WIDTH = 3 / 5;
const SPACER = 20;
const MAG_IMAGE_PADDING = {
   right: 1,
   bottom: 1,
};

export default function useMagnifier({ magnifierRef }: Props) {
   const update = (e: MouseEvent) => {
      const magnifierEle = magnifierRef.current;
      const imageEle = e.target as HTMLImageElement;

      if (!magnifierEle) return;

      const imageRect = imageEle.getBoundingClientRect();
      const mousePosInImage = { x: 0, y: 0 };
      const newBgPosCssProp = { x: "0px", y: "0px" };
      const newMagPos = {
         x: e.clientX + SPACER,
         y: e.clientY + SPACER,
      };

      mousePosInImage.x = e.clientX - imageRect.left;
      mousePosInImage.y = e.clientY - imageRect.top;

      // because the image in mag bigger ZOOM_FACTOR times
      // we want to display image
      const newBgPosX =
         mousePosInImage.x * ZOOM_FACTOR - magnifierEle.clientWidth;

      newBgPosCssProp.x = `-${newBgPosX}px`;

      const newBgPosY = mousePosInImage.y * ZOOM_FACTOR;

      newBgPosCssProp.y = `-${newBgPosY}px`;

      const imageSizeAppliedZoomFactor = {
         width: +(magnifierEle.clientWidth / ZOOM_FACTOR).toFixed(0),
         height: +(magnifierEle.clientHeight / ZOOM_FACTOR).toFixed(0),
      };

      if (newBgPosX < 0) newBgPosCssProp.x = "0px"; // near left
      if (newBgPosY < 0) newBgPosCssProp.y = "0px"; // near top

      const imageWidthRest = imageEle.clientWidth - mousePosInImage.x;

      // near right
      // this if statement make sure that mag alway contain image
      if (imageWidthRest * ZOOM_FACTOR < magnifierEle.clientWidth) {
         newBgPosCssProp.x = "100%";
      }

      const imageHeightRest = imageEle.clientHeight - mousePosInImage.y;

      // near bottom
      if (
         imageHeightRest +
            imageSizeAppliedZoomFactor.height * MAG_IMAGE_PADDING.bottom <
         imageSizeAppliedZoomFactor.height
      ) {
         newBgPosCssProp.y = "100%";
      }

      if (e.clientX + magnifierEle.clientWidth + SPACER > window.innerWidth)
         newMagPos.x = newMagPos.x - (magnifierEle.clientWidth + 2 * SPACER);

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
         (imageEle.clientWidth * MAG_WIDTH).toFixed(0) + "px";
      magnifierEle.style.height =
         (imageEle.clientHeight * MAG_HEIGHT).toFixed(0) + "px";
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
