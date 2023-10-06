import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function Loading() {
  const loadingDiv = Array.from({length: 6}, (_, idx) => idx)
  return (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[40px] gap-y-[40px]">
        {loadingDiv.map((item, idx) => (
          <Skeleton key={idx} className="h-[320px] rounded-[20px]" />
        ))}
    </div>
  );
}
