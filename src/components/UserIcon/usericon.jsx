import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
import useLogOut from "../../hooks/useLogOut";
import useAuthStore from "../../store/authStore";
import { Link } from "react-router-dom";

const UserIcon = () => {
    const user = useAuthStore((state) => state.user);
    const { handleLogOut } = useLogOut();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="m-1">
                <Avatar>
                    <AvatarImage  />
                    <AvatarFallback>{user ? user.nickname[0] : ""}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>{user ? user.nickname : "로그인 안됨"}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Link to="/acount">계정</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {!user ? (<DropdownMenuItem><Link to='/auth'>로그인</Link></DropdownMenuItem>): (<DropdownMenuItem className="text-red-500" onClick={handleLogOut}>로그아웃</DropdownMenuItem>)}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserIcon;