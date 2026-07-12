// Added closeSidebar prop
export default function Sidebar({ isOpen, activeTab, setActiveTab, closeSidebar }) {
  const menuItems = ['Tasks', 'Statistics', 'Calendar', 'Trashbin', 'Settings'];

  return (
    // Changed to absolute positioning, full height, with a slight blur effect!
    <aside className={`absolute top-0 left-0 h-full bg-[#fdfaf4]/95 backdrop-blur-sm z-50 transition-all duration-300 ease-in-out flex flex-col overflow-hidden border-[#f3eee5] ${
      isOpen ? 'w-48 border-r-2 p-6 opacity-100 shadow-2xl' : 'w-0 border-r-0 p-0 opacity-0'
    }`}>

      <div className="w-full flex flex-col gap-6 pt-2 [app-region:drag] h-full">
        <h2 className="text-sm font-black tracking-[0.3em] text-slate-800 ml-2 drop-shadow-sm whitespace-nowrap">
          OPTIONS
        </h2>

        <nav className="flex flex-col gap-2 [app-region:no-drag]">
          {menuItems.map(item => (
            <button
              key={item}
              onClick={() => {
                setActiveTab(item);
                closeSidebar(); // Closes automatically after clicking!
              }}
              className={`text-left px-4 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                activeTab === item
                  ? 'bg-[#a3d996] text-white shadow-sm scale-105'
                  : 'text-slate-400 hover:bg-[#f3eee5] hover:text-slate-600'
              }`}
            >
              {item}
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
}