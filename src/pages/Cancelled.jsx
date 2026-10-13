
import {
  CircleX,
  CalendarDays,
  RotateCcw,
} from "lucide-react";
import { useTasks } from "../context/TaskContext";

function Cancelled() {
  const { tasks: allTasks, setTasks } = useTasks();

  const tasks = allTasks.filter(
    (task) => task.status === "Cancelled"
  );

  function formatDate(date) {
    if (!date) return "No due date";

    return new Date(`${date}T00:00:00`).toLocaleDateString(
      "en-US",
      {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }
    );
  }

  function handleRestore(taskId) {
    const updatedTasks = allTasks.map((task) =>
      task.id === taskId
        ? { ...task, status: "To Do" }
        : task
    );

    setTasks(updatedTasks);
  }

  return (
    <div className="space-y-6">
      {/* Page Heading */}
      <div>
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-red-100 p-3 text-red-600">
            <CircleX size={30} />
          </div>

          <h1 className="text-4xl font-bold text-slate-950">
            Cancelled Tasks
          </h1>
        </div>

        <p className="mt-3 text-lg text-slate-600">
          Review cancelled tasks and restore any you want to work on again.
        </p>
      </div>

      {/* Summary Card */}
      <div className="flex items-center gap-5 rounded-xl border border-red-100 bg-white p-6 shadow-sm">
        <div className="rounded-full bg-red-100 p-4 text-red-600">
          <CircleX size={32} />
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Cancelled Tasks
          </p>

          <h2 className="text-3xl font-bold text-slate-950">
            {tasks.length}
          </h2>
        </div>
      </div>

      {/* Cancelled Task List */}
      <section className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="mb-5 text-xl font-bold text-slate-950">
          Cancelled Task List
        </h2>

        {tasks.length > 0 ? (
          <div className="space-y-4">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="flex flex-col justify-between gap-4 rounded-xl border border-slate-100 p-5 sm:flex-row sm:items-center"
              >
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    {task.title}
                  </h3>

                  <p className="mt-1 text-slate-500">
                    {task.description}
                  </p>

                  <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
                    <CalendarDays size={17} />
                    <span>
                      Due: {formatDate(task.dueDate)}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleRestore(task.id)}
                  className="inline-flex w-fit items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 font-semibold text-white transition hover:bg-emerald-700"
                >
                  <RotateCcw size={17} />
                  Restore
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center">
            <CircleX
              size={45}
              className="mx-auto text-red-400"
            />

            <h3 className="mt-4 text-lg font-semibold text-slate-900">
              No cancelled tasks
            </h3>

            <p className="mt-2 text-slate-500">
              Cancelled tasks will appear here.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

export default Cancelled;


