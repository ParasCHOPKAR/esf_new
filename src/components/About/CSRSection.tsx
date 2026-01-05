// src/components/about/CSRSection.tsx

import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

// --- IMPORTED IMAGES ---
import awareness from "../About/CompanyRoles/Awareness.avif";
import sustain from "../About/CompanyRoles/sustain.avif";
import empowerment from "/images/employment.jpg";

gsap.registerPlugin(ScrollTrigger);

const revealVariants = {
    hidden: { y: "100%" },
    visible: (i: number) => ({
        y: "0%",
        transition: {
            duration: 0.8,
            ease: [0.25, 1, 0.5, 1],
            delay: 0.02 * i
        }
    })
};

const MaskedText = ({ text, className = "" }: { text: string, className?: string }) => {
    const words = text.split(" ");
    return (
        <div className={`overflow-hidden ${className} flex flex-wrap gap-x-1.5`}>
            {words.map((word, i) => (
                <div key={i} className="overflow-hidden relative inline-block">
                    <motion.span
                        custom={i}
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

const slides = [
    {
        id: "01",
        title: "Awareness",
        subtitle: "Community Education",
        desc: "We actively promote solar adoption through grassroots awareness programs, ensuring knowledge reaches the last mile.",
        color: "#C80000",
        img: awareness 
    },
    {
        id: "02",
        title: "Sustainability",
        subtitle: "Green Ecosystems",
        desc: "Our projects are designed to coexist with nature, minimizing ecological footprints while maximizing energy output.",
        color: "#C80000",
        img: sustain 
    },
    {
        id: "03",
        title: "Empowerment",
        subtitle: "Capacity Building",
        desc: "Training rural installers and engineers to create local employment and ensure long-term project maintenance.",
        color: "#C80000",
        img: empowerment 
    }
];

const CSRSection = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const modalContainer = useRef<HTMLDivElement>(null);
    const cursorLabel = useRef<HTMLDivElement>(null);
    const [activeModal, setActiveModal] = useState({ active: false, index: 0 });

    useEffect(() => {
        const xMoveContainer = gsap.quickTo(modalContainer.current, "left", { duration: 0.8, ease: "power3" });
        const yMoveContainer = gsap.quickTo(modalContainer.current, "top", { duration: 0.8, ease: "power3" });
        
        const xMoveLabel = gsap.quickTo(cursorLabel.current, "left", { duration: 0.45, ease: "power3" });
        const yMoveLabel = gsap.quickTo(cursorLabel.current, "top", { duration: 0.45, ease: "power3" });

        const handleMouseMove = (e: MouseEvent) => {
            const { pageX, pageY } = e;
            xMoveContainer(pageX);
            yMoveContainer(pageY);
            xMoveLabel(pageX);
            yMoveLabel(pageY);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useEffect(() => {
        let ctx = gsap.context(() => {
            const sections = gsap.utils.toArray<HTMLElement>('.csr-card');
            sections.forEach((section) => {
                gsap.fromTo(section, 
                    { opacity: 0, y: 50 },
                    {
                        opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
                        scrollTrigger: {
                            trigger: section,
                            start: "top 85%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="bg-white text-[#C80000] py-20 px-4 md:px-10 overflow-hidden relative cursor-default">
            
            {/* FLOATING MODAL */}
            <motion.div 
                ref={modalContainer} 
                variants={{
                    initial: { scale: 0, opacity: 0 },
                    open: { scale: 1, opacity: 1, transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] } },
                    closed: { scale: 0, opacity: 0, transition: { duration: 0.4, ease: [0.32, 0, 0.67, 0] } }
                }}
                animate={activeModal.active ? "open" : "closed"}
                className="h-[300px] w-[400px] absolute overflow-hidden pointer-events-none rounded-2xl z-50 top-0 left-0 -translate-x-1/2 -translate-y-1/2 hidden md:block border border-gray-100 shadow-2xl"
            >
                <div style={{ top: `${activeModal.index * -100}%` }} className="h-full w-full absolute transition-[top] duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]">
                    {slides.map((slide, index) => (
                        <div key={index} className="h-full w-full flex items-center justify-center bg-gray-50">
                            <img 
                                src={slide.img} 
                                alt="floating" 
                                className="h-full w-full object-cover"
                            />
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* CURSOR LABEL */}
            <motion.div 
                ref={cursorLabel}
                variants={{
                    initial: { scale: 0, opacity: 0 },
                    open: { scale: 1, opacity: 1, transition: { duration: 0.45, ease: [0.76, 0, 0.24, 1] } },
                    closed: { scale: 0, opacity: 0, transition: { duration: 0.45, ease: [0.32, 0, 0.67, 0] } }
                }}
                animate={activeModal.active ? "open" : "closed"}
                className="w-20 h-20 rounded-full bg-[#C80000] text-white fixed z-[60] flex items-center justify-center pointer-events-none top-0 left-0 -translate-x-1/2 -translate-y-1/2 hidden md:flex"
            >
                <span className="text-xs font-bold uppercase">View</span>
            </motion.div>

            {/* Header */}
            <div className="max-w-6xl mx-auto mb-20 border-b border-gray-100 pb-10">
                <span className="text-[#C80000] font-mono tracking-widest text-sm uppercase font-bold block mb-2">
                    Social Responsibility
                </span>
                <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-[#C80000]">
                    Beyond Business.
                </h2>
            </div>

            {/* Card Stack */}
            <div className="max-w-6xl mx-auto flex flex-col gap-24 relative z-10">
                {slides.map((slide, index) => (
                    <div 
                        key={slide.id} 
                        className="csr-card flex flex-col md:flex-row gap-10 items-stretch group"
                        onMouseEnter={() => setActiveModal({ active: true, index })}
                        onMouseLeave={() => setActiveModal({ active: false, index })}
                    >
                        {/* LEFT: Static Image */}
                        <div className="w-full md:w-1/2 h-[400px] md:h-auto min-h-[400px] rounded-2xl relative overflow-hidden bg-gray-50 border border-gray-100">
                            <img 
                                src={slide.img} 
                                alt={slide.title}
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                            />
                            <div className="absolute inset-0 opacity-10 mix-blend-multiply" style={{backgroundColor: slide.color}}></div>
                        </div>

                        {/* RIGHT: Content */}
                        <div className="w-full md:w-1/2 flex flex-col justify-center py-8">
                            <span className="font-mono text-xl mb-4 block" style={{ color: slide.color }}>
                                /{slide.id}
                            </span>
                            
                            <h2 className="text-4xl md:text-5xl font-bold uppercase mb-6 leading-tight text-[#C80000]">
                                {slide.title}
                            </h2>
                            
                            <div className="pl-6 border-l-2" style={{ borderColor: slide.color }}>
                                <h3 className="text-2xl font-bold text-gray-800 mb-3 uppercase opacity-80">
                                    {slide.subtitle}
                                </h3>
                                
                                <MaskedText 
                                    text={slide.desc} 
                                    className="text-lg text-gray-500 leading-relaxed font-light" 
                                />
                            </div>

                            <motion.button
                                whileHover={{ x: 10 }}
                                className="mt-8 flex items-center gap-3 font-mono uppercase tracking-widest text-sm w-max"
                                style={{ color: slide.color }}
                            >
                                Learn More <span className="text-xl">→</span>
                            </motion.button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="h-20"></div>
        </section>
    );
};

export default CSRSection;