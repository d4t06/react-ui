import { useEffect, useState } from "react";

type Snowflake = {
   id: number;
   left: number;
   size: number;
   opacity: number;
   animationDuration: number;
};

export default function Tet() {
   const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);

   useEffect(() => {
      const generateSnowflakes = () => {
         const newSnowflakes: Snowflake[] = [];
         for (let i = 0; i < 10; i++) {
            newSnowflakes.push({
               id: i,
               left: Math.random() * 100,
               size: Math.random() * 3 + 5,
               opacity: Math.random() * 0.6 + 0.4,
               animationDuration: Math.random() * 10 + 10,
            });
         }
         setSnowflakes(newSnowflakes);
      };

      generateSnowflakes();
   }, []);

   return (
      <div className="relative h-full w-full">
         {snowflakes.map((snowflake) => (
            <div
               key={snowflake.id}
               className="absolute bg-[#efe050] rounded-full"
               style={{
                  left: `${snowflake.left.toFixed(1)}%`,
                  width: `${snowflake.size.toFixed(1)}px`,
                  height: `${snowflake.size.toFixed(1)}px`,
                  opacity: snowflake.opacity.toFixed(1),
                  animation: `fall ${snowflake.animationDuration}s linear infinite`,
               }}
            />
         ))}




         <textarea name="" id=""></textarea>
         <style>{`
         @keyframes fall {
           0% {
             transform: translateY(-10px);
           }
           100% {
             transform: translateY(100vh);
           }
         }
       `}</style>
      </div>
   );
}
