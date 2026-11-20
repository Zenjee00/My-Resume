import {
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { useMotionPolicy } from '@/lib/portfolio-motion';

export function ShineBorder({
  borderWidth = 1,
  duration = 8,
  shineColor = '#C6BFB5',
  className = '',
  style,
}) {
  const borderRef = useRef(null);
  const id = useId();

  const gradientId = `${id}-color`;
  const fadeId = `${id}-fade`;
  const maskId = `${id}-mask`;

  const [frame, setFrame] = useState(null);
  const { simpleEffects, reducedMotion } = useMotionPolicy();

  useLayoutEffect(() => {
    if (simpleEffects) return;
    const border = borderRef.current;

    function measureBorder() {
      const computed = getComputedStyle(border);

      const width = border.offsetWidth;
      const height = border.offsetHeight;

      const thickness = Math.max(
        1,
        parseFloat(computed.paddingTop) || borderWidth,
      );

      const pixel = Math.max(
        1,
        parseFloat(computed.getPropertyValue('--frame-pixel')) || 3,
      );

      setFrame((current) => (
        current?.width === width && current.height === height
          && current.thickness === thickness && current.pixel === pixel
          ? current
          : { width, height, thickness, pixel }
      ));
    }

    measureBorder();

    const observer = new ResizeObserver(measureBorder);

    observer.observe(border);

    return () => observer.disconnect();
  }, [borderWidth, simpleEffects]);

  const colors = Array.isArray(shineColor)
    ? shineColor
    : [shineColor];

  const stroke =
    colors.length > 1
      ? `url(#${gradientId})`
      : colors[0] || '#C6BFB5';

  const seconds = Math.max(1, Number(duration) || 8);

  const gleamRadius = frame
    ? Math.min(
        104,
        Math.max(48, Math.min(frame.width, frame.height) * 0.3),
      )
    : 80;

  let outline = '';

  if (frame) {
    const { width, height, thickness, pixel } = frame;

    const inset = thickness / 2;

    const corner = Math.min(
      inset + pixel,
      width / 2,
      height / 2,
    );

    outline = [
      `M ${corner} ${inset}`,
      `H ${width - corner}`,
      `V ${corner}`,
      `H ${width - inset}`,
      `V ${height - corner}`,
      `H ${width - corner}`,
      `V ${height - inset}`,
      `H ${corner}`,
      `V ${height - corner}`,
      `H ${inset}`,
      `V ${corner}`,
      `H ${corner}`,
      'Z',
    ].join(' ');
  }

  return (
    <span
      ref={borderRef}
      aria-hidden="true"
      className={`ShineBorder${simpleEffects ? ' ShineBorder--simple' : ''} ${className}`}
      style={{
        '--simple-shine': colors[0] || '#C6BFB5',
        '--simple-shine-duration': `${Math.max(10, seconds)}s`,
        position: 'absolute',
        inset: 'var(--shine-border-inset, 0px)',
        padding: `var(--shine-border-width, ${borderWidth}px)`,
        borderRadius: 'inherit',
        pointerEvents: 'none',
        background: 'none',
        WebkitMask: 'none',
        mask: 'none',
        animation: 'none',
        zIndex: 2,
        ...style,
      }}
    >
      {simpleEffects ? (
        <span className="ShineBorderSimpleGleam">
          {['top', 'right', 'bottom', 'left'].map((edge) => (
            <span key={edge} className={`ShineBorderSimpleRail ShineBorderSimpleRail--${edge}`}>
              <span className="ShineBorderSimpleStroke" />
              <span className="ShineBorderSimpleStroke ShineBorderSimpleStroke--second" />
            </span>
          ))}
        </span>
      ) : frame && (
        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${frame.width} ${frame.height}`}
          preserveAspectRatio="none"
          fill="none"
          focusable="false"
          style={{
            position: 'absolute',
            inset: 0,
            display: 'block',
            overflow: 'hidden',
            pointerEvents: 'none',
          }}
        >
          <defs>
            {colors.length > 1 && (
              <linearGradient
                id={gradientId}
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                {colors.map((color, index) => (
                  <stop
                    key={index}
                    offset={`${
                      (index / (colors.length - 1)) * 100
                    }%`}
                    stopColor={color}
                  />
                ))}
              </linearGradient>
            )}

            <radialGradient id={fadeId}>
              <stop
                offset="0%"
                stopColor="white"
                stopOpacity="1"
              />
              <stop
                offset="18%"
                stopColor="white"
                stopOpacity="0.98"
              />
              <stop
                offset="50%"
                stopColor="white"
                stopOpacity="0.55"
              />
              <stop
                offset="78%"
                stopColor="white"
                stopOpacity="0.14"
              />
              <stop
                offset="100%"
                stopColor="white"
                stopOpacity="0"
              />
            </radialGradient>

            <mask
              id={maskId}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width={frame.width}
              height={frame.height}
            >
              {[0, 0.5].map((phase) => (
                <circle
                  key={phase}
                  r={gleamRadius}
                  fill={`url(#${fadeId})`}
                  transform={
                    reducedMotion
                      ? `translate(${frame.width / 2} ${
                          phase === 0
                            ? frame.thickness / 2
                            : frame.height - frame.thickness / 2
                        })`
                      : undefined
                  }
                >
                  {!reducedMotion && (
                    <animateMotion
                      path={outline}
                      begin={`${-phase * seconds}s`}
                      dur={`${seconds}s`}
                      repeatCount="indefinite"
                      calcMode="paced"
                    />
                  )}
                </circle>
              ))}
            </mask>
          </defs>

          <path
            d={outline}
            stroke="#171C3B"
            strokeOpacity="0.18"
            strokeWidth={frame.thickness}
            strokeLinejoin="miter"
          />

          <g mask={`url(#${maskId})`}>
            <path
              d={outline}
              stroke={stroke}
              strokeWidth={frame.thickness}
              strokeLinejoin="miter"
            />

            <path
              d={outline}
              stroke="#FFF9EF"
              strokeOpacity="1"
              strokeWidth={Math.max(
                1,
                Math.min(2.5, frame.thickness * 0.4),
              )}
              strokeLinejoin="miter"
            />
          </g>
        </svg>
      )}
    </span>
  );
}