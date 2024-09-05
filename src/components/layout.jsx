import { Link, Outlet } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { ScrollArea } from '@/components/ui/scroll-area';
import SideBar from './sidebar';
import { Toaster } from '@/components/ui/toaster';
import MobileMenu from './mobilemenu';
import UserIcon from './usericon';

function Layout() {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  if (isMobile)
    return (
      <>
        <div className="flex justify-between">
          <Link to="/">
            <h1 className="font-sans text-2xl font-bold m-1">Spoti Guesser</h1>
          </Link>
          <UserIcon />
          <MobileMenu />
        </div>
        <Outlet />
        <Toaster />
      </>
    );

  if (!isMobile)
    return (
      <ResizablePanelGroup autoSaveId="persistence" direction="horizontal" className="size-full">
        <ResizablePanel defaultSize={20} minSize={5} className="h-full">
          <SideBar className="h-full p-4" />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={80} minSize={70}>
          <ScrollArea className="h-full max-h-screen">
            <Outlet />
          </ScrollArea>
          <Toaster />
        </ResizablePanel>
      </ResizablePanelGroup>
    );
}

export default Layout;
