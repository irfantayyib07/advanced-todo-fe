import { useState } from "react";
import {
 Table,
 TableBody,
 TableCaption,
 TableCell,
 TableHead,
 TableHeader,
 TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { DUMMY_TASKS } from "@/constants/data";
import { Pencil, Trash2 } from "lucide-react";
import EditTaskDialog from "./EditTaskDialog";
import DeleteTaskDialog from "./DeleteTaskDialog";
import { Task } from "@/types/task";

// Helper function to format dates
function formatDate(dateString: string) {
 const date = new Date(dateString);
 return new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
 }).format(date);
}

// Define Zod schema for task validation
export const taskSchema = z.object({
 title: z.string().min(3, { message: "Title must be at least 3 characters" }),
 description: z.string().min(5, { message: "Description must be at least 5 characters" }),
 status: z.enum(["pending", "completed"], { message: "Status must be either pending or completed" }),
});

// Define the form data type using Zod inference
export type TaskFormValues = z.infer<typeof taskSchema>;

function TaskList() {
 const [tasks, setTasks] = useState(DUMMY_TASKS);
 const [taskToEdit, setTaskToEdit] = useState<(Task & { index: number }) | null>(null);
 const [taskToDelete, setTaskToDelete] = useState<(Task & { index: number }) | null>(null);
 const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
 const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

 // Initialize the form with react-hook-form
 const methods = useForm<TaskFormValues>({
  resolver: zodResolver(taskSchema),
  defaultValues: {
   title: "",
   description: "",
   status: "pending",
  },
 });

 const openEditDialog = (task: Task, index: number) => {
  setTaskToEdit({ ...task, index });
  // Reset the form with the task data
  methods.reset({
   title: task.title,
   description: task.description,
   status: task.status,
  });
  setIsEditDialogOpen(true);
 };

 const closeEditDialog = () => {
  setIsEditDialogOpen(false);
  setTaskToEdit(null);
  methods.reset();
 };

 const openDeleteDialog = (task: Task, index: number) => {
  setTaskToDelete({ ...task, index });
  setIsDeleteDialogOpen(true);
 };

 const closeDeleteDialog = () => {
  setIsDeleteDialogOpen(false);
  setTaskToDelete(null);
 };

 const handleEditTask = (data: TaskFormValues) => {
  if (!taskToEdit) return;
  const updatedTasks = [...tasks];
  updatedTasks[taskToEdit.index] = {
   ...taskToEdit,
   title: data.title,
   description: data.description,
   status: data.status,
  };
  setTasks(updatedTasks);
  closeEditDialog();
 };

 const handleDeleteTask = () => {
  if (!taskToDelete) return;
  const updatedTasks = tasks.filter((_, index) => index !== taskToDelete.index);
  setTasks(updatedTasks);
  closeDeleteDialog();
 };

 return (
  <div className="w-full">
   <FormProvider {...methods}>
    <Table className="mb-6">
     <TableCaption>You're all set!</TableCaption>
     <TableHeader>
      <TableRow>
       <TableHead className="w-1/5">Title</TableHead>
       <TableHead className="w-2/5">Description</TableHead>
       <TableHead>Status</TableHead>
       <TableHead>Created</TableHead>
       <TableHead className="text-right">Actions</TableHead>
      </TableRow>
     </TableHeader>
     <TableBody>
      {tasks.map((task, index) => (
       <TableRow key={index}>
        <TableCell className="font-medium">{task.title}</TableCell>
        <TableCell>{task.description}</TableCell>
        <TableCell>
         <Badge
          className={
           task.status === "completed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
          }
         >
          {task.status}
         </Badge>
        </TableCell>
        <TableCell>{formatDate(task.createdAt)}</TableCell>
        <TableCell className="text-right">
         <div className="flex justify-end gap-2">
          <Button variant="outline" size="sm" onClick={() => openEditDialog(task, index)}>
           <Pencil className="h-4 w-4" />
          </Button>
          <Button
           variant="outline"
           size="sm"
           className="text-red-500 hover:text-red-700"
           onClick={() => openDeleteDialog(task, index)}
          >
           <Trash2 className="h-4 w-4" />
          </Button>
         </div>
        </TableCell>
       </TableRow>
      ))}
     </TableBody>
    </Table>

    {/* Pass required props to modals */}
    <EditTaskDialog
     isOpen={isEditDialogOpen}
     setIsOpen={setIsEditDialogOpen}
     onClose={closeEditDialog}
     onSubmit={handleEditTask}
     taskToEdit={taskToEdit}
    />

    <DeleteTaskDialog
     isOpen={isDeleteDialogOpen}
     setIsOpen={setIsDeleteDialogOpen}
     onClose={closeDeleteDialog}
     onDelete={handleDeleteTask}
     taskToDelete={taskToDelete}
    />
   </FormProvider>
  </div>
 );
}

export default TaskList;
