import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export function Footer() {
  return (
    <>
      <Button
        className="bg-black dark:bg-white"
        effect={"click"}
        onClick={async () => {
          console.log("logout-user");
        }}
      >
        <LogOut strokeWidth={3} /> Sign Out
      </Button>
    </>
  );
}
