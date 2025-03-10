import { useState, useEffect } from "react";
import { z } from "zod";
import { Task } from "@/types/task";
import TaskFilters from "./TaskFilters";
import TaskTable from "./TaskTable";
import { useTasks } from "@/services/task";

export const taskSchema = z.object({
 title: z.string().min(3, { message: "Title must be at least 3 characters" }),
 description: z.string().min(5, { message: "Description must be at least 5 characters" }),
 status: z.enum(["pending", "completed"], { message: "Status must be either pending or completed" }),
});

export type TaskFormValues = z.infer<typeof taskSchema>;

function TaskList() {
 const { data, isLoading, isError, refetch } = useTasks();
 const allTasks = data || ([] as Task[]);

 const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
 const [filters, setFilters] = useState({
  status: "all",
  search: "",
  sortBy: "createdAt",
  sortOrder: "desc" as "asc" | "desc",
 });

 useEffect(() => {
  if (allTasks.length > 0) {
   applyFilters();
  } else {
   setFilteredTasks([]);
  }
 }, [allTasks, filters]);

 const applyFilters = () => {
  let result = [...allTasks];

  if (filters.status !== "all") {
   result = result.filter(task => task.status === filters.status);
  }

  if (filters.search) {
   const searchTerm = filters.search.toLowerCase();
   result = result.filter(
    task =>
     task.title.toLowerCase().includes(searchTerm) || task.description.toLowerCase().includes(searchTerm),
   );
  }

  result.sort((a, b) => {
   if (filters.sortBy === "createdAt") {
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
   } else if (filters.sortBy === "title") {
    return a.title.localeCompare(b.title);
   } else if (filters.sortBy === "status") {
    return a.status.localeCompare(b.status);
   }
   return 0;
  });

  if (filters.sortOrder === "desc") {
   result.reverse();
  }

  setFilteredTasks(result);
 };

 const handleFilterChange = (newFilters: {
  status: string;
  search: string;
  sortBy: string;
  sortOrder: "asc" | "desc";
 }) => {
  setFilters(newFilters);
 };

 // Function to refresh tasks after mutations
 const refreshTasks = () => {
  refetch();
 };

 if (isLoading) {
  return <div className="w-full text-center py-10">Loading tasks...</div>;
 }

 if (isError) {
  return <div className="w-full text-center py-10 text-red-500">Error loading tasks. Please try again.</div>;
 }

 return (
  <div className="w-full">
   <TaskFilters onFilterChange={handleFilterChange} totalTasks={allTasks.length || 0} />
   <TaskTable tasks={filteredTasks} onTasksChanged={refreshTasks} />
  </div>
 );
}

export default TaskList;
