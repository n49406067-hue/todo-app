
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TaskProvider } from "./context/TaskContext";

import Header from "./components/Header";
import Sidebar from "./components/sidebar";
import Home from "./pages/Home";
import TodoList from "./pages/TodoList";
import InProgress from "./pages/InProgress";
import Finished from "./pages/Finished";
import Cancelled from "./pages/Cancelled";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

function App() {
  return (
    <BrowserRouter>
      <TaskProvider>
        <div className="min-h-screen w-full overflow-x-hidden bg-slate-50">
          <Header />

<div className="flex w-full min-w-0">
  <div className="hidden shrink-0 md:block">
    <Sidebar />
  </div>

  <main className="min-w-0 w-full flex-1 p-4 sm:p-6 lg:p-8">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/todos" element={<TodoList />} />
                <Route path="/in-progress" element={<InProgress />} />
                <Route path="/finished" element={<Finished />} />
                <Route path="/cancelled" element={<Cancelled />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </main>
          </div>
        </div>
      </TaskProvider>
    </BrowserRouter>
  );
}

export default App;


