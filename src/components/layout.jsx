import { Outlet } from "react-router-dom";
import { useMediaQuery } from 'react-responsive';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup} from "@/components/ui/resizable"
import { ScrollArea } from "@/components/ui/scroll-area"
import SideBar from "./sidebar";
import { Toaster } from "@/components/ui/toaster"


function Layout() {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
      <ResizablePanelGroup autoSaveId="persistence" direction={isMobile ? "vertical" : "horizontal"} className="size-full">
        <ResizablePanel defaultSize={20} minSize={5} className="h-full">
           <SideBar className="h-full p-4" />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={80} minSize={70}>
          <ScrollArea>
            <Outlet />
            <Toaster />
          </ScrollArea>
        </ResizablePanel>
      </ResizablePanelGroup>
  )
}

export default Layout
