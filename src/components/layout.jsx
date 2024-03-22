import { Outlet } from "react-router-dom";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
  } from "@/components/ui/resizable"
import { ScrollArea } from "@/components/ui/scroll-area"
import SideBar from "./sidebar";


function Layout() {

  return (
    <>
      <ResizablePanelGroup direction="horizontal" className="size-full">
        <ResizablePanel defaultSize={20}>
           <SideBar />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={80}>
          <ScrollArea className="h-full w-full p-4">
            <Outlet />
          </ScrollArea>
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  )
}

export default Layout
