"use client";

import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import {
  Database,
  Server,
  Palette,
  Users,
  Globe,
  LucideIcon,
  Sparkles,
  Zap,
  Cpu,
  Layers,
} from "lucide-react";

// Type definitions

interface TechStackItem {
  name: string;
  icon: React.ReactElement;
  color: string;
}

interface VisibilityState {
  [key: string]: boolean;
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
  <div className="glass-card liquid-blob glass-refraction rounded-full px-6 py-3 flex items-center gap-2 hover:scale-105 transition-all duration-300 group">
    <Icon className={`w-5 h-5 ${color} group-hover:animate-liquid-pulse`} />
    <span className="text-sm font-medium">{text}</span>
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
    <div className="glass-card liquid-blob glass-refraction rounded-2xl p-6 hover:scale-110 transition-all duration-500 text-center group cursor-pointer animate-glass-float">
      <div
        className={`${tech.color} mb-4 flex justify-center group-hover:scale-125 group-hover:animate-holographic-shift transition-all duration-300`}
      >
        {tech.icon}
      </div>
      <p className="text-sm font-medium group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-gray-200 group-hover:to-gray-400 group-hover:bg-clip-text transition-all duration-300">
        {tech.name}
      </p>
    </div>
  </div>
);

export default function Portfolio(): React.ReactElement {
  const [isVisible, setIsVisible] = useState<VisibilityState>({});
  const [pageLoaded, setPageLoaded] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

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
      icon: <Zap className="w-6 h-6" />,
      color: "text-gray-300",
    },
    {
      name: "MongoDB",
      icon: <Database className="w-6 h-6" />,
      color: "text-gray-300",
    },
    {
      name: "Prisma",
      icon: <Server className="w-6 h-6" />,
      color: "text-gray-300",
    },
    {
      name: "Redis",
      icon: <Cpu className="w-6 h-6" />,
      color: "text-gray-300",
    },
    {
      name: "TailwindCSS",
      icon: <Palette className="w-6 h-6" />,
      color: "text-gray-300",
    },
    {
      name: "Python",
      icon: <Layers className="w-6 h-6" />,
      color: "text-gray-300",
    },
  ];

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-black text-white overflow-x-hidden relative"
    >
      {/* Liquid Glass Background */}
      <div className="fixed inset-0 z-0">
        {/* Animated liquid gradient background */}
        <div className="absolute inset-0 liquid-bg opacity-20" />

        {/* Floating liquid blobs */}
        {[...Array(8)].map((_, i) => (
          <div
            key={`blob-${i}`}
            className="absolute animate-liquid-flow opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${200 + Math.random() * 300}px`,
              height: `${200 + Math.random() * 300}px`,
              background: `radial-gradient(circle, rgba(${
                Math.random() * 255
              }, ${Math.random() * 255}, ${
                Math.random() * 255
              }, 0.1) 0%, transparent 70%)`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${15 + Math.random() * 10}s`,
            }}
          />
        ))}

        {/* Holographic grid */}
        <div
          className="absolute inset-0 opacity-10 animate-grid-pulse"
          style={{
            backgroundImage: `
              linear-gradient(rgba(107,114,128,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(156,163,175,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
            transform: "perspective(1000px) rotateX(60deg)",
            transformOrigin: "center center",
          }}
        />

        {/* Floating particles with glass effect */}
        {[...Array(50)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute w-2 h-2 glass-card rounded-full animate-particle-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${8 + Math.random() * 12}s`,
            }}
          />
        ))}
      </div>

      {/* Loading overlay with liquid glass effect */}
      <div
        className="fixed inset-0 z-50 transition-opacity duration-1000 ease-out"
        style={{
          opacity: overlayVisible ? 1 : 0,
          pointerEvents: overlayVisible ? "auto" : "none",
        }}
      >
        <div className="absolute inset-0 glass-card" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="glass-card liquid-blob glass-refraction rounded-full p-8 animate-liquid-pulse">
            <Sparkles className="w-12 h-12 text-gray-300 animate-holographic-shift" />
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex justify-center px-6 z-10">
        <div className="max-w-5xl mx-auto text-center w-full flex flex-col">
          {/* Profile Picture with liquid glass container */}
          <div
            className="mb-8 mx-auto glass-card liquid-blob glass-refraction rounded-full p-4 animate-glass-float"
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
              className="rounded-full shadow-2xl"
            />
          </div>

          {/* Name with holographic effect */}
          <h1
            className="text-6xl md:text-8xl font-bold mb-8"
            style={{
              opacity: pageLoaded ? 1 : 0,
              transform: pageLoaded ? "translateY(0)" : "translateY(30px)",
              transition: "all 1s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s",
            }}
          >
            <span className="holographic-text">Jung</span>
          </h1>



          {/* Stats badges with staggered entrance animation */}
          <div
            className="flex flex-wrap gap-6 justify-center mb-12"
            style={{
              opacity: pageLoaded ? 1 : 0,
              transform: pageLoaded ? "translateY(0)" : "translateY(30px)",
              transition: "all 1s cubic-bezier(0.34, 1.56, 0.64, 1) 0.6s",
            }}
          >
            <StatBadge
              icon={Users}
              text="430M+ Combined Visits"
              color="text-gray-300"
            />
            <StatBadge
              icon={Globe}
              text="3 Live Projects"
              color="text-gray-300"
            />
            <StatBadge
              icon={Zap}
              text="Full-Stack Developer"
              color="text-gray-300"
            />
          </div>

          {/* Action buttons with glass styling */}
          <div
            className="flex gap-4 justify-center"
            style={{
              opacity: pageLoaded ? 1 : 0,
              transform: pageLoaded ? "translateY(0)" : "translateY(30px)",
              transition: "all 1s cubic-bezier(0.34, 1.56, 0.64, 1) 0.8s",
            }}
          >
            <a
              href="mailto:business@dotgg.lol"
              className="glass-button liquid-blob glass-refraction px-8 py-4 rounded-full font-semibold hover:scale-105 transition-all duration-300 flex items-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              Contact Me
            </a>
            <a
              href="https://github.com/JwLDevs"
              target="_blank"
              className="glass-button liquid-blob glass-refraction px-8 py-4 rounded-full font-semibold hover:scale-105 transition-all duration-300 flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                <path d="M9 18c-4.51 2-5-2-7-2"></path>
              </svg>
              GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section id="skills" className="relative py-20 px-6 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="glass-card liquid-blob glass-refraction rounded-2xl p-8 mb-8 inline-block">
              <h2 className="text-4xl md:text-6xl font-bold mb-4">
                <span className="holographic-text">Tech Stack</span>
              </h2>
              <p className="text-gray-300 text-lg">
                Technologies I work with daily
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
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
      <footer className="relative py-12 px-6 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="glass-card liquid-blob glass-refraction rounded-2xl p-8 text-center">
            <p className="text-gray-300 text-lg">
              © 2025 Portfolio. Built with Next.js & TailwindCSS
            </p>
            <div className="mt-4 flex justify-center gap-4">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-liquid-pulse"></div>
              <div
                className="w-2 h-2 bg-gray-500 rounded-full animate-liquid-pulse"
                style={{ animationDelay: "0.5s" }}
              ></div>
              <div
                className="w-2 h-2 bg-gray-600 rounded-full animate-liquid-pulse"
                style={{ animationDelay: "1s" }}
              ></div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
