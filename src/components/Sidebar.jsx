export default function SideBar({ isOpen, onClose }) {
  console.log(isOpen);
  console.log(onclose);

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/80 transition-opacity md:hidden ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />
      <div className="fixed z-50">
        <aside
          className={`pt-6 flex flex-col gap-5 pl-3 w-56 bg-white border-r 
                     fixed inset-y-0 left-0 z-50 transform transition-transform 
                    md:static md:translate-x-0 min-h-screen ${
                      isOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
        >
          <div className="flex justify-between">
            <div className="text-2xl font-bold">Sidebar</div>
            <button className="md:hidden text-slate-600 pr-2" onClick={onClose}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <nav>
            <ul className="flex flex-col gap-4">
              <li className="text-sm md:text-[16px] md:font-bold text-slate-700 cursor-pointer hover:bg-slate-400 px-4 py-3 mr-2 rounded hover:text-slate-100 transition-all duration-75">
                Dashboard
              </li>
              <li className="text-sm md:text-[16px] md:font-bold text-slate-700 cursor-pointer hover:bg-slate-400 px-4 py-3 mr-2 rounded hover:text-slate-100 transition-all duration-75">
                Products
              </li>
              <li className="text-sm md:text-[16px] md:font-bold text-slate-700 cursor-pointer hover:bg-slate-400 px-4 py-3 mr-2 rounded hover:text-slate-100 transition-all duration-75">
                Settings
              </li>
            </ul>
          </nav>
        </aside>
      </div>
    </>
  );
}
