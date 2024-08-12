import { FilterIcon, SearchIcon } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useContext } from "react";
import { TaskContext } from "@/context/TaskContext";

export  function Header() {
    const { setSearchQuery } = useContext(TaskContext)!;
  return (
    <header className="flex items-center justify-between p-4 rounded-lg bg-muted drop-shadow-lg">
        <div className="relative w-1/3 drop-shadow-lg">
          <SearchIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Input type="search" onChange={(e)=> setSearchQuery(e.target.value)} placeholder="Search Task By Title or Description" className="w-full pl-10 pr-4 py-2 border rounded-full" />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <FilterIcon className="h-5 w-5" />
          Filter
        </Button>
      </header>
  )
}