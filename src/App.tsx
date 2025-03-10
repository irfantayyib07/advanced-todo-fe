import { Routes, Route } from "react-router-dom";
import Layout from "./components/Common/Layout";
import TaskList from "./components/Task/TaskList";

function App() {
 return (
  <>
   <Routes>
    <Route path="/" element={<Layout />}>
     <Route path="/" element={<TaskList />} />
    </Route>
   </Routes>
  </>
 );
}

export default App;
