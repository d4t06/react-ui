import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes } from "./routes";
import DefaultLayout from "./layouts/DefaultLayout";
import Home from "./pages/Home";

function App() {
   return (
      <>
         <Router basename="/">
            <Routes>
               <Route
                  path="*"
                  element={
                     <h1 className="mt-[30px] border-b text-center text-[20px]">
                        Not found
                     </h1>
                  }
               />

               <Route element={<DefaultLayout />}>
                  <Route path="/" element={<Home />} />

                  {publicRoutes.map((route, index) => {
                     const Page = route.component;
                     return <Route key={index} path={route.path} element={<Page />} />;
                  })}
               </Route>
            </Routes>
         </Router>
      </>
   );
}

export default App;
