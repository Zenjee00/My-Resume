import '../PortfolioCSS/About.css';

import {
  Children,
  cloneElement,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import gmailImage from '../Photos/MyContacts/Gmail.png';
import linkedInImage from '../Photos/MyContacts/LinkedIn.png';
import logoDeSalitran from '../Photos/MyExperience/Logo_de_salitran.jpg';
import nuShield from '../Photos/MyExperience/NU_shield.png';
import teamQuest from '../Photos/MyExperience/TeamQuest.jpg';
import myPhoto1 from '../Photos/MyPhotos/MyPhoto1.jpg';
import myPhoto2 from '../Photos/MyPhotos/MyPhoto2.jpg';
import courseNFoundLogo from '../Photos/MySkills/CourseNFound.png';
import certificateImage from '../Photos/MySkills/PMI.png';
import talkReadyLogo from '../Photos/MySkills/Talkready.png';
import androidStudioLogo from '../Photos/Technicals/AndroidStudio.png';
import awsLogo from '../Photos/Technicals/AWS.png';
import cursorLogo from '../Photos/Technicals/Cursor.png';
import dartLogo from '../Photos/Technicals/Dart.png';
import expressJsLogo from '../Photos/Technicals/ExpressJS.png';
import figmaLogo from '../Photos/Technicals/Figma.png';
import firebaseLogo from '../Photos/Technicals/Firebase.png';
import flutterLogo from '../Photos/Technicals/Flutter.png';
import googleCloudLogo from '../Photos/Technicals/G_Cloud.png';
import gitLogo from '../Photos/Technicals/Git.png';
import githubLogo from '../Photos/Technicals/Github.png';
import gitlabLogo from '../Photos/Technicals/Gitlab.png';
import gitPilotLogo from '../Photos/Technicals/GitPilot.png';
import htmlCssLogo from '../Photos/Technicals/HTML_CSS.png';
import illustratorLogo from '../Photos/Technicals/Illustrator.png';
import javaLogo from '../Photos/Technicals/java.png';
import javascriptLogo from '../Photos/Technicals/JS.png';
import laravelLogo from '../Photos/Technicals/Laravel.png';
import mysqlLogo from '../Photos/Technicals/MySQL.png';
import nodeJsLogo from '../Photos/Technicals/NodeJS.png';
import photoshopLogo from '../Photos/Technicals/Photoshop.png';
import phpLogo from '../Photos/Technicals/Php.png';
import playwrightLogo from '../Photos/Technicals/playwright.png';
import pythonLogo from '../Photos/Technicals/Python.png';
import reactLogo from '../Photos/Technicals/ReactJS.png';
import supabaseLogo from '../Photos/Technicals/Supabase.png';
import typescriptLogo from '../Photos/Technicals/TS.png';
import vercelLogo from '../Photos/Technicals/vercel.png';
import vitestLogo from '../Photos/Technicals/vitest.png';
import vscodeLogo from '../Photos/Technicals/VScode.png';

const experiences = [
  {
    name: 'Colegio de Salitran',
    image: logoDeSalitran,
    description:
      'UI/UX Design intern creating print branding, digital interfaces, and interactive front-end components.',
  },
  {
    name: 'TeamQuest Technology Inc.',
    image: teamQuest,
    description:
      'Technical Support intern helping clients with account access, cloud collaboration, and onboarding resources.',
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
          if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
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
                  onPointerEnter={(event) => {
                    if (event.pointerType !== 'touch') showSkill(event.currentTarget, name);
                  }}
                  onPointerLeave={(event) => {
                    if (!event.currentTarget.matches(':focus-visible')) setTooltip(null);
                  }}
                  onFocus={(event) => focusSkill(event, name)}
                >
                  <img src={image} alt="" draggable={false} />
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
          {tooltip.name}
        </span>
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
}) {
  const [activeSide, setActiveSide] = useState(0);
  const [phase, setPhase] = useState('idle');
  const clipId = useId();
  const overlay = useRef(null);
  const visiblePixels = useRef(null);

  useLayoutEffect(() => {
    if (phase === 'idle') return;

    const { width, height } = overlay.current.getBoundingClientRect();
    const columns = Math.max(1, Math.ceil(width / 13));
    const rows = Math.max(1, Math.ceil(height / 13));
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

  function toggleCard() {
    if (phase !== 'idle') return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setActiveSide((current) => 1 - current);
      return;
    }

    setPhase('exiting');
  }

  return (
    <div
      className={`DissolveCard ${className} is-${phase}`}
      onClick={toggleCard}
    >
      <button
        type="button"
        className="DissolveToggle"
        aria-pressed={activeSide === 1}
        aria-label={`${label}. Show ${activeSide === 1 ? frontLabel : backLabel}`}
      />

      {Children.map(children, (child, index) =>
        cloneElement(child, {
          className: `${child.props.className} ${
            index === activeSide ? 'is-active' : ''
          }`,
          style: index === activeSide && phase !== 'idle'
            ? { clipPath: `url("#${clipId}")` }
            : undefined,
          'aria-hidden': index !== activeSide,
          inert: index !== activeSide,
        }),
      )}

      {phase !== 'idle' && (
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

  return (
    <main className="AboutDiv">
      <div className="BentoGrid">
        <section className="BentoCard ExperienceBento">
          <h2>My Experience</h2>

          <div className="ExperienceBentoList">
            {experiences.map((experience) => (
              <article
                className="ExperienceBentoItem"
                key={experience.name}
              >
                <img
                  src={experience.image}
                  alt={`${experience.name} logo`}
                />

                <div>
                  <h3>{experience.name}</h3>
                  <p>{experience.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <DissolveCard
          className="ProfileBento"
          label="profile photo and contacts"
          frontLabel="profile photo"
          backLabel="contacts"
        >
          <div className="DissolveLayer DissolveProfile">
            <img
              className="ProfileImage"
              src={myPhoto1}
              alt="Zenjee Viel Borjal"
            />
          </div>

          <div className="DissolveLayer DissolveContacts">
            <div className="ContactBento">
              <h2>My Contacts</h2>

              <div className="ContactBentoLinks">
                <a
                  href="https://www.linkedin.com/in/zenjee-viel-borjal-590ab42a8/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(event) => event.stopPropagation()}
                >
                  <img src={linkedInImage} alt="" />
                  <span>LinkedIn</span>
                </a>

                <a
                  href="mailto:"
                  onClick={(event) => event.stopPropagation()}
                >
                  <img src={gmailImage} alt="" />
                  <span>Email</span>
                </a>
              </div>
            </div>
          </div>
        </DissolveCard>

        <section className="BentoCard EducationBento">
          <h2>My Education</h2>

          <div className="EducationBentoContent">
            <img
              src={nuShield}
              alt="National University logo"
            />

            <div>
              <h3>National University - Dasmariñas</h3>
              <p>
                Bachelor of Science in Information Technology,
                specializing in Mobile and Web Applications.
              </p>
            </div>
          </div>
        </section>

        <DissolveCard
          className="IntroBento"
          label="introduction and technical skills"
          frontLabel="introduction"
          backLabel="technical skills"
        >
          <div className="DissolveLayer DissolveIntro">
            <p>
              My name is Zenjee Viel S. Borjal, a fresh Information
              Technology graduate specializing in Mobile and Web
              Applications from National University - Dasmariñas.
              I am passionate about technology, adaptable, and
              committed to delivering quality work.
            </p>
          </div>

          <div className="DissolveLayer DissolveTechnical">
            <h2>Technical Skills</h2>

            <div className="TechnicalBentoContent">
              <TechnicalSkillRow skills={firstSkillRow} />
              <TechnicalSkillRow skills={secondSkillRow} reverse />
            </div>
          </div>
        </DissolveCard>

        <div className="BentoCard GalleryBento">
          <img
            src={myPhoto2}
            alt="Zenjee at his graduation ceremony"
          />
        </div>

        <section className="BentoCard CertificationBento">
          <h2>My Certification/s</h2>

          <button
            type="button"
            className="CertificateButton"
            onClick={() =>
              certificateDialogRef.current?.showModal()
            }
            aria-label="View PMI Project Management Ready certificate"
          >
            <img
              src={certificateImage}
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
            <h2>{project.name}</h2>

            <img
              src={project.image}
              alt={`${project.name} logo`}
            />

            <p>{project.description}</p>

            <span className="ProjectBentoLink">
              Open project ↗
            </span>
          </a>
        ))}
      </div>

      <dialog
        ref={certificateDialogRef}
        className="CertificateDialog"
        aria-label="PMI Project Management Ready certificate"
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
          ×
        </button>

        <img
          src={certificateImage}
          alt="PMI Project Management Ready certificate enlarged"
        />
      </dialog>
    </main>
  );
}

export default About;
