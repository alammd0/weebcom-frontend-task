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
      <div>
        <aside
          className={`pt-6 flex flex-col gap-5 pl-3 w-56 bg-white border-r 
                    h-screen fixed inset-y-0 left-0 z-50 transform transition-transform 
                    md:static md:translate-x-0 ${
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
              <li className="text-sm md:text-[16px] md:font-bold text-slate-700">
                Dashboard
              </li>
              <li className="text-sm md:text-[16px] md:font-bold text-slate-700">
                Products
              </li>
              <li className="text-sm md:text-[16px] md:font-bold text-slate-700">
                Settings
              </li>
            </ul>
          </nav>
        </aside>
      </div>
    </>
  );
}
