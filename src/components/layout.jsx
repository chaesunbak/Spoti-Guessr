import { Outlet } from "react-router-dom";
import { useMediaQuery } from 'react-responsive';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup} from "@/components/ui/resizable"
import { ScrollArea } from "@/components/ui/scroll-area"
import SideBar from "./sidebar";


function Layout() {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
      <ResizablePanelGroup autoSaveId="persistence" direction={isMobile ? "vertical" : "horizontal"} className="size-full">
        <ResizablePanel defaultSize={20} minSize={5}>
           <SideBar className="h-full p-4" />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={80} minSize={70}>
          <ScrollArea className="h-full w-full p-4">
            <Outlet />
          </ScrollArea>
        </ResizablePanel>
      </ResizablePanelGroup>
  )
}

export default Layout
