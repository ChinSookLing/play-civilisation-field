import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-sm font-medium transition-opacity duration-[var(--motion-quick,150ms)] select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg disabled:opacity-40 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        solid: "bg-fg text-accent-fg hover:opacity-90",
        ghost: "bg-transparent text-fg border border-line hover:border-line-strong",
        quiet: "bg-transparent text-muted hover:text-fg",
      },
      size: {
        md: "h-11 px-4 text-sm",
        sm: "h-9 px-3 text-sm",
      },
    },
    defaultVariants: { variant: "ghost", size: "md" },
  },
);

type Props = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean };

export function Button({ className, variant, size, asChild, ...props }: Props) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
