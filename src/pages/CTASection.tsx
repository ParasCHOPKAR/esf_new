import React, { useLayoutEffect, useRef } from "react";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
// 1. IMPORT YOUR LOCAL IMAGE
import ContactBg from "../assets/ContactSection.jpeg";

gsap.registerPlugin(ScrollTrigger);

const CTASection = () => {
    const container = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            // Text Reveal Animation
            gsap.from(textRef.current, {
                y: 100, 
                opacity: 0, 
                duration: 1.5, 
                ease: "power4.out",
                scrollTrigger: { 
                    trigger: container.current, 
                    start: "top 70%" 
                }
            });

            // Magnetic Button Effect
            const btn = buttonRef.current;
            if (btn) {
                const moveBtn = (e: MouseEvent) => {
                    const rect = btn.getBoundingClientRect();
                    gsap.to(btn, { 
                        x: (e.clientX - rect.left - rect.width/2)*0.3, 
                        y: (e.clientY - rect.top - rect.height/2)*0.3, 
                        duration: 0.3 
                    });
                };
                const leaveBtn = () => gsap.to(btn, { x: 0, y: 0, duration: 0.3 });
                
                btn.addEventListener('mousemove', moveBtn); 
                btn.addEventListener('mouseleave', leaveBtn);
                
                return () => { 
                    btn.removeEventListener('mousemove', moveBtn); 
                    btn.removeEventListener('mouseleave', leaveBtn); 
                };
            }
        }, container);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={container} className="relative w-screen h-[70vh] bg-black text-white flex flex-col items-center justify-center overflow-hidden" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            
            {/* 2. BACKGROUND IMAGE WITH OVERLAY */}
            <div className="absolute inset-0 z-0">
                <img 
                    src={ContactBg} 
                    alt="Contact Background" 
                    className="w-full h-full object-cover"
                />
                {/* Dark Overlay to make text readable */}
                <div className="absolute inset-0 bg-black/70"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-6">
                {/* Tagline: Montserrat Medium */}
                <p className="text-white tracking-[0.5em] text-xs md:text-sm uppercase mb-6 font-medium bg-white/10 py-2 px-6 rounded-full w-fit mx-auto border border-white/20">
                    // INITIATE PARTNERSHIP
                </p>

                {/* Main Heading: Montserrat Black Italic */}
                <h2 
                    ref={textRef} 
                    style={{ fontWeight: 900 }}
                    className="text-4xl md:text-8xl font-black uppercase italic tracking-tighter mb-12 leading-[0.85] text-white"
                >
                    Architect Your <br /> <span className="text-white">Green Grid</span>
                </h2>

                <button 
                    ref={buttonRef} 
                    onClick={() => window.location.href = "mailto:connect@solarbni.com"} 
                    className="group relative px-14 py-6 bg-white text-black rounded-full overflow-hidden transition-transform hover:scale-105 shadow-2xl border border-white"
                >
                    {/* Hover Fill Effect (Darkness) */}
                    <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
                    
                    <span className="relative z-10 font-black tracking-widest uppercase text-sm group-hover:text-white transition-colors duration-300 italic">
                        Get Consultation ↗
                    </span>
                </button>
                
                {/* Secondary Text: Montserrat Medium */}
                <div className="mt-12 space-y-2">
                    <p className="text-xs md:text-sm text-white/60 tracking-[0.4em] uppercase font-medium">
                        Direct Line: +91 77700 11558
                    </p>
                    <div className="w-12 h-[2px] bg-white/30 mx-auto"></div>
                </div>
            </div>

            {/* Subtle Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/7/76/Noise.png")' }}></div>
        </div>
    );
};

export default CTASection;