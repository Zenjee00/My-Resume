import './skeleton.css';

import type { ComponentProps } from 'react';

import { Skeleton as ShadcnSkeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

export type BitSkeletonProp = ComponentProps<"div">;

function Skeleton({ className, ...props }: BitSkeletonProp) {
  return (
    <ShadcnSkeleton
      {...props}
      data-variant="pixel"
      className={cn("PixelSkeleton", className)}
    />
  );
}

export { Skeleton };
