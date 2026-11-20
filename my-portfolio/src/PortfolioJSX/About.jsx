import '../PortfolioCSS/About.css';

import {
  Children,
  cloneElement,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import { Skeleton } from '@/components/ui/8bit/skeleton';
import { AnimatedShinyText } from '@/components/ui/animated-shiny-text';
import { ShineBorder } from '@/components/ui/shine-border';

import Extras, { getInitialTutorialStep } from './Extras';
import {
  linkedInImage,
  logoDeSalitran,
  teamQuest,
  courseNFoundLogo,
  talkReadyLogo,
  androidStudioLogo,
  awsLogo,
  cursorLogo,
  dartLogo,
  expressJsLogo,
  figmaLogo,
  firebaseLogo,
  flutterLogo,
  googleCloudLogo,
  gitLogo,
  githubLogo,
  gitlabLogo,
  gitPilotLogo,
  htmlCssLogo,
  illustratorLogo,
  javaLogo,
  javascriptLogo,
  laravelLogo,
  mysqlLogo,
  nodeJsLogo,
  photoshopLogo,
  phpLogo,
  playwrightLogo,
  pythonLogo,
  reactLogo,
  supabaseLogo,
  typescriptLogo,
  vercelLogo,
  vitestLogo,
  vscodeLogo,
  media,
} from '../lib/portfolio-images';
import { useMotionPolicy, usePortfolioCardMotion } from '../lib/portfolio-motion';

const experiences = [
  {
    name: 'Colegio de Salitran',
    image: logoDeSalitran,
    description:
      "As a UI/UX Designer Intern at Colegio De Salitran Inc. (Dec 2025 – Mar 2026), I produced print marketing materials using Adobe tools, redesigned the school's website UI/UX in TypeScript, and integrated an automated EmailJS contact form.",
  },
  {
    name: 'TeamQuest Technology Inc.',
    image: teamQuest,
    description:
      "From April to June 2026, I worked as a Technical Support Intern at TeamQuest Technology Inc., handling end-user troubleshooting, Google Workspace administration, and multimedia production. I resolved client account access issues, organized cloud files through Google Drive migrations and Google Forms, and edited CapCut training videos to improve employee onboarding and internal operations.",
  },
];

const technicalSkills = [
  ['JavaScript', javascriptLogo],
  ['TypeScript', typescriptLogo],
  ['HTML & CSS', htmlCssLogo],
  ['Java', javaLogo],
  ['Python', pythonLogo],
  ['PHP', phpLogo],
  ['Dart', dartLogo],
  ['React', reactLogo],
  ['Node.js', nodeJsLogo],
  ['Express.js', expressJsLogo],
  ['Laravel', laravelLogo],
  ['Flutter', flutterLogo],
  ['Android Studio', androidStudioLogo],
  ['MySQL', mysqlLogo],
  ['Firebase', firebaseLogo],
  ['Supabase', supabaseLogo],
  ['AWS', awsLogo],
  ['Google Cloud', googleCloudLogo],
  ['Vitest', vitestLogo],
  ['Playwright', playwrightLogo],
  ['Figma', figmaLogo],
  ['Photoshop', photoshopLogo],
  ['Illustrator', illustratorLogo],
  ['Git', gitLogo],
  ['GitHub', githubLogo],
  ['GitLab', gitlabLogo],
  ['VS Code', vscodeLogo],
  ['Cursor', cursorLogo],
  ['GitPilot', gitPilotLogo],
  ['Vercel', vercelLogo],
  ['GitHub Copilot', githubLogo],
];

const skillsPerRow = Math.ceil(technicalSkills.length / 2);
const firstSkillRow = technicalSkills.slice(0, skillsPerRow);
const secondSkillRow = technicalSkills.slice(skillsPerRow);

const projects = [
  {
    name: 'CourseNFound',
    image: courseNFoundLogo,
    url: 'https://coursenfoundapp.vercel.app/',
    description:
      'Career assessment and university proximity platform with personalized recommendations.',
    theme: 'dark',
  },
  {
    name: 'TalkReady',
    image: talkReadyLogo,
    url: 'https://github.com/Zenjee00/TalkReady',
    description:
      'Capstone learning platform with guided modules, progress tracking, and certificates.',
    theme: 'light',
  },
];

const particleColors = ['#252D4B', '#756C8A', '#BBA8B0', '#161C35', '#080C1E'];
const particleLifetime = 0.35;

function TechnicalSkillRow({ skills, reverse = false }) {
  const viewportRef = useRef(null);
  const [tooltip, setTooltip] = useState(null);
  const { canHover, simpleEffects } = useMotionPolicy();

  function showSkill(skill, name) {
    const { left } = viewportRef.current.getBoundingClientRect();
    const bounds = skill.getBoundingClientRect();
    setTooltip({ name, center: bounds.left + bounds.width / 2 - left });
  }

  function focusSkill(event, name) {
    const skill = event.currentTarget;
    if (!skill.matches(':focus-visible')) return;

    const viewport = viewportRef.current;
    viewport.scrollLeft = skill.offsetLeft - (viewport.clientWidth - skill.offsetWidth) / 2;
    showSkill(skill, name);
  }

  return (
    <div className={`TechnicalSkillRow${reverse ? ' TechnicalSkillRow--reverse' : ''}`}>
      <div
        className="TechnicalSkillViewport"
        ref={viewportRef}
        onBlur={(event) => {
          const viewport = event.currentTarget;
          if (viewport.contains(event.relatedTarget)) return;
          setTooltip(null);
          if (!simpleEffects) {
            viewport.scrollLeft = 0;
          }
        }}
      >
        <div className="TechnicalSkillTrack">
          {[false, true].map((isCopy) => (
            <ul
              key={String(isCopy)}
              className={`TechnicalSkillStrip${isCopy ? ' TechnicalSkillStrip--copy' : ''}`}
              role="list"
              aria-hidden={isCopy || undefined}
            >
              {skills.map(([name, image]) => (
                <li
                  key={name}
                  className="TechnicalBentoSkill"
                  tabIndex={isCopy ? undefined : 0}
                  aria-label={isCopy ? undefined : name}
                  onPointerEnter={canHover ? (event) => {
                    if (event.pointerType === 'mouse') showSkill(event.currentTarget, name);
                  } : undefined}
                  onPointerLeave={canHover ? (event) => {
                    if (!event.currentTarget.matches(':focus-visible')) setTooltip(null);
                  } : undefined}
                  onClick={(event) => {
                    event.stopPropagation();
                    if (!canHover) showSkill(event.currentTarget, name);
                  }}
                  onFocus={(event) => focusSkill(event, name)}
                >
                  <img src={image} alt="" width="160" height="160" loading="lazy" decoding="async" draggable={false} />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      {tooltip && (
        <span
          className="TechnicalSkillLabel"
          style={{ '--skill-center': `${tooltip.center}px` }}
          aria-hidden="true"
        >
          <AnimatedShinyText>{tooltip.name}</AnimatedShinyText>
        </span>
      )}
    </div>
  );
}

// The real card stays mounted beneath this overlay, so its content controls sizing.
function BentoCardSkeleton({ variant }) {
  const lines = (count) => (
    <div className="BentoLoadingLines">
      {Array.from({ length: count }, (_, index) => (
        <Skeleton
          key={index}
          className={`BentoLoadingRow${index === count - 1 ? ' BentoLoadingRow--short' : ''}`}
        />
      ))}
    </div>
  );

  return (
    <div className={`BentoCardSkeleton BentoCardSkeleton--${variant}`} aria-hidden="true">
      {variant === 'profile' || variant === 'gallery' ? (
        <Skeleton className="BentoLoadingImage" />
      ) : variant === 'experience' ? (
        <>
          <Skeleton className="BentoLoadingTitle" />
          {[0, 1].map((item) => (
            <div className="BentoLoadingExperience" key={item}>
              <Skeleton className="BentoLoadingLogo" />
              {lines(5)}
            </div>
          ))}
        </>
      ) : variant === 'education' ? (
        <>
          <Skeleton className="BentoLoadingTitle" />
          <div className="BentoLoadingEducation">
            <Skeleton className="BentoLoadingLogo" />
            {lines(4)}
          </div>
        </>
      ) : variant === 'intro' ? (
        lines(7)
      ) : (
        <>
          <Skeleton className="BentoLoadingTitle" />
          <Skeleton className={`BentoLoadingImage BentoLoadingImage--${variant}`} />
          {variant === 'project' && lines(3)}
        </>
      )}
    </div>
  );
}

function pixelPath(x, y, width, height) {
  return `M${x} ${y}h${width}v${height}h-${width}Z`;
}

function DissolveCard({
  children,
  className,
  label,
  frontLabel,
  backLabel,
  guideDescription,
  guideButtonRef,
  onReveal,
  isLoading = false,
}) {
  const [activeSide, setActiveSide] = useState(0);
  const [phase, setPhase] = useState('idle');
  const { simpleEffects, reducedMotion } = useMotionPolicy();
  const clipId = useId();
  const overlay = useRef(null);
  const visiblePixels = useRef(null);

  useEffect(() => {
    if (activeSide === 1 && phase === 'idle') onReveal?.();
  }, [activeSide, phase, onReveal]);

  useLayoutEffect(() => {
    if (phase === 'idle' || phase === 'simple') return;

    const { width, height } = overlay.current.getBoundingClientRect();
    const pixelSize = Math.max(13, Math.sqrt(width * height / 1000));
    const columns = Math.max(1, Math.ceil(width / pixelSize));
    const rows = Math.max(1, Math.ceil(height / pixelSize));
    const pixelWidth = 1 / columns;
    const pixelHeight = 1 / rows;
    const pixels = Array.from({ length: columns * rows }, (_, index) => {
      const column = index % columns;
      const row = Math.floor(index / columns);
      const x = column * pixelWidth;
      const y = row * pixelHeight;
      const scatter = Math.sin((index + 1) * 127.1) * 43758.5453;
      const noise = scatter - Math.floor(scatter);
      const shade = noise < 0.3 ? 1 : 0;
      // Start at the bottom and stagger nearby rows so the edge breaks into pixels.
      const distanceFromBottom = 1 - (row + 0.5) / rows;
      const order = distanceFromBottom * 0.72 + noise * 0.28;
      return { x, y, order, shade, path: pixelPath(x, y, pixelWidth, pixelHeight) };
    });
    const mask = visiblePixels.current;
    const particles = overlay.current.querySelectorAll('.DissolveParticle');
    const leaving = phase === 'exiting';
    const duration = leaving ? 360 : 740;
    let startedAt;
    let frame;

    function paint(progress) {
      let visible = '';
      const particlePaths = particleColors.map(() => '');

      for (const { x, y, order, shade, path } of pixels) {
        if (leaving) {
          // Fill the card with touching tiles, then hold the mosaic before the swap.
          if (progress < 0.08 + order * 0.68) visible += path;
          else particlePaths[shade] += path;
          continue;
        }

        const age = (progress - order * (1 - particleLifetime)) / particleLifetime;
        if (age >= 1) {
          visible += path;
        } else if (age <= 0) {
          particlePaths[shade] += path;
        } else {
          const lastShade = particleColors.length - 1;
          const agedShade = Math.min(lastShade, shade + Math.floor(age * (lastShade - shade + 1)));
          const size = 1 - Math.max(0, (age - 0.25) / 0.75);
          const inset = (1 - size) / 2;
          // Move in quarter-tile steps to keep the motion pixelated.
          const rise = Math.floor(age * 8) / 4;
          particlePaths[agedShade] += pixelPath(
            x + inset * pixelWidth,
            y + (inset - rise) * pixelHeight,
            size * pixelWidth,
            size * pixelHeight,
          );
        }
      }

      mask.setAttribute('d', visible);
      particles.forEach((particle, index) => {
        particle.setAttribute('d', particlePaths[index]);
      });
    }

    function tick(time) {
      startedAt ??= time;
      const progress = Math.min((time - startedAt) / duration, 1);
      paint(progress);

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      } else if (leaving) {
        setActiveSide((current) => 1 - current);
        setPhase('entering');
      } else {
        setPhase('idle');
      }
    }

    paint(0);
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [phase]);

  useEffect(() => {
    if (phase !== 'simple') return;
    const timer = window.setTimeout(() => setPhase('idle'), 200);
    return () => window.clearTimeout(timer);
  }, [phase]);

  function toggleCard() {
    if (phase !== 'idle') return;

    if (reducedMotion || simpleEffects) {
      setActiveSide((current) => 1 - current);
      if (!reducedMotion) setPhase('simple');
      return;
    }

    setPhase('exiting');
  }

  return (
    <div
      className={`DissolveCard ${className} is-${phase}${guideDescription ? ' TutorialTarget' : ''}`}
      onClick={toggleCard}
    >
      <ShineBorder className="PortfolioShineBorder" shineColor="#C6BFB5" />
      <button
        ref={guideButtonRef}
        type="button"
        className="DissolveToggle"
        aria-pressed={activeSide === 1}
        aria-label={`${label}. Show ${activeSide === 1 ? frontLabel : backLabel}`}
        aria-describedby={guideDescription}
      />

      {guideDescription && <span className="TutorialArrow" aria-hidden="true" />}

      {Children.map(children, (child, index) =>
        cloneElement(child, {
          className: `${child.props.className} ${
            index === activeSide ? 'is-active' : ''
          }`,
          style: index === activeSide && phase !== 'idle' && phase !== 'simple'
            ? { clipPath: `url("#${clipId}")` }
            : undefined,
          'aria-hidden': index !== activeSide,
          inert: index !== activeSide,
        }),
      )}

      {isLoading && (
        <BentoCardSkeleton variant={className === 'ProfileBento' ? 'profile' : 'intro'} />
      )}

      {phase !== 'idle' && phase !== 'simple' && (
        <svg
          className="DissolveParticles"
          aria-hidden="true"
          viewBox="0 0 1 1"
          preserveAspectRatio="none"
          ref={overlay}
        >
          <defs>
            <clipPath id={clipId} clipPathUnits="objectBoundingBox">
              <path ref={visiblePixels} />
            </clipPath>
          </defs>
          {particleColors.map((color) => (
            <path className="DissolveParticle" key={color} fill={color} />
          ))}
        </svg>
      )}
    </div>
  );
}

function About() {
  const certificateDialogRef = useRef(null);
  const gridRef = useRef(null);
  const { isTouch, reducedMotion } = useMotionPolicy();
  const [isCertificateOpen, setCertificateOpen] = useState(false);
  const profileButtonRef = useRef(null);
  const summaryButtonRef = useRef(null);
  const tutorialMessageId = useId();
  const [tutorialStep, setTutorialStep] = useState(getInitialTutorialStep);
  const [tutorialRun, setTutorialRun] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const closeTutorial = useCallback(() => {
    setTutorialStep(null);
  }, []);

  function startTutorial() {
    setTutorialRun((run) => run + 1);
    setTutorialStep('profile');
  }

  usePortfolioCardMotion(gridRef, !isLoading, reducedMotion, tutorialRun);

  useEffect(() => {
    document.documentElement.toggleAttribute('data-touch-input', isTouch);
    return () => document.documentElement.removeAttribute('data-touch-input');
  }, [isTouch]);

  // Only the profile photo gates the skeleton. Other images load independently.
  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 1500);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isCertificateOpen) certificateDialogRef.current?.showModal();
  }, [isCertificateOpen]);

  function preventImageAction(event) {
    if (event.target instanceof HTMLImageElement) {
      event.preventDefault();
    }
  }

  return (
    <main
      className="AboutDiv"
      aria-busy={isLoading}
      onCopy={(event) => event.preventDefault()}
      onCut={(event) => event.preventDefault()}
      onContextMenu={preventImageAction}
      onDragStart={preventImageAction}
    >
      {!isLoading && (
        <Extras
          step={tutorialStep}
          messageId={tutorialMessageId}
          targetRef={
            tutorialStep === 'profile'
              ? profileButtonRef
              : tutorialStep === 'summary' || tutorialStep === 'skills'
                ? summaryButtonRef
                : null
          }
          onStartTutorial={startTutorial}
          onCloseTutorial={closeTutorial}
        />
      )}

      {isLoading && (
        <span className="BentoLoadingStatus" role="status">Loading portfolio</span>
      )}

      <div
        ref={gridRef}
        className={`BentoGrid${isLoading ? ' is-loading' : ''}`}
        aria-hidden={isLoading || undefined}
        inert={isLoading}
      >
        <section className="BentoCard ExperienceBento">
          {isLoading && <BentoCardSkeleton variant="experience" />}
          <ShineBorder className="PortfolioShineBorder" shineColor="#C6BFB5" />
          <h2>
            <AnimatedShinyText shimmerWidth={120}>
              My Experience
            </AnimatedShinyText>
          </h2>

          <div className="ExperienceBentoList">
            {experiences.map((experience) => (
              <article
                className="ExperienceBentoItem"
                key={experience.name}
              >
                <img draggable={false}
                  src={experience.image}
                  width="160" height="160" decoding="async"
                  alt={`${experience.name} logo`}
                />

                <div>
                  <h3>
                    <AnimatedShinyText>{experience.name}</AnimatedShinyText>
                  </h3>
                  <p>
                    <AnimatedShinyText>{experience.description}</AnimatedShinyText>
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <DissolveCard
          key={`profile-${tutorialRun}`}
          className="ProfileBento"
          isLoading={isLoading}
          label="profile photo and contacts"
          frontLabel="profile photo"
          backLabel="contacts"
          guideButtonRef={profileButtonRef}
          guideDescription={tutorialStep === 'profile' ? tutorialMessageId : undefined}
          onReveal={tutorialStep === 'profile' ? () => setTutorialStep('summary') : undefined}
        >
          <div className="DissolveLayer DissolveProfile">
            <img draggable={false}
              className="ProfileImage"
              {...media.myPhoto1}
              sizes="(max-width: 767px) 94vw, (max-width: 1279px) 44vw, 23vw"
              loading="eager" fetchPriority="high" decoding="async"
              onLoad={() => setIsLoading(false)}
              onError={() => setIsLoading(false)}
              alt="Zenjee Viel Borjal"
            />
          </div>

          <div className="DissolveLayer DissolveContacts">
            <div className="ContactBento">
              <h2>
                <AnimatedShinyText shimmerWidth={120}>
                  My Contacts
                </AnimatedShinyText>
              </h2>
              <p className="ContactBentoDescription">
                <AnimatedShinyText>
                  Here are my contacts and profile feel free to reach out to me.
                </AnimatedShinyText>
              </p>

              <div className="ContactBentoLinks">
                <a
                  href="https://www.linkedin.com/in/zenjee-viel-borjal-590ab42a8/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(event) => event.stopPropagation()}
                >
                  <img draggable={false} src={linkedInImage} alt="" width="104" height="104" loading="lazy" decoding="async" />
                  <AnimatedShinyText>LinkedIn</AnimatedShinyText>
                </a>

                <a
                  href="https://github.com/Zenjee00"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(event) => event.stopPropagation()}
                >
                  <img draggable={false} src={githubLogo} alt="" width="160" height="160" loading="lazy" decoding="async" />
                  <AnimatedShinyText>GitHub</AnimatedShinyText>
                </a>
              </div>
            </div>
          </div>
        </DissolveCard>

        <section className="BentoCard EducationBento">
          {isLoading && <BentoCardSkeleton variant="education" />}
          <ShineBorder className="PortfolioShineBorder" shineColor="#C6BFB5" />
          <h2>
            <AnimatedShinyText shimmerWidth={120}>
              My Education
            </AnimatedShinyText>
          </h2>

          <div className="EducationBentoContent">
            <img draggable={false}
              {...media.nuShield}
              decoding="async"
              alt="National University logo"
            />

            <div>
              <h3>
                <AnimatedShinyText>National University - Dasmariñas</AnimatedShinyText>
              </h3>
              <p>
                <AnimatedShinyText>
                  Bachelor of Science in Information Technology,
                  specializing in Mobile and Web Applications.
                </AnimatedShinyText>
              </p>
            </div>
          </div>
        </section>

        <DissolveCard
          key={`summary-${tutorialRun}`}
          className="IntroBento"
          isLoading={isLoading}
          label="introduction and technical skills"
          frontLabel="introduction"
          backLabel="technical skills"
          guideButtonRef={summaryButtonRef}
          guideDescription={
            tutorialStep === 'summary' || tutorialStep === 'skills'
              ? tutorialMessageId
              : undefined
          }
          onReveal={tutorialStep === 'summary' ? () => setTutorialStep('skills') : undefined}
        >
          <div className="DissolveLayer DissolveIntro">
            <p>
              <AnimatedShinyText shimmerWidth={180}>
                My name is Zenjee Viel Borjal, an Information Technology graduate from National University - Dasmariñas with a core focus on building intuitive web and mobile applications.
                I have a proven capability in delivering full-stack solutions, designing responsive UI/UX interfaces, and automating workflows.
                I am passionate about continuous learning, writing scalable code, and growing as a professional software engineer.
              </AnimatedShinyText>
            </p>
          </div>

          <div className="DissolveLayer DissolveTechnical">
            <h2>
              <AnimatedShinyText shimmerWidth={140}>
                Technical Skills
              </AnimatedShinyText>
            </h2>

            <div className="TechnicalBentoContent">
              <TechnicalSkillRow skills={firstSkillRow} />
              <TechnicalSkillRow skills={secondSkillRow} reverse />
            </div>
          </div>
        </DissolveCard>

        <div className="BentoCard GalleryBento">
          {isLoading && <BentoCardSkeleton variant="gallery" />}
          <ShineBorder className="PortfolioShineBorder" shineColor="#C6BFB5" />
          <img draggable={false}
            {...media.myPhoto2}
            sizes="(max-width: 767px) 94vw, (max-width: 1279px) 70vw, 800px"
            loading="lazy" decoding="async"
            alt="Zenjee at his graduation ceremony"
          />
        </div>

        <section className="BentoCard CertificationBento">
          {isLoading && <BentoCardSkeleton variant="certificate" />}
          <ShineBorder className="PortfolioShineBorder" shineColor="#C6BFB5" />
          <h2>
            <AnimatedShinyText shimmerWidth={120}>
              My Certification/s
            </AnimatedShinyText>
          </h2>

          <button
            type="button"
            className="CertificateButton"
            onClick={() => setCertificateOpen(true)}
            aria-label="View PMI Project Management Ready certificate"
          >
            <img draggable={false}
              {...media.certificateImage}
              loading="lazy" decoding="async"
              alt="PMI Project Management Ready certificate"
            />
          </button>
        </section>

        {projects.map((project, index) => (
          <a
            key={project.name}
            className={`BentoCard ProjectBento ProjectBento--${
              index + 1
            } ProjectBento--${project.theme}`}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {isLoading && <BentoCardSkeleton variant="project" />}
            <ShineBorder className="PortfolioShineBorder" shineColor="#C6BFB5" />
              <h2>
                <AnimatedShinyText shimmerWidth={100}>
                  {project.name}
                </AnimatedShinyText>
              </h2>

            <img draggable={false}
              src={project.image}
              width="260" height="260" loading="lazy" decoding="async"
              alt={`${project.name} logo`}
            />

            <p>
              <AnimatedShinyText>{project.description}</AnimatedShinyText>
            </p>

            <span className="ProjectBentoLink">
              <AnimatedShinyText>Open project ↗</AnimatedShinyText>
            </span>
          </a>
        ))}
      </div>

      <dialog
        ref={certificateDialogRef}
        className="CertificateDialog"
        aria-label="PMI Project Management Ready certificate"
        onClose={() => setCertificateOpen(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            event.currentTarget.close();
          }
        }}
      >
        <button
          type="button"
          className="CertificateCloseButton"
          onClick={() =>
            certificateDialogRef.current?.close()
          }
          aria-label="Close certificate"
        >
          <AnimatedShinyText>×</AnimatedShinyText>
        </button>

        {isCertificateOpen && (
          <img draggable={false}
            {...media.certificateFull}
            decoding="async"
            alt="PMI Project Management Ready certificate enlarged"
          />
        )}
      </dialog>
    </main>
  );
}

export default About;
