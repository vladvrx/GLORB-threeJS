"use client";

import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Field({
  label,
  children,
  className,
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("grid gap-1", className)}>
      <span className="text-[10px] font-medium tracking-[0.14em] text-teal-200/70 uppercase">
        {label}
      </span>
      {children}
    </label>
  );
}

export function NativeSelect({
  className,
  ...props
}: ComponentProps<"select">) {
  return (
    <select
      className={cn(
        "h-8 w-full rounded-lg border border-input bg-input/30 px-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
        className,
      )}
      {...props}
    />
  );
}
