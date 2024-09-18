import Button from "@/components/Button";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import MyPopup, { MyPopupContent, MyPopupTrigger, TriggerRef } from "./popup";
import { useRef } from "react";
import ToolTip from "./ToolTip";

export default function PopupPage() {
   const triggerRef = useRef<TriggerRef>(null);

   return (
      <div className="flex space-x-5">
         <Button onClick={() => triggerRef.current?.close()}>
            Close from parent
         </Button>

         <MyPopup>
            <MyPopupTrigger ref={triggerRef}>
               <ToolTip  content="this is a tooltip" className="bg-slate-700 text-white p-2 text-sm font-[500]">
                  <Button>
                     <Cog6ToothIcon className="w-6" />
                  </Button>
               </ToolTip>
            </MyPopupTrigger>

            <MyPopupContent
               className="top-[calc(100%+8px)]"
               animationClassName="origin-top-left"
            >
               <div className="bg-[#cd1818] flex flex-col w-[200px] p-2 rounded-md text-white ">
                  <div>Setting 1</div>
                  <div>Setting 2</div>
                  <div>Setting 3</div>
               </div>
            </MyPopupContent>
         </MyPopup>

         <ToolTip  content="this is a tooltip 2">
            <Button>Hover me</Button>
         </ToolTip>
      </div>
   );
}
