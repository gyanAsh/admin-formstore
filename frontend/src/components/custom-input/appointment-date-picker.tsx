import { CalendarIcon } from "lucide-react";
import {
  Button,
  DatePicker,
  DatePickerProps,
  DateValue,
  Dialog,
  Group,
  Popover,
} from "react-aria-components";

import { DateInput } from "@/components/custom-input/custom-datefield-rac";
import { Calendar } from "@/components/custom-input/custom-calender-rac";
import { cn, tw_colors } from "@/lib/utils";

export default function Component<T extends DateValue>({
  dataSegment_className,
  dateInput_className,
  calendar_bg_theme = "light",
  calendar_tw_color,
  className,
  ...props
}: DatePickerProps<T> & {
  dataSegment_className?: string;
  dateInput_className?: string;
} & {
  calendar_bg_theme?: "light" | "dark";
  calendar_tw_color?: tw_colors;
}) {
  let popoverStyle = cn({
    "bg-red-200 border-zinc-500": calendar_tw_color === "red",
  });
  return (
    <DatePicker className={cn("*:not-first:mt-2 w-full", className)} {...props}>
      <div className="flex">
        <Group className="w-full">
          <DateInput
            dataSegment_className={dataSegment_className}
            className={cn(
              "pe-9 bg-inherit border-zinc-800/50 rounded text-zinc-950",
              dateInput_className
            )}
          />
        </Group>
        <Button className="text-muted-foreground/80 hover:opacity-55 cursor-pointer active:scale-90 hover:text-foreground data-focus-visible:border-ring data-focus-visible:ring-ring/50 z-10 -ms-9 -me-px flex w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none data-focus-visible:ring-[3px]">
          <CalendarIcon size={16} className="text-zinc-800/85" />
        </Button>
      </div>
      <Popover
        className={cn(
          " bg-background text-popover-foreground data-entering:animate-in data-exiting:animate-out data-[entering]:fade-in-0 data-[exiting]:fade-out-0 data-[entering]:zoom-in-95 data-[exiting]:zoom-out-95 data-[placement=bottom]:slide-in-from-top-2 data-[placement=left]:slide-in-from-right-2 data-[placement=right]:slide-in-from-left-2 data-[placement=top]:slide-in-from-bottom-2 z-50 rounded-lg border shadow-lg outline-hidden",
          popoverStyle
        )}
        offset={4}
      >
        <Dialog className={cn("max-h-[inherit] overflow-auto p-2")}>
          <Calendar
            calendar_bg_theme={calendar_bg_theme}
            calendar_tw_color={calendar_tw_color}
          />
        </Dialog>
      </Popover>
    </DatePicker>
  );
}
