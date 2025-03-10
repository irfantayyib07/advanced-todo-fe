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

interface DeleteTaskDialogProps {
 isOpen: boolean;
 setIsOpen: (isOpen: boolean) => void;
 onClose: () => void;
 onDelete: () => void;
 taskToDelete: (Task & { index: number }) | null;
}

function DeleteTaskDialog({ isOpen, setIsOpen, onClose, onDelete, taskToDelete }: DeleteTaskDialogProps) {
 return (
  <Dialog open={isOpen} onOpenChange={setIsOpen}>
   <DialogContent>
    <DialogHeader>
     <DialogTitle>Are you sure?</DialogTitle>
     <DialogDescription>
      This action cannot be undone. This will permanently delete the task "{taskToDelete?.title}".
     </DialogDescription>
    </DialogHeader>
    <DialogFooter>
     <Button type="button" variant="outline" onClick={onClose}>
      Cancel
     </Button>
     <Button onClick={onDelete} variant="destructive" className="bg-red-500 hover:bg-red-700">
      Delete
     </Button>
    </DialogFooter>
   </DialogContent>
  </Dialog>
 );
}

export default DeleteTaskDialog;
