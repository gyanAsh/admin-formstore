import {
  ClipboardCopy,
  Copy,
  Link2,
  Pause,
  Pencil,
  Trash2,
} from "lucide-react";
import * as motion from "motion/react-client";
import { PopoverContent } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export const FormPopoverContentOptions = ({
  closeOptions,
  alignOffset = -5,
  sideOffset = 10,
  animationDirection = "left",
}: {
  closeOptions: Function;
  alignOffset?: number;
  sideOffset?: number;
  animationDirection?: "left" | "right";
}) => {
  const OPTIONS = [
    { destructive: false, icon: Link2, name: "Copy Link" },
    { destructive: false, icon: Pause, name: "Pause" },
    { destructive: false, icon: Copy, name: "Duplicate" },
    { destructive: false, icon: ClipboardCopy, name: "Move To" },
    { destructive: false, icon: Pencil, name: "Rename" },
    { destructive: true, icon: Trash2, name: "Delete" },
  ];
  return (
    <PopoverContent
      className={cn(
        "min-w-[142px] w-fit",
        "space-y-0.5 rounded-lg font-semibold text-zinc-700 dark:text-zinc-300 p-2"
      )}
      side="left"
      align="end"
      alignOffset={alignOffset}
      sideOffset={sideOffset}
      asChild
    >
      <motion.section
        initial={{
          translateX: animationDirection == "right" ? "-5%" : "5%",
          opacity: 0,
        }}
        animate={{
          translateX: "0%",
          opacity: 100,
          transition: { duration: 0.25, ease: "easeInOut" },
        }}
      >
        {OPTIONS.map((option) => (
          <motion.div
            autoFocus={false}
            whileHover={{
              scale: 1.03,
              transition: { duration: 0.1 },
            }}
            whileTap={{
              scale: 0.95,
              transition: { duration: 0.1 },
            }}
            onClick={() => closeOptions()}
            data-destructive={option.destructive}
            className={cn(
              "hover:bg-accent hover:text-zinc-900! hover:dark:text-zinc-100!",
              "relative flex cursor-default items-center gap-2",
              "px-2 py-1.5 text-sm outline-hidden select-none",
              "rounded-lg space-x-1 min-w-[142px]",
              "data-[destructive=true]:bg-destructive data-[destructive=true]:focus:bg-destructive/10 ",
              "dark:data-[destructive=true]:focus:bg-destructive/40",
              "data-[destructive=true]:focus:text-destructive "
            )}
          >
            <option.icon
              size={16}
              strokeWidth={3}
              className="opacity-100"
              aria-hidden="true"
            />
            <p>{option.name}</p>
          </motion.div>
        ))}
      </motion.section>
    </PopoverContent>
  );
};
