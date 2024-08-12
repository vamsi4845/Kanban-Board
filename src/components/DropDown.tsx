import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Ellipsis } from "lucide-react"
import TaskForm from "./TaskForm"

export function Dropdown({ id }: { id: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Ellipsis className=" absolute cursor-pointer text-gray-500 right-3 top-3 z-10" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-full">
          <DropdownMenuItem>
            <TaskForm task={{_id: id}} />
          </DropdownMenuItem>
        <DropdownMenuSeparator />
          <DropdownMenuItem>
            Billing
          </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
