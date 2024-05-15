import { Link } from "react-router-dom"
import { Separator } from "@/components/ui/separator"
import UserIcon from "./UserIcon/usericon"
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from "@/components/ui/command"
import { useMediaQuery } from 'react-responsive';

export default function SideBar() {
    const isMobile = useMediaQuery({ maxWidth: 767 });

    return (
        <div>
            {!isMobile && (<><Link to="/"><h1 className="font-sans text-2xl font-bold m-1">Spoti Guesser</h1></Link>
            <Separator />
            <UserIcon/>
            <Separator /></>)}
            <Command>
                <CommandInput placeholder="검색어를 입력해주세요" />
                    <CommandList>
                        <CommandEmpty>검색 결과가 없습니다.</CommandEmpty>
                    <CommandGroup heading="게임모드" className="text-sm">
                        <CommandItem className="text-md"><Link to="game/artists">아티스트</Link></CommandItem>
                        <CommandItem className="text-md"> <Link to="game/albums">앨범</Link></CommandItem>
                        <CommandItem className="text-md"><Link to="game/tracks">트랙</Link></CommandItem>
                    </CommandGroup>
                    <CommandSeparator />
                    <CommandGroup heading="데이터" className="text-sm">
                        <CommandItem className="text-md"><Link to="/add">추가하기</Link></CommandItem>
                    </CommandGroup>
                    <CommandSeparator />
                    <CommandGroup heading="설정" className="text-sm">
                        <CommandItem className="text-md"><Link to="/acount">계정</Link></CommandItem>
                    </CommandGroup>
                </CommandList>
            </Command>
        </div>
    )
}