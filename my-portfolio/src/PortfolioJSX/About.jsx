import '../PortfolioCSS/About.css';

import {
  Children,
  cloneElement,
  useEffect,
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

const skillGroups = [
  {
    name: 'Programming Languages',
    skills: [
      ['JavaScript', javascriptLogo],
      ['TypeScript', typescriptLogo],
      ['HTML & CSS', htmlCssLogo],
      ['Java', javaLogo],
      ['Python', pythonLogo],
      ['PHP', phpLogo],
      ['Dart', dartLogo],
    ],
  },
  {
    name: 'Frameworks & Technologies',
    skills: [
      ['React', reactLogo],
      ['Node.js', nodeJsLogo],
      ['Express.js', expressJsLogo],
      ['Laravel', laravelLogo],
      ['Flutter', flutterLogo],
      ['Android Studio', androidStudioLogo],
    ],
  },
  {
    name: 'Databases & Cloud',
    skills: [
      ['MySQL', mysqlLogo],
      ['Firebase', firebaseLogo],
      ['Supabase', supabaseLogo],
      ['AWS', awsLogo],
      ['Google Cloud', googleCloudLogo],
    ],
  },
  {
    name: 'Testing & Quality Assurance',
    skills: [
      ['Vitest', vitestLogo],
      ['Playwright', playwrightLogo],
    ],
  },
  {
    name: 'UI/UX & Design',
    skills: [
      ['Figma', figmaLogo],
      ['Photoshop', photoshopLogo],
      ['Illustrator', illustratorLogo],
    ],
  },
  {
    name: 'Development Tools',
    skills: [
      ['Git', gitLogo],
      ['GitHub', githubLogo],
      ['GitLab', gitlabLogo],
      ['VS Code', vscodeLogo],
      ['Cursor', cursorLogo],
      ['GitPilot', gitPilotLogo],
      ['Vercel', vercelLogo],
    ],
  },
  {
    name: 'AI-Assisted Development',
    skills: [
      ['GitPilot', gitPilotLogo],
      ['GitHub Copilot', githubLogo],
    ],
  },
];

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

const dissolvePixels = Array.from({ length: 60 }, (_, index) => {
  const row = Math.floor(index / 6);
  const column = index % 6;

  return {
    x: `${(column * 17 + row * 7) % 94}%`,
    y: `${7 + row * 9}%`,
    size: `${[5, 8, 12, 6][index % 4]}px`,
    delay: `${row * 56 + (column % 3) * 10}ms`,
  };
});

function DissolveCard({
  children,
  className,
  label,
  frontLabel,
  backLabel,
}) {
  const [activeSide, setActiveSide] = useState(0);
  const [phase, setPhase] = useState('idle');
  const timers = useRef([]);

  useEffect(() => () => {
    timers.current.forEach(window.clearTimeout);
  }, []);

  function toggleCard() {
    if (phase !== 'idle') return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setActiveSide((current) => 1 - current);
      return;
    }

    setPhase('exiting');

    timers.current = [
      window.setTimeout(() => {
        setActiveSide((current) => 1 - current);
        setPhase('entering');

        timers.current = [
          window.setTimeout(() => {
            setPhase('idle');
            timers.current = [];
          }, 650),
        ];
      }, 800),
    ];
  }

  return (
    <div
      className={`DissolveCard ${className} is-${phase}`}
      role="button"
      tabIndex={0}
      aria-pressed={activeSide === 1}
      aria-label={`${label}. Click to show ${
        activeSide === 1 ? frontLabel : backLabel
      }`}
      onClick={toggleCard}
      onKeyDown={(event) => {
        if (
          event.target === event.currentTarget &&
          (event.key === 'Enter' || event.key === ' ')
        ) {
          event.preventDefault();
          toggleCard();
        }
      }}
    >
      {Children.map(children, (child, index) =>
        cloneElement(child, {
          className: `${child.props.className} ${
            index === activeSide ? 'is-active' : ''
          }`,
          'aria-hidden': index !== activeSide,
          inert: index !== activeSide,
        }),
      )}

      {phase === 'exiting' && (
        <div
          className="DissolveParticles"
          aria-hidden="true"
        >
          {dissolvePixels.map((pixel, index) => (
            <span
              className="DissolveParticle"
              key={index}
              style={{
                '--x': pixel.x,
                '--y': pixel.y,
                '--size': pixel.size,
                '--delay': pixel.delay,
              }}
            />
          ))}
        </div>
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
              {skillGroups.map((group, index) => (
                <section
                  className={`TechnicalGroup TechnicalGroup--${
                    index + 1
                  }`}
                  key={group.name}
                >
                  <h3>{group.name}</h3>

                  <div className="TechnicalGroupIcons">
                    {group.skills.map(([name, image]) => (
                      <div
                        className="TechnicalBentoSkill"
                        key={name}
                        title={name}
                      >
                        <img src={image} alt="" />
                        <span>{name}</span>
                      </div>
                    ))}
                  </div>
                </section>
              ))}
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