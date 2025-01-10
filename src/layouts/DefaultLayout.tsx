import { useEffect } from "react";
import DashBoardSidebar from "./_components/Sidebar";
import { Outlet, useLocation } from "react-router-dom";

export default function DefaultLayout() {
  const location = useLocation();

  useEffect(() => {
    console.log("location change", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <div className="flex fixed top-0 bottom-0 w-full">
        <DashBoardSidebar />
        <div className="w-full flex relative flex-col items-center justify-center">
          {/* <div className="absolute translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%]"> */}
          <Outlet />
          {/* </div> */}
        </div>
      </div>
    </>
  );
}
