"use client";

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { ExternalLink, Code2, Database, Server, Palette, ChevronDown, Users, Globe, LucideIcon } from 'lucide-react';

// Type definitions
interface MousePosition {
  x: number;
  y: number;
}

interface Project {
  name: string;
  description: string;
  tech: string[];
  stats: string;
  gradient: string;
  image: string;
  link: string;
}

interface TechStackItem {
  name: string;
  icon: React.ReactElement;
  color: string;
}

interface VisibilityState {
  [key: string]: boolean;
}

interface ProjectCardProps {
  project: Project;
  index: number;
  isVisible: boolean;
}

interface TechCardProps {
  tech: TechStackItem;
  index: number;
  isVisible: boolean;
}

interface StatBadgeProps {
  icon: LucideIcon;
  text: string;
  color: string;
}

const StatBadge: React.FC<StatBadgeProps> = ({ icon: Icon, text, color }) => (
  <div className="bg-white/10 backdrop-blur-md rounded-full px-6 py-3 flex items-center gap-2 border border-white/20">
    <Icon className={`w-5 h-5 ${color}`} />
    <span>{text}</span>
  </div>
);

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, isVisible }) => (
  <div
    id={`project-${index}`}
    className="animate-on-scroll group relative"
    style={{
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
      transition: `all 0.8s ease-out ${index * 0.1}s`
    }}
  >
    <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105 h-full flex flex-col">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6`}>
        <Image 
          src={project.image} 
          alt={`${project.name}`} 
          width={48} 
          height={48} 
          className="rounded-lg object-cover"
        />
      </div>
      <h3 className="text-2xl font-bold mb-3">{project.name}</h3>
      <p className="text-gray-400 mb-6 flex-grow">{project.description}</p>
      <div className="flex flex-wrap gap-2 mb-6">
        {project.tech.map((tech: string, i: number) => (
          <span key={i} className="text-xs bg-white/10 px-3 py-1 rounded-full border border-white/20">
            {tech}
          </span>
        ))}
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm text-yellow-400 font-semibold">{project.stats}</span>
        <a 
          href={project.link} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-gray-400 hover:text-white transition-colors"
          aria-label={`Visit ${project.name}`}
        >
          <ExternalLink className="w-5 h-5" />
        </a>
      </div>
    </div>
  </div>
);

const TechCard: React.FC<TechCardProps> = ({ tech, index, isVisible }) => (
  <div
    id={`tech-${index}`}
    className="animate-on-scroll"
    style={{
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0) rotateY(0)' : 'translateY(20px) rotateY(90deg)',
      transition: `all 0.6s ease-out ${index * 0.1}s`
    }}
  >
    <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-110 text-center group">
      <div className={`${tech.color} mb-4 flex justify-center group-hover:scale-125 transition-transform`}>
        {tech.icon}
      </div>
      <p className="text-sm font-medium">{tech.name}</p>
    </div>
  </div>
);


