import { Outlet, useNavigate } from "react-router-dom";
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
import { Button } from "./ui/button";
import { SearchBar } from "../features/snippets/components/SearchBar";
import { useAuthStore } from "../stores/useAuthStore";
const RootLayout = () => {
  //todo use link instead of button
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const token = useAuthStore.getState().token;
  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      {token && (
        <SearchBar className="relative top-4 left-1/2 transform -translate-x-1/2 max-w-lg w-full z-50" />
      )}{" "}
      {token && (
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className=" fixed top-2 left-2 z-50 rounded shadow hover:text-muted-foreground/80 w-fit h-fit p-2">
            <Menu className="size-5" />
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px]">
            <SheetHeader>
              <SheetTitle>Settings</SheetTitle>
            </SheetHeader>
            <div className="grid flex-1 auto-rows-min gap-2 px-4">
              <div className="grid gap-3">
                <ProfileDisplay />
              </div>
              <Button
                className="rounded-none hover:bg-background cursor-pointer justify-start  dark:hover:bg-background text-md "
                variant="ghost"
                onClick={() => navigate("/")}
              >
                Home
              </Button>
              <Button
                className="rounded-none hover:bg-background cursor-pointer justify-start  dark:hover:bg-background text-md "
                variant="ghost"
                onClick={() => navigate("/snippets")}
              >
                All snippets
              </Button>
              <p className="text-md px-3 font-semibold">Settings</p>
              <div className="grid auto-rows-min gap-2 px-4">
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
            </div>
            <SheetFooter>
              <LogoutButton onLogout={() => setOpen(false)} />
            </SheetFooter>
          </SheetContent>
        </Sheet>
      )}
      <main className="flex justify-center items-center pt-10  mx-8 h-full">
        <Toaster richColors closeButton />
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
