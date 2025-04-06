import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  EllipsisVertical,
  LogOut,
  Logs,
  Search,
  Settings,
  Timer,
  User,
} from "lucide-react";
export function Footer() {
  const { isMobile } = useSidebar();
  return (
    <>
      {/* <Button
        className="bg-black dark:bg-white"
        effect={"click"}
        onClick={async () => {
          console.log("logout-user");
        }}
      >
        <LogOut strokeWidth={2} /> Sign Out
      </Button> */}
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                <Avatar className="in-data-[state=expanded]:size-6 transition-[width,height] duration-200 ease-in-out">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight ms-1">
                  <span className="truncate font-medium">{"Chad CN"}</span>
                </div>
                <div className="size-8 rounded-lg flex items-center justify-center bg-sidebar-accent/50 in-[[data-slot=dropdown-menu-trigger]:hover]:bg-transparent">
                  <Settings
                    className="size-5 opacity-80 hover:-rotate-45 duration-200 active:scale-95"
                    size={20}
                  />
                </div>
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
              // sideOffset={4}
              side={isMobile ? "top" : "right"}
              align="start"
              sideOffset={-5}
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
