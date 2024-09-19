import Button from "@/components/Button";
import MyPopup, { MyPopupContent, MyPopupTrigger, TriggerRef } from "./Popup";
import { useRef } from "react";
import ToolTip from "./ToolTip";

export default function PopupPage() {
   const triggerRef = useRef<TriggerRef>(null);

   const classes = {
      popupContainer:
         "bg-slate-700 flex flex-col w-[200px] p-2 rounded-md text-white ",
   };

   return (
      <>
         <div className="flex space-x-5">
            <MyPopup appendOnPortal>
               <MyPopupTrigger ref={triggerRef}>
                  <ToolTip
                     content="this is a tooltip"
                     className="bg-slate-700 text-white p-2 text-sm font-[500]"
                  >
                     <Button>
                        <span>Popup + tooltip portal</span>
                     </Button>
                  </ToolTip>
               </MyPopupTrigger>

               <MyPopupContent
                  className="top-[calc(100%+8px)]"
                  animationClassName="origin-top-left"
               >
                  <div className={classes.popupContainer}>
                     <div>Setting 1</div>
                     <div>Setting 2</div>
                     <div>Setting 3</div>
                  </div>
               </MyPopupContent>
            </MyPopup>

            <MyPopup>
               <MyPopupTrigger>
                  <ToolTip
                     content="this is a tooltip"
                     className="bg-slate-700 text-white p-2 text-sm font-[500]"
                  >
                     <Button>
                        <span>Popup + tooltip parent</span>
                     </Button>
                  </ToolTip>
               </MyPopupTrigger>

               <MyPopupContent
                  className="top-[calc(100%+8px)]"
                  animationClassName="origin-top-left"
               >
                  <div className={classes.popupContainer}>
                     <div>Setting 1</div>
                     <div>Setting 2</div>
                     <div>Setting 3</div>
                  </div>
               </MyPopupContent>
            </MyPopup>
         </div>
         <div className="flex space-x-5 mt-5">
            <MyPopup appendOnPortal>
               <MyPopupTrigger>
                  <Button>
                     <span>Popup portal</span>
                  </Button>
               </MyPopupTrigger>

               <MyPopupContent
                  className="top-[calc(100%+8px)]"
                  animationClassName="origin-top-left"
               >
                  <div className={classes.popupContainer}>
                     <div>Setting 1</div>
                     <div>Setting 2</div>
                     <div>Setting 3</div>
                  </div>
               </MyPopupContent>
            </MyPopup>
            <MyPopup appendOnPortal>
               <MyPopupTrigger>
                  <Button>
                     <span>Popup parent</span>
                  </Button>
               </MyPopupTrigger>

               <MyPopupContent
                  className="top-[calc(100%+8px)]"
                  animationClassName="origin-top-left"
               >
                  <div className={classes.popupContainer}>
                     <div>Setting 1</div>
                     <div>Setting 2</div>
                     <div>Setting 3</div>
                  </div>
               </MyPopupContent>
            </MyPopup>
         </div>
         <div className="flex space-x-5 mt-5">
            <ToolTip
               position="top-[calc(100%+8px)]"
               content="this is a tooltip"
            >
               <Button>Hover me</Button>
            </ToolTip>
            <ToolTip
               position="top-[calc(100%+8px)]"
               content="this is a tooltip"
            >
               <Button onClick={() => window.alert("hi")}>
                  Tooltip + click
               </Button>
            </ToolTip>
         </div>

         <div className="flex space-x-5 mt-5">
            {/* <MyPopup>
               <MyPopupTrigger>
                  <button>My popup</button>
               </MyPopupTrigger>
               <MyPopupContent>
                  <div className={classes.popupContainer}>
                     <div>Setting 1</div>
                     <div>Setting 2</div>
                     <div>Setting 3</div>
                  </div>
               </MyPopupContent>
            </MyPopup> */}
         </div>
      </>
   );
}
