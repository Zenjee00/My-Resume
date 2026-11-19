import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import { AnimatedShinyText } from '@/components/ui/animated-shiny-text';

import extrasIcon from '../Photos/Icons/Extras.png';
import npcPortrait from '../Photos/MyPhotos/NPC.png';
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
  const [targetBox, setTargetBox] = useState(null);
  const [panelPosition, setPanelPosition] = useState(null);

  useLayoutEffect(() => {
    if (!step) {
      setTargetBox(null);
      setPanelPosition(null);
      return;
    }

    const target = targetRef?.current;
    if (!target) {
      setTargetBox(null);
      setPanelPosition(null);
      actionRef.current?.focus({ preventScroll: true });
      return;
    }

    target.focus({ preventScroll: true });

    const updatePlacement = () => {
      const card = target.parentElement.getBoundingClientRect();
      const panel = panelRef.current?.getBoundingClientRect();
      if (!panel) return;

      const gap = 20;
      const fitsBelow = card.bottom + gap + panel.height <= window.innerHeight - 16;
      const top = fitsBelow
        ? card.bottom + gap
        : Math.max(16, card.top - panel.height - gap);
      const left = Math.min(
        Math.max(16, (window.innerWidth - panel.width) / 2),
        window.innerWidth - panel.width - 16,
      );

      setTargetBox({
        left: card.left,
        top: card.top,
        width: card.width,
        height: card.height,
      });
      setPanelPosition({ top, left });
    };

    updatePlacement();
    window.addEventListener('resize', updatePlacement);
    window.addEventListener('scroll', updatePlacement, true);
    return () => {
      window.removeEventListener('resize', updatePlacement);
      window.removeEventListener('scroll', updatePlacement, true);
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
      {step && targetBox && (
        <div
          className="TutorialSpotlight"
          aria-hidden="true"
          style={{
            left: targetBox.left,
            top: targetBox.top,
            width: targetBox.width,
            height: targetBox.height,
          }}
        />
      )}

      {step && (
        <aside
          className="TutorialPanel"
          ref={panelRef}
          aria-label="Portfolio guide"
          style={panelPosition ? {
            '--tutorial-top': `${panelPosition.top}px`,
            '--tutorial-left': `${panelPosition.left}px`,
            '--tutorial-transform': 'none',
          } : undefined}
        >
          <img className="TutorialPortrait" src={npcPortrait} alt="" draggable={false} />
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
          <img src={extrasIcon} alt="" draggable={false} />
        </button>
      </div>
    </>
  );
}

export default Extras;