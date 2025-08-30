// import { useState } from "react";
// import Header from "./Header";
// import { Outlet } from "react-router-dom";
// import SideBar from "./Sidebar";

// export function MainLayout() {

//   const [isSidebarOpen, setIsSideBarOpen] = useState(false);

//   console.log(isSidebarOpen);

//   return (
//     <div className="min-h-screen flex bg-slate-50">
//     <SideBar onClose={() => setIsSideBarOpen(false)} isOpen={isSidebarOpen}></SideBar>
//       <div className="flex-1 flex flex-col">
//         <Header isOpen = {() => setIsSideBarOpen(true)}/>
//         <main className="p-4 md:p-6">
//             <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// }

// export default ;
