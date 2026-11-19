import './animated-shiny-text.css';

import { cn } from '@/lib/utils';

export function AnimatedShinyText({
  children,
  className,
  shimmerWidth = 100,
  style,
  ...props
}) {
  return (
    <span
      {...props}
      className={cn('AnimatedShinyText', className)}
      style={{
        '--shiny-width': `${shimmerWidth}px`,
        ...style,
      }}
    >
      {children}
      <span className="AnimatedShinyTextGleam" aria-hidden="true">
        {children}
      </span>
    </span>
  );
}
