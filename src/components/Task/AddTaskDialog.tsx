import { useState } from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
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
import { ApiError, useAddTask } from "@/services/task";
import { toast } from "sonner";

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
  control,
  handleSubmit,
  formState: { errors },
  reset,
 } = methods;

 // Hook for adding a task
 const { mutate: addTask, isPending } = useAddTask(
  () => {
   toast.success("Task Added");
   closeDialog();
  },
  () => {
   toast.error("Error Adding New Task");
  },
 );

 const closeDialog = () => {
  setIsOpen(false);
  reset();
 };

 const onSubmit = (data: TaskFormValues) => {
  addTask(data);
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
        <Controller
         name="title"
         control={control}
         render={({ field }) => <Input id="title" placeholder="Task title" {...field} />}
        />
        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
       </div>
       <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <Controller
         name="description"
         control={control}
         render={({ field }) => <Textarea id="description" placeholder="Describe the task" {...field} />}
        />
        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
       </div>
       <div className="grid gap-2">
        <Label htmlFor="status">Status</Label>
        <Controller
         name="status"
         control={control}
         render={({ field }) => (
          <Select value={field.value} onValueChange={field.onChange}>
           <SelectTrigger>
            <SelectValue placeholder="Select a status" />
           </SelectTrigger>
           <SelectContent>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
           </SelectContent>
          </Select>
         )}
        />
        {errors.status && <p className="text-red-500 text-sm">{errors.status.message}</p>}
       </div>
      </div>
      <DialogFooter>
       <Button type="button" variant="outline" onClick={closeDialog}>
        Cancel
       </Button>
       <Button type="submit" disabled={isPending}>
        {isPending ? "Adding..." : "Add Task"}
       </Button>
      </DialogFooter>
     </form>
    </DialogContent>
   </Dialog>
  </FormProvider>
 );
}

export default AddTaskDialog;
