import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import NavBarVertical from "../Components/NavBarVertical";
import SubNavbarVertical from "../Components/SubNavbarVertical";
import RightSidebar from "../Components/RightSidebar"; // Import the new component
import { 
  MagnifyingGlassIcon,
  BellIcon,
  Cog6ToothIcon 
} from "@heroicons/react/24/solid";

const AppLayout = () => {
  const [isRightBarOpen, setRightBarOpen] = useState(true);
  const location = useLocation();
  const isPeoplePortal = location.pathname.startsWith("/people");

  return (
    <div className="flex flex-col min-h-screen w-full bg-[#CDD9EA] font-sans">
      
      {/* Header */}
      <header className="w-full h-14 flex items-center justify-between px-6 z-[60] bg-transparent">
        {/* Left: Brand */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center text-white text-sm font-bold shadow-md">
            A
          </div>
          <span className="text-sm font-bold tracking-tight text-slate-800 uppercase">
            Abidi Pro
          </span>
        </div>

        {/* Right: Search, Notification, Settings */}
        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-transparent w-64 transition-all"
            />
          </div>

          {/* Notification Icon */}
          <button className="relative p-2 hover:bg-white/50 rounded-xl transition-colors">
            <BellIcon className="h-5 w-5 text-slate-600" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full ring-2 ring-white"></span>
          </button>

          {/* Settings Icon */}
          <button className="p-2 hover:bg-white/50 rounded-xl transition-colors">
            <Cog6ToothIcon className="h-5 w-5 text-slate-600" />
          </button>
        </div>
      </header>

      <div className="flex w-full items-start">
        
        {/* Sidebar with equal height containers */}
        <aside className="sticky top-14 z-50 flex h-[calc(100vh-3.5rem)] pl-2">  
          <div className="flex items-stretch h-full">
            {/* NavBarVertical - centered vertically */}
            <div className="flex items-center h-full">
              <NavBarVertical />
            </div>
            {/* SubNavbarVertical - same height as NavBarVertical */}
            <div className="flex items-center h-full">
              <SubNavbarVertical />
            </div>
          </div>
        </aside>

        {/* Main Content Container */}
        <main className="flex-1 m-3 ml-2 rounded-[2rem] bg-[#ECF0F3] shadow-lg text-slate-800 h-[calc(100vh-5rem)] transition-all duration-500 ease-in-out overflow-hidden">
          <div className="p-5 h-full overflow-auto no-scrollbar">
            <Outlet />
          </div>
        </main>

        {/* Right Sidebar for People Portal - Using the new component */}
        {isPeoplePortal && (
          <RightSidebar 
            isOpen={isRightBarOpen}
            toggleSidebar={() => setRightBarOpen(!isRightBarOpen)}
          />
        )}
      </div>
    </div>
  );
};

export default AppLayout;