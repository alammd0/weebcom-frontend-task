
export default function Header({ isOpen }){
    return (
       <header className="bg-white border-b px-4 py-6 items-center justify-between md:ml-56 ml-0 fixed w-full z-50">
            <div className="flex items-center gap-4">
                <button onClick={isOpen} className="md:hidden p-2 bg-slate-100 rounded-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                    </svg>
                </button>

                <div className="text-sm md:text-[16px] font-bold text-slate-600">Welcome, Md Khalid Alam</div>
            </div>
       </header>
    )
}