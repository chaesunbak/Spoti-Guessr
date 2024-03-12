import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthState } from 'react-firebase-hooks/auth';
import useLogOut from "../../hooks/useLogOut";
import { auth } from "../../firebase/firebase";
import { Link } from "react-router-dom";

const UserIcon = () => {
    const [user, loading, error] = useAuthState(auth);
    const 
    const { handleLogOut } = useLogOut();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel></DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Link to="/profile">프로필</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link to="/settings">설정</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {!user ? (<DropdownMenuItem><Link to='/auth'>로그인</Link></DropdownMenuItem>): (<DropdownMenuItem className="text-red-500" onClick={handleLogOut}>로그아웃</DropdownMenuItem>)}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserIcon;