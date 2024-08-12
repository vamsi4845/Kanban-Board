import { Task, TaskContext } from "@/context/TaskContext";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { Draggable } from 'react-beautiful-dnd';
import { TaskForm } from "./TaskForm";
import {  Trash2 } from "lucide-react";
import { useContext } from "react";

interface TaskItemProps {
  task: Task;
  index: number;
}

export  function TaskItem({ task, index }: TaskItemProps) {
  const {deleteTask} = useContext(TaskContext) as { deleteTask: (id: string) => void };
  return (
    <Draggable draggableId={task._id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Card className=" relative p-4 bg-gray-50 rounded-lg shadow-md">
            <Badge variant="secondary">{task.priority}</Badge>
            <TaskForm task={task} />
            <Trash2 className="absolute right-3 top-3 text-gray-500 size-4" onClick={() => deleteTask(task._id)} />
            {/* <Dropdown id={task._id} /> */}
            <h3 className="mt-2 font-semibold">{task.title}</h3>
            <p className="text-sm text-gray-600">
              {task.description}
            </p>
            <p className="mt-2 text-xs text-gray-400">{new Date(task.deadline).toLocaleDateString()}</p>
          </Card>
        </div>
      )}
    </Draggable>
  );
}