import Button from "@/components/Button";
import { ElementRef, useEffect, useRef, useState } from "react";
import Modal2, { ModalRef } from "./Modal2";
// import AnimationManagement from "./AnimationMangement";

export default function AnimationRendering() {
   const [isOpen, setIsOpen] = useState(false);
   const [isOpen2, setIsOpen2] = useState(false);

   const [isMounted, setIsMounted] = useState(false);

   const wrapperRef = useRef<ElementRef<"div">>(null);
   const modalRef = useRef<ModalRef>(null);

   const classes = {
      container:
         "absolute duration-300 ease-linear transition-transform left-5 right-5 flex items-center h-[200px] justify-center  bottom-0 rounded-xl bg-slate-700 text-white",
      unMounted: "!opacity-0 scale-[.8]",
      mounted: "!opacity-1 scale-[1]",
   };

   useEffect(() => {
      const wrapperEle = wrapperRef.current;
      if (!wrapperEle) return;

      if (isOpen) {
         wrapperEle.style.transform = "translate(0, 20%)";
         wrapperEle.style.zIndex = "99";
      } else {
         wrapperEle.style.transform = "translate(0, 100%)";
         setTimeout(() => {
            wrapperEle.style.zIndex = "-10";
         }, 500);
      }
   }, [isOpen]);

   useEffect(() => {
      if (!isMounted) {
         setTimeout(() => {
            setIsOpen2(false);
         }, 300);
      }
   }, [isMounted]);

   useEffect(() => {
      if (isOpen2) {
         // setTimeout(() => {
         // }, 0);
         setIsMounted(true);
      }
   }, [isOpen2]);

   return (
      <>
         <div className="flex space-x-1">
            <Button onClick={() => setIsOpen(!isOpen)}>
               {isOpen ? "Close1" : "Open1"}
            </Button>

            <div className="relative">
               <Button
                  onClick={() => {
                     if (isMounted) setIsMounted(false);
                     // setIsMounted(!isMounted);
                     if (!isOpen2) setIsOpen2(true);
                  }}
               >
                  {isOpen2 ? "Close2" : "Open2"}
               </Button>
               {isOpen2 && (
                  <div className="absolute ease-linear  bottom-[calc(100%+8px)] left-0 w-[100px]">
                     <div
                        className={`transition-all bg-slate-700 rounded-md p-2 text-white  duration-300 ${
                           isMounted ? classes.mounted : classes.unMounted
                        }`}
                        // onAnimationEnd={() => {
                        //    console.log("end");

                        //    if (!isMounted) setIsOpen2(false);
                        // }}
                     >
                        this is a small text
                     </div>
                     {/* <AnimationManagement isOpen={isOpen2}> */}
                     {/* </AnimationManagement> */}
                  </div>
               )}
            </div>

            <Button onClick={() => modalRef.current?.toggle()}>Modal 2</Button>
         </div>
         <div
            style={{ transform: "translate(0, 100%)" }}
            ref={wrapperRef}
            className={classes.container}
         >
            <p>This is small text</p>
         </div>
         <Modal2 ref={modalRef}>
            <p>This is small text</p>
         </Modal2>
      </>
   );
}
