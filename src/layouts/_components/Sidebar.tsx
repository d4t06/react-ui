import Button from "@/components/Button";
import { publicRoutes } from "@/routes";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import { AtSymbolIcon, HomeIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function DashBoardSidebar() {
   const [expand, setExpand] = useState(false);

   const pathName: string = "";

   const classes = {
      container:
         "bg-[#fff] border-r border-black/15 transition-[width] h-ful flex flex-col relative flex-shrink-0 w-[50px] sm:w-[70px]",
      containerExpand: "!w-[180px]",
      head: "h-[60px] flex items-center justify-center",
      logoText: "text-[22px] font-[500] whitespace-nowrap tracking-[-1px]",
      logoImage: "max-w-[50px] p-[4px]",
      item: "flex whitespace-nowrap space-x-[6px] items-center justify-center p-[10px] text-[#333] hover:text-[#cd1818] hover:bg-[#f8f8f8]",
      itemActive: "text-[#cd1818] bg-[#f1f1f1]",
      icon: "w-[24px] flex-shrink-0",
   };

   return (
      <div className={`${classes.container} ${expand ? classes.containerExpand : ""}`}>
         <div className={classes.head}>
            {expand ? (
               <h1 className={classes.logoText}>
                  React <span className="text-[#cd1818]">UI</span>
               </h1>
            ) : (
               <h1 className={classes.logoText}>
                  R <span className="text-[#cd1818]">UI</span>
               </h1>
            )}
         </div>

         <div className="overflow-auto h-full pb-10">
            <div>
               <Link
                  to="/"
                  className={`${classes.item} ${expand ? "!justify-start" : ""}
               ${pathName === "/" ? classes.itemActive : ""}
               `}
               >
                  <HomeIcon className={classes.icon} />
                  {expand && <span>Home</span>}
               </Link>

               {publicRoutes.map((r, index) => (
                  <Link
                     key={index}
                     className={`${classes.item} ${expand ? "!justify-start" : ""}
                  ${pathName === r.path ? classes.itemActive : ""}`}
                     to={r.path}
                  >
                     <AtSymbolIcon className={classes.icon} />
                     {expand && <span>{r.title}</span>}
                  </Link>
               ))}
            </div>
         </div>

         <div className="!absolute bottom-[20px] right-0 translate-x-[50%] z-[10]">
            <Button
               onClick={() => setExpand((prev) => !prev)}
               className="p-[4px] "
               size={"clear"}
               border={"clear"}
            >
               {expand ? (
                  <ChevronLeftIcon className="w-[24px] " />
               ) : (
                  <ChevronRightIcon className="w-[24px]" />
               )}
            </Button>
         </div>
      </div>
   );
}
