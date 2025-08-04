import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ListRestart } from "lucide-react";

export default function RefreshFormButton() {
  return (
    <Button
      className={cn(
        "bg-color-background text-xs border dark:text-gray-200",
        "text-black hover:bg-color-background"
      )}
      // className="text-xs"
      variant={"outline"}
      effect={"scale"}
    >
      <ListRestart className="opacity-60d" />
      <span className="max-lg:hidden">Refresh</span>
    </Button>
  );
}
