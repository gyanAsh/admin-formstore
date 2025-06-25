import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function SaveFormButton() {
  return (
    <Button
      className={cn(
        "dark:text-white text-black bg-color-background border border-primary",
        "px-4 py-1 rounded-lg flex flex-row gap-2 items-center",
        "hover:bg-color-background hover:",
      )}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15M9 12l3 3m0 0 3-3m-3 3V2.25"
        />
      </svg>
      Save
    </Button>
  );
}
