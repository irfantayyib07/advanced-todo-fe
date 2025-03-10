import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface TaskFiltersProps {
 onFilterChange: (filters: {
  status: string;
  search: string;
  sortBy: string;
  sortOrder: "asc" | "desc";
 }) => void;
 totalTasks: number;
}

function TaskFilters({ onFilterChange, totalTasks }: TaskFiltersProps) {
 const [status, setStatus] = useState<string>("all");
 const [search, setSearch] = useState<string>("");
 const [sortBy, setSortBy] = useState<string>("createdAt");
 const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

 const handleStatusChange = (value: string) => {
  setStatus(value);
  applyFilters(value, search, sortBy, sortOrder);
 };

 const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setSearch(e.target.value);
  applyFilters(status, e.target.value, sortBy, sortOrder);
 };

 const handleSortChange = (value: string) => {
  setSortBy(value);
  applyFilters(status, search, value, sortOrder);
 };

 const toggleSortOrder = () => {
  const newOrder = sortOrder === "asc" ? "desc" : "asc";
  setSortOrder(newOrder);
  applyFilters(status, search, sortBy, newOrder);
 };

 const applyFilters = (status: string, search: string, sortBy: string, sortOrder: "asc" | "desc") => {
  onFilterChange({
   status,
   search,
   sortBy,
   sortOrder,
  });
 };

 const clearFilters = () => {
  setStatus("all");
  setSearch("");
  setSortBy("createdAt");
  setSortOrder("desc");
  applyFilters("all", "", "createdAt", "desc");
 };

 return (
  <div className="mb-6 space-y-4">
   <div className="flex justify-between items-center">
    <h2 className="text-xl font-semibold">Tasks ({totalTasks})</h2>
    <Button variant="outline" size="sm" onClick={clearFilters}>
     Clear Filters
    </Button>
   </div>

   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    <div className="relative h-max">
     <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
      <Search className="h-4 w-4 text-gray-400" />
     </div>
     <Input
      type="text"
      placeholder="Search tasks..."
      value={search}
      onChange={handleSearchChange}
      className="pl-10"
     />
    </div>

    <div className="space-y-2 flex items-center gap-2 flex-wrap">
     <Label htmlFor="status-filter" className="mb-0">
      Status:
     </Label>
     <Select value={status} onValueChange={handleStatusChange}>
      <SelectTrigger id="status-filter">
       <SelectValue placeholder="Filter by status" />
      </SelectTrigger>
      <SelectContent>
       <SelectItem value="all">All</SelectItem>
       <SelectItem value="pending">Pending</SelectItem>
       <SelectItem value="completed">Completed</SelectItem>
      </SelectContent>
     </Select>
    </div>

    <div className="space-y-2 flex items-center gap-2 flex-wrap">
     <Label htmlFor="sort-by" className="mb-0">
      Sort By:
     </Label>
     <div className="flex space-x-2">
      <Select value={sortBy} onValueChange={handleSortChange}>
       <SelectTrigger id="sort-by" className="flex-grow">
        <SelectValue placeholder="Sort by" />
       </SelectTrigger>
       <SelectContent>
        <SelectItem value="title">Title</SelectItem>
        <SelectItem value="createdAt">Created Date</SelectItem>
        <SelectItem value="status">Status</SelectItem>
       </SelectContent>
      </Select>
      <Button
       variant="outline"
       size="icon"
       onClick={toggleSortOrder}
       title={sortOrder === "asc" ? "Ascending" : "Descending"}
      >
       {sortOrder === "asc" ? "↑" : "↓"}
      </Button>
     </div>
    </div>
   </div>
  </div>
 );
}

export default TaskFilters;
