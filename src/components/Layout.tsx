import { Outlet } from "react-router-dom";
import Header from "./Header";
import { useState } from "react";
import { Button } from "./ui/button";
import AddTaskDialog from "./AddTaskDialog";
import { Plus } from "lucide-react";

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
     className="fixed bottom-6 right-6 rounded-full w-12 h-12 p-0 shadow-lg"
     variant="secondary"
    >
     <Plus className="h-6 w-6" />
    </Button>
    <AddTaskDialog isOpen={isAddTaskOpen} setIsOpen={setIsAddTaskOpen} />
   </div>
  </>
 );
}

export default Layout;
