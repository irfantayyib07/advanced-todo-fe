import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
 Dialog,
 DialogContent,
 DialogDescription,
 DialogFooter,
 DialogHeader,
 DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

// Define Zod schema for task validation
const taskSchema = z.object({
 title: z.string().min(3, { message: "Title must be at least 3 characters" }),
 description: z.string().min(5, { message: "Description must be at least 5 characters" }),
 status: z.enum(["pending", "completed"], { message: "Status must be either pending or completed" }),
});

type TaskFormValues = z.infer<typeof taskSchema>;

interface AddTaskDialogProps {
 isOpen: boolean;
 setIsOpen: (isOpen: boolean) => void;
}

function AddTaskDialog({ isOpen, setIsOpen }: AddTaskDialogProps) {
 const methods = useForm<TaskFormValues>({
  resolver: zodResolver(taskSchema),
  defaultValues: {
   title: "",
   description: "",
   status: "pending",
  },
 });

 const {
  register,
  handleSubmit,
  formState: { errors },
  reset,
  setValue,
 } = methods;

 const closeDialog = () => {
  setIsOpen(false);
  reset();
 };

 const onSubmit = (data: TaskFormValues) => {
  // Here you would typically add the task to your state or send it to an API
  console.log("New task:", data);

  // Create a new task with current timestamp
  const newTask = {
   ...data,
   createdAt: new Date().toISOString(),
  };

  // Add your logic to save the task here

  // Close the dialog and reset the form
  closeDialog();
 };

 return (
  <FormProvider {...methods}>
   <Dialog open={isOpen} onOpenChange={setIsOpen}>
    <DialogContent>
     <DialogHeader>
      <DialogTitle>Add New Task</DialogTitle>
      <DialogDescription>Fill in the details to create a new task</DialogDescription>
     </DialogHeader>
     <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-4 py-4">
       <div className="grid gap-2">
        <Label htmlFor="title">Title</Label>
        <Input id="title" placeholder="Task title" {...register("title")} />
        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
       </div>
       <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" placeholder="Describe the task" {...register("description")} />
        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
       </div>
       <div className="grid gap-2">
        <Label htmlFor="status">Status</Label>
        <Select
         defaultValue="pending"
         onValueChange={value => setValue("status", value as "pending" | "completed")}
        >
         <SelectTrigger>
          <SelectValue placeholder="Select a status" />
         </SelectTrigger>
         <SelectContent>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
         </SelectContent>
        </Select>
        {errors.status && <p className="text-red-500 text-sm">{errors.status.message}</p>}
       </div>
      </div>
      <DialogFooter>
       <Button type="button" variant="outline" onClick={closeDialog}>
        Cancel
       </Button>
       <Button type="submit">Add Task</Button>
      </DialogFooter>
     </form>
    </DialogContent>
   </Dialog>
  </FormProvider>
 );
}

export default AddTaskDialog;
