import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { DialogClose } from "@radix-ui/react-dialog";
import { useContext, useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { TaskContext } from "@/context/TaskContext";
import { Task } from "@/context/TaskContext";
import { Pencil } from "lucide-react";

interface TaskFormProps {
  task?: Task;
}
export  function TaskForm({ task }: TaskFormProps) {
  const { addTask, updateTask } = useContext(TaskContext) as {
    addTask: (task: Task) => void;
    updateTask: (task: Task) => void;
  };

  const initialTaskState: Task = {
    title: "",
    description: "",
    status: "todo",
    priority: "medium",
    deadline: "",
    assignedTo: "",
  };

  const [newTask, setNewTask] = useState<Task>(initialTaskState);

  useEffect(() => {
    if (task) {
      setNewTask({
        ...task,
        deadline: task.deadline
          ? new Date(task.deadline).toISOString().split("T")[0]
          : "",
      });
    }
  }, [task]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask({ ...newTask, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (task) {
      updateTask(newTask);
    } else {
      addTask(newTask);
    }
    setNewTask(initialTaskState);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {task ? (
          <Pencil className="absolute size-4 top-3 right-10" />
        ) : (
          <Button className="flex-shrink-0 w-full  bg-[#0d062d] text-white rounded-lg">
            + Add Task
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="pl-3">
        <DialogHeader>
          <DialogTitle>{task ? "Edit Task" : "Add Task"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <Input id="title" value={newTask.title} onChange={handleChange} />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <Input
              id="description"
              value={newTask.description}
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700 mt-2"
              >
                Status
              </label>
              <Select
                onValueChange={(value) =>
                  setNewTask({ ...newTask, status: value })
                }
                defaultValue={newTask.status}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todo">To Do</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label
                htmlFor="priority"
                className="block text-sm font-medium text-gray-700 mt-2"
              >
                Priority
              </label>
              <Select
                onValueChange={(value) =>
                  setNewTask({ ...newTask, priority: value })
                }
                defaultValue={newTask.priority}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label
                htmlFor="deadline"
                className="block text-sm font-medium text-gray-700 mt-2"
              >
                Deadline
              </label>
              <Input
                id="deadline"
                type="date"
                value={newTask.deadline}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="deadline"
                className="block text-sm font-medium text-gray-700 mt-2"
              >
                Assigned To
              </label>
              <Input
                id="assignedTo"
                type="text"
                value={newTask.assignedTo}
                onChange={handleChange}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                className="w-full bg-[#0d062d] font-bold text-md"
                type="submit"
              >
                {task ? "Update Task" : "Add Task"}
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
