import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import ProductTable from "./components/ProductsTable";
import Sidebar from "./components/Sidebar";

function App() {

  const [isSidebarOpen, setIsSideBarOpen] = useState(false);

  console.log(isSidebarOpen);

  return (
    <div className="min-h-screen flex bg-slate-50">
      <Sidebar onClose={() => setIsSideBarOpen(false)} isOpen={isSidebarOpen} />
      <div className="flex-1 flex flex-col">
        <Header isOpen = {() => setIsSideBarOpen(true)}/>
        <main className="p-4 md:p-6">
          <h1 className="text-2xl font-bold mb-4">Product Dashboard</h1>
          <div className=" space-y-4">
            <ProductTable />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