export default function Portfolio(): React.ReactElement {
  const [isVisible, setIsVisible] = useState<VisibilityState>({});
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent): void => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry: IntersectionObserverEntry) => {
          setIsVisible((prev: VisibilityState) => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting,
          }));
        });
      },
      { threshold: 0.1 }
    );

    const elements: NodeListOf<Element> = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el: Element) => observer.observe(el));

    return () => elements.forEach((el: Element) => observer.unobserve(el));
  }, []);

  const projects: Project[] = [
    {
      name: 'adoptmevalues.gg',
      description: 'A comprehensive value tracking platform for Adopt Me players with real-time market data and trading insights.',
      tech: ['Next.js', 'MongoDB', 'Redis', 'TailwindCSS', 'Python'],
      stats: '8M+ Active users', // 124M visits
      gradient: 'from-pink-500 to-purple-600',
      image: "/amv.png",
      link: 'https://adoptmevalues.gg'
    },
    {
      name: 'bloxfruitsvalues.com',
      description: 'The go-to resource for Blox Fruits players to check fruit values, live stocks, and game statistics.',
      tech: ['Next.js', 'Prisma', 'MongoDB', 'TailwindCSS'],
      stats: '23M+ Active users', // 295M visits
      gradient: 'from-blue-500 to-cyan-600',
      image: "/bfv.png",
      link: 'https://bloxfruitsvalues.com'
    },
    {
      name: 'growagardendatabase.com',
      description: 'A dynamic platform providing real-time stocks, price tracking and trading for Grow a Garden.',
      tech: ['Next.js', 'PostgreSQL', 'NeonDB', 'Redis', 'TailwindCSS', 'Python'],
      stats: 'N/A',
      gradient: 'from-orange-500 to-red-600',
      image: "/gagdb.png",
      link: 'https://growagardendatabase.com'
    }
  ];

  const techStack: TechStackItem[] = [
    { name: 'Next.js', icon: <Code2 className="w-6 h-6" />, color: 'text-white' },
    { name: 'MongoDB', icon: <Database className="w-6 h-6" />, color: 'text-green-400' },
    { name: 'Prisma', icon: <Server className="w-6 h-6" />, color: 'text-blue-400' },
    { name: 'Redis', icon: <Database className="w-6 h-6" />, color: 'text-red-400' },
    { name: 'TailwindCSS', icon: <Palette className="w-6 h-6" />, color: 'text-cyan-400' },
    { name: 'Python', icon: <Code2 className="w-6 h-6" />, color: 'text-yellow-400' },
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Animated background gradient */}
      <div className="fixed inset-0 opacity-30">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-indigo-800/30 to-yellow-600/90"
          style={{
            transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`,
          }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div className="fixed inset-0 bg-black/40" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }} />

      {/* Hero Section */}
      <section className="relative min-h-screen flex justify-center px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="animate-on-scroll" id="hero-content" style={{
            opacity: isVisible['hero-content'] ? 1 : 0,
            transform: isVisible['hero-content'] ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 1s ease-out'
          }}>
            <Image src="/pfp.png" alt="Profile Picture" width={150} height={150} className="rounded-full mb-6 mx-auto shadow-lg" />
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-[#e0cb8b] to-[#d2d4d6] bg-clip-text text-transparent">
                Jung
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Specialized in Next.js and modern web technologies with 3 years of experience. 
            </p>
            <div className="flex flex-wrap gap-4 justify-center mb-12">
              <StatBadge icon={Users} text="430M+ Combined Visits" color="text-orange-300" />
              <StatBadge icon={Globe} text="3 Live Projects" color="text-sky-300" />
              <StatBadge icon={Code2} text="Full-Stack Developer" color="text-green-300" />
            </div>
            <div className="flex gap-4 justify-center">
              <a href="https://discord.com/users/985122757916389426" className="bg-[#d7be74]/80 px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-yellow-500/25 transition-all duration-300 hover:scale-105">
                Contact Me
              </a>
              <a href="#projects" className="border border-white/20 px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-all duration-300">
                View Projects
              </a>
            </div>
          </div>
        </div>
        <ChevronDown className="absolute bottom-32 left-1/2 transform -translate-x-1/2 w-8 h-8 animate-bounce text-white/50" />
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-[#e0cb8b] to-[#d2d4d6] bg-clip-text text-transparent">
                Featured Projects
              </span>
            </h2>
            <p className="text-gray-400 text-lg">Websites that reached millions of users worldwide</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {projects.map((project: Project, index: number) => (
              <ProjectCard 
                key={index} 
                project={project} 
                index={index} 
                isVisible={isVisible[`project-${index}`] || false} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section id="skills" className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-[#e0cb8b] to-[#d2d4d6] bg-clip-text text-transparent">
                Tech Stack
              </span>
            </h2>
            <p className="text-gray-400 text-lg">Technologies I work with daily</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {techStack.map((tech: TechStackItem, index: number) => (
              <TechCard 
                key={index} 
                tech={tech} 
                index={index} 
                isVisible={isVisible[`tech-${index}`] || false} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-8 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          <p>© 2025 Portfolio. Built with Next.js & TailwindCSS</p>
        </div>
      </footer>
    </div>
  );
}