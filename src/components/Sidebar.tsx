import { CircleAlertIcon, CircleCheckIcon, ClipboardListIcon } from "lucide-react";
import { TaskForm } from "./TaskForm";
import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
export  function Sidebar() {
    const {tasks} = useContext(TaskContext)!;
  return (
    <aside className="w-full h-full  md:w-1/6  space-y-4 flex flex-col md:flex-col overflow-x-auto md:overflow-x-visible mt-4">
      <div className="flex flex-row md:flex-col md:space-y-4 space-x-4 md:space-x-0">
          <div className="w-1/3 h-1/2 md:w-auto p-4 bg-muted rounded-lg drop-shadow-lg flex flex-col items-center justify-center">
            <div className="flex items-center gap-2 mb-2">
              <CircleAlertIcon className="h-6 w-6 text-red-500" />
              <span className="font-semibold text-muted-foreground">Expired</span>
            </div>
            <div className="text-3xl font-bold">
                {tasks.filter(task => task.deadline < new Date().toISOString()).length}
            </div>
          </div>
          <div className=" w-1/3 h-1/2 md:w-auto p-4 bg-muted rounded-lg drop-shadow-lg flex flex-col items-center justify-center">
            <div className="flex items-center gap-2 mb-2">
              <ClipboardListIcon className="h-6 w-6 text-orange-500" />
              <span className="font-semibold text-muted-foreground">Active</span>
            </div>
            <div className="text-3xl font-bold">
                {tasks.length}
            </div>
          </div>
          <div className=" w-1/3 h-1/2 md:w-auto p-4 bg-muted rounded-lg drop-shadow-lg flex flex-col items-center justify-center">
            <div className="flex items-center gap-2 mb-2">
              <CircleCheckIcon className="h-6 w-6 text-blue-500" />
              <span className="font-semibold text-muted-foreground">Completed</span>
            </div>
            <div className="text-3xl font-bold">{tasks.filter(task=>task.status==="completed").length}/{tasks.length}</div>
          </div>
      </div>
          <TaskForm/>
        </aside>
  )
}