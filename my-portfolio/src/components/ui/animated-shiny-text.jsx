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
  const { simpleEffects, reducedMotion } = useMotionPolicy();

  return (
    <span
      {...props}
      className={cn('AnimatedShinyText', simpleEffects && 'AnimatedShinyText--simple', className)}
      style={{
        '--shiny-width': `${shimmerWidth}px`,
        ...style,
      }}
    >
      {children}
      {!reducedMotion && (
        <span className="AnimatedShinyTextGleam" aria-hidden="true">
          {children}
        </span>
      )}
    </span>
  );
}
