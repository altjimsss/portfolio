import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import './ChromaGrid.css';

export const ChromaGrid = ({
  items,
  className = '',
  radius = 300,
  columns = 3,
  rows = 2,
  damping = 0.45,
  fadeOut = 0.6,
  ease = 'power3.out'
}) => {
  const rootRef = useRef(null);
  const fadeRef = useRef(null);
  const setX = useRef(null);
  const setY = useRef(null);
  const pos = useRef({ x: 0, y: 0 });

  const demo = [
    {
      id: 1,
      title: "SAGA ai",
      description: "A real-time analytics dashboard with interactive data visualization and AI-powered insights",
      technologies: ["React", "TypeScript", "D3.js", "Node.js", "WebSocket"],
      category: "AI Application",
      year: "2024",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      featured: true,
      accentColor: "#61DAFB"
    },
    {
      id: 2,
      title: "Nexus E-Commerce",
      description: "Modern e-commerce platform with AR product preview and blockchain payments",
      technologies: ["Next.js", "Three.js", "Solidity", "MongoDB"],
      category: "E-Commerce",
      year: "2024",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      featured: true,
      accentColor: "#F7DF1E"
    },
    {
      id: 3,
      title: "CodeCollab IDE",
      description: "Real-time collaborative code editor with video chat and AI pair programming",
      technologies: ["React", "Socket.io", "Monaco", "WebRTC", "OpenAI"],
      category: "Development Tool",
      year: "2023",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
      featured: false,
      accentColor: "#CC6699"
    },
    {
      id: 4,
      title: "NeuroFit AI",
      description: "Fitness app with AI personal trainer and computer vision form analysis",
      technologies: ["React Native", "TensorFlow.js", "Python", "Firebase"],
      category: "Mobile App",
      year: "2023",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      featured: false,
      accentColor: "#339933"
    },
    {
      id: 5,
      title: "ArtVision Studio",
      description: "Digital art creation platform with AI-assisted design tools",
      technologies: ["Vue.js", "Canvas API", "TensorFlow", "WebGL"],
      category: "Creative Tool",
      year: "2023",
      image: "https://images.unsplash.com/photo-1563089145-599997674d42?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      featured: false,
      accentColor: "#FF6B6B"
    },
    {
      id: 6,
      title: "DataFlow Pipeline",
      description: "Enterprise data processing and visualization platform",
      technologies: ["Python", "Apache Kafka", "React", "D3.js"],
      category: "Data Platform",
      year: "2022",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      featured: false,
      accentColor: "#4ECDC4"
    }
  ];

  // Transform projects for ChromaGrid
  const transformedData = demo.map(project => ({
    image: project.image,
    title: project.title,
    subtitle: project.category,
    handle: project.year,
    borderColor: project.accentColor,
    gradient: `linear-gradient(145deg, ${project.accentColor}20, #000)`,
    url: "#",
    description: project.description,
    technologies: project.technologies
  }));

  const data = items?.length ? items : transformedData;

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    setX.current = gsap.quickSetter(el, '--x', 'px');
    setY.current = gsap.quickSetter(el, '--y', 'px');
    const { width, height } = el.getBoundingClientRect();
    pos.current = { x: width / 2, y: height / 2 };
    setX.current(pos.current.x);
    setY.current(pos.current.y);
  }, []);

  const moveTo = (x, y) => {
    gsap.to(pos.current, {
      x,
      y,
      duration: damping,
      ease,
      onUpdate: () => {
        setX.current?.(pos.current.x);
        setY.current?.(pos.current.y);
      },
      overwrite: true
    });
  };

  const handleMove = e => {
    const r = rootRef.current.getBoundingClientRect();
    moveTo(e.clientX - r.left, e.clientY - r.top);
    gsap.to(fadeRef.current, { opacity: 0, duration: 0.25, overwrite: true });
  };

  const handleLeave = () => {
    gsap.to(fadeRef.current, {
      opacity: 1,
      duration: fadeOut,
      overwrite: true
    });
  };

  const handleCardClick = url => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleCardMove = e => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div
      ref={rootRef}
      className={`chroma-grid ${className}`}
      style={{
        '--r': `${radius}px`,
        '--cols': columns,
        '--rows': rows
      }}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}>
      {data.map((c, i) => (
        <article
          key={c.id || i}
          className="chroma-card"
          onMouseMove={handleCardMove}
          onClick={() => handleCardClick(c.url)}
          style={{
            '--card-border': c.borderColor || 'transparent',
            '--card-gradient': c.gradient,
            cursor: c.url ? 'pointer' : 'default'
          }}>
          <div className="chroma-img-wrapper">
            <img src={c.image} alt={c.title} loading="lazy" />
          </div>
          <footer className="chroma-info">
            <h3 className="name">{c.title}</h3>
            {c.handle && <span className="handle">{c.handle}</span>}
            <p className="role">{c.subtitle}</p>
            <p className="description">{c.description}</p>
            {c.technologies && (
              <div className="technology-pills">
                {c.technologies.map((tech, index) => (
                  <span key={index} className="technology-pill">
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </footer>
        </article>
      ))}
      <div className="chroma-overlay" />
      <div ref={fadeRef} className="chroma-fade" />
    </div>
  );
};

export default ChromaGrid;