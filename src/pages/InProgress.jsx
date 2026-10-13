
import {
  Clock,
  CalendarDays,
  CircleCheck,
} from "lucide-react";
import { useTasks } from "../context/TaskContext";

function InProgress() {
  const { tasks: allTasks, setTasks } = useTasks();

  const tasks = allTasks.filter(
    (task) => task.status === "In Progress"
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

  function markAsFinished(taskId) {
    const updatedTasks = allTasks.map((task) =>
      task.id === taskId
        ? { ...task, status: "Finished" }
        : task
    );

    setTasks(updatedTasks);
  }

  return (
    <div className="space-y-6">
      {/* Page Heading */}
      <div>
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-blue-100 p-3 text-blue-600">
            <Clock size={30} />
          </div>

          <h1 className="text-4xl font-bold text-slate-950">
            In Progress
          </h1>
        </div>

        <p className="mt-3 text-lg text-slate-600">
          Keep track of the tasks you are currently working on.
        </p>
      </div>

      {/* Summary Card */}
      <div className="flex items-center gap-5 rounded-xl border border-blue-100 bg-white p-6 shadow-sm">
        <div className="rounded-full bg-blue-100 p-4 text-blue-600">
          <Clock size={32} />
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Tasks In Progress
          </p>

          <h2 className="text-3xl font-bold text-slate-950">
            {tasks.length}
          </h2>
        </div>
      </div>

      {/* Task List */}
      <section className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="mb-5 text-xl font-bold text-slate-950">
          Current Tasks
        </h2>

        {tasks.length > 0 ? (
          <div className="space-y-4">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="flex flex-col justify-between gap-4 rounded-xl border border-slate-100 p-5 transition hover:border-blue-200 sm:flex-row sm:items-center"
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
                  onClick={() => markAsFinished(task.id)}
                  className="inline-flex w-fit items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 font-semibold text-white transition hover:bg-emerald-700"
                >
                  <CircleCheck size={17} />
                  Mark Finished
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center">
            <Clock
              size={45}
              className="mx-auto text-blue-400"
            />

            <h3 className="mt-4 text-lg font-semibold text-slate-900">
              No tasks in progress
            </h3>

            <p className="mt-2 text-slate-500">
              Tasks you start working on will appear here.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

export default InProgress;
