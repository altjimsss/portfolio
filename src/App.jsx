import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FaultyTerminal from './components/FaultyTerminal.jsx';
import StaggeredMenu from './components/StaggeredMenu.jsx';
import TargetCursor from './components/TargetCursor';
import TextType from './components/TextType';
import ProfileCard from './components/ProfileCard';
import CardSwap, { Card } from './components/CardSwap';
import { CircularGallery } from './components/circular-gallery';
import LogoLoop from './components/LogoLoop';
import ShinyText from './components/ShinyText';
import LetterGlitch from './components/LetterGlitch';
import Carousel from './components/Carousel';
import Preloader from './components/Preloader.jsx';

// Add these image imports
import pfpImage from './assets/pfp.png';
import resumeImage from './assets/Resume.png';
import resumePDF from './assets/Resume.pdf';
import {
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiNodedotjs,
  SiPython, SiGit, SiDocker, SiPostgresql, SiMongodb, SiGraphql, SiJavascript
} from 'react-icons/si';
// Add these image imports for your projects
import sagaImage from './assets/saga.png';
import rocketImage from './assets/rocket.png';
import tourismImage from './assets/tourism.png';
import stockImage from './assets/stock.png';
import studentImage from './assets/student.png';
import lazylatteImage from './assets/lazylatte.png';
 
// Additional Professional Icon Sets
import {
  FiCode,
  FiLayout,
  FiSmartphone,
  FiDatabase,
  FiServer,
  FiCloud,
  FiZap,
  FiAward,
  FiUsers,
  FiGlobe,
  FiBox,
  FiTool,
  FiDownload,
  FiX,
  FiChevronDown,
  FiChevronUp
} from 'react-icons/fi';

import {
  HiOutlineLightningBolt,
  HiOutlineColorSwatch,
  HiOutlineDeviceMobile,
  HiOutlineChip,
  HiOutlineSparkles
} from 'react-icons/hi';

