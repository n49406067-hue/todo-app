import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Plus,
  ClipboardList,
  Clock,
  CircleCheck,
  CircleX,
  Search,
  Pencil,
  Trash2,
  X,
} from "lucide-react";

import { useTasks } from "../context/TaskContext";

const statuses = ["To Do", "In Progress", "Finished", "Cancelled"];

const statusStyles = {
  "To Do": "bg-blue-100 text-blue-900",
  "In Progress": "bg-amber-100 text-amber-900",
  Finished: "bg-emerald-100 text-emerald-900",
  Cancelled: "bg-red-100 text-red-700",
};

function TodoList() {
  const { tasks, setTasks } = useTasks();

  const [searchParams, setSearchParams] = useSearchParams();
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const search = searchParams.get("search") || "";

  const emptyForm = {
    title: "",
    description: "",
    dueDate: "",
    status: "To Do",
  };

  const [form, setForm] = useState({ ...emptyForm });

  // Search by title, description, or status
  const filteredTasks = tasks.filter((task) =>
    `${task.title} ${task.description} ${task.status}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  function handleSearchChange(value) {
    if (value) {
      setSearchParams({ search: value }, { replace: true });
    } else {
      setSearchParams({}, { replace: true });
    }
  }

  // Calculate task statistics
  const stats = [
    {
      title: "To Do",
      count: tasks.filter((task) => task.status === "To Do").length,
      icon: ClipboardList,
      style: "bg-slate-100 text-slate-600",
    },
    {
      title: "In Progress",
      count: tasks.filter((task) => task.status === "In Progress").length,
      icon: Clock,
      style: "bg-amber-100 text-amber-500",
    },
    {
      title: "Finished",
      count: tasks.filter((task) => task.status === "Finished").length,
      icon: CircleCheck,
      style: "bg-emerald-100 text-emerald-600",
    },
    {
      title: "Cancelled",
      count: tasks.filter((task) => task.status === "Cancelled").length,
      icon: CircleX,
      style: "bg-red-100 text-red-500",
    },
  ];

  function openAddModal() {
    setEditingId(null);
    setForm({ ...emptyForm });
    setShowModal(true);
  }

  function openEditModal(task) {
    setEditingId(task.id);

    setForm({
      title: task.title,
      description: task.description,
      dueDate: task.dueDate || "",
      status: task.status,
    });

    setShowModal(true);
  }

  // Add a new task or update an existing task
  function handleSubmit(event) {
    event.preventDefault();

    const taskData = {
      title: form.title.trim(),
      description: form.description.trim(),
      dueDate: form.dueDate,
      status: form.status,
    };

    if (!taskData.title || !taskData.description || !taskData.dueDate) {
      return;
    }

    if (editingId !== null) {
      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task.id === editingId
            ? { ...task, ...taskData }
            : task
        )
      );
    } else {
      setTasks((currentTasks) => [
        ...currentTasks,
        {
          id: Date.now(),
          ...taskData,
        },
      ]);
    }

    setShowModal(false);
    setEditingId(null);
    setForm({ ...emptyForm });
  }

  // Delete a task
  function deleteTask(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (confirmed) {
      setTasks((currentTasks) =>
        currentTasks.filter((task) => task.id !== id)
      );
    }
  }

  function formatDate(date) {
    if (!date) return "—";

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

  return (
    <div className="space-y-5">

      {/* Page Heading */}
      <section className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-slate-950">
            To Do List
          </h1>

          <p className="mt-2 text-lg text-slate-600">
            Manage your tasks, track progress, and stay productive.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="flex items-center gap-3 rounded-xl bg-blue-600 px-6 py-4 font-semibold text-white shadow-sm transition hover:bg-blue-700"
        >
          <Plus size={23} />
          Add To Do
        </button>
      </section>

      {/* How It Works */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6">
        <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-[190px_1fr]">

          <div className="flex justify-center">
            <div className="flex h-36 w-36 items-center justify-center rounded-full bg-blue-50 text-blue-600">
              <ClipboardList size={100} strokeWidth={1.5} />
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-950">
              How it works?
            </h2>

            <p className="mt-2 text-slate-600">
              Create tasks, set due dates, and track their progress.
              Each task can have one of the following statuses:
            </p>

            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {[
                {
                  name: "To Do",
                  description: "Task is created and not started yet",
                  color: "bg-blue-100 text-blue-600",
                  dot: "bg-blue-500",
                },
                {
                  name: "In Progress",
                  description: "Task is currently being worked on",
                  color: "bg-amber-100 text-amber-600",
                  dot: "bg-amber-500",
                },
                {
                  name: "Finished",
                  description: "The task is completed",
                  color: "bg-emerald-100 text-emerald-600",
                  dot: "bg-emerald-500",
                },
                {
                  name: "Cancelled",
                  description: "Task is cancelled and will not be done",
                  color: "bg-red-100 text-red-600",
                  dot: "bg-red-500",
                },
              ].map((item) => (
                <div key={item.name} className="flex items-start gap-3">
                  <div className={`rounded-full p-3 ${item.color}`}>
                    <span
                      className={`block h-4 w-4 rounded-full ${item.dot}`}
                    />
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-950">
                      {item.name}
                    </h3>

                    <p className="mt-1 text-sm text-slate-600">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Statistics Cards */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="flex items-center gap-5 rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className={`rounded-full p-4 ${stat.style}`}>
                <Icon size={30} />
              </div>

              <div>
                <p className="text-lg text-slate-700">
                  {stat.title}
                </p>

                <p className="text-3xl font-bold text-slate-950">
                  {stat.count}
                </p>
              </div>
            </div>
          );
        })}
      </section>

      {/* Task Table */}
      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white">

        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 p-5">
          <h2 className="text-xl font-bold text-slate-950">
            All Tasks ({filteredTasks.length})
          </h2>

          <div className="flex h-11 w-full max-w-[300px] items-center gap-3 rounded-lg border border-slate-200 px-3">
            <Search size={21} className="shrink-0 text-slate-500" />

            <input
              type="text"
              value={search}
              onChange={(event) =>
                handleSearchChange(event.target.value)
              }
              placeholder="Search tasks..."
              aria-label="Search tasks"
              className="w-full bg-transparent outline-none placeholder:text-slate-400"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-left">
            <thead className="bg-slate-50 text-slate-700">
              <tr>
                <th className="px-5 py-4">#</th>
                <th className="px-5 py-4">Task Title</th>
                <th className="px-5 py-4">Description</th>
                <th className="px-5 py-4">Due Date</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredTasks.map((task, index) => (
                <tr
                  key={task.id}
                  className="border-t border-slate-100 transition hover:bg-blue-50/40"
                >
                  <td className="px-5 py-4">{index + 1}</td>

                  <td className="px-5 py-4 font-medium text-slate-950">
                    {task.title}
                  </td>

                  <td className="px-5 py-4 text-slate-700">
                    {task.description}
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 text-slate-700">
                    {formatDate(task.dueDate)}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`whitespace-nowrap rounded-full px-3 py-1 font-medium ${
                        statusStyles[task.status] || statusStyles["To Do"]
                      }`}
                    >
                      {task.status}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center justify-center gap-4">
                      <button
                        type="button"
                        onClick={() => openEditModal(task)}
                        title="Edit task"
                        aria-label={`Edit ${task.title}`}
                        className="text-slate-600 hover:text-blue-600"
                      >
                        <Pencil size={20} />
                      </button>

                      <button
                        type="button"
                        onClick={() => deleteTask(task.id)}
                        title="Delete task"
                        aria-label={`Delete ${task.title}`}
                        className="text-slate-600 hover:text-red-600"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredTasks.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-10 text-center text-slate-500"
                  >
                    {search
                      ? "No matching tasks found."
                      : "No tasks yet. Click Add To Do to create your first task."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Add / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4">

          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="task-modal-title"
            className="my-auto w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl sm:p-8"
          >

            <div className="mb-6 flex items-start justify-between">
              <div>
                <h2
                  id="task-modal-title"
                  className="text-2xl font-bold text-slate-950"
                >
                  {editingId !== null ? "Edit To Do" : "Add New To Do"}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Provide the details for your task below.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowModal(false)}
                aria-label="Close modal"
                className="text-slate-500 hover:text-slate-900"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">

              <div>
                <label
                  htmlFor="task-title"
                  className="mb-2 block font-semibold text-slate-800"
                >
                  Task Title *
                </label>

                <input
                  id="task-title"
                  required
                  maxLength={100}
                  value={form.title}
                  onChange={(event) =>
                    setForm({ ...form, title: event.target.value })
                  }
                  placeholder="Enter a short title for your task..."
                  className="w-full rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label
                  htmlFor="task-description"
                  className="mb-2 block font-semibold text-slate-800"
                >
                  Description *
                </label>

                <textarea
                  id="task-description"
                  required
                  maxLength={500}
                  rows={3}
                  value={form.description}
                  onChange={(event) =>
                    setForm({ ...form, description: event.target.value })
                  }
                  placeholder="Enter task description..."
                  className="w-full resize-y rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label
                  htmlFor="task-due-date"
                  className="mb-2 block font-semibold text-slate-800"
                >
                  Due Date *
                </label>

                <input
                  id="task-due-date"
                  required
                  type="date"
                  value={form.dueDate}
                  onChange={(event) =>
                    setForm({ ...form, dueDate: event.target.value })
                  }
                  className="w-full rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label
                  htmlFor="task-status"
                  className="mb-2 block font-semibold text-slate-800"
                >
                  Status *
                </label>

                <select
                  id="task-status"
                  value={form.status}
                  onChange={(event) =>
                    setForm({ ...form, status: event.target.value })
                  }
                  className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 outline-none focus:border-blue-500"
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-3 border-t border-slate-200 pt-5">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingId(null);
                    setForm({ ...emptyForm });
                  }}
                  className="rounded-lg bg-slate-100 px-5 py-3 font-semibold text-slate-800 hover:bg-slate-200"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
                >
                  {editingId !== null ? "Save Changes" : "Add To Do"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default TodoList;





        
      
    
