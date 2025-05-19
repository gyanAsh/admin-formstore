import {
  ClipboardCopy,
  Copy,
  Link2,
  Pause,
  Pencil,
  Share2,
  Trash2,
} from "lucide-react";
import {
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import * as motion from "motion/react-client";

export const FormDropdownContentOptions = ({
  alignOffset = -5,
  sideOffset = 10,
  animationDirection = "left",
}: {
  alignOffset?: number;
  sideOffset?: number;
  animationDirection?: "left" | "right";
}) => {
  return (
    <DropdownMenuContent
      className="space-y-0.5 rounded-lg  font-semibold text-zinc-700 dark:text-zinc-300 p-2"
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
        <DropdownMenuItem
          className="rounded-lg space-x-1 hover:text-zinc-900! hover:dark:text-zinc-100!"
          asChild
        >
          <motion.div
            whileHover={{
              scale: 1.03,
              transition: { duration: 0.1 },
            }}
            whileTap={{
              scale: 0.95,
              transition: { duration: 0.1 },
            }}
          >
            <Link2
              size={16}
              strokeWidth={3}
              className="opacity-100"
              aria-hidden="true"
            />
            <p>Copy Link</p>
          </motion.div>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="rounded-lg space-x-1 hover:text-zinc-900! hover:dark:text-zinc-100!"
          asChild
        >
          <motion.div
            whileHover={{
              scale: 1.03,
              transition: { duration: 0.1 },
            }}
            whileTap={{
              scale: 0.95,
              transition: { duration: 0.1 },
            }}
          >
            <Pause
              size={16}
              strokeWidth={3}
              className="opacity-100"
              aria-hidden="true"
            />
            <p>Pause</p>
          </motion.div>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="rounded-lg space-x-1 hover:text-zinc-900! hover:dark:text-zinc-100!"
          asChild
        >
          <motion.div
            whileHover={{
              scale: 1.03,
              transition: { duration: 0.1 },
            }}
            whileTap={{
              scale: 0.95,
              transition: { duration: 0.1 },
            }}
          >
            <Copy
              size={16}
              strokeWidth={3}
              className="opacity-100"
              aria-hidden="true"
            />
            <p>Duplicate</p>
          </motion.div>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="rounded-lg space-x-1 hover:text-zinc-900! hover:dark:text-zinc-100!"
          asChild
        >
          <motion.div
            whileHover={{
              scale: 1.03,
              transition: { duration: 0.1 },
            }}
            whileTap={{
              scale: 0.95,
              transition: { duration: 0.1 },
            }}
          >
            <ClipboardCopy
              size={16}
              strokeWidth={3}
              className="opacity-100"
              aria-hidden="true"
            />
            <p>Move To</p>
          </motion.div>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="rounded-lg space-x-1 hover:text-zinc-900! hover:dark:text-zinc-100!"
          asChild
        >
          <motion.div
            whileHover={{
              scale: 1.03,
              transition: { duration: 0.1 },
            }}
            whileTap={{
              scale: 0.95,
              transition: { duration: 0.1 },
            }}
          >
            <Pencil
              size={16}
              strokeWidth={3}
              className="opacity-100"
              aria-hidden="true"
            />
            <p>Rename</p>
          </motion.div>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="rounded-lg space-x-1 bg-destructive/75 shadow-xs hover:text-white! hover:bg-destructive!"
          asChild
        >
          <motion.div
            whileHover={{
              scale: 1.03,
              transition: { duration: 0.1 },
            }}
            whileTap={{
              scale: 0.95,
              transition: { duration: 0.1 },
            }}
          >
            <Trash2
              size={16}
              strokeWidth={3}
              className="opacity-100"
              aria-hidden="true"
            />
            <p>Delete</p>
          </motion.div>
        </DropdownMenuItem>
      </motion.section>
    </DropdownMenuContent>
  );
};
