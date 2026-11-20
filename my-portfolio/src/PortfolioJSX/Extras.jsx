import {
  useEffect,
  useRef,
  useState,
} from 'react';

import { AnimatedShinyText } from '@/components/ui/animated-shiny-text';

import { extrasIcon, npcPortrait } from '../lib/portfolio-images';
import resumePdf from '../Photos/Resume/Zenjee_Resume.pdf';

const tutorialKey = 'portfolio-tutorial-seen';

const stages = {
  profile: { number: 1, message: 'To view my contacts, please click the profile picture.' },
  summary: { number: 2, message: 'To view my technical skills, you need to click the summary.' },
  skills: { number: 2, message: 'You found my technical skills. Hover over an icon to see its name.' },
};

export function getInitialTutorialStep() {
  try {
    if (localStorage.getItem(tutorialKey)) return null;
  } catch {
    // The tutorial still works when browser storage is unavailable.
  }
  return 'profile';
}

function rememberTutorial() {
  try {
    localStorage.setItem(tutorialKey, 'true');
  } catch {
    // Dismissal still applies to the current visit.
  }
}

function Extras({
  step,
  messageId,
  targetRef,
  onStartTutorial,
  onCloseTutorial,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef(null);
  const actionRef = useRef(null);
  const spotlightRef = useRef(null);

  useEffect(() => {
    if (!step) {
      return;
    }

    const target = targetRef?.current;
    if (!target) {
      actionRef.current?.focus({ preventScroll: true });
      return;
    }

    const card = target.parentElement;
    const initialBounds = card.getBoundingClientRect();
    const viewportHeight = window.visualViewport?.height || window.innerHeight;
    if (initialBounds.top < 12 || initialBounds.bottom > viewportHeight - 12) {
      card.scrollIntoView({
        block: initialBounds.height > viewportHeight - 24 ? 'start' : 'center',
        inline: 'nearest',
        behavior: 'instant',
      });
    }
    target.focus({ preventScroll: true });
    let frame = 0;

    const updatePlacement = () => {
      frame = 0;
      const bounds = card.getBoundingClientRect();
      const panelElement = panelRef.current;
      const spotlight = spotlightRef.current;
      const panel = panelElement?.getBoundingClientRect();
      if (!panel || !spotlight) return;

      const viewport = window.visualViewport;
      const width = viewport?.width || window.innerWidth;
      const height = viewport?.height || window.innerHeight;
      const viewportTop = viewport?.offsetTop || 0;
      const viewportLeft = viewport?.offsetLeft || 0;
      const margin = 12;
      const gap = 16;
      const bottom = viewportTop + height - margin;
      const spaceBelow = bottom - bounds.bottom - gap;
      const spaceAbove = bounds.top - viewportTop - margin - gap;
      let top = bottom - panel.height;

      if (spaceBelow >= panel.height) {
        top = bounds.bottom + gap;
      } else if (spaceAbove >= panel.height) {
        top = bounds.top - panel.height - gap;
      }

      top = Math.max(viewportTop + margin, Math.min(top, bottom - panel.height));
      const left = Math.max(
        viewportLeft + margin,
        viewportLeft + (width - panel.width) / 2,
      );

      // Read geometry once, then update only transforms during scroll.
      const put = (element, name, value) => {
        if (element.style.getPropertyValue(name) !== value) element.style.setProperty(name, value);
      };
      put(spotlight, 'width', `${bounds.width}px`);
      put(spotlight, 'height', `${bounds.height}px`);
      put(spotlight, 'transform', `translate3d(${bounds.left}px, ${bounds.top}px, 0)`);
      spotlight.style.visibility = 'visible';
      put(panelElement, '--tutorial-top', '0px');
      put(panelElement, '--tutorial-left', '0px');
      put(panelElement, '--tutorial-transform', `translate3d(${left}px, ${top}px, 0)`);
      put(panelElement, '--tutorial-max-width', `${Math.max(1, width - margin * 2)}px`);
      put(panelElement, '--tutorial-max-height', `${Math.max(1, height - margin * 2)}px`);
    };

    const schedulePlacement = () => {
      if (!frame) frame = requestAnimationFrame(updatePlacement);
    };

    let lastWidth = window.innerWidth;
    const handleResize = () => {
      // Mobile browser bars resize visualViewport while scrolling; do not scroll back.
      if (Math.abs(window.innerWidth - lastWidth) > 1) {
        card.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'instant' });
        lastWidth = window.innerWidth;
      }
      schedulePlacement();
    };

    updatePlacement();
    const observer = new ResizeObserver(schedulePlacement);
    observer.observe(card);
    observer.observe(document.body);
    if (panelRef.current) observer.observe(panelRef.current);
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', schedulePlacement, { capture: true, passive: true });
    window.visualViewport?.addEventListener('resize', handleResize);
    window.visualViewport?.addEventListener('scroll', schedulePlacement, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', schedulePlacement, true);
      window.visualViewport?.removeEventListener('resize', handleResize);
      window.visualViewport?.removeEventListener('scroll', schedulePlacement);
    };
  }, [step, targetRef]);

  useEffect(() => {
    if (!step) return;

    function handleEscape(event) {
      if (event.key === 'Escape' && !event.target?.closest?.('dialog[open]')) {
        rememberTutorial();
        onCloseTutorial();
      }
    }

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [step, onCloseTutorial]);

  useEffect(() => {
    if (!step) return;

    function isTutorialControl(target) {
      return (
        panelRef.current?.contains(target) ||
        targetRef?.current?.parentElement?.contains(target)
      );
    }

    function blockOutsideInteraction(event) {
      if (event.key === 'Escape' || isTutorialControl(event.target)) return;

      event.preventDefault();
      event.stopPropagation();
    }

    document.addEventListener('click', blockOutsideInteraction, true);
    document.addEventListener('pointerdown', blockOutsideInteraction, true);
    document.addEventListener('keydown', blockOutsideInteraction, true);

    return () => {
      document.removeEventListener('click', blockOutsideInteraction, true);
      document.removeEventListener('pointerdown', blockOutsideInteraction, true);
      document.removeEventListener('keydown', blockOutsideInteraction, true);
    };
  }, [step, targetRef]);

  function closeTutorial() {
    rememberTutorial();
    onCloseTutorial();
  }

  return (
    <>
      {step && targetRef && <div className="TutorialBackdrop" aria-hidden="true" />}
      {step && targetRef && (
        <div
          className="TutorialSpotlight"
          aria-hidden="true"
          ref={spotlightRef}
          style={{ top: 0, left: 0, visibility: 'hidden' }}
        />
      )}

      {step && (
        <aside
          className="TutorialPanel"
          ref={panelRef}
          aria-label="Portfolio guide"

        >
          <img className="TutorialPortrait" src={npcPortrait} alt="" width="192" height="192" decoding="async" draggable={false} />
          <div className="TutorialDialogue">
            <div className="TutorialHeading">
              <strong>
                <AnimatedShinyText>Portfolio guide</AnimatedShinyText>
              </strong>
              <span>
                <AnimatedShinyText>Step {stages[step].number} of 2</AnimatedShinyText>
              </span>
            </div>
            <p id={messageId} role="status">
              <AnimatedShinyText>{stages[step].message}</AnimatedShinyText>
            </p>
            <div className="TutorialActions">
              {step === 'skills' ? (
                <button type="button" ref={actionRef} onClick={closeTutorial}>
                  <AnimatedShinyText>Finish</AnimatedShinyText>
                </button>
              ) : (
                <button type="button" className="TutorialSkip" onClick={closeTutorial}>
                  <AnimatedShinyText>Skip</AnimatedShinyText>
                </button>
              )}
            </div>
          </div>
        </aside>
      )}

      <div className={`ExtrasMenu${isOpen ? ' is-open' : ''}`}>
        <div className="ExtrasActions" aria-hidden={!isOpen}>
          <button
            type="button"
            tabIndex={isOpen ? 0 : -1}
            onClick={() => {
              setIsOpen(false);
              onStartTutorial();
            }}
          >
            <AnimatedShinyText>Portfolio Guide</AnimatedShinyText>
          </button>

          <a
            href={resumePdf}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={isOpen ? 0 : -1}
          >
            <AnimatedShinyText>View Resume</AnimatedShinyText>
          </a>
        </div>

        <button
          type="button"
          className="ExtrasToggle"
          aria-label={isOpen ? 'Close extra actions' : 'Open extra actions'}
          aria-expanded={isOpen}  
          onClick={() => setIsOpen((open) => !open)}
        >
          <img src={extrasIcon} alt="" width="144" height="144" decoding="async" draggable={false} />
        </button>
      </div>
    </>
  );
}

export default Extras;