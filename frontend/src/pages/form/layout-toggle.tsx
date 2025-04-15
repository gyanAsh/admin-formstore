import { useState } from "react";
import { List, StickyNote } from "lucide-react";

import { Toggle } from "@/components/ui/toggle";

export default function LayoutToggle() {
  const [theme, setTheme] = useState<string>("classic");

  return (
    <Toggle
      variant="outline"
      className="group data-[state=on]:hover:bg-muted size-8 data-[state=on]:bg-transparent cursor-pointer"
      pressed={theme === "page"}
      onPressedChange={() =>
        setTheme((prev) => (prev === "page" ? "classic" : "page"))
      }
      aria-label={`Switch to ${theme === "page" ? "classic" : "page"} mode`}
    >
      {/* Note: After page mode implementation, rely on page: prefix rather than group-data-[state=on]: */}
      <StickyNote
        size={16}
        className="shrink-0 scale-0 opacity-0 transition-all group-data-[state=on]:scale-100 group-data-[state=on]:opacity-100"
        aria-hidden="true"
      />
      <List
        size={16}
        className="absolute shrink-0 scale-100 opacity-100 transition-all group-data-[state=on]:scale-0 group-data-[state=on]:opacity-0"
        aria-hidden="true"
      />
    </Toggle>
  );
}
