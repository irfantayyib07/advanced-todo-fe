import { useFormContext } from "react-hook-form";
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
import { TaskFormValues } from "./TaskList";
import { Task } from "@/types/task";

interface EditTaskDialogProps {
 isOpen: boolean;
 setIsOpen: (isOpen: boolean) => void;
 onClose: () => void;
 onSubmit: (data: TaskFormValues) => void;
 taskToEdit: (Task & { index: number }) | null;
}

function EditTaskDialog({ isOpen, setIsOpen, onClose, onSubmit, taskToEdit }: EditTaskDialogProps) {
 const {
  register,
  handleSubmit,
  formState: { errors },
  setValue,
 } = useFormContext<TaskFormValues>();

 return (
  <Dialog open={isOpen} onOpenChange={setIsOpen}>
   <DialogContent>
    <DialogHeader>
     <DialogTitle>Edit Task</DialogTitle>
     <DialogDescription>Make changes to the task below</DialogDescription>
    </DialogHeader>
    <form onSubmit={handleSubmit(onSubmit)}>
     <div className="grid gap-4 py-4">
      <div className="grid gap-2">
       <Label htmlFor="title">Title</Label>
       <Input id="title" {...register("title")} />
       {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
      </div>
      <div className="grid gap-2">
       <Label htmlFor="description">Description</Label>
       <Textarea id="description" {...register("description")} />
       {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
      </div>
      <div className="grid gap-2">
       <Label htmlFor="status">Status</Label>
       <Select
        defaultValue={taskToEdit?.status}
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
      <Button type="button" variant="outline" onClick={onClose}>
       Cancel
      </Button>
      <Button type="submit">Save changes</Button>
     </DialogFooter>
    </form>
   </DialogContent>
  </Dialog>
 );
}

export default EditTaskDialog;
