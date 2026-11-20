import './animated-shiny-text.css';

import { cn } from '@/lib/utils';
import { useMotionPolicy } from '@/lib/portfolio-motion';

export function AnimatedShinyText({
  children,
  className,
  shimmerWidth = 100,
  style,
  ...props
}) {
  const { simpleEffects } = useMotionPolicy();

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
      {!simpleEffects && (
        <span className="AnimatedShinyTextGleam" aria-hidden="true">
          {children}
        </span>
      )}
    </span>
  );
}
