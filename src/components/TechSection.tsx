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

                gsap.fromTo(textRef.current, 
                    { opacity: 0, scale: 0.8 }, 
                    {
                        opacity: 1, 
                        scale: 1,
                        ease: "power2.out",
                        duration: 1.5,
                        scrollTrigger: {
                            trigger: container.current,
                            start: "top 80%",
                        }
                    }
                );

                const cards = gsap.utils.toArray(".tech-card-anim");
                cards.forEach((card: any) => {
                    gsap.from(card, {
                        y: isMobile ? 50 : 100,
                        opacity: 0,
                        duration: isMobile ? 0.8 : 1,
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
        if (window.innerWidth <= 768) setActiveId(prev => prev === id ? null : id);
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
        <div ref={container} className="relative bg-white text-gray-900 py-20 overflow-hidden min-h-[120vh]">
            
            {/* 1. SECTION TITLE & BACKGROUND TEXT */}
            <div className="relative z-10 px-6 md:px-20 mb-16 md:mb-24 text-center">
                <span className="text-[#C80000] font-mono tracking-[0.2em] text-xs md:text-sm uppercase font-bold block mb-4">
                    Expertise & Knowledge
                </span>
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none relative z-20 text-[#C80000]">
                    Training <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-800">Campaigns</span>
                </h2>
                
                {/* Background Giant Text */}
             
            </div>

            {/* 2. CARDS CONTAINER */}
            <div ref={cardsContainerRef} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-20 flex flex-col gap-8 md:gap-20">
                
                {techData.map((tech) => {
                    const isActive = activeId === tech.id;

                    return (
                        <div 
                            key={tech.id} 
                            className={`flex w-full ${tech.align === 'end' ? 'md:justify-end justify-center' : 'md:justify-start justify-center'}`}
                        >
                            <div 
                                className={`tech-card-anim group relative overflow-hidden rounded-2xl border bg-gray-50 shadow-xl transition-all duration-500 cursor-pointer
                                    ${isActive ? 'border-[#C80000]' : 'border-gray-200'}
                                    w-[90vw] h-[400px]
                                    md:w-[650px] md:h-[550px]
                                `}
                                onMouseEnter={() => handleMouseEnter(tech.id)}
                                onMouseLeave={handleMouseLeave}
                                onClick={() => handleClick(tech.id)}
                            >
                                <img 
                                    src={tech.img} 
                                    alt={tech.title} 
                                    className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700
                                        ${isActive ? 'scale-110' : 'scale-100'}
                                    `}
                                />
                                
                                <div className={`absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent transition-opacity duration-500
                                    ${isActive ? 'opacity-95' : 'opacity-70'}
                                `}></div>

                                <div className={`absolute bottom-0 left-0 p-6 md:p-10 w-full transition-transform duration-500 ease-out
                                    ${isActive ? 'translate-y-0' : 'translate-y-[calc(100%-120px)] md:translate-y-[calc(100%-140px)]'}
                                `}>
                                    
                                    <span className="text-[#C80000] font-mono text-xs tracking-widest uppercase mb-2 block font-bold">
                                        Section 0{tech.id}
                                    </span>

                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className={`text-2xl md:text-4xl font-bold uppercase transition-colors
                                            ${isActive ? 'text-[#C80000]' : 'text-gray-900'}
                                        `}>
                                            {tech.title}
                                        </h3>
                                        
                                        <div className={`md:hidden text-[#C80000] text-xl transition-transform duration-300 ${isActive ? 'rotate-180' : 'rotate-0'}`}>
                                            ▼
                                        </div>
                                    </div>

                                    <div className={`h-[2px] bg-[#C80000] mb-6 transition-all duration-700 ease-in-out
                                        ${isActive ? 'w-full' : 'w-12'}
                                    `}></div>

                                    <div className={`flex flex-col gap-4 mb-6 transition-all duration-500 delay-100
                                        ${isActive ? 'opacity-100 visible' : 'opacity-0 invisible'}
                                    `}>
                                        {tech.subPoints.map((point, index) => (
                                            <div key={index} className="flex flex-col">
                                                <h4 className="text-gray-900 font-bold text-sm md:text-base flex items-center gap-2">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-[#C80000]"></span>
                                                    {point.subtitle}
                                                </h4>
                                                <p className="text-gray-600 text-xs md:text-sm pl-4 leading-relaxed">
                                                    {point.info}
                                                </p>
                                            </div>
                                        ))}
                                    </div>

                                    <div className={`transition-all duration-500 delay-200
                                         ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                                    `}>
                                        <button 
                                            className="px-6 py-2 border border-[#C80000] text-[#C80000] hover:bg-[#C80000] hover:text-white uppercase text-xs font-bold tracking-widest transition-all duration-300"
                                            onClick={handleNavigation}
                                        >
                                            Explore More
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    );
                })}

            </div>
        </div>
    );
};

export default TechSection;