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
import { cn } from "@/lib/utils";

export default function Component<T extends DateValue>({
  className,
  ...props
}: DatePickerProps<T>) {
  return (
    <DatePicker className={cn("*:not-first:mt-2 w-full", className)} {...props}>
      <div className="flex">
        <Group className="w-full">
          <DateInput className="pe-9 bg-inherit border-zinc-800/50 rounded text-zinc-950" />
        </Group>
        <Button className="text-muted-foreground/80 hover:opacity-55 cursor-pointer active:scale-90 hover:text-foreground data-focus-visible:border-ring data-focus-visible:ring-ring/50 z-10 -ms-9 -me-px flex w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none data-focus-visible:ring-[3px]">
          <CalendarIcon size={16} className="text-zinc-800/85" />
        </Button>
      </div>
      <Popover
        className="bg-background text-popover-foreground data-entering:animate-in data-exiting:animate-out data-[entering]:fade-in-0 data-[exiting]:fade-out-0 data-[entering]:zoom-in-95 data-[exiting]:zoom-out-95 data-[placement=bottom]:slide-in-from-top-2 data-[placement=left]:slide-in-from-right-2 data-[placement=right]:slide-in-from-left-2 data-[placement=top]:slide-in-from-bottom-2 z-50 rounded-lg border shadow-lg outline-hidden"
        offset={4}
      >
        <Dialog className="max-h-[inherit] overflow-auto p-2">
          <Calendar className={"bg-white text-zinc-950"} />
        </Dialog>
      </Popover>
    </DatePicker>
  );
}
