import ModeToggle from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export function Footer() {
  return (
    <>
      <Button
        effect={"click"}
        onClick={async () => {
          console.log("logout-user");
        }}
      >
        <LogOut strokeWidth={3} /> Sign Out
      </Button>
      <ModeToggle variant={"secondary"} effect={"click"} className="w-full" />
    </>
  );
}
