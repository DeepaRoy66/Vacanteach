import * as React from "react"

import { cn } from "../../../lib/utilis"

const ChartConfig = React.createContext(null)

const ChartContainer = React.forwardRef(
  ({ className, ...props }, ref) => (
    <div
      className={cn("rounded-md border bg-card text-card-foreground p-4", className)}
      ref={ref}
      {...props}
    />
  )
)
ChartContainer.displayName = "ChartContainer"

const ChartTooltip = React.forwardRef(
  ({ className, ...props }, ref) => (
    <div className={cn("bg-popover text-popover-foreground rounded-md border shadow-sm p-2", className)} ref={ref} {...props} />
  )
)
ChartTooltip.displayName = "ChartTooltip"

const ChartTooltipContent = React.forwardRef(
  ({ className, chartConfig, ...props }, ref) => {
    return (
      <div className={cn("grid gap-1", className)} ref={ref} {...props}>
        {Object.entries(props).map(([key, value]) => {
          if (key === "className" || key === "chartConfig") return null;
          const config = chartConfig?.[key];
          return (
            <div key={key} className="flex items-center space-x-2 text-xs">
              {config?.label && <span className="text-muted-foreground">{config.label}:</span>}
              <span>{value}</span>
            </div>
          );
        })}
      </div>
    );
  }
);
ChartTooltipContent.displayName = "ChartTooltipContent"

const ChartLegend = React.forwardRef(
  ({ className, ...props }, ref) => (
    <div className={cn("flex items-center space-x-2", className)} ref={ref} {...props} />
  )
)
ChartLegend.displayName = "ChartLegend"

const ChartLegendContent = React.forwardRef(
  ({ className, chartConfig, ...props }, ref) => (
    <div className={cn("flex items-center space-x-2", className)} ref={ref} {...props}>
      {Object.entries(chartConfig || {}).map(([key, config]) => (
        <div key={key} className="flex items-center space-x-1 text-xs">
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: config.color }} />
          <span>{config.label}</span>
        </div>
      ))}
    </div>
  )
)
ChartLegendContent.displayName = "ChartLegendContent"

export { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent }
