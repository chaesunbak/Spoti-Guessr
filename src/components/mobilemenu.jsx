import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import { Button } from "@/components/ui/button"
import SideBar from "./sidebar"

export default function MobilieMenu() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Button variant="outline">메뉴</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <SideBar />
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
