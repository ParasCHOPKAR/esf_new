import React, { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useNavigate } from 'react-router-dom';

// IMPORT LOCAL IMAGES
import grid from "../assets/Grid.avif";
import hybrid from "../assets/Hybrid.avif";
import micro from "../assets/MIcro.avif";

gsap.registerPlugin(ScrollTrigger);

const TechSection = () => {
    const container = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);
    const cardsContainerRef = useRef<HTMLDivElement>(null);
    
    const navigate = useNavigate();
    const [activeId, setActiveId] = useState<number | null>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            let mm = gsap.matchMedia();

            mm.add({
                isMobile: "(max-width: 767px)",
                isDesktop: "(min-width: 768px)",
            }, (context) => {
                let { isMobile } = context.conditions;

                // 1. BACKGROUND TITLE ANIMATION
                gsap.fromTo(textRef.current, 
                    { opacity: 0, scale: 0.8 }, 
                    {
                        opacity: 0.15, 
                        scale: 1,
                        ease: "power2.out",
                        duration: 1.5,
                        scrollTrigger: {
                            trigger: container.current,
                            start: "top 80%",
                        }
                    }
                );

                // 2. CARD ENTRANCE ANIMATION
                const cards = gsap.utils.toArray(".tech-card-anim");
                cards.forEach((card: any) => {
                    gsap.from(card, {
                        y: isMobile ? 50 : 100,
                        opacity: 0,
                        duration: isMobile ? 0.8 : 1.2,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: card,
                            start: isMobile ? "top 90%" : "top 85%", 
                            toggleActions: "play none none reverse"
                        }
                    });
                });
            });

        }, container);

        return () => ctx.revert();
    }, []);

    const handleMouseEnter = (id: number) => {
        if (window.innerWidth > 768) setActiveId(id);
    };

    const handleMouseLeave = () => {
        if (window.innerWidth > 768) setActiveId(null);
    };

    const handleClick = (id: number) => {
        if (window.innerWidth <= 768) {
            setActiveId(prev => prev === id ? null : id);
        }
    };

    const handleNavigation = (e: React.MouseEvent) => {
        e.stopPropagation(); 
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        navigate('/training-campaign');
    };

    const techData = [
        { 
            id: 1,
            align: "start", 
            title: "Core Technology", 
            img: grid, 
            subPoints: [
                { subtitle: "Grid-Tied System", info: "Seamlessly connects to the utility grid for net metering benefits." },
                { subtitle: "Off-Grid System", info: "Independent power generation with battery storage for remote locations." }
            ]
        },
        { 
            id: 2,
            align: "end", 
            title: "New Technology", 
            img: hybrid, 
            subPoints: [
                { subtitle: "Hybrid Inverters", info: "Smartly manages solar, battery, and grid power simultaneously." },
                { subtitle: "Microinverters", info: "Panel-level optimization for maximum efficiency and safety." },
                { subtitle: "Lithium-ion Batteries", info: "High-density, long-lasting energy storage solutions." }
            ]
        },
        { 
            id: 3,
            align: "start", 
            title: "Capacity Building", 
            img: micro, 
            subPoints: [
                { subtitle: "Sustainability", info: "Training on long-term environmental and energy viability." },
                { subtitle: "Administration", info: "Management skills for renewable energy project oversight." },
                { subtitle: "Accounting", info: "Financial planning and ROI analysis for solar investments." }
            ]
        }
    ];

    return (
        // UPDATED: BRAND RED BACKGROUND
        <div ref={container} className="relative bg-[#C80000] text-white py-20 overflow-hidden min-h-[120vh]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            
            {/* 1. SECTION TITLE & BACKGROUND TEXT */}
            <div className="relative z-10 px-6 md:px-20 mb-16 md:mb-24 text-center">
                <span className="text-white font-mono tracking-[0.3em] text-xs md:text-sm uppercase font-black block mb-4 opacity-70">
                    // EXPERTISE & KNOWLEDGE
                </span>
                <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-none relative z-20 italic">
                    Training <span className="opacity-40 not-italic">Campaigns</span>
                </h2>
                
                {/* Background Giant Text */}
                <h1 
                    ref={textRef} 
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[12vw] md:text-[10vw] font-black text-white/10 leading-none whitespace-nowrap select-none tracking-tighter pointer-events-none z-0 italic"
                >
                    EDUCATION
                </h1>
            </div>

            {/* 2. CARDS CONTAINER */}
            <div ref={cardsContainerRef} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-20 flex flex-col gap-10 md:gap-24">
                
                {techData.map((tech) => {
                    const isActive = activeId === tech.id;

                    return (
                        <div 
                            key={tech.id} 
                            className={`flex w-full ${tech.align === 'end' ? 'md:justify-end justify-center' : 'md:justify-start justify-center'}`}
                        >
                            {/* THE CARD */}
                            <div 
                                className={`tech-card-anim group relative overflow-hidden rounded-3xl border bg-black shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] transition-all duration-700 cursor-pointer
                                    ${isActive ? 'border-white scale-[1.02]' : 'border-white/10 scale-100'}
                                    w-[90vw] h-[450px] md:w-[700px] md:h-[500px]
                                `}
                                onMouseEnter={() => handleMouseEnter(tech.id)}
                                onMouseLeave={handleMouseLeave}
                                onClick={() => handleClick(tech.id)}
                            >
                                
                                {/* Image Background */}
                                <img 
                                    src={tech.img} 
                                    alt={tech.title} 
                                    className={`absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out
                                        ${isActive ? 'scale-110 opacity-40' : 'scale-100 opacity-60'}
                                    `}
                                />
                                
                                {/* Gradient Overlay */}
                                <div className={`absolute inset-0 bg-gradient-to-t from-[#C80000] via-black/60 to-transparent transition-opacity duration-500
                                    ${isActive ? 'opacity-90' : 'opacity-70'}
                                `}></div>

                                {/* Content Wrapper */}
                                <div className={`absolute bottom-0 left-0 p-8 md:p-12 w-full transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]
                                    ${isActive ? 'translate-y-0' : 'translate-y-[calc(100%-140px)]'}
                                `}>
                                    
                                    <span className="text-white/50 font-mono text-[10px] tracking-[0.4em] uppercase mb-3 block font-bold">
                                        PROTOCOL 0{tech.id}
                                    </span>

                                    <div className="flex justify-between items-center mb-6">
                                        <h3 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter text-white">
                                            {tech.title}
                                        </h3>
                                        
                                        <div className={`md:hidden text-white transition-transform duration-500 ${isActive ? 'rotate-180' : 'rotate-0'}`}>
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M6 9l6 6 6-6"/></svg>
                                        </div>
                                    </div>

                                    {/* Divider Line */}
                                    <div className={`h-[3px] bg-white mb-8 transition-all duration-1000 ease-in-out
                                        ${isActive ? 'w-full opacity-100' : 'w-12 opacity-30'}
                                    `}></div>

                                    {/* Subpoints */}
                                    <div className={`flex flex-col gap-6 mb-10 transition-all duration-500
                                        ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
                                    `}>
                                        {tech.subPoints.map((point, index) => (
                                            <div key={index} className="flex flex-col gap-1">
                                                <h4 className="text-white font-black text-sm md:text-lg flex items-center gap-3 uppercase tracking-tight">
                                                    <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                                                    {point.subtitle}
                                                </h4>
                                                <p className="text-white/70 text-xs md:text-base pl-5 leading-relaxed font-medium">
                                                    {point.info}
                                                </p>
                                            </div>
                                        ))}
                                    </div>

                                    {/* EXPLORE MORE BUTTON */}
                                    <div className={`transition-all duration-700 delay-200
                                         ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
                                    `}>
                                        <button 
                                            className="group/btn relative px-8 py-3 overflow-hidden border-2 border-white text-white uppercase text-xs font-black tracking-[0.2em] transition-all duration-300 hover:text-[#C80000]"
                                            onClick={handleNavigation}
                                        >
                                            <div className="absolute inset-0 bg-white translate-y-full transition-transform duration-300 group-hover/btn:translate-y-0 -z-10"></div>
                                            Explore protocol
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}

            </div>

            {/* Background Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/7/76/Noise.png")' }}></div>
        </div>
    );
};

export default TechSection;