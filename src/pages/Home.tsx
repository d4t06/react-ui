import { useEffect, useRef, useState } from "react";

export default function Home() {
   const [trigger, setTrigger] = useState(0);

   const inputRef = useRef<HTMLTextAreaElement>(null);

   const handleTrigger = () => {
      const inputEle = inputRef.current;

      if (!inputEle) return;

      const changeEvent = new Event("change");

      inputEle.dispatchEvent(changeEvent);

      inputEle.value = Math.random() + "";
   };

   const onChange = () => {
      console.log("change");
   };

   useEffect(() => {
      inputRef.current?.addEventListener("change", onChange);

      return () => {
         inputRef.current?.removeEventListener("change", onChange);
      };
   });

   return (
      <>
         <p className="text-center">This is home {trigger}</p>;
         <button onClick={handleTrigger}>change</button>
         <textarea onChange={() => {console.log('on change')}} ref={inputRef} type="text" />
      </>
   );
}
