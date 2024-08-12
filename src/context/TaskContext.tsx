import  { createContext, useState, useEffect, ReactNode, useMemo } from 'react';
import axios from 'axios';
import { toast } from 'sonner';

export interface Task {
  _id?: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  deadline: string;
  assignedTo: string;
}

interface TaskContextProps {
  tasks: Task[];
  filteredTasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  setSearchQuery: (query: string) => void;
}

export const TaskContext = createContext<TaskContextProps | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_VERCEL_RENDER_API}/tasks`);
      setTasks(response.data);
    } catch (error) {
      toast.error("Failed to fetch tasks");
    }
  };

  useEffect(() => {
    // Fetch tasks from the backend
    fetchTasks();
  }, []);

  const filteredTasks = useMemo(() => {
    return tasks.filter(task =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, tasks]);

  const addTask = async (task: Task) => {
    try{
      const response = await axios.post(`${import.meta.env.VITE_VERCEL_RENDER_API}/tasks`, task);
      await fetchTasks();
      toast.success(response.data.message);
    }catch(error){
      if (axios.isAxiosError(error) && error.response) {
        toast.error(`Failed to add task: ${error.response.data.message}`);
      } else {
        toast.error("An unexpected error occurred while adding the task");
      }
      console.error('Error adding task:', error);
    }
  };
  
  const updateTask = async (updatedTask: Task) => {
    setTasks(tasks.map(task => (task._id === updatedTask._id ? updatedTask : task)));
    try {
      const response =await axios.put(`${import.meta.env.VITE_VERCEL_RENDER_API}/tasks/${updatedTask._id}`, updatedTask);
      toast.success(response.data.message);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(`Failed to update task: ${error.response.data.message}`);
      } else {
        toast.error("An unexpected error occurred while updating the task");
      }
      console.error('Error updating task:', error);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_VERCEL_RENDER_API}/tasks/${id}`);
      setTasks(prevTasks => prevTasks.filter(task => task._id !== id));
      toast.success(response.data.message);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(`Failed to delete task: ${error.response.data.message}`);
      } else {
        toast.error("An unexpected error occurred while deleting the task");
      }
      console.error('Error deleting task:', error);
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask, setSearchQuery, filteredTasks }}>
      {children}
    </TaskContext.Provider>
  );
};