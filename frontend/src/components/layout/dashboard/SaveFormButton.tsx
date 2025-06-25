import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function SaveFormButton() {
  return (
    <Button
      className={cn(
        "dark:text-white text-black bg-color-background border border-primary",
        "px-4 py-1 rounded-lg flex flex-row gap-2 items-center",
        "hover:bg-color-background hover:"
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
          d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
        />
      </svg>
      Save
    </Button>
  );
}
