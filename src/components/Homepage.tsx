"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import {
  Code2,
  Database,
  Server,
  Palette,
  Users,
  Globe,
  LucideIcon,
} from "lucide-react";

// Type definitions
interface MousePosition {
  x: number;
  y: number;
}

interface Project {
  name: string;
  description: string;
  tech: string[];
  role: string;
  stats: string;
  gradient: string;
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

const TechCard: React.FC<TechCardProps> = ({ tech, index, isVisible }) => (
  <div
    id={`tech-${index}`}
    className="animate-on-scroll"
    style={{
      opacity: isVisible ? 1 : 0,
      transform: isVisible
        ? "translateY(0) rotateY(0)"
        : "translateY(20px) rotateY(90deg)",
      transition: `all 0.6s ease-out ${index * 0.1}s`,
    }}
  >
    <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-110 text-center group">
      <div
        className={`${tech.color} mb-4 flex justify-center group-hover:scale-125 transition-transform`}
      >
        {tech.icon}
      </div>
      <p className="text-sm font-medium">{tech.name}</p>
    </div>
  </div>
);

export default function Portfolio(): React.ReactElement {
  const [isVisible, setIsVisible] = useState<VisibilityState>({});
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  });
  const [pageLoaded, setPageLoaded] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(true);

  useEffect(() => {
    // Trigger entrance animation after a short delay
    const timer = setTimeout(() => {
      setPageLoaded(true);
    }, 100);

    // Fade out the black overlay
    const overlayTimer = setTimeout(() => {
      setOverlayVisible(false);
    }, 300);

    return () => {
      clearTimeout(timer);
      clearTimeout(overlayTimer);
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent): void => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
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

    const elements: NodeListOf<Element> =
      document.querySelectorAll(".animate-on-scroll");
    elements.forEach((el: Element) => observer.observe(el));

    return () => elements.forEach((el: Element) => observer.unobserve(el));
  }, []);

  const techStack: TechStackItem[] = [
    {
      name: "Next.js",
      icon: <Code2 className="w-6 h-6" />,
      color: "text-white",
    },
    {
      name: "MongoDB",
      icon: <Database className="w-6 h-6" />,
      color: "text-green-400",
    },
    {
      name: "Prisma",
      icon: <Server className="w-6 h-6" />,
      color: "text-blue-400",
    },
    {
      name: "Redis",
      icon: <Database className="w-6 h-6" />,
      color: "text-red-400",
    },
    {
      name: "TailwindCSS",
      icon: <Palette className="w-6 h-6" />,
      color: "text-cyan-400",
    },
    {
      name: "Python",
      icon: <Code2 className="w-6 h-6" />,
      color: "text-yellow-400",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Black overlay that fades out on page load */}
      <div
        className="fixed inset-0 z-50 transition-opacity duration-1000 ease-out"
        style={{
          opacity: overlayVisible ? 1 : 0,
          pointerEvents: overlayVisible ? "auto" : "none",
        }}
      >
        {/* Main dark overlay with transparency */}
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

        {/* Animated particles background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating particles */}
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full animate-particle-float"
              style={
                {
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 8}s`,
                  animationDuration: `${8 + Math.random() * 12}s`,
                  "--rotation": `${Math.random() * 360}deg`,
                } as React.CSSProperties
              }
            />
          ))}

          {/* Larger floating elements */}
          {[...Array(12)].map((_, i) => (
            <div
              key={`large-${i}`}
              className="absolute bg-white/10 rounded-full blur-sm animate-particle-float"
              style={
                {
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${15 + Math.random() * 35}px`,
                  height: `${15 + Math.random() * 35}px`,
                  animationDelay: `${Math.random() * 10}s`,
                  animationDuration: `${12 + Math.random() * 16}s`,
                  "--rotation": `${Math.random() * 360}deg`,
                } as React.CSSProperties
              }
            />
          ))}
        </div>

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-20 animate-grid-pulse"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "100px 100px",
            transform: "perspective(1000px) rotateX(60deg)",
            transformOrigin: "center center",
          }}
        />

        {/* Radial gradient overlay for depth */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/40 to-black/80" />

        {/* Subtle light rays */}
        <div className="absolute inset-0">
          {[...Array(7)].map((_, i) => (
            <div
              key={`ray-${i}`}
              className="absolute w-px h-full bg-gradient-to-b from-transparent via-white/25 to-transparent animate-light-ray"
              style={
                {
                  left: `${15 + i * 12}%`,
                  "--rotation": `${10 + i * 8}deg`,
                  animationDelay: `${i * 0.4}s`,
                  animationDuration: "4s",
                } as React.CSSProperties
              }
            />
          ))}
        </div>
      </div>

      {/* Animated background gradient */}
      <div className="fixed inset-0 opacity-30">
        <div
          className="absolute inset-0 bg-gradient-to-br from-indigo-800/30 to-yellow-600/90"
          style={{
            transform: `translate(${mousePosition.x * 0.01}px, ${
              mousePosition.y * 0.01
            }px)`,
            animation: pageLoaded ? "float 20s ease-in-out infinite" : "none",
          }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="fixed inset-0 bg-black/40"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Hero Section */}
      <section className="relative min-h-screen flex justify-center px-6">
        <div className="max-w-5xl mx-auto text-center w-full flex flex-col">
          {/* Profile Picture with entrance animation */}
          <div
            className="mb-6 mx-auto"
            style={{
              opacity: pageLoaded ? 1 : 0,
              transform: pageLoaded
                ? "translateY(0) scale(1)"
                : "translateY(-50px) scale(0.8)",
              transition: "all 1s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          >
            <Image
              src="/pfp.png"
              alt="Profile Picture"
              width={150}
              height={150}
              className="rounded-full shadow-lg"
            />
          </div>

          {/* Name with entrance animation */}
          <h1
            className="text-5xl md:text-7xl font-bold mb-6"
            style={{
              opacity: pageLoaded ? 1 : 0,
              transform: pageLoaded ? "translateY(0)" : "translateY(30px)",
              transition: "all 1s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s",
            }}
          >
            <span className="bg-gradient-to-r from-[#e0cb8b] to-[#d2d4d6] bg-clip-text text-transparent">
              Jung
            </span>
          </h1>

          {/* Description with entrance animation */}
          <p
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto"
            style={{
              opacity: pageLoaded ? 1 : 0,
              transform: pageLoaded ? "translateY(0)" : "translateY(30px)",
              transition: "all 1s cubic-bezier(0.34, 1.56, 0.64, 1) 0.4s",
            }}
          >
            Specialized in Next.js and modern web technologies with 3 years of
            experience.
          </p>

          {/* Stats badges with staggered entrance animation */}
          <div
            className="flex flex-wrap gap-4 justify-center mb-12"
            style={{
              opacity: pageLoaded ? 1 : 0,
              transform: pageLoaded ? "translateY(0)" : "translateY(30px)",
              transition: "all 1s cubic-bezier(0.34, 1.56, 0.64, 1) 0.6s",
            }}
          >
            <StatBadge
              icon={Users}
              text="430M+ Combined Visits"
              color="text-orange-300"
            />
            <StatBadge
              icon={Globe}
              text="3 Live Projects"
              color="text-sky-300"
            />
            <StatBadge
              icon={Code2}
              text="Full-Stack Developer"
              color="text-green-300"
            />
          </div>

          {/* Action buttons with entrance animation */}
          <div
            className="flex gap-3 justify-center"
            style={{
              opacity: pageLoaded ? 1 : 0,
              transform: pageLoaded ? "translateY(0)" : "translateY(30px)",
              transition: "all 1s cubic-bezier(0.34, 1.56, 0.64, 1) 0.8s",
            }}
          >
            <a
              href="mailto:business@dotgg.lol"
              className="bg-gradient-to-r from-[#C0C0C0]/80 to-gray-100/90 px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-yellow-500/25 transition-all duration-300 hover:scale-105"
            >
              Contact Me
            </a>
            <a
              href="https://github.com/JwLDevs"
              target="_blank"
              className="border border-white/20 bg-violet-500/20 px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-all duration-300"
            >
              <svg data-v-6433c584="" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-github-icon lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
            </a>
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
            <p className="text-gray-400 text-lg">
              Technologies I work with daily
            </p>
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
