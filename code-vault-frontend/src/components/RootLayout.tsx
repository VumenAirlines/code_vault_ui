import { Outlet } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { LogoutButton } from "../features/auth/components/LogoutButton";
import { useState } from "react";
import { Toaster } from "./ui/sonner";
import { ProfileDisplay } from "./ProfileDisplay";
import { EditorSettingsDialog } from "./EditorSettingsDialog";
import { CodeBlockSettingsDialog } from "./CodeBlockSettingsDialog";
const RootLayout = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background font-sans antialiased ">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger className=" fixed top-2 left-2 z-50 rounded shadow hover:text-muted-foreground/80 w-fit h-fit p-2">
          <Menu className="size-5" />
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px]">
          <SheetHeader>
            <SheetTitle>Settings</SheetTitle>
          </SheetHeader>
          <div className="grid flex-1 auto-rows-min gap-4 px-4">
            <div className="grid gap-3">
              <ProfileDisplay />
            </div>
            <div className="grid gap-3">
              <EditorSettingsDialog />
            </div>
            <div className="grid gap-3">
              <CodeBlockSettingsDialog />
            </div>
            <div className="grid gap-3">
              <ThemeToggle className="w-full" />
            </div>
          </div>
          <SheetFooter>
            <LogoutButton onLogout={() => setOpen(false)} />
          </SheetFooter>
        </SheetContent>
      </Sheet>
      <main className="flex justify-center items-center pt-10  mx-8 h-full">
        <Toaster richColors closeButton />
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
