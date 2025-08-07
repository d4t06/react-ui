import { useEffect, useState } from "react";
import DashBoardSidebar from "./_components/Sidebar";
import { Outlet } from "react-router-dom";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";

export default function DefaultLayout() {
   const [isDark, setIsDark] = useState(false);

   useEffect(() => {
      const meta = document.querySelector(".my-tag");
      const html = document.querySelector("html");

      if (html) {
         if (isDark) {
            html.classList.add("dark");
            if (meta) meta.setAttribute("content", "#000");
         } else {
            html.classList.remove("dark");
            if (meta) meta.setAttribute("content", "#fff");
         }
      }
   }, [isDark]);

   return (
      <>
         <div className="flex fixed top-0 bottom-0 w-full text-[--text-cl]">
            <DashBoardSidebar />
            <div className="w-full dark:bg-slate-800 transition-color duration-[.3s] flex relative flex-col items-center justify-center">
               {/* <div className="absolute translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%]"> */}
               <Outlet />
               {/* </div> */}
            </div>

            <button
               onClick={() => setIsDark(!isDark)}
               className="fixed top-4 right-4 z-[99] text-black dark:text-white"
            >
               {isDark ? <MoonIcon className="w-6" /> : <SunIcon className="w-6" />}
            </button>
         </div>
      </>
   );
}
