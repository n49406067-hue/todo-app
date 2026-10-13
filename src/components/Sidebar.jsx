import { useState } from "react";
import {
  Home,
  List,
  Clock,
  CircleCheck,
  CircleX,
  User,
  Settings,
  Menu,
  X,
} from "lucide-react";
import { NavLink } from "react-router-dom";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "To Do List", path: "/todos", icon: List },
    { name: "In Progress", path: "/in-progress", icon: Clock },
    { name: "Finished", path: "/finished", icon: CircleCheck },
    { name: "Cancelled", path: "/cancelled", icon: CircleX },
  ];

  const bottomItems = [
    { name: "Profile", path: "/profile", icon: User },
    { name: "Settings", path: "/settings", icon: Settings },
  ];

  function renderLinks(items) {
    return items.map((item) => {
      const Icon = item.icon;

      return (
        <NavLink
          key={item.name}
          to={item.path}
          onClick={() => setIsOpen(false)}
          className={({ isActive }) =>
            `flex h-14 items-center gap-5 rounded-xl px-6 transition-colors ${
              isActive
                ? "border-l-4 border-blue-600 bg-blue-50 text-blue-600"
                : "text-slate-700 hover:bg-slate-50"
            }`
          }
        >
          <Icon size={25} />
          <span className="text-[17px] font-medium">
            {item.name}
          </span>
        </NavLink>
      );
    });
  }

  return (
    <>
      {/* Mobile menu button */}
      <button
        type="button"
        onClick={() => setIsOpen((previous) => !previous)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        className="fixed bottom-5 left-4 z-[60] flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg md:hidden"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Backdrop: only present while the menu is open */}
      {isOpen && (
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 cursor-default bg-black/30 md:hidden"
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={`
          fixed bottom-0 left-0 top-[104px] z-50
          w-[270px] overflow-y-auto border-r border-slate-200
          bg-white px-4 py-6 shadow-lg
          transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:sticky md:top-[104px] md:z-10
          md:h-[calc(100vh-104px)] md:translate-x-0
          md:shadow-none
        `}
      >
        <nav className="space-y-2">
          {renderLinks(menuItems)}
        </nav>

        <div className="my-7 border-t border-slate-200" />

        <nav className="space-y-2">
          {renderLinks(bottomItems)}
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;

