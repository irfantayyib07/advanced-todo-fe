import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
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
import { TaskFormValues, taskSchema } from "./TaskList";
import { Task } from "@/types/task";
import { useUpdateTask } from "@/services/task";
import { toast } from "sonner";

interface EditTaskDialogProps {
 isOpen: boolean;
 setIsOpen: (isOpen: boolean) => void;
 taskToEdit: Task;
 onSuccess: () => void;
}

function EditTaskDialog({ isOpen, setIsOpen, taskToEdit, onSuccess }: EditTaskDialogProps) {
 // Initialize the update task mutation
 const { mutate: updateTask, isPending } = useUpdateTask(
  taskToEdit._id,
  () => {
   onSuccess();
   toast.success("Task Updated Successfully");
   setIsOpen(false);
  },
  () => {
   toast.error("Error Updating Task");
  },
 );

 const {
  control,
  handleSubmit,
  formState: { errors },
  reset,
 } = useForm<TaskFormValues>({
  resolver: zodResolver(taskSchema),
  defaultValues: {
   title: taskToEdit.title,
   description: taskToEdit.description,
   status: taskToEdit.status,
  },
 });

 // Reset form when taskToEdit changes
 useEffect(() => {
  if (taskToEdit && isOpen) {
   reset({
    title: taskToEdit.title,
    description: taskToEdit.description,
    status: taskToEdit.status,
   });
  }
 }, [taskToEdit, isOpen, reset]);

 const handleFormSubmit = (data: TaskFormValues) => {
  updateTask(data);
 };

 return (
  <Dialog open={isOpen} onOpenChange={setIsOpen}>
   <DialogContent>
    <DialogHeader>
     <DialogTitle>Edit Task</DialogTitle>
     <DialogDescription>Make changes to the task below</DialogDescription>
    </DialogHeader>
    <form onSubmit={handleSubmit(handleFormSubmit)}>
     <div className="grid gap-4 py-4">
      <div className="grid gap-2">
       <Label htmlFor="edit-title">Title</Label>
       <Controller
        name="title"
        control={control}
        render={({ field }) => <Input id="edit-title" {...field} />}
       />
       {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
      </div>
      <div className="grid gap-2">
       <Label htmlFor="edit-description">Description</Label>
       <Controller
        name="description"
        control={control}
        render={({ field }) => <Textarea id="edit-description" {...field} />}
       />
       {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
      </div>
      <div className="grid gap-2">
       <Label htmlFor="edit-status">Status</Label>
       <Controller
        name="status"
        control={control}
        render={({ field }) => (
         <Select value={field.value} onValueChange={field.onChange}>
          <SelectTrigger id="edit-status">
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
      <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
       Cancel
      </Button>
      <Button type="submit" disabled={isPending} variant="secondary">
       {isPending ? "Saving..." : "Save changes"}
      </Button>
     </DialogFooter>
    </form>
   </DialogContent>
  </Dialog>
 );
}

export default EditTaskDialog;
