"use client";
import * as React from "react";
import { DayPicker } from "react-day-picker";
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { cn } from "../../../lib/utilis";
import { Button } from "./button";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";

/**
 * @typedef {Object} CalendarProps
 * @property {Date=} selected
 * @property {(date: Date | undefined) => void=} onSelect
 * @property {string=} className
 */

const Calendar = React.forwardRef(
  ({ selected, onSelect, className, ...props }, ref) => {
    const [open, setOpen] = React.useState(false);
    const [month, setMonth] = React.useState(selected || new Date());

    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !selected && "text-muted-foreground",
              className
            )}
            onClick={() => setOpen(true)}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {selected ? selected.toLocaleDateString("en-US", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            }) : "Select date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <DayPicker
            mode="single"
            selected={selected}
            onSelect={(date) => {
              onSelect?.(date);
              setOpen(false);
            }}
            defaultMonth={month}
            onMonthChange={setMonth}
            className={cn("p-3", className)}
            classNames={{
              months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
              month: "space-y-4",
              caption: "flex justify-center pt-1 relative items-center",
              caption_label: "text-sm font-medium",
              nav: "space-x-1 flex items-center",
              nav_button: cn(
                "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
                "flex items-center justify-center"
              ),
              nav_button_previous: "absolute left-1",
              nav_button_next: "absolute right-1",
              table: "w-full border-collapse space-y-1",
              head_row: "flex",
              head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
              row: "flex w-full mt-2",
              cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
              day: cn(
                "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
                "hover:bg-accent hover:text-accent-foreground rounded-md"
              ),
              day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
              day_today: "bg-accent text-accent-foreground",
              day_outside: "text-muted-foreground opacity-50",
              day_disabled: "text-muted-foreground opacity-50",
              day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
            }}
            components={{
              IconLeft: () => <ChevronLeftIcon className="h-4 w-4" />,
              IconRight: () => <ChevronRightIcon className="h-4 w-4" />,
            }}
            {...props}
          />
        </PopoverContent>
      </Popover>
    );
  }
);

Calendar.displayName = "Calendar";

export { Calendar };