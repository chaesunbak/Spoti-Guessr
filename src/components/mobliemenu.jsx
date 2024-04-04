import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import SideBar from "./sidebar"

export default function MobilieMenu() {
    return (
        <DropdownMenu className="">
            <DropdownMenuTrigger>메뉴</DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <SideBar />
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
