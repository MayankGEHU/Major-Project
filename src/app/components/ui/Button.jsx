import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "../../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",

        hero: "relative overflow-hidden font-display font-semibold tracking-wider uppercase px-8 py-4 text-base bg-gradient-to-r from-primary via-accent to-primary text-primary-foreground border border-primary/50 rounded-lg shadow-[0_0_20px_hsl(270_100%_65%/0.5),0_0_40px_hsl(320_100%_60%/0.3)] hover:shadow-[0_0_30px_hsl(270_100%_65%/0.7),0_0_60px_hsl(320_100%_60%/0.5)] hover:scale-105 hover:border-primary/80 active:scale-100",
        neonOutline:
          "bg-transparent border-2 border-primary text-primary font-display tracking-wider uppercase hover:bg-primary/10 hover:shadow-[0_0_20px_hsl(270_100%_65%/0.5)]",
        glass: "glass text-foreground border border-border/50 hover:bg-card/50 hover:border-primary/30",
      },

      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-12 rounded-lg px-8 text-base",
        xl: "h-14 rounded-lg px-10 text-lg",
        icon: "h-10 w-10",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef(function Button(
  { className, variant, size, asChild = false, ...props },
  ref
) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  );
});

export { Button, buttonVariants };
