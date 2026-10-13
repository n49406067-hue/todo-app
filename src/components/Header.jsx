
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Bell, ChevronDown } from "lucide-react";

import { useTasks } from "../context/TaskContext";
import profileImage from "../assets/pooja.jpeg";

function Header() {
  const navigate = useNavigate();
  const { tasks } = useTasks();

  const [search, setSearch] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const filteredTasks = tasks.filter((task) =>
    `${task.title} ${task.description} ${task.status}`
      .toLowerCase()
      .includes(search.trim().toLowerCase())
  );

  function handleSearch(event) {
    event.preventDefault();

    const query = search.trim();

    if (query) {
      navigate(`/todos?search=${encodeURIComponent(query)}`);
    } else {
      navigate("/todos");
    }

    setShowResults(false);
  }

  function openTaskSearch(title) {
    setSearch(title);
    setShowResults(false);

    navigate(`/todos?search=${encodeURIComponent(title)}`);
  }

  return (
    <header className="relative z-50 flex min-h-20 w-full items-center justify-between gap-6 border-b border-blue-100 bg-white px-6 py-3">

      {/* Logo */}
      <button
        type="button"
        onClick={() => navigate("/")}
        className="shrink-0 text-3xl font-extrabold tracking-tight"
      >
        <span className="text-blue-600">To Do</span>{" "}
        <span className="text-slate-950">App</span>
      </button>

      {/* Search */}
      <div className="relative hidden min-w-0 max-w-4xl flex-1 md:block">
        <form
          onSubmit={handleSearch}
          className="flex items-center gap-3 rounded-xl border border-blue-100 bg-slate-50 px-4 py-3"
        >
          <Search size={23} className="shrink-0 text-slate-500" />

          <input
            type="text"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setShowResults(true);
            }}
            onFocus={() => setShowResults(true)}
            onKeyDown={(event) => {
              if (event.key === "Escape") {
                setShowResults(false);
              }
            }}
            placeholder="Search tasks, status, or keywords..."
            aria-label="Search tasks"
            className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
          />
        </form>

        {showResults && search.trim() && (
          <div className="absolute left-0 right-0 top-full z-[60] mt-2 max-h-72 overflow-y-auto rounded-xl border border-slate-200 bg-white p-2 shadow-xl">
            {filteredTasks.length > 0 ? (
              filteredTasks.slice(0, 5).map((task) => (
                <button
                  key={task.id}
                  type="button"
                  onClick={() => openTaskSearch(task.title)}
                  className="block w-full rounded-lg px-3 py-3 text-left hover:bg-blue-50"
                >
                  <span className="block font-semibold text-slate-900">
                    {task.title}
                  </span>

                  <span className="mt-1 block text-sm text-slate-500">
                    {task.status} · {task.description}
                  </span>
                </button>
              ))
            ) : (
              <p className="p-3 text-sm text-slate-500">
                No matching tasks found.
              </p>
            )}

            <button
              type="button"
              onClick={handleSearch}
              className="mt-1 w-full rounded-lg border-t border-slate-100 px-3 py-3 text-left text-sm font-semibold text-blue-600 hover:bg-blue-50"
            >
              View search results
            </button>
          </div>
        )}
      </div>

      {/* Right Side */}
      <div className="flex shrink-0 items-center gap-4">

        {/* Notifications */}
        <button
          type="button"
          aria-label="Notifications"
          className="relative rounded-xl border border-blue-100 bg-slate-50 p-3 text-slate-600 hover:bg-blue-50"
        >
          <Bell size={22} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
        </button>

        {/* Profile */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowMenu((previous) => !previous)}
            aria-expanded={showMenu}
            className="flex items-center gap-3 rounded-xl border border-blue-100 bg-slate-50 px-3 py-2 hover:bg-blue-50"
          >
            <img
              src={profileImage}
              alt="Pooja Nagarajan"
              className="h-10 w-10 shrink-0 rounded-full object-cover"
            />

            <span className="hidden whitespace-nowrap font-semibold text-slate-900 lg:block">
              Pooja Nagarajan
            </span>

            <ChevronDown
              size={19}
              className={`text-slate-500 transition-transform ${
                showMenu ? "rotate-180" : ""
              }`}
            />
          </button>

          {showMenu && (
            <div className="absolute right-0 top-full z-[60] mt-2 w-48 overflow-hidden rounded-xl border border-slate-200 bg-white py-2 shadow-lg">
              <button
                type="button"
                onClick={() => {
                  setShowMenu(false);
                  navigate("/profile");
                }}
                className="w-full px-4 py-3 text-left text-sm text-slate-700 hover:bg-blue-50"
              >
                My Profile
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowMenu(false);
                  navigate("/settings");
                }}
                className="w-full px-4 py-3 text-left text-sm text-slate-700 hover:bg-blue-50"
              >
                Settings
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;

