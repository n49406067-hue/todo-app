
import {
  CircleCheck,
  CalendarDays,
  Trophy,
} from "lucide-react";
import { useTasks } from "../context/TaskContext";

function Finished() {
  const { tasks: allTasks } = useTasks();

  const tasks = allTasks.filter(
    (task) => task.status === "Finished"
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

  return (
    <div className="space-y-6">
      {/* Page Heading */}
      <div>
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-emerald-100 p-3 text-emerald-600">
            <CircleCheck size={30} />
          </div>

          <h1 className="text-4xl font-bold text-slate-950">
            Finished Tasks
          </h1>
        </div>

        <p className="mt-3 text-lg text-slate-600">
          Celebrate your achievements and review your completed tasks.
        </p>
      </div>

      {/* Summary Card */}
      <div className="flex items-center gap-5 rounded-xl border border-emerald-100 bg-white p-6 shadow-sm">
        <div className="rounded-full bg-emerald-100 p-4 text-emerald-600">
          <Trophy size={32} />
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Completed Tasks
          </p>

          <h2 className="text-3xl font-bold text-slate-950">
            {tasks.length}
          </h2>
        </div>
      </div>

      {/* Completed Task List */}
      <section className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="mb-5 text-xl font-bold text-slate-950">
          Your Achievements
        </h2>

        {tasks.length > 0 ? (
          <div className="space-y-4">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="flex flex-col justify-between gap-4 rounded-xl border border-slate-100 p-5 transition hover:border-emerald-200 sm:flex-row sm:items-center"
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

                <span className="inline-flex w-fit items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-800">
                  <CircleCheck size={17} />
                  Finished
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center">
            <CircleCheck
              size={45}
              className="mx-auto text-emerald-500"
            />

            <h3 className="mt-4 text-lg font-semibold text-slate-900">
              No completed tasks yet
            </h3>

            <p className="mt-2 text-slate-500">
              Completed tasks will appear here.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

export default Finished;
