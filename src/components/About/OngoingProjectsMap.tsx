// src/components/about/OngoingProjectsMap.tsx

import React, { useRef, useState, useEffect, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useMotionValue, useSpring, useTransform, animate } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

// --- DATA ENRICHMENT ---
const projects = [
  {
    city: "SANGLI",
    type: "WIND-SOLAR HYBRID",
    mw: 100,
    lat: "16.8524° N",
    lng: "74.5815° E",
    image: "/images/sangali.png",
  },
  {
    city: "SATARA",
    type: "SOLAR PV PROJECT",
    mw: 100,
    lat: "17.6887° N",
    lng: "74.0057° E",
    image: "/images/map_02.png",
  },
  {
    city: "SOLAPUR",
    type: "CUMULATIVE SOLAR",
    mw: 25,
    lat: "17.6701° N",
    lng: "75.9010° E",
    image: "/images/map_03.png",
  },
  {
    city: "PUNE",
    type: "SOLAR PV PROJECT",
    mw: 1,
    lat: "18.5246° N",
    lng: "73.8786° E",
    image: "/images/map_04.png",
  },
];

// --- 1. SPECIAL EFFECTS COMPONENTS ---

const ScrambleText = ({ text, active }: { text: string, active: boolean }) => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";
    const [display, setDisplay] = useState(text);
    
    useEffect(() => {
        let interval: any;
        if (active) {
            let iteration = 0;
            interval = setInterval(() => {
                setDisplay(prev => 
                    text.split("").map((letter, index) => {
                        if (index < iteration) return text[index];
                        return chars[Math.floor(Math.random() * chars.length)];
                    }).join("")
                );
                if (iteration >= text.length) clearInterval(interval);
                iteration += 1 / 2; 
            }, 30);
        } else {
            setDisplay(text);
        }
        return () => clearInterval(interval);
    }, [active, text]);

    return <span className="font-mono text-xs text-[#28a745] tracking-widest">{display}</span>;
};

const Counter = ({ value }: { value: number }) => {
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        if (!ref.current) return;
        const controls = animate(0, value, {
            duration: 2.5,
            ease: [0.25, 1, 0.5, 1],
            onUpdate: (latest) => {
                if (ref.current) ref.current.textContent = Math.floor(latest).toFixed(0);
            }
        });
        return () => controls.stop();
    }, [value]);

    return <span ref={ref}>{value}</span>;
};

const TiltCard = ({
  children,
  index,
  image,
}: {
  children: React.ReactNode;
  index: number;
  image: string;
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX / rect.width - 0.5);
    y.set(e.clientY / rect.height - 0.5);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative h-[450px] w-full rounded-3xl overflow-hidden shadow-2xl group bg-black"
    >
      {/* BACKGROUND IMAGE WITH OVERLAY */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-60"
        style={{ backgroundImage: `url(${image})` }}
      />
      
      {/* GRADIENT OVERLAY for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/60" />

      {/* CONTENT LAYER */}
      <div
        style={{ transform: "translateZ(50px)" }}
        className="relative z-10 p-10 h-full flex flex-col justify-between pointer-events-none"
      >
        {children}
      </div>
    </motion.div>
  );
};


const OngoingProjectsMap = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".proj-header", {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                }
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="bg-[#0a0a0a] text-white py-32 px-6 md:px-10 min-h-screen overflow-hidden">
            <div className="max-w-7xl mx-auto">
                
                {/* SECTION HEADER */}
                <div className="mb-24">
                    <span className="proj-header inline-block text-[#28a745] font-mono tracking-widest text-sm uppercase font-bold mb-4">
                        Grid Infrastructure
                    </span>
                    <h2 className="proj-header text-6xl md:text-8xl font-black uppercase leading-none tracking-tighter text-white">
                        Active <span className="text-gray-700">Sites.</span>
                    </h2>
                </div>

                {/* THE BENTO GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    {projects.map((project, index) => (
                        <div 
                            key={index} 
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            className="cursor-crosshair"
                        >
                            <TiltCard index={index} image={project.image}>
                                {/* Top: Coordinates */}
                                <div className="w-full flex justify-between items-start border-b border-white/10 pb-6 mb-6">
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full ${hoveredIndex === index ? 'bg-[#28a745] animate-pulse' : 'bg-gray-500'}`}></div>
                                            <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Live Feed</span>
                                        </div>
                                        <div className="mt-2">
                                            <ScrambleText text={project.lat} active={hoveredIndex === index} />
                                            <br />
                                            <ScrambleText text={project.lng} active={hoveredIndex === index} />
                                        </div>
                                    </div>
                                    
                                    <div className={`${hoveredIndex === index ? 'text-[#28a745]' : 'text-gray-400'} transition-colors duration-500`}>
                                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                </div>

                                {/* Middle: Capacity Counter */}
                                <div className="flex-grow flex flex-col justify-center">
                                    <div className="flex items-baseline">
                                        <span className={`text-7xl md:text-8xl font-black tracking-tighter transition-colors duration-300 ${hoveredIndex === index ? 'text-[#28a745]' : 'text-white'}`}>
                                            <Counter value={project.mw} />
                                        </span>
                                        <span className="text-xl font-bold text-gray-400 ml-2">MW</span>
                                    </div>
                                    <span className="text-xs font-mono text-gray-400 uppercase mt-2">
                                        Generation Capacity
                                    </span>
                                </div>

                                {/* Bottom: Project Name */}
                                <div className="mt-6 pt-6 border-t border-white/10">
                                    <h3 className="text-3xl font-bold uppercase leading-none mb-1 text-white">
                                        {project.city}
                                    </h3>
                                    <p className="text-xs font-mono text-[#28a745] uppercase tracking-widest">
                                        {project.type}
                                    </p>
                                </div>
                            </TiltCard>
                        </div>
                    ))}
                </div>

                {/* BOTTOM FOOTER */}
                <div className="mt-20 flex flex-col md:flex-row justify-between items-end border-t border-gray-800 pt-8 gap-6">
                    <p className="text-xs text-gray-500 font-mono md:w-1/3">
                        *Real-time operational data from Energica’s Scada monitoring systems. Last updated: Dec 2025.
                    </p>
                    <div className="text-right">
                        <span className="block text-5xl font-black text-white">
                            {projects.reduce((acc, curr) => acc + curr.mw, 0)} <span className="text-[#28a745]">MW</span>
                        </span>
                        <span className="text-xs font-mono uppercase text-gray-500">Aggregate Renewable Output</span>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default OngoingProjectsMap;