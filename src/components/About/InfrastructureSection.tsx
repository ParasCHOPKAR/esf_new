// src/components/about/InfrastructureSection.tsx

import React, { useState, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

// --- DATA ---
const pillars = [
    { 
        id: "01",
        title: "Manufacturing", 
        subtitle: "Supply Chain Zero",
        desc: "Strategic partnerships for high-quality PV module and inverter production. We utilize automated assembly lines to ensure zero-defect supply chains. Our facilities integrate AI-driven quality checks at every stage, minimizing failure rates and maximizing long-term energy yield.",
        gradient: "linear-gradient(135deg, #f8f8f8 0%, #ffffff 100%)", 
        accent: "#C80000"
    },
    { 
        id: "02",
        title: "Distribution", 
        subtitle: "Global Logistics",
        desc: "Optimized logistics and warehousing across key regional hubs. Our AI-driven fleet management ensures just-in-time delivery to remote project sites. We maintain a robust inventory of critical spares to reduce downtime, ensuring uninterrupted grid network flow.",
        gradient: "linear-gradient(135deg, #fef2f2 0%, #ffffff 100%)",
        accent: "#C80000"
    },
    { 
        id: "03",
        title: "Training Cmd", 
        subtitle: "Safety & Certification",
        desc: "State-of-the-art facilities providing technical and safety training. We simulate high-voltage scenarios to certify the next generation of project managers. Our curriculum covers everything from basic installation protocols to advanced grid synchronization techniques.",
        gradient: "linear-gradient(135deg, #fff5f5 0%, #ffffff 100%)",
        accent: "#C80000"
    },
];

const InfrastructureSection = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const deckItemsRef = useRef<HTMLDivElement[]>([]);
    const [activeIndex, setActiveIndex] = useState<number | null>(0); 

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".infra-title-anim", {
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

            const validItems = deckItemsRef.current.filter(Boolean);
            if (validItems.length > 0) {
                gsap.from(validItems, {
                    x: -50,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: ".infra-deck-container",
                        start: "top 85%",
                    }
                });
            }
        }, containerRef);
        return () => ctx.revert();
    }, []);

    const handleInteraction = (index: number) => {
        setActiveIndex(index);
    };

    return (
        <section ref={containerRef} className="bg-white text-[#C80000] py-16 md:py-20 px-4 md:px-12 relative min-h-screen overflow-hidden">
            
            {/* Redesigned Background Pattern for Light Theme */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#C80000 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

            <div className="max-w-6xl mx-auto relative z-10">
                
                {/* HEADER */}
                <div className="mb-10">
                    <span className="infra-title-anim inline-block text-[#C80000] font-mono tracking-widest text-xs md:text-sm uppercase font-bold mb-3 border-b border-[#C80000] pb-1">
                        Infrastructure Matrix
                    </span>
                    <h2 className="infra-title-anim text-[10vw] md:text-7xl font-black uppercase leading-[0.9] tracking-tighter text-[#C80000]">
                        The Backbone <br />
                        <span className="text-gray-200">Of Energica.</span>
                    </h2>
                </div>

                {/* THE KINETIC DECK */}
                <div className="infra-deck-container flex flex-col gap-2">
                    {pillars.map((item, index) => {
                        const isActive = activeIndex === index;
                        const expandedHeight = window.innerWidth < 768 ? 550 : 380;
                        const collapsedHeight = window.innerWidth < 768 ? 80 : 90;

                        return (
                            <motion.div
                                key={item.id}
                                ref={(el) => { if (el) deckItemsRef.current[index] = el; }}
                                onMouseEnter={() => handleInteraction(index)}
                                onClick={() => handleInteraction(index)}
                                animate={{ 
                                    height: isActive ? expandedHeight : collapsedHeight, 
                                    backgroundColor: isActive ? "#ffffff" : "#fcfcfc"
                                }}
                                transition={{ type: "spring", stiffness: 120, damping: 20 }}
                                className={`group relative w-full overflow-hidden border transition-colors duration-300 rounded-2xl cursor-pointer ${isActive ? 'border-[#C80000]' : 'border-gray-100'}`}
                                style={{ backgroundImage: isActive ? item.gradient : 'none' }}
                            >
                                {/* CONTENT WRAPPER */}
                                <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-between">
                                    
                                    {/* TOP ROW */}
                                    <div className="flex items-center justify-between w-full">
                                        <div className="flex items-center gap-4 md:gap-6">
                                            <span className={`text-lg md:text-xl font-mono tracking-widest transition-colors duration-300 ${isActive ? 'text-[#C80000]' : 'text-gray-300'}`}>
                                                /{item.id}
                                            </span>
                                            <h3 className={`text-2xl sm:text-3xl md:text-5xl font-black uppercase transition-all duration-300 ${isActive ? 'translate-x-2 md:translate-x-4 text-[#C80000]' : 'text-gray-400'}`}>
                                                {item.title}
                                            </h3>
                                        </div>
                                        
                                        <motion.div 
                                            animate={{ rotate: isActive ? 90 : 0 }}
                                            className={`text-xl md:text-2xl ${isActive ? 'text-[#C80000]' : 'text-gray-300'}`}
                                        >
                                            ➔
                                        </motion.div>
                                    </div>

                                    {/* REVEAL CONTENT */}
                                    <AnimatePresence>
                                        {isActive && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                                                transition={{ delay: 0.2, duration: 0.5 }}
                                                className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-8 mt-auto"
                                            >
                                                <div className="max-w-2xl">
                                                    <div className="text-xs md:text-sm font-mono text-[#C80000]/60 mb-2 md:mb-3 uppercase tracking-wider">
                                                        {item.subtitle}
                                                    </div>
                                                    <p className="text-base md:text-xl text-gray-500 font-light leading-relaxed">
                                                        {item.desc}
                                                    </p>
                                                </div>

                                                <div className="hidden md:block text-right">
                                                    <div className="flex flex-col items-end gap-1">
                                                        <div className="w-24 h-1 bg-gray-100 overflow-hidden rounded-full">
                                                            <motion.div 
                                                                initial={{ x: "-100%" }}
                                                                animate={{ x: "0%" }}
                                                                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                                                                className="w-full h-full bg-[#C80000]"
                                                            />
                                                        </div>
                                                        <span className="text-[10px] font-mono text-gray-400 uppercase">
                                                            System Status: Nominal
                                                        </span>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Hover Scanline Effect - Subtle for white theme */}
                                {isActive && (
                                    <div className="absolute inset-0 pointer-events-none opacity-[0.03]" 
                                         style={{ backgroundImage: 'linear-gradient(transparent 50%, rgba(200,0,0,0.5) 50%)', backgroundSize: '100% 4px' }}>
                                    </div>
                                )}
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default InfrastructureSection;