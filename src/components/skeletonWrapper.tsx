import React, { ReactNode } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export default function SkeletonWrapper({
  children,
  isLoading,
  fullWindth = true,
}: {
  children: ReactNode;
  isLoading: boolean;
  fullWindth?: boolean;
}) {
  if (!isLoading) {
    return (
      <Skeleton className={cn(fullWindth && "w-full")}>
        <div className="opacity-0">{children}</div>
      </Skeleton>
    );
  }
}
