import {
 Dialog,
 DialogContent,
 DialogDescription,
 DialogFooter,
 DialogHeader,
 DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Task } from "@/types/task";
import { useDeleteTask } from "@/services/task";
import { toast } from "sonner";

interface DeleteTaskDialogProps {
 isOpen: boolean;
 setIsOpen: (isOpen: boolean) => void;
 taskToDelete: Task;
 onSuccess: () => void;
}

function DeleteTaskDialog({ isOpen, setIsOpen, taskToDelete, onSuccess }: DeleteTaskDialogProps) {
 // Initialize the delete task mutation
 const { mutate: deleteTask, isPending } = useDeleteTask(
  () => {
   onSuccess();
   toast.success("Task Deleted");
   setIsOpen(false);
  },
  () => {
   toast.error("Error Deleting Task");
  },
 );

 const handleDelete = () => {
  deleteTask(taskToDelete._id);
 };

 return (
  <Dialog open={isOpen} onOpenChange={setIsOpen}>
   <DialogContent>
    <DialogHeader>
     <DialogTitle>Are you sure?</DialogTitle>
     <DialogDescription>
      This action cannot be undone. This will permanently delete the task "{taskToDelete.title}".
     </DialogDescription>
    </DialogHeader>
    <DialogFooter>
     <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
      Cancel
     </Button>
     <Button
      onClick={handleDelete}
      variant="secondary"
      className="bg-red-500 hover:bg-red-700"
      disabled={isPending}
     >
      {isPending ? "Deleting..." : "Delete"}
     </Button>
    </DialogFooter>
   </DialogContent>
  </Dialog>
 );
}

export default DeleteTaskDialog;
