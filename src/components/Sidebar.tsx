import { CircleAlertIcon, CircleCheckIcon, ClipboardListIcon } from "lucide-react";
import { TaskForm } from "./TaskForm";
import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
export  function Sidebar() {
    const {tasks} = useContext(TaskContext)!;
  return (
    <aside className="w-full h-64 md:w-1/5 p-4 space-y-4 md:space-y-4 flex flex-row md:flex-col overflow-x-auto md:overflow-x-visible">
          <div className="flex-shrink-0 w-1/4 md:w-auto p-4 bg-white rounded-lg shadow-md">
            <div className="flex items-center gap-2 mb-2">
              <CircleAlertIcon className="h-6 w-6 text-red-500" />
              <span className="font-semibold">Expired Tasks</span>
            </div>
            <div className="text-3xl font-bold">
                {tasks.filter(task => task.deadline < new Date().toISOString()).length}
            </div>
          </div>
          <div className="flex-shrink-0 w-1/4 md:w-auto p-4 bg-white rounded-lg shadow-md">
            <div className="flex items-center gap-2 mb-2">
              <ClipboardListIcon className="h-6 w-6 text-orange-500" />
              <span className="font-semibold">All Active Tasks</span>
            </div>
            <div className="text-3xl font-bold">
                {tasks.length}
            </div>
          </div>
          <div className="flex-shrink-0 w-1/4 md:w-auto p-4 bg-white rounded-lg shadow-md">
            <div className="flex items-center gap-2 mb-2">
              <CircleCheckIcon className="h-6 w-6 text-blue-500" />
              <span className="font-semibold">Completed Tasks</span>
            </div>
            <div className="text-3xl font-bold">{tasks.filter(task=>task.status==="completed").length}/{tasks.length}</div>
          </div>
          <TaskForm/>
        </aside>
  )
}