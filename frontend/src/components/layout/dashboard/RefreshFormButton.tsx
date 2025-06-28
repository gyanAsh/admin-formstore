import { Button } from "@/components/ui/button";
import { ListRestart } from "lucide-react";

export default function RefreshFormButton() {
  return (
    <Button
      // className={cn(
      //   "bg-color-background border-primary border dark:text-gray-200",
      //   "text-black hover:bg-color-background"
      // )}
      className="text-xs"
      variant={"outline"}
      effect={"scale"}
    >
      <ListRestart className="opacity-60" />
      <span className="max-lg:hidden">Refresh</span>
    </Button>
  );
}