import {
  MdOutlineDesignServices,
  MdOutlineSpeed,
  MdOutlineAccessibility,
  MdOutlinePhoneIphone,
  MdOutlineWeb,
  MdOutlineStorage
} from 'react-icons/md';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSkill, setActiveSkill] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isProjectsVisible, setIsProjectsVisible] = useState(false);
  const [isContactVisible, setIsContactVisible] = useState(false);
  const [isTechStackVisible, setIsTechStackVisible] = useState(false);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isLearnMoreExpanded, setIsLearnMoreExpanded] = useState(false);

  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);
  const techStackRef = useRef(null);
  const progressBarRef = useRef(null);
  const testimonialsRef = useRef(null);
  const resumePopupRef = useRef(null);
  const homeRef = useRef(null);

  // Learn More Handler
  const handleLearnMore = useCallback(() => {
    setIsLearnMoreExpanded(prev => !prev);
  }, []);

  // Start Project Handler - Scroll to Contact
  const handleStartProject = useCallback(() => {
    contactRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }, []);

  // Resume Popup Handler
  const handleResumeOpen = useCallback(() => {
    setIsResumeOpen(true);
  }, []);

  const handleResumeClose = useCallback(() => {
    setIsResumeOpen(false);
  }, []);

  const handleDownloadResume = useCallback(() => {
    const link = document.createElement('a');
    link.href = resumePDF;
    link.download = 'Allen_Martillan_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (resumePopupRef.current && !resumePopupRef.current.contains(event.target)) {
        setIsResumeOpen(false);
      }
    };

    if (isResumeOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isResumeOpen]);

  // Close with Escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.keyCode === 27) {
        setIsResumeOpen(false);
      }
    };

    if (isResumeOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isResumeOpen]);

  // Hidden text content for Learn More section
  const learnMoreContent = useMemo(() => [
    {
      title: "My Journey",
      content: "I've been passionate about technology since childhood, starting with basic HTML and CSS at age 12. Over the past 5 years, I've dedicated myself to mastering frontend development, working on everything from small business websites to large-scale enterprise applications."
    },
    {
      title: "Design Philosophy",
      content: "I believe that great design is invisible - it just works. My approach combines minimalist aesthetics with powerful functionality, ensuring that every element serves a purpose. I'm deeply influenced by the principles of user-centered design and accessibility."
    },
    {
      title: "Technical Expertise",
      content: "Beyond the core technologies, I specialize in performance optimization, ensuring applications load quickly and run smoothly. I have extensive experience with modern build tools, CI/CD pipelines, and testing frameworks to deliver robust, production-ready code."
    },
    {
      title: "Collaboration Style",
      content: "I thrive in collaborative environments where I can work closely with designers, backend developers, and product managers. I'm a strong communicator who values feedback and believes that the best products are built through teamwork and iterative improvement."
    },
    {
      title: "Continuous Learning",
      content: "The tech landscape evolves rapidly, and I make it a priority to stay current with emerging trends and technologies. I regularly contribute to open-source projects, attend industry conferences, and participate in online learning communities."
    },
    {
      title: "Beyond Coding",
      content: "When I'm not coding, you'll find me exploring photography, hiking in nature, or experimenting with digital art. These creative pursuits inform my development work and help me approach problems from unique perspectives."
    }
  ], []);

  // Rest of your existing constants and data...
  const menuItems = useMemo(() => [
    { label: 'Home', link: '#home', ariaLabel: 'Navigate to Home section' },
    { label: 'About', link: '#about', ariaLabel: 'Navigate to About section' },
    { label: 'Tech Stack', link: '#tech-stack', ariaLabel: 'Navigate to Tech Stack section' },
    { label: 'Projects', link: '#projects', ariaLabel: 'Navigate to Projects section' },
    { label: 'Feedbacks', link: '#testimonials', ariaLabel: 'Navigate to Testimonials section' },
    { label: 'Contact', link: '#contact', ariaLabel: 'Navigate to Contact section' },
  ], []);

  const socialItems = useMemo(() => [
    { label: 'GitHub', link: 'https://github.com' },
    { label: 'LinkedIn', link: 'https://linkedin.com' },
    { label: 'Twitter', link: 'https://twitter.com' },
  ], []);

  const techLogos = useMemo(() => [
    { node: <SiReact className="text-white" size={24} />, title: "React", href: "https://react.dev" },
    { node: <SiNextdotjs className="text-white" size={24} />, title: "Next.js", href: "https://nextjs.org" },
    { node: <SiTypescript className="text-white" size={24} />, title: "TypeScript", href: "https://www.typescriptlang.org" },
    { node: <SiTailwindcss className="text-white" size={24} />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
    { node: <SiJavascript className="text-white" size={24} />, title: "JavaScript", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
    { node: <SiNodedotjs className="text-white" size={24} />, title: "Node.js", href: "https://nodejs.org" },
    { node: <SiPython className="text-white" size={24} />, title: "Python", href: "https://python.org" },
    { node: <SiGit className="text-white" size={24} />, title: "Git", href: "https://git-scm.com" },
    { node: <SiDocker className="text-white" size={24} />, title: "Docker", href: "https://docker.com" },
    { node: <SiPostgresql className="text-white" size={24} />, title: "PostgreSQL", href: "https://postgresql.org" },
    { node: <SiMongodb className="text-white" size={24} />, title: "MongoDB", href: "https://mongodb.com" },
    { node: <SiGraphql className="text-white" size={24} />, title: "GraphQL", href: "https://graphql.org" },
  ], []);

  const techStackCards = useMemo(() => [
    {
      id: 1,
      category: "Frontend Core",
      icon: <SiReact size={24} color="white" />,
      color: "#61DAFB",
      technologies: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
      description: "Modern frontend development with cutting-edge frameworks and tools",
      expertise: "95%",
      projects: "3 components built"
    },
    {
      id: 2,
      category: "Design & Animation",
      icon: <HiOutlineColorSwatch size={24} color="white" />,
      color: "#FF69B4",
      technologies: ["Figma", "Framer Motion", "Blender", "CSS Animations"],
      description: "Creating stunning visual experiences and interactive animations",
      expertise: "88%",
      projects: "10+ animated interfaces"
    },
    {
      id: 3,
      category: "Backend & Infrastructure",
      icon: <FiServer size={24} color="white" />,
      color: "#339933",
      technologies: ["Node.js", "Flask", "MongoDB", "JSON"],
      description: "Scalable backend solutions and robust infrastructure design",
      expertise: "85%",
      projects: "3+ backend systems"
    },
    {
      id: 4,
      category: "Development Tools",
      icon: <FiTool size={24} color="white" />,
      color: "#646CFF",
      technologies: ["Git", "Vite", "Docker"],
      description: "Streamlined development workflow with modern tooling",
      expertise: "90%",
      projects: "2 Vite projects"
    },
    {
      id: 5,
      category: "Performance & Optimization",
      icon: <HiOutlineLightningBolt size={24} color="white" />,
      color: "#FF6B6B",
      technologies: ["React Optimization", "Code Splitting", "Caching","Chrome DevTools"],
      description: "Optimizing applications for maximum speed and efficiency",
      expertise: "92%",
      projects: "3+ optimized apps"
    },
    {
      id: 6,
      category: "Mobile & PWA",
      icon: <MdOutlinePhoneIphone size={24} color="white" />,
      color: "#96CEB4",
      technologies: ["Flutter", "Dart", "Mobile Apps", "UI/UX"],
      description: "Building seamless mobile experiences and progressive web apps",
      expertise: "87%",
      projects: "1+ mobile projects"
    }
  ], []);

  const skills = useMemo(() => [
    { name: 'UI/UX Design', level: 92, color: '#FF6B6B', icon: <MdOutlineDesignServices size={20} /> },
    { name: 'Performance', level: 88, color: '#4ECDC4', icon: <MdOutlineSpeed size={20} /> },
    { name: 'Accessibility', level: 90, color: '#45B7D1', icon: <MdOutlineAccessibility size={20} /> },
    { name: 'Responsive Design', level: 95, color: '#96CEB4', icon: <HiOutlineDeviceMobile size={20} /> },
    { name: 'Code Quality', level: 91, color: '#FFEAA7', icon: <FiAward size={20} /> },
    { name: 'Team Leadership', level: 85, color: '#DDA0DD', icon: <FiUsers size={20} /> },
  ], []);

  const projects = useMemo(() => [
    {
      id: 1,
      title: "SAGA ai",
      description: "An AI chatbot for coding assistance and project management",
      technologies: ["Python", "MySQL", "Ollama"],
      category: "Application",
      year: "2024",
      image: sagaImage,
      featured: true,
      accentColor: "#61DAFB",
      liveUrl: "https://saga-ai.demo",
      githubUrl: "https://github.com/allen/saga-ai",
      status: "Archived"
    },
    {
      id: 2,
      title: "Rocket Recall",
      description: "A intuitive flashcard app with spaced repetition and gamified learning",
      technologies: ["C++"],
      category: "Web App",
      year: "2024",
      image: rocketImage,
      featured: true,
      accentColor: "#F7DF1E",
      liveUrl: "https://rocket-recall.demo",
      githubUrl: "https://github.com/allen/rocket-recall",
      status: "Archived"
    },
    {
      id: 3,
      title: "Mabini Tourism",
      description: "A tourist information website with interactive maps and local guides",
      technologies: ["Html", "CSS"],
      category: "Web Application",
      year: "2025",
      image: tourismImage,
      featured: false,
      accentColor: "#CC6699",
      liveUrl: "https://mabini-tourism-dun.vercel.app/",
      githubUrl: "https://github.com/altjimsss/mabini-tourism",
      status: "Active"
    },
    {
      id: 4,
      title: "STOCKOUT",
      description: "Collaborated as a frontend developer on a full-featured e-commerce platform",
      technologies: ["Angular", "Typescript"],
      category: "E-Commerce Web Application",
      year: "2023",
      image: stockImage,
      featured: false,
      accentColor: "#339933",
      liveUrl: "https://stockout.demo",
      githubUrl: "https://github.com/StockOut/STOOCKOUT_E-COMMERCE",
      status: "Archived"
    },
    {
      id: 5,
      title: "Student Management Application",
      description: "Simple CRUD app for managing student records and grades",
      technologies: ["Angular", "Typescript"],
      category: "CRUD Application",
      year: "2023",
      image: studentImage,
      featured: false,
      accentColor: "#FF6B6B",
      liveUrl: "https://student-mgmt.demo",
      githubUrl: "https://github.com/altjimsss/ANGULAR-Student-Management-System",
      status: "Completed"
    },
    {
      id: 6,
      title: "LAZY LATTE",
      description: "A flight reservation system with real-time booking and payment integration",
      technologies: ["HTML", "CSS"],
      category: "Web Application",
      year: "2025",
      image: lazylatteImage,
      featured: false,
      accentColor: "#4ECDC4",
      liveUrl: "https://online-food-ordering-system-lazy-la.vercel.app/",
      githubUrl: "https://online-food-ordering-system-lazy-la.vercel.app/",
      status: "Active"
    },
  ], []);

  const testimonials = useMemo(() => [
    {
      id: 1,
      name: "Jashrylle Lee V. Abante",
      role: "Product Manager at TechCorp",
      content: "Allen delivered exceptional work on our dashboard project. His attention to detail and technical expertise exceeded our expectations.",
      project: "SAGA ai"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "CTO at StartupXYZ",
      content: "The performance optimizations Allen implemented reduced our load times by 60%. Highly recommended for complex frontend challenges.",
      project: "Rocket Recall"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Design Lead at CreativeStudio",
      content: "Working with Allen was a pleasure. He perfectly translated our designs into pixel-perfect, interactive experiences.",
      project: "Mabini Tourism"
    }
  ], []);

  const circularGalleryData = useMemo(() => 
    projects.map(project => ({
      id: project.id,
      common: project.title,
      binomial: project.category,
      photo: {
        url: project.image,
        text: project.description,
        pos: '50% 50%',
        by: project.year.toString(),
        technologies: project.technologies,
        accentColor: project.accentColor,
        status: project.status
      },
      featured: project.featured,
      links: {
        live: project.liveUrl,
        github: project.githubUrl
      }
    }))
  , [projects]);

  // Event handlers
  const handleMouseMove = useCallback((e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  }, []);

  const handleMenuOpen = useCallback(() => {
    setIsMenuOpen(true);
  }, []);

  const handleMenuClose = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const handleContactClick = useCallback(() => {
    console.log('Contact clicked');
  }, []);

  const handleProjectHover = useCallback((projectId) => {
    setHoveredProject(projectId);
  }, []);

  const handleProjectLeave = useCallback(() => {
    setHoveredProject(null);
  }, []);

  const handleTestimonialNext = useCallback(() => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const handleTestimonialPrev = useCallback(() => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  const handlePlayPause = useCallback(() => {
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  // Effects
  useEffect(() => {
    // Scroll progress animation
    gsap.to(progressBarRef.current, {
      width: '100%',
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3,
        onUpdate: (self) => {
          setScrollProgress(self.progress * 100);
        }
      }
    });
  }, []);

  useEffect(() => {
    // Intersection observers
    const createObserver = (setState, threshold = 0.3) =>
      new IntersectionObserver(
        ([entry]) => entry.isIntersecting && setState(true),
        { threshold }
      );

    const observers = [
      { ref: aboutRef, setState: setIsVisible, threshold: 0.3 },
      { ref: projectsRef, setState: setIsProjectsVisible, threshold: 0.1 },
      { ref: contactRef, setState: setIsContactVisible, threshold: 0.3 },
      { ref: techStackRef, setState: setIsTechStackVisible, threshold: 0.2 },
    ];

    const observerInstances = observers.map(({ ref, setState, threshold }) => {
      if (ref.current) {
        const observer = createObserver(setState, threshold);
        observer.observe(ref.current);
        return observer;
      }
      return null;
    });

    return () => {
      observerInstances.forEach(observer => observer?.disconnect());
    };
  }, []);

  useEffect(() => {
    // Skills rotation
    const interval = setInterval(() => {
      setActiveSkill(prev => (prev + 1) % skills.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [skills.length]);

  useEffect(() => {
    // Testimonial auto-rotation
    let testimonialInterval;
    if (isPlaying) {
      testimonialInterval = setInterval(() => {
        setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
      }, 5000);
    }
    return () => clearInterval(testimonialInterval);
  }, [isPlaying, testimonials.length]);

  // Reusable section components
  const SectionHeader = ({ title, subtitle, isVisible, delay = 0 }) => (
    <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: `${delay}ms` }}>
      <div className="flex items-center justify-center gap-4 mb-6">
        <div className="w-12 h-1 bg-gradient-to-r from-green-400 to-blue-400 rounded-full"></div>
        <span className="text-green-400 uppercase tracking-widest text-sm font-bold">{subtitle}</span>
        <div className="w-12 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
      </div>
      <h2 className="text-6xl lg:text-8xl font-black bg-gradient-to-r from-white via-white to-white/90 bg-clip-text text-transparent leading-none mb-6 drop-shadow-2xl">
        {title.split('\n').map((line, index) => (
          <React.Fragment key={index}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </h2>
    </div>
  );

  const FeatureCard = ({ icon, title, description, color = 'green' }) => {
    const colorClasses = {
      green: 'hover:border-green-400/50 hover:shadow-green-500/20 cursor-target',
      blue: 'hover:border-blue-400/50 hover:shadow-blue-500/20 cursor-target',
      purple: 'hover:border-purple-400/50 hover:shadow-purple-500/20 cursor-target',
      yellow: 'hover:border-yellow-400/50 hover:shadow-yellow-500/20 cursor-target'
    };

    return (
      <div className={`bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 transition-all duration-500 relative overflow-hidden group shadow-2xl ${colorClasses[color]}`}>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-current/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        <div className="text-white mb-2 flex items-center gap-2">
          {icon}
        </div>
        <h3 className="text-white font-bold mb-2 text-sm">{title}</h3>
        <p className="text-white/80 text-xs leading-relaxed font-medium">{description}</p>
      </div>
    );
  };

  const StatusBadge = ({ status }) => {
    const statusConfig = {
      Active: { color: 'bg-green-500/20 text-green-400 border-green-400/30', label: 'Active' },
      Completed: { color: 'bg-blue-500/20 text-blue-400 border-blue-400/30', label: 'Completed' },
      Archived: { color: 'bg-gray-500/20 text-gray-400 border-gray-400/30', label: 'Archived' }
    };

    const config = statusConfig[status] || statusConfig.Active;

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const ProjectButtons = ({ liveUrl, githubUrl }) => (
    <div className="flex gap-2 mt-4">
      <a
        href={liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 bg-gradient-to-r from-green-400 to-blue-400 text-black text-center py-2 px-4 rounded-lg font-semibold hover:shadow-lg hover:shadow-green-400/30 transition-all duration-300 transform hover:scale-105 text-sm cursor-target"
      >
        Live Demo
      </a>
      <a
        href={githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 bg-white/10 backdrop-blur-sm text-white text-center py-2 px-4 rounded-lg font-semibold border border-white/20 hover:border-green-400/50 transition-all duration-300 transform hover:scale-105 text-sm cursor-target"
      >
        Source Code
      </a>
    </div>
  );

  // Resume Popup Component
  const ResumePopup = () => {
    if (!isResumeOpen) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl">
        <div
          ref={resumePopupRef}
          className="relative bg-gray-900 rounded-2xl border border-white/20 shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/20 bg-black/60 flex-shrink-0">
            <h3 className="text-xl font-bold text-white">My Resume</h3>
            <button
              onClick={handleResumeClose}
              className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300 cursor-target"
              aria-label="Close resume"
            >
              <FiX size={24} />
            </button>
          </div>

          {/* Scrollable Resume Image Container */}
          <div className="flex-1 overflow-auto p-6">
            <div className="flex justify-center">
              <img
                src={resumeImage}
                alt="Allen Martillan Resume"
                className="max-w-full h-auto rounded-lg shadow-2xl"
                onError={(e) => {
                  console.error('Failed to load resume image');
                  e.target.style.display = 'none';
                }}
              />
            </div>
          </div>

          {/* Download Button Section */}
          <div className="p-6 border-t border-white/20 bg-black/60 flex-shrink-0">
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
              <p className="text-white/70 text-sm text-center sm:text-left">
                Download my resume as PDF for your records
              </p>
              <button
                onClick={handleDownloadResume}
                className="flex items-center gap-3 bg-gradient-to-r from-green-400 to-blue-400 text-black font-bold py-3 px-6 rounded-xl hover:shadow-2xl hover:shadow-green-400/40 transition-all duration-500 transform hover:scale-105 shadow-lg min-w-[200px] justify-center cursor-target"
              >
                <FiDownload size={20} />
                Download PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Resume Popup */}
      <ResumePopup />

      {/* Enhanced Background Layers */}
      <div className="fixed inset-0 pointer-events-auto">
        <FaultyTerminal
          scale={2}
          gridMul={[2, 1]}
          digitSize={1}
          timeScale={1}
          pause={false}
          scanlineIntensity={1}
          glitchAmount={1}
          flickerAmount={1}
          noiseAmp={1.3}
          chromaticAberration={1}
          dither={0}
          curvature={.3}
          tint="#bc6fe2ff"
          mouseReact={false}
          mouseStrength={0.0}
          pageLoadAnimation={false}
          brightness={0.2}
        />
      </div>

      {/* Enhanced Target Cursor */}
      <TargetCursor
        spinDuration={2}
        hideDefaultCursor={true}
      />

      {/* Enhanced Scroll Progress Animation */}
      <div className="fixed top-0 left-0 w-full h-3 z-50 pointer-events-none">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm border-b border-white/10"></div>
        <div
          ref={progressBarRef}
          className="h-full bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 transition-all duration-100 ease-out relative overflow-hidden rounded-r-full shadow-lg shadow-green-400/30"
          style={{ width: `${scrollProgress}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent transform -skew-x-12 animate-shine"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-green-400/30 via-blue-400/30 to-purple-400/30 blur-md"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 100 100%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%221%22 stitchTiles=%22stitch%22/%3E%3C/filter%23%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url%28%23noise%29%22 opacity=%220.1%22/%3E%3C/svg%3E')] opacity-10"></div>
        </div>
      </div>

      {/* Menu */}
      <StaggeredMenu
        position="right"
        colors={['#a1e799', '#9d4fc6ff']}
        items={menuItems}
        socialItems={socialItems}
        displaySocials={true}
        displayItemNumbering={true}
        menuButtonColor="#ffffffff"
        openMenuButtonColor="#000000ff"
        accentColor="#a1e799"
        changeMenuColorOnOpen={true}
        isFixed={true}
        onMenuOpen={handleMenuOpen}
        onMenuClose={handleMenuClose}
      />

      {/* Hero Section */}
<section id="home" ref={homeRef} className={`relative z-10 min-h-screen flex items-center justify-center transition-all duration-300 pointer-events-none ${isMenuOpen ? 'lg:mr-80 xl:mr-96' : ''}`}>
  <div className="text-center px-6 max-w-6xl mx-auto pointer-events-auto cursor-target">
    <TextType
      text={[
        "Hello, World!",
        "I mean hello there.",
        "Do you need a FRONT END DEVELOPER?",
        "I'm Allen :)",
        "And I can help you!"
      ]}
      typingSpeed={100}
      pauseDuration={1200}
      showCursor={true}
      cursorCharacter="█"
      className="text-white text-4xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-8 drop-shadow-2xl"
    />
  </div>
</section>

      {/* Enhanced Gradient Transition with Blurred Edges */}
      <div className="relative h-32 z-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/80 to-black"></div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/80 to-transparent"></div>
      </div>

      {/* About Section */}
      <section id="about" ref={aboutRef} className="relative min-h-screen py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/80 via-black/40 to-transparent backdrop-blur-3xl"></div>
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 via-black/40 to-transparent backdrop-blur-3xl"></div>
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-900/10 via-transparent to-blue-900/10 backdrop-blur-sm"></div>

        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column - Profile & Image */}
            <div className="lg:col-span-5 relative">
              <div className="sticky top-32">
                <div className="relative group">
                  <div className="absolute -inset-4 bg-gradient-to-r from-green-500 to-blue-500 rounded-3xl opacity-30 group-hover:opacity-50 blur-xl transition-all duration-500"></div>
                  <div className="relative bg-black/80 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-2xl cursor-target">
                    <ProfileCard
                      name="Allen James M. Martillan"
                      title="Frontend Developer"
                      handle="allenmartillan715"
                      status="Online"
                      contactText="Contact Me"
                      avatarUrl={pfpImage}
                      showUserInfo={true}
                      enableTilt={true}
                      enableMobileTilt={false}
                      onContactClick={handleContactClick}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Content */}
            <div className="lg:col-span-7 space-y-8">
              <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-1 bg-gradient-to-r from-green-400 to-blue-400 rounded-full"></div>
                  <span className="text-green-400 uppercase tracking-widest text-sm font-bold">About</span>
                </div>
                <h2 className="text-6xl lg:text-8xl font-black bg-gradient-to-r from-white via-white to-white/90 bg-clip-text text-transparent leading-none drop-shadow-2xl">
                  FRONTEND
                  <br />
                  <span className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                    DEVELOPER
                  </span>
                </h2>
              </div>

              <div className="space-y-6">
                <div className={`transform transition-all duration-700 delay-200 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
                  <p className="text-1.1xl text-white/90 leading-relaxed font-light drop-shadow-lg">
                    I specialize in creating <span className="text-green-400 font-semibold">exceptional digital experiences</span> that blend cutting-edge technology with user-centered design. Every pixel is crafted with purpose and every interaction is designed to delight.
                  </p>
                </div>

                {/* Enhanced Feature Cards */}
                <div className={`grid grid-cols-2 lg:grid-cols-4 gap-4 transform transition-all duration-700 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                  <FeatureCard
                    icon={<HiOutlineLightningBolt size={20} />}
                    title="Performance"
                    description="Lightning-fast applications optimized for modern web standards"
                    color="green"
                  />
                  <FeatureCard
                    icon={<MdOutlineDesignServices size={20} />}
                    title="Design"
                    description="Beautiful interfaces prioritizing UX, accessibility, and modern aesthetics"
                    color="blue"
                  />
                  <FeatureCard
                    icon={<HiOutlineSparkles size={20} />}
                    title="Innovation"
                    description="Cutting-edge solutions with latest technologies and best practices"
                    color="purple"
                  />
                  <FeatureCard
                    icon={<FiAward size={20} />}
                    title="Quality"
                    description="Robust, maintainable code with comprehensive testing"
                    color="yellow"
                  />
                </div>

                {/* Call to Action */}
                <div className={`transform transition-all duration-700 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                  <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-lg rounded-2xl p-4 border border-white/20">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
                      <div>
                        <h3 className="text-white font-bold text-xl mb-1">Ready to start your project?</h3>
                        <p className="text-white/70">Let's create your next big idea.</p>
                      </div>
                      <div className="flex justify-end mt-2">
                        <button
                          onClick={handleResumeOpen}
                          className="cursor-target bg-transparent text-white font-semibold py-1 px-6 rounded-lg border border-white/20 hover:border-white/40 transition-all duration-300"
                        >
                          <ShinyText
                            text="CV"
                            disabled={false}
                            speed={3}
                            className="text-white font-medium"
                          />
                        </button>
                      </div>
                      <div className="flex gap-3">
                        <button
                          onClick={handleStartProject}
                          className="cursor-target bg-white text-black font-semibold py-1 px-6 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                        >
                          Start Project
                        </button>
                        <button
                          onClick={handleLearnMore}
                          className="cursor-target bg-transparent text-white font-semibold py-1 px-6 rounded-lg border border-white/20 hover:border-white/40 transition-all duration-300 flex items-center gap-2"
                        >
                          {isLearnMoreExpanded ? 'Show Less' : 'Learn More'}
                          {isLearnMoreExpanded ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section id="tech-stack" ref={techStackRef} className="relative min-h-screen py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/80 via-black/40 to-transparent backdrop-blur-3xl"></div>
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 via-black/40 to-transparent backdrop-blur-3xl"></div>
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-900/20 via-transparent to-blue-900/20 backdrop-blur-sm"></div>

        <div className="container mx-auto max-w-7xl relative z-10">
          {/* Header with Background Carousel */}
          <div className="text-center mb-6 relative">
            {/* Background Carousel behind text */}
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden opacity-20">
              <div className="w-full max-w-4xl">
                <LogoLoop
                  logos={techLogos}
                  speed={80}
                  direction="left"
                  logoHeight={50}
                  gap={50}
                  pauseOnHover={false}
                  scaleOnHover={false}
                  fadeOut={false}
                  ariaLabel="Technology stack background"
                />
              </div>
            </div>

            <div className={`transform transition-all duration-1000 ${isTechStackVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="w-12 h-1 bg-gradient-to-r from-green-400 to-blue-400 rounded-full"></div>
                <span className="text-green-400 uppercase tracking-widest text-sm font-bold">Technical Excellence</span>
                <div className="w-12 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
              </div>
              <h2 className="text-6xl lg:text-8xl font-black bg-gradient-to-r from-white via-white to-white/90 bg-clip-text text-transparent leading-none mb-6 drop-shadow-2xl relative z-10">
                TECH
                <br />
                <span className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  MASTERY
                </span>
              </h2>
            </div>
          </div>

          {/* Large Rectangular Banner with CardSwap INSIDE */}
          <div className={`bg-gradient-to-r from-green-500/20 via-blue-500/20 to-purple-500/20 backdrop-blur-2xl rounded-3xl border border-white/20 relative overflow-hidden transform transition-all duration-1000 shadow-2xl ${isTechStackVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="absolute top-0 left-0 w-96 h-96 bg-green-400/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

            <div className="relative z-10 p-8 lg:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                {/* Left Column - Text Content */}
                <div className="space-y-6">
                  <h3 className="text-4xl lg:text-5xl font-bold text-white mb-10 drop-shadow-lg">
                    Development
                    <br />
                    <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                      Expertise
                    </span>
                  </h3>

                  <p className="text-white/80 text-lg leading-relaxed font-light">
                    Deep expertise across the modern development ecosystem, from pixel-perfect UI to scalable architecture.
                    Specializing in creating exceptional digital experiences that blend cutting-edge technology with user-centered design.
                  </p>

                  {/* Tech Stack Stats */}
                  <div className="grid grid-cols-4 gap-2 mt-5">
                    {[
                      { number: "12+", label: "Technologies" },
                      { number: "10+", label: "Projects" },
                      { number: "3", label: "Years Exp" },
                      { number: "98%", label: "Success Rate" }
                    ].map((stat, index) => (
                      <div key={index} className="text-center">
                        <div className="text-2xl font-bold text-white mb-1">{stat.number}</div>
                        <div className="text-white/60 text-sm">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Column - CardSwap INSIDE Banner */}
                <div className="flex justify-center lg:justify-end">
                  <div style={{ height: '330px', width: '100%', maxWidth: '400px', position: 'relative' }}>
                    <CardSwap
                      cardDistance={40}
                      verticalDistance={50}
                      delay={4000}
                      pauseOnHover={true}
                    >
                      {techStackCards.map((card) => (
                        <Card key={card.id}>
                          <div className="h-full bg-black/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:border-green-400/50 transition-all duration-500 group shadow-2xl cursor-target">
                            <div className="flex items-center gap-3 mb-4">
                              <div
                                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-500 shadow-lg"
                                style={{
                                  background: `linear-gradient(135deg, ${card.color}30, ${card.color}10)`,
                                  border: `1px solid ${card.color}40`
                                }}
                              >
                                {card.icon}
                              </div>
                              <div>
                                <h3 className="text-xl font-bold text-white mb-1 drop-shadow-lg">{card.category}</h3>
                                <div
                                  className="w-12 h-1 rounded-full"
                                  style={{
                                    background: `linear-gradient(90deg, ${card.color}, ${card.color}80)`
                                  }}
                                ></div>
                              </div>
                            </div>

                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 mb-4 backdrop-blur-sm">
                              <div
                                className="w-2 h-2 rounded-full animate-pulse shadow-lg"
                                style={{ backgroundColor: card.color }}
                              ></div>
                              <span className="text-white/90 text-sm font-medium">
                                Expertise: <span className="font-bold text-white">{card.expertise}</span>
                              </span>
                            </div>

                            <p className="text-white/80 text-sm leading-relaxed mb-4 font-light">
                              {card.description}
                            </p>

                            <div className="grid grid-cols-2 gap-2 mb-4">
                              {card.technologies.map((tech) => (
                                <div
                                  key={tech}
                                  className="px-2 py-1 bg-white/10 rounded text-white/90 text-xs text-center border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 font-medium backdrop-blur-sm cursor-target"
                                >
                                  {tech}
                                </div>
                              ))}
                            </div>

                            <div className="flex items-center justify-between pt-3 border-t border-white/20">
                              <span className="text-white/70 text-xs font-medium">Project Experience</span>
                              <span className="text-white font-bold text-sm">{card.projects}</span>
                            </div>

                            <div
                              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                              style={{
                                background: `radial-gradient(circle at center, ${card.color}20, transparent 70%)`
                              }}
                            ></div>
                          </div>
                        </Card>
                      ))}
                    </CardSwap>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Remaining LogoLoop Components */}
          <div className={`mt-16 space-y-8 transform transition-all duration-800 delay-900 ${isTechStackVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="relative" style={{ height: '40px', overflow: 'hidden' }}>
              <LogoLoop
                logos={techLogos}
                speed={120}
                direction="right"
                logoHeight={30}
                gap={40}
                pauseOnHover={false}
                scaleOnHover={true}
                fadeOut={true}
                fadeOutColor="#090f1b"
                ariaLabel="Technology stack moving right"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
<section id="projects" ref={projectsRef} className="relative min-h-screen py-20 px-6 overflow-hidden z-10">
  {/* Background layers */}
  <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
    <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/80 via-black/40 to-transparent backdrop-blur-3xl"></div>
    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 via-black/40 to-transparent backdrop-blur-3xl"></div>
  </div>

  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-purple-900/10 via-transparent to-blue-900/10 backdrop-blur-sm"></div>

  <div className="container mx-auto max-w-7xl relative z-10">
    {/* Header */}
    <div className="text-center mb-12">
      <div className={`transform transition-all duration-1000 ${isProjectsVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-100'}`}>
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="w-12 h-1 bg-gradient-to-r from-green-400 to-blue-400 rounded-full"></div>
          <span className="text-green-400 uppercase tracking-widest text-sm font-bold">Portfolio</span>
          <div className="w-12 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
        </div>
        <h2 className="text-6xl lg:text-8xl font-black bg-gradient-to-r from-white via-white to-white/90 bg-clip-text text-transparent leading-none mb-6 drop-shadow-2xl">
          FEATURED
          <br />
          <span className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            PROJECTS
          </span>
        </h2>
      </div>
      <p className="text-xl text-white/70 max-w-2xl mx-auto font-light drop-shadow-lg">
        Explore my projects - click the numbers to navigate
      </p>
    </div>

    {/* Project Gallery with LetterGlitch Background */}
    <div className={`transform transition-all duration-1000 delay-300 ${isProjectsVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
      <div className="w-full bg-transparent rounded-2xl border border-white/20 backdrop-blur-lg p-3 cursor-target relative overflow-hidden">
        {/* LetterGlitch background inside the container */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden z-0">
          <LetterGlitch
            glitchColors={['#2b4539', '#61dca3', '#61b3dc']}
            glitchSpeed={30}
            centerVignette={true}
            outerVignette={false}
            smooth={true}
            characters="PROJECTSCODEDESIGNDEVELOPBUILDCREATEINNOVATE0123456789"
            className="opacity-40 rounded-2xl"
          />
        </div>
        
        {/* Circular Gallery on top */}
        <div className="w-full h-[600px] relative flex items-center justify-center bg-transparent z-10">
          <CircularGallery 
            items={circularGalleryData} 
            projectsData={projects} 
            className="bg-transparent"
            radius={450}
          />
        </div>
      </div>
    </div>

    {/* Project Stats */}
    <div className={`mt-16 grid grid-cols-2 lg:grid-cols-4 gap-6 transform transition-all duration-1000 delay-700 ${isProjectsVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
      {[
        { number: "10+", label: "Projects Completed" },
        { number: "3", label: "Years Experience" },
        { number: "98%", label: "Client Satisfaction" },
        { number: "35K+", label: "Lines of Code" }
      ].map((stat) => (
        <div
          key={stat.label}
          className="bg-black/60 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:border-green-400/50 transition-all duration-500 group text-center cursor-target"
        >
          <div className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
            {stat.number}
          </div>
          <div className="text-white/70 text-sm font-medium">{stat.label}</div>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* Testimonials Section */}
      <section id="testimonials" ref={testimonialsRef} className="relative min-h-screen py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/80 via-black/40 to-transparent backdrop-blur-3xl"></div>
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 via-black/40 to-transparent backdrop-blur-3xl"></div>
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/10 via-transparent to-pink-900/10 backdrop-blur-sm"></div>

        {/* Floating background elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>

        <div className="container mx-auto max-w-7xl relative z-10">
          {/* Header */}
          <div className="text-center mb-3">
            <div className="transform transition-all duration-1000 translate-y-0 opacity-100">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="w-12 h-1 bg-gradient-to-r from-green-400 to-blue-400 rounded-full"></div>
                <span className="text-green-400 uppercase tracking-widest text-sm font-bold">Testimonials</span>
                <div className="w-12 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
              </div>
              <h2 className="text-6xl lg:text-8xl font-black bg-gradient-to-r from-white via-white to-white/90 bg-clip-text text-transparent leading-none mb-6 drop-shadow-2xl">
                CLIENT
                <br />
                <span className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  FEEDBACK
                </span>
              </h2>
            </div>
            <p className="text-xl text-white/70 max-w-2xl mx-auto font-light drop-shadow-lg">
              Don't just take my word for it - hear what clients have to say about me.
            </p>
          </div>

          {/* Carousel Section */}
          <div className="flex justify-center relative z-10">
            <div style={{
              height: 'auto',
              minHeight: '270px',
              width: '100%',
              position: 'relative'
            }}>
              <Carousel
                baseWidth={typeof window !== 'undefined' ? (window.innerWidth < 768 ? 300 : 750) : 750}
                autoplay={true}
                autoplayDelay={4000}
                pauseOnHover={true}
                loop={true}
                round={false}
                items={testimonials.map(testimonial => ({
                  title: testimonial.name,
                  description: `"${testimonial.content}" - ${testimonial.role}`,
                  id: testimonial.id,
                }))}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" ref={contactRef} className="relative min-h-screen py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/80 via-black/40 to-transparent backdrop-blur-3xl"></div>
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 via-black/40 to-transparent backdrop-blur-3xl"></div>
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-green-900/10 backdrop-blur-sm"></div>

        <div className="container mx-auto max-w-4xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Contact Info */}
            <div className={`space-y-8 transform transition-all duration-1000 ${isContactVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-1 bg-gradient-to-r from-green-400 to-blue-400 rounded-full"></div>
                  <span className="text-green-400 uppercase tracking-widest text-sm font-bold">Get In Touch</span>
                </div>
                <h2 className="text-6xl lg:text-7xl font-black bg-gradient-to-r from-white via-white to-white/90 bg-clip-text text-transparent leading-none mb-6 drop-shadow-2xl">
                  LET'S
                  <br />
                  <span className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                    CONNECT
                  </span>
                </h2>
                <p className="text-xl text-white/70 leading-relaxed font-light drop-shadow-lg">
                  Ready to bring your next big idea to life? Let's create something extraordinary together.
                </p>
              </div>

              {/* Contact Methods */}
              <div className="space-y-6">
                {[
                  { icon: <FiCode size={20} />, label: 'Email', value: 'allenmartillan715@gmail.com', link: 'mailto:allenmartillan715@gmail.com' },
                  { icon: <FiGlobe size={20} />, label: 'Phone', value: '09924987972', link: 'tel:+639924987972' },
                  { icon: <SiGit size={20} />, label: 'GitHub', value: '@altjimsss', link: 'https://github.com/altjimsss' },
                ].map((item, index) => (
                  <a
                    key={item.label}
                    href={item.link}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 hover:border-green-400/50 transition-all duration-500 group shadow-lg hover:shadow-green-500/20 cursor-target"
                    style={{
                      animationDelay: `${index * 100}ms`,
                      transform: isContactVisible ? 'translateX(0)' : 'translateX(-20px)',
                      opacity: isContactVisible ? 1 : 0,
                      transition: `all 0.5s ease-out ${index * 100}ms`
                    }}
                  >
                    <div className="text-white group-hover:scale-110 transition-transform duration-300 drop-shadow-lg">
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <div className="text-white/70 text-sm font-medium">{item.label}</div>
                      <div className="text-white font-semibold">{item.value}</div>
                    </div>
                    <div className="text-white/50 group-hover:text-green-400 transition-colors duration-300 drop-shadow-lg">
                      →
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div className={`transform transition-all duration-1000 delay-300 ${isContactVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
              <div className="bg-black/60 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
                <form className="space-y-6">
                  {[
                    { label: 'Name', type: 'text', placeholder: 'Your full name' },
                    { label: 'Email', type: 'email', placeholder: 'your.email@example.com' },
                    { label: 'Subject', type: 'text', placeholder: 'Project discussion' },
                    { label: 'Message', type: 'textarea', placeholder: 'Tell me about your project...' }
                  ].map((field) => (
                    <div key={field.label} className="space-y-2">
                      <label className="text-white/80 text-sm font-semibold">{field.label}</label>
                      {field.type === 'textarea' ? (
                        <textarea
                          placeholder={field.placeholder}
                          rows="5"
                          className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:border-green-400/50 focus:outline-none transition-all duration-300 resize-none shadow-inner cursor-target"
                        />
                      ) : (
                        <input
                          type={field.type}
                          placeholder={field.placeholder}
                          className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:border-green-400/50 focus:outline-none transition-all duration-300 shadow-inner cursor-target"
                        />
                      )}
                    </div>
                  ))}

                  <div className="flex gap-4">
                    <button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-green-400 to-blue-400 text-black font-bold py-4 rounded-xl hover:shadow-2xl hover:shadow-green-400/40 transition-all duration-500 transform hover:scale-105 shadow-lg cursor-target"
                    >
                      Send Message
                    </button>
                    <button
                      type="button"
                      className="px-6 bg-white/10 backdrop-blur-sm text-white font-semibold py-4 rounded-xl border border-white/20 hover:border-green-400/50 transition-all duration-300 cursor-target"
                    >
                      Attach File
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="relative bg-black border-t border-white/20 py-12 px-6 backdrop-blur-lg overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-2xl"></div>

        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="space-y-4">
              <div className="text-2xl font-bold text-white">Allen Martillan</div>
              <p className="text-white/60 text-sm">
                Creating exceptional digital experiences through innovative frontend development.
              </p>
              <div className="flex gap-3">
                {socialItems.map((social) => (
                  <a
                    key={social.label}
                    href={social.link}
                    className="text-white/60 hover:text-green-400 transition-colors duration-300 cursor-target"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <div className="text-white font-semibold mb-4">Quick Links</div>
              <div className="space-y-2">
                {menuItems.slice(0, 4).map((item) => (
                  <a
                    key={item.label}
                    href={item.link}
                    className="block text-white/60 hover:text-green-400 transition-colors duration-300 text-sm cursor-target"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Services */}
            <div>
              <div className="text-white font-semibold mb-4">Services</div>
              <div className="space-y-2">
                {['Frontend Development', 'UI/UX Design', 'Performance Optimization', 'Technical Consulting'].map((service) => (
                  <a
                    key={service}
                    href="#"
                    className="block text-white/60 hover:text-green-400 transition-colors duration-300 text-sm cursor-target"
                  >
                    {service}
                  </a>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div>
              <div className="text-white font-semibold mb-4">Stay Updated</div>
              <div className="space-y-3">
                <p className="text-white/60 text-sm">Get the latest updates on my work and projects.</p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm placeholder-white/40 focus:outline-none focus:border-green-400/50 cursor-target"
                  />
                  <button className="bg-green-400 text-black px-4 py-2 rounded-lg font-semibold text-sm hover:bg-green-300 transition-colors duration-300 cursor-target">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/20 mt-8 pt-8 flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="text-white/50 text-sm font-medium">
              © 2024 Allen James M. Martillan. Built with React & Passion.
            </div>
            <div className="flex items-center gap-6 text-white/50 text-sm">
              <a href="#" className="hover:text-green-400 transition-colors duration-300 cursor-target">Privacy Policy</a>
              <a href="#" className="hover:text-green-400 transition-colors duration-300 cursor-target">Terms of Service</a>
              <a href="#" className="hover:text-green-400 transition-colors duration-300 cursor-target">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;