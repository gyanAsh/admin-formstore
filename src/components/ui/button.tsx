import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",
        outline:
          "border border-violet-300 dark:border-violet-400 bg-background shadow-xs hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        lemon_primary: cn(
          "text-black bg-custom-lemon hover:bg-custom-lemon transition ease-in-out hover:translate-y-0.5 duration-150",
          "shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-[0px_0px_0px_rgba(0,0,0,1)]",
          "dark:shadow-[4px_4px_0px_rgba(250,250,250,1)] dark:hover:shadow-[0px_0px_0px_rgba(250,250,250,1)]"
        ),
        violet_secondary:
          "bg-violet-200 dark:bg-violet-400/80  hover:bg-violet-300 dark:hover:bg-violet-500/80 shadow-sm",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
      effect: {
        default: "hover:shadow-sm cursor-pointer duration-75",
        small_scale:
          "hover:shadow-sm hover:scale-[1.03] active:scale-[0.97] cursor-pointer duration-75",
        scale:
          "hover:shadow-sm hover:scale-[1.05] active:scale-[0.95] cursor-pointer duration-75",
        click: "active:scale-[0.95] cursor-pointer duration-75",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      effect: "default",
    },
  }
);

function Button({
  className,
  variant,
  effect,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, effect, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
