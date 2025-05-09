"use client";

import React, { ComponentProps } from "react";
import { getLocalTimeZone, today } from "@internationalized/date";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import {
  Button,
  CalendarCell as CalendarCellRac,
  CalendarGridBody as CalendarGridBodyRac,
  CalendarGridHeader as CalendarGridHeaderRac,
  CalendarGridProps,
  CalendarGrid as CalendarGridRac,
  CalendarHeaderCell as CalendarHeaderCellRac,
  Calendar as CalendarRac,
  composeRenderProps,
  Heading as HeadingRac,
  RangeCalendar as RangeCalendarRac,
} from "react-aria-components";

import { cn, tw_colors } from "@/lib/utils";

interface BaseCalendarProps {
  className?: string;
}

type CalendarProps = ComponentProps<typeof CalendarRac> & BaseCalendarProps;
type RangeCalendarProps = ComponentProps<typeof RangeCalendarRac> &
  BaseCalendarProps;

function CalendarHeader({
  headerBtn,
  className,
  ...props
}: React.ComponentProps<"header"> & { headerBtn?: string }) {
  return (
    <header
      className={cn("flex w-full items-center gap-1 pb-1", className)}
      {...props}
    >
      <Button
        slot="previous"
        className={cn(
          "text-muted-foreground/80 hover:bg-accent hover:text-foreground focus-visible:ring-ring/50 flex size-9 items-center justify-center rounded-md transition-[color,box-shadow] outline-none focus-visible:ring-[3px]",
          headerBtn
        )}
      >
        <ChevronLeftIcon size={16} />
      </Button>
      <HeadingRac className="grow text-center text-sm font-medium" />
      <Button
        slot="next"
        className={cn(
          "text-muted-foreground/80 hover:bg-accent hover:text-foreground focus-visible:ring-ring/50 flex size-9 items-center justify-center rounded-md transition-[color,box-shadow] outline-none focus-visible:ring-[3px]",
          headerBtn
        )}
      >
        <ChevronRightIcon size={16} />
      </Button>
    </header>
  );
}

function CalendarGridComponent({
  isRange = false,
  className,
}: Omit<CalendarGridProps, "children"> & { isRange?: boolean }) {
  const now = today(getLocalTimeZone());

  return (
    <CalendarGridRac className={className}>
      <CalendarGridHeaderRac>
        {(day) => (
          <CalendarHeaderCellRac className="text-inherit size-9 rounded-md p-0 text-xs font-medium">
            {day}
          </CalendarHeaderCellRac>
        )}
      </CalendarGridHeaderRac>
      <CalendarGridBodyRac className="[&_td]:px-0 [&_td]:py-px">
        {(date) => (
          <CalendarCellRac
            date={date}
            className={cn(
              "text-foreground data-hovered:bg-accent data-selected:bg-primary data-hovered:text-foreground data-selected:text-primary-foreground data-focus-visible:ring-ring/50 relative flex size-9 items-center justify-center rounded-md p-0 text-sm font-normal whitespace-nowrap [transition-property:color,background-color,border-radius,box-shadow] duration-150 outline-none data-disabled:pointer-events-none data-disabled:opacity-30 data-focus-visible:z-10 data-focus-visible:ring-[3px] data-unavailable:pointer-events-none data-unavailable:line-through data-unavailable:opacity-30",
              // Range-specific styles
              isRange &&
                "data-selected:bg-accent data-selected:text-foreground data-invalid:data-selection-end:bg-destructive data-invalid:data-selection-start:bg-destructive data-selection-end:bg-primary data-selection-start:bg-primary data-selection-end:text-primary-foreground data-selection-start:text-primary-foreground data-invalid:bg-red-100 data-selected:rounded-none data-selection-end:rounded-e-md data-invalid:data-selection-end:text-white data-selection-start:rounded-s-md data-invalid:data-selection-start:text-white",
              // Today indicator styles
              date.compare(now) === 0 &&
                cn(
                  "after:bg-primary after:pointer-events-none after:absolute after:start-1/2 after:bottom-1 after:z-10 after:size-[3px] after:-translate-x-1/2 after:rounded-full",
                  isRange
                    ? "data-selection-end:after:bg-background data-selection-start:after:bg-background"
                    : "data-selected:after:bg-background"
                ),
              className
            )}
          />
        )}
      </CalendarGridBodyRac>
    </CalendarGridRac>
  );
}

function Calendar({
  className,
  calendar_bg_theme,
  calendar_tw_color,
  ...props
}: CalendarProps & {
  calendar_bg_theme?: "light" | "dark";
  calendar_tw_color?: tw_colors;
}) {
  let headerStyle = cn({
    "bg-red-200 text-zinc-900": calendar_tw_color === "red",
  });
  let headerBtn = cn({
    "hover:bg-red-400/70 hover:text-zinc-900 text-zinc-900 data-disabled:text-zinc-900/20  hover:data-disabled:text-zinc-900/20 hover:data-disabled:bg-inherit":
      calendar_tw_color === "red",
  });
  let componentStyle = cn({
    "bg-red-200 text-zinc-900 data-selected:bg-red-400/70 data-selected:text-inherit data-hovered:bg-red-300/85 data-hovered:text-zinc-900 data-hovered:cursor-pointer":
      calendar_tw_color === "red",
  });

  return (
    <CalendarRac
      {...props}
      className={composeRenderProps(className, (className) =>
        cn("w-fit", className)
      )}
    >
      <CalendarHeader headerBtn={headerBtn} className={headerStyle} />
      <CalendarGridComponent className={componentStyle} />
    </CalendarRac>
  );
}

function RangeCalendar({ className, ...props }: RangeCalendarProps) {
  return (
    <RangeCalendarRac
      {...props}
      className={composeRenderProps(className, (className) =>
        cn("w-fit", className)
      )}
    >
      <CalendarHeader />
      <CalendarGridComponent isRange />
    </RangeCalendarRac>
  );
}

export { Calendar, RangeCalendar };
