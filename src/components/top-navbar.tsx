import { ModeToggle } from "@/components/theme-toggle";
import { Card } from "@/components/ui/card";
import { SidebarTrigger } from "@/components/ui/sidebar";

export const TopNavbar = () => {
  return (
    <Card className="flex flex-row items-center justify-between p-1.5 mt-2 mx-4 sticky top-0 z-10 ">
      <SidebarTrigger className="size-8" />
      <h2
        className="font-bold text-2xl"
        style={{ textShadow: "1px 1px 2px #e7f900" }}
      >
        Formstore
      </h2>
      <ModeToggle effect={"click"} className="size-8 rounded-lg" />
    </Card>
  );
};
