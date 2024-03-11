import { Link } from "react-router-dom"
import { Separator } from "@/components/ui/separator"
import UserIcon from "./UserIcon/usericon"
import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
  } from "@/components/ui/command"

export default function SideBar() {
    return (
        <>
            <Link to="/"><h1 className="font-sans text-xl font-bold">Spotify Guesser</h1></Link>
            
            <Separator />
            <Command>
                <CommandInput placeholder="Type a command or search..." />
                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Music">
                        <CommandItem><Link to="/artist">Artist</Link></CommandItem>
                        <CommandItem><Link to="/album">Album</Link></CommandItem>
                        <CommandItem><Link to="/track">Track</Link></CommandItem>
                        </CommandGroup>
                            <CommandSeparator />
                        <CommandGroup heading="Settings">
                        <CommandItem><Link to="/profile">Profile</Link></CommandItem>
                        <CommandItem><Link to="/settings">Settings</Link></CommandItem>
                        <UserIcon />
                    </CommandGroup>
                </CommandList>
            </Command>
        </>
    )
}