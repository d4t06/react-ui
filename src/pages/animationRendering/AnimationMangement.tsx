import { ElementRef, ReactNode, useEffect, useRef } from "react";

type Props = {
   isOpen: boolean;
   children: ReactNode;
};

export default function AnimationManagement({ children, isOpen }: Props) {
   const wrapperRef = useRef<ElementRef<"div">>(null);

   // useEffect(() => {
   //    const wrapperEle = wrapperRef.current;
   //    if (!wrapperEle) return;

   //    if (isOpen) {
   //       wrapperEle.style.transform = "translate(0, 20%)";
   //       wrapperEle.style.zIndex = "99";
   //    } else {
   //       wrapperEle.style.transform = "translate(0, 100%)";
   //       setTimeout(() => {
   //          wrapperEle.style.zIndex = "-10";
   //       }, 500);
   //    }
   // }, [isOpen]);

   return (
      <div
         style={{
            opacity: "0.8",
            scale: "(0.8)",
         }}
         ref={wrapperRef}
      >
         {children}
      </div>
   );
}
