import { useEffect, useState } from "react";

export default function Home() {
   const [trigger, setTrigger] = useState(0);

   useEffect(() => {
    //   if (1) return;

      return () => {
         console.log("clean up");
      };
   }, [trigger]);

   return (
      <>
         <p className="text-center">This is home {trigger}</p>;
         <button onClick={() => setTrigger(Math.random)}>change</button>
      </>
   );
}
