import { Badge } from "@/components/ui/badge"
import { TaskItem } from "./TaskItem"
import { useContext } from "react";
import { TaskContext } from "@/context/TaskContext";
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';

export  function TaskList() {
  const { filteredTasks, updateTask} = useContext(TaskContext) !;

  const onDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const newStatus = destination.droppableId as "todo" | "in-progress" | "completed";
    const taskToUpdate = filteredTasks.find(task => task._id === draggableId);
    
    if (taskToUpdate) {
      const updatedTask = { ...taskToUpdate, status: newStatus };
      await updateTask(updatedTask);
    }

  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <main className="flex-1 p-4 space-x-4 overflow-x-auto">
        <div className="flex space-x-4">
          {["todo", "in-progress", "completed"].map((status) => (
            <Droppable key={status} droppableId={status}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="w-1/3 p-4 bg-white rounded-lg shadow-md"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold">
                      {status === "todo" ? "To Do" : status === "in-progress" ? "On Progress" : "Done"}
                    </h2>
                    <Badge variant="default">{filteredTasks.filter(task => task.status === status).length}</Badge>
                  </div>
                  <div className="space-y-4">
                    {filteredTasks
                      .filter(task => task.status === status)
                      .map((task, index) => (
                        <TaskItem key={task._id} task={task} index={index} />
                      ))}
                  </div>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </main>
    </DragDropContext>
  )
}