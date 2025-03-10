import { Outlet } from "react-router-dom";
import Header from "./Header";
import { useState } from "react";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import AddTaskDialog from "../Task/AddTaskDialog";
import { Toaster } from "../ui/sonner";

function Layout({}) {
 const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);

 return (
  <>
   <div className="h-svh">
    <Header />
    <main className="px-6 py-3">
     <Outlet />
    </main>
    <Button
     onClick={() => setIsAddTaskOpen(true)}
     className="!bg-black fixed bottom-6 right-6 rounded-full w-12 h-12 p-0 shadow-lg"
     variant="secondary"
    >
     <Plus className="h-6 w-6" color="white" />
    </Button>
    <AddTaskDialog isOpen={isAddTaskOpen} setIsOpen={setIsAddTaskOpen} />
   </div>
   <Toaster position="top-right" />
  </>
 );
}

export default Layout;
