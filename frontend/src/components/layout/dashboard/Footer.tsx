import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";
import { $userLoginData } from "@/store/user";
import { LogOut, Logs, Search, Settings, Timer, User } from "lucide-react";
export function Footer() {
  let user = $userLoginData.get();
  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Avatar className="in-data-[state=expanded]:size-7.5 flex items-center justify-center bg-primary rounded-lg transition-[width,height] duration-200 ease-in-out">
              <div className="text-white leading-0 font-bold">
                {user?.username?.slice(0, 2).toUpperCase()}
              </div>
            </Avatar>
            <div className="grid flex-1 text-left text-base leading-tight ms-1">
              <span className="truncate font-medium">{user?.username}</span>
            </div>
          </div>

          <DropdownMenu>
            <div className="size-8 rounded-lg flex items-center justify-center bg-sidebar-accent in-[[data-slot=dropdown-menu-trigger]:hover]:bg-transparent">
              <DropdownMenuTrigger asChild>
                <Settings
                  className="size-5 opacity-80 hover:-rotate-45 duration-200 active:scale-95 cursor-pointer"
                  size={20}
                />
              </DropdownMenuTrigger>
            </div>
            <DropdownMenuContent
              className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
              side="top"
              align="end"
              alignOffset={-5}
              sideOffset={6}
            >
              <DropdownMenuItem asChild className="gap-3 px-1 mb-1">
                <Button
                  className="w-full justify-start"
                  variant={"outline"}
                  effect={"click"}
                  onClick={async () => {
                    console.log("logout-user");
                  }}
                >
                  <Timer strokeWidth={2} /> Dashboard
                </Button>
              </DropdownMenuItem>

              <DropdownMenuItem asChild className="gap-3 px-1 mb-1">
                <Button
                  className="w-full justify-start"
                  variant={"outline"}
                  effect={"click"}
                  onClick={async () => {
                    console.log("logout-user");
                  }}
                >
                  <User strokeWidth={2} /> Profile
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="gap-3 px-1 mb-1">
                <Button
                  className="w-full justify-start"
                  variant={"outline"}
                  effect={"click"}
                  onClick={async () => {
                    console.log("logout-user");
                  }}
                >
                  <Logs strokeWidth={2} /> Analysis
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="gap-3 px-1 mb-1">
                <Button
                  className="w-full justify-start"
                  variant={"outline"}
                  effect={"click"}
                  onClick={async () => {
                    console.log("logout-user");
                  }}
                >
                  <Search strokeWidth={2} /> History
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="gap-3 px-1">
                <Button
                  className="bg-black text-white dark:bg-white dark:text-black dark:hover:text-white w-full justify-start"
                  variant={"outline"}
                  effect={"click"}
                  onClick={async () => {
                    console.log("logout-user");
                  }}
                >
                  <LogOut strokeWidth={2} /> Sign Out
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </>
  );
}
