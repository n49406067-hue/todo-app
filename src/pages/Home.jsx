import {
  Target,
  Clock,
  ChartNoAxesColumnIncreasing,
  CalendarDays,
  List,
  CircleCheck,
  CircleX,
  BookOpen,
} from "lucide-react";

import { useTasks } from "../context/TaskContext";

function Home() {
  const { tasks } = useTasks();

  // Calculate statistics from shared task data
  const stats = [
    {
      title: "Total Tasks",
      count: tasks.length,
      subtitle: "All your tasks",
      icon: List,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "In Progress",
      count: tasks.filter(
        (task) => task.status === "In Progress"
      ).length,
      subtitle: "Currently working",
      icon: Clock,
      color: "bg-amber-100 text-amber-500",
    },
    {
      title: "Finished",
      count: tasks.filter(
        (task) => task.status === "Finished"
      ).length,
      subtitle: "Completed tasks",
      icon: CircleCheck,
      color: "bg-emerald-100 text-emerald-600",
    },
    {
      title: "Cancelled",
      count: tasks.filter(
        (task) => task.status === "Cancelled"
      ).length,
      subtitle: "Not done",
      icon: CircleX,
      color: "bg-red-100 text-red-500",
    },
  ];

  // Display the five most recently added tasks
  const recentTasks = [...tasks].reverse().slice(0, 5);

  const statusStyles = {
    "To Do": {
      dot: "bg-blue-500",
      badge: "bg-blue-100 text-blue-900",
    },
    "In Progress": {
      dot: "bg-amber-400",
      badge: "bg-amber-100 text-amber-800",
    },
    Finished: {
      dot: "bg-emerald-500",
      badge: "bg-emerald-100 text-emerald-800",
    },
    Cancelled: {
      dot: "bg-red-500",
      badge: "bg-red-100 text-red-700",
    },
  };

  function formatDate(date) {
    if (!date) return "No due date";

    const parsedDate = new Date(`${date}T00:00:00`);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  }

  const steps = [
    {
      number: 1,
      title: "Add a To Do",
      description:
        "Click on Add To Do and provide a task title, description, and due date.",
      icon: List,
      color: "bg-blue-500",
      iconColor: "bg-blue-50 text-blue-600",
    },
    {
      number: 2,
      title: "Track Progress",
      description:
        "Move tasks to In Progress when you start working on them.",
      icon: Target,
      color: "bg-amber-400",
      iconColor: "bg-amber-50 text-amber-500",
    },
    {
      number: 3,
      title: "Mark as Finished",
      description:
        "Once the task is completed, mark it as Finished.",
      icon: CircleCheck,
      color: "bg-emerald-500",
      iconColor: "bg-emerald-50 text-emerald-600",
    },
    {
      number: 4,
      title: "Cancel if Needed",
      description:
        "If a task is no longer needed, mark it as Cancelled.",
      icon: CircleX,
      color: "bg-red-500",
      iconColor: "bg-red-50 text-red-500",
    },
  ];

  return (
    <div className="space-y-5">

      {/* Welcome Banner */}
      <section className="rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 via-white to-blue-100 p-7 sm:p-9">

        <p className="text-sm font-semibold tracking-widest text-blue-900">
          WELCOME TO
        </p>

        <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-6xl">
          <span className="text-blue-600">To Do</span> App
        </h1>

        <p className="mt-3 max-w-2xl text-lg text-slate-600">
          Organize your tasks, track progress, and stay productive every day.
        </p>

        <div className="mt-7 flex flex-wrap gap-5">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-blue-100 p-3 text-blue-600">
              <Target size={24} />
            </div>
            <span className="text-sm text-slate-700">
              Plan<br />your tasks
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-full bg-amber-100 p-3 text-amber-500">
              <Clock size={24} />
            </div>
            <span className="text-sm text-slate-700">
              Track<br />progress
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-full bg-emerald-100 p-3 text-emerald-600">
              <ChartNoAxesColumnIncreasing size={24} />
            </div>
            <span className="text-sm text-slate-700">
              Stay<br />productive
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-full bg-red-100 p-3 text-red-500">
              <CalendarDays size={24} />
            </div>
            <span className="text-sm text-slate-700">
              Meet<br />your deadlines
            </span>
          </div>
        </div>
      </section>

      {/* Dynamic Statistics */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="flex items-center gap-4 rounded-xl border border-slate-100 bg-white p-5 shadow-sm"
            >
              <div className={`shrink-0 rounded-full p-4 ${stat.color}`}>
                <Icon size={30} />
              </div>

              <div>
                <p className="text-sm font-medium text-slate-600">
                  {stat.title}
                </p>

                <p className="text-3xl font-bold text-slate-950">
                  {stat.count}
                </p>

                <p className="text-sm text-slate-500">
                  {stat.subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </section>

      {/* Instructions and Recent Tasks */}
      <section className="grid grid-cols-1 gap-5 xl:grid-cols-2">

        {/* How It Works */}
        <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <BookOpen size={27} className="shrink-0 text-blue-600" />

            <h2 className="text-2xl font-bold text-slate-950">
              How It Works?
            </h2>
          </div>

          <p className="mt-2 text-slate-500">
            Follow these simple steps to manage your tasks effectively.
          </p>

          <div className="mt-6 space-y-6">
            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  className="flex items-center gap-4"
                >
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-bold text-white ${step.color}`}>
                    {step.number}
                  </div>

                  <div className={`shrink-0 rounded-full p-3 ${step.iconColor}`}>
                    <Icon size={23} />
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-900">
                      {step.title}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Tasks */}
        <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm">

          <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <Clock size={27} className="shrink-0 text-blue-900" />

              <h2 className="text-2xl font-bold text-slate-950">
                Recent Tasks
              </h2>
            </div>

            <a
              href="/todos"
              className="shrink-0 font-semibold text-blue-600 hover:text-blue-800"
            >
              View All
            </a>
          </div>

          {recentTasks.length > 0 ? (
            <div>
              {recentTasks.map((task) => {
                const style =
                  statusStyles[task.status] || statusStyles["To Do"];

                return (
                  <div
                    key={task.id}
                    className="flex flex-wrap items-center gap-3 border-b border-slate-100 py-4 last:border-b-0"
                  >
                    <span
                      className={`h-3 w-3 shrink-0 rounded-full ${style.dot}`}
                    />

                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-slate-900">
                        {task.title}
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        {task.description}
                      </p>
                    </div>

                    <span className="text-sm text-slate-600">
                      {formatDate(task.dueDate)}
                    </span>

                    <span
                      className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${style.badge}`}
                    >
                      {task.status}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-12 text-center">
              <List size={40} className="mx-auto text-slate-300" />

              <p className="mt-3 font-medium text-slate-700">
                No tasks yet
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Add your first task to see it here.
              </p>
            </div>
          )}

        </div>
      </section>
    </div>
  );
}

export default Home;

