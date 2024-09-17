import { useRef, useState } from "react";
import useScrollText from "./useScrollText";
import Button from "@/components/Button";

export default function ScrollTexPage() {
   const [text, setText] = useState("");

   const textWrapperRef = useRef<HTMLDivElement>(null);
   const textRef = useRef<HTMLDivElement>(null);

   useScrollText({ textRef, textWrapperRef, content: text });

   return (
      <div>
         <div className="w-[200px]">
            <div
               ref={textWrapperRef}
               className={`relative overflow-hidden mask`}
            >
               <div
                  ref={textRef}
                  className={`absolute left-0 min-w-full top-0 text-red-500 whitespace-nowrap`}
               >
                  {text}
               </div>
            </div>
         </div>

         <p>{text}</p>

         <Button
            onClick={() =>
               setText(
                  Math.round(Math.random() * 10) > 5
                     ? `const unScrollTimerId`
                     : `const unScrollTimerId = useRef<number>();`
               )
            }
         >
            Change
         </Button>
      </div>
   );
}
