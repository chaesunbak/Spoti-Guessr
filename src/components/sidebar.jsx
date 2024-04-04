import { Link } from "react-router-dom"
import { Separator } from "@/components/ui/separator"
import UserIcon from "./UserIcon/usericon"
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from "@/components/ui/command"

export default function SideBar() {
    return (
        <div>
            <Link to="/"><h1 className="font-sans text-2xl font-bold m-1">Spoti Guesser</h1></Link>

            <Separator />
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
                        <CommandItem className="text-md"><Link to="/info">살펴보기</Link></CommandItem>
                        <CommandItem className="text-md"><Link to="/add">추가하기</Link></CommandItem>
                    </CommandGroup>
                    <CommandSeparator />
                    <CommandGroup heading="설정" className="text-sm">
                        <CommandItem className="text-md"><Link to="/profile">프로필</Link></CommandItem>
                        <CommandItem className="text-md"><Link to="/settings">설정</Link></CommandItem>
                        <UserIcon />
                    </CommandGroup>
                </CommandList>
            </Command>
        </div>
    )
}