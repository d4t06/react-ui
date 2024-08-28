import DashBoardSidebar from "./_components/Sidebar";
import { Outlet } from "react-router-dom";

export default function DefaultLayout() {
   return (
      <>
         <div className="flex fixed top-0 bottom-0 w-full">
            <DashBoardSidebar />
            <div className="relative w-full">
               <div className="absolute translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%]">
                  <Outlet />
               </div>
            </div>
         </div>
      </>
   );
}
