import React, { useState, useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';

// --- IMPORTED IMAGES ---
import team from "../About/CompanyRoles/Team.avif";
import inspection from "../About/CompanyRoles/inspection.avif";

gsap.registerPlugin(ScrollTrigger);

// --- 1. FRAMER MOTION VARIANTS FOR TEXT REVEAL ---
const revealVariants = {
    hidden: { y: "100%" },
    visible: (i: number) => ({
        y: "0%",
        transition: {
            duration: 0.8,
            ease: [0.25, 1, 0.5, 1],
            delay: 0.05 * i
        }
    })
};

const MaskedText = ({ text, className = "", delay = 0 }: { text: string, className?: string, delay?: number }) => {
    const words = text.split(" ");
    return (
        <div className={`overflow-hidden ${className} flex flex-wrap gap-x-2`}>
            {words.map((word, i) => (
                <div key={i} className="overflow-hidden relative inline-block">
                    <motion.span
                        custom={i + delay}
                        variants={revealVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-10%" }}
                        className="inline-block"
                    >
                        {word}
                    </motion.span>
                </div>
            ))}
        </div>
    );
};

const CompanyOverview = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    
    // Track which index is currently active (Hovered on Desktop, Tapped on Mobile)
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    // --- 2. RESPONSIVE PARALLAX SCROLL LOGIC ---
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            let mm = gsap.matchMedia();

            // DESKTOP ONLY: Apply parallax (Shift the second column down)
            mm.add("(min-width: 768px)", () => {
                gsap.to(".parallax-col", {
                    yPercent: 15,
                    ease: "none",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true
                    }
                });
            });

        }, containerRef);
        return () => ctx.revert();
    }, []);

    const content = [
        {
            title: "Our Company",
            text: "At Energica Sustain Foundation, we believe in a client-centric approach, focusing on understanding the unique needs and goals of each project. Our team combines industry knowledge with innovative thinking.",
            src: team,
        },
        {
            title: "What We Do",
            text: "We assess the technical aspects of projects to ensure they meet investment criteria. We evaluate feasibility, performance risks, and compliance with standards, providing critical insights for financing decisions.",
            src: inspection,
        }
    ];

    // --- INTERACTION HANDLERS ---
    
    const handleMouseEnter = (index: number) => {
        if (window.matchMedia("(min-width: 768px)").matches) {
            setActiveIndex(index);
            gsap.to(`.company-title-${index}`, { x: 15, duration: 0.4, ease: "power2.out" });
        }
    };

    const handleMouseLeave = (index: number) => {
        if (window.matchMedia("(min-width: 768px)").matches) {
            setActiveIndex(null);
            gsap.to(`.company-title-${index}`, { x: 0, duration: 0.4, ease: "power2.out" });
        }
    };

    const handleClick = (index: number) => {
        if (window.matchMedia("(max-width: 767px)").matches) {
            setActiveIndex(activeIndex === index ? null : index);
        }
    };

    return (
        /* UPDATED: ENERGICA BRAND RED BACKGROUND */
        <section ref={containerRef} className="relative w-full min-h-screen bg-[#C80000] text-white pt-20 pb-40 px-4 md:px-6 overflow-hidden cursor-default" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            
            {/* Background Texture Overlay */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.08] z-0 mix-blend-overlay" style={{ backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/7/76/Noise.png")' }}></div>

            <div className="max-w-7xl mx-auto relative z-20">
                <div className="text-center mb-16 md:mb-32">
                    <motion.span 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-white font-mono tracking-[0.4em] text-xs md:text-sm uppercase font-black block mb-6 opacity-70"
                    >
                        // THE ENERGICA STORY
                    </motion.span>

                    <h1 className="text-[12vw] md:text-[9rem] font-black uppercase leading-[0.8] tracking-tighter italic">
                        <div className="overflow-hidden">
                            <motion.span 
                                initial={{ y: "100%" }} 
                                whileInView={{ y: "0%" }} 
                                transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                                className="block"
                            >
                                A Foundation
                            </motion.span>
                        </div>
                        <div className="overflow-hidden">
                            <motion.span 
                                initial={{ y: "100%" }} 
                                whileInView={{ y: "0%" }} 
                                transition={{ duration: 1, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
                                className="block opacity-40 not-italic font-bold"
                            >
                                of Integrity.
                            </motion.span>
                        </div>
                    </h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-32 items-start">
                    {content.map((item, index) => (
                        <div 
                            key={index} 
                            onMouseEnter={() => handleMouseEnter(index)}
                            onMouseLeave={() => handleMouseLeave(index)}
                            onClick={() => handleClick(index)}
                            className={`group border-t-2 border-white/20 pt-10 md:pt-16 ${index === 1 ? 'parallax-col md:mt-48' : ''} relative cursor-pointer`}
                        >
                            {/* --- IMAGE BACKGROUND REVEAL --- */}
                            <AnimatePresence>
                                {activeIndex === index && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 1.1 }} 
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 1.05 }} 
                                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                        className="absolute -inset-6 z-0 rounded-[2rem] overflow-hidden pointer-events-none"
                                    >
                                        <img 
                                            src={item.src} 
                                            alt={item.title} 
                                            className="w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 transition-all duration-700" 
                                        />
                                        {/* Gradient to Red Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#C80000] via-[#C80000]/60 to-transparent"></div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* --- CONTENT --- */}
                            <div className="relative z-10 pointer-events-none">
                                <div className="flex items-center gap-6 mb-8 md:mb-12">
                                    <div className={`w-3 h-3 rounded-full bg-white transition-all duration-500 ${activeIndex === index ? 'scale-150 shadow-[0_0_20px_rgba(255,255,255,0.8)]' : 'opacity-40'}`}></div>
                                    
                                    <h3 className={`company-title-${index} text-3xl md:text-5xl font-black uppercase text-white transition-all duration-500 italic tracking-tighter ${activeIndex === index ? 'translate-x-4' : 'opacity-80'}`}>
                                        {item.title}
                                    </h3>
                                </div>
                                
                                <div className="max-w-xl">
                                    <MaskedText 
                                        text={item.text} 
                                        className={`text-xl md:text-2xl leading-[1.3] font-medium tracking-tight transition-all duration-500 ${activeIndex === index ? 'text-white' : 'text-white/50'}`} 
                                    />
                                </div>
                                
                                {/* Mobile tap indicator */}
                                <div className={`md:hidden mt-8 text-[10px] font-mono uppercase tracking-[0.3em] text-white transition-opacity duration-300 ${activeIndex === index ? 'opacity-0' : 'opacity-40'}`}>
                                    [ tap to reveal details ]
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>  
    );
};

export default CompanyOverview;