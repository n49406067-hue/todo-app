
import {
  UserRound,
  Mail,
  CalendarDays,
  ClipboardList,
} from "lucide-react";

import profileImage from "../assets/pooja.jpeg";
import { useTasks } from "../context/TaskContext";

function Profile() {
  const { tasks } = useTasks();

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.status === "Finished"
  ).length;

  return (
    <div className="space-y-6">
      {/* Page Heading */}
      <div>
        <h1 className="text-4xl font-bold text-slate-950">
          My Profile
        </h1>

        <p className="mt-2 text-lg text-slate-600">
          View your profile information and task activity.
        </p>
      </div>

      {/* Profile Card */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="h-26 bg-gradient-to-r from-blue-600 to-indigo-400" />

        <div className="px-6 pb-8">
          <div className="-mt-14 flex flex-col gap-5 sm:flex-row sm:items-end">
            <img
              src={profileImage}
              alt="Pooja Nagarajan"
              className="h-28 w-28 rounded-full border-4 border-white bg-white object-cover shadow-md"
            />

            <div className="pb-2">
              <h2 className="text-2xl font-bold text-slate-950">
                Pooja Nagarajan
              </h2>

              <p className="mt-1 text-slate-500">
                To Do App User
              </p>
            </div>
          </div>

          {/* Profile Information */}
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="flex items-center gap-4 rounded-xl bg-slate-50 p-5">
              <div className="rounded-full bg-blue-100 p-3 text-blue-600">
                <UserRound size={23} />
              </div>

              <div>
                <p className="text-sm text-slate-500">Full Name</p>
                <p className="font-semibold text-slate-900">
                  Pooja Nagarajan
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-xl bg-slate-50 p-5">
              <div className="rounded-full bg-blue-100 p-3 text-blue-600">
                <Mail size={23} />
              </div>

              <div>
                <p className="text-sm text-slate-500">Email Address</p>
                <p className="break-all font-semibold text-slate-900">
                  Not provided
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-xl bg-slate-50 p-5">
              <div className="rounded-full bg-emerald-100 p-3 text-emerald-600">
                <CalendarDays size={23} />
              </div>

              <div>
                <p className="text-sm text-slate-500">Account Type</p>
                <p className="font-semibold text-slate-900">
                  Personal
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-xl bg-slate-50 p-5">
              <div className="rounded-full bg-violet-100 p-3 text-violet-600">
                <ClipboardList size={23} />
              </div>

              <div>
                <p className="text-sm text-slate-500">Total Tasks</p>
                <p className="font-semibold text-slate-900">
                  {totalTasks} tasks
                </p>
              </div>
            </div>
          </div>

          {/* Activity Summary */}
          <div className="mt-8 rounded-xl border border-slate-100 p-5">
            <h3 className="text-lg font-bold text-slate-950">
              Task Activity
            </h3>

            <p className="mt-2 text-slate-600">
              You have completed {completedTasks} out of {totalTasks} tasks.
            </p>

            <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-emerald-500 transition-all"
                style={{
                  width: totalTasks
                    ? `${(completedTasks / totalTasks) * 100}%`
                    : "0%",
                }}
              />
            </div>

            <p className="mt-2 text-sm text-slate-500">
              {totalTasks
                ? `${Math.round((completedTasks / totalTasks) * 100)}% completed`
                : "No tasks available yet"}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Profile;
