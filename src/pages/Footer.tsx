import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// IMPORT LOGO
import logo from "../assets/Energica.png";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
    const footerRef = useRef<HTMLDivElement>(null);
    const bigTextRef = useRef<HTMLHeadingElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            
            // 1. Instantly set initial state (Hidden above the container)
            gsap.set(bigTextRef.current, { yPercent: -100 });

            // 2. The Reveal Animation (Slides DOWN into view)
            gsap.to(bigTextRef.current, {
                yPercent: 0,
                ease: "none",
                scrollTrigger: {
                    trigger: footerRef.current,
                    start: "top 80%", 
                    end: "bottom bottom", 
                    scrub: 1.2, 
                }
            });

        }, footerRef);

        return () => ctx.revert();
    }, []);

    return (
        /* UPDATED: ENERGICA BRAND RED BACKGROUND */
        <footer 
            ref={footerRef} 
            className="bg-[#C80000] text-white pt-24 pb-0 border-t border-white/20 relative z-20 overflow-hidden flex flex-col justify-between min-h-[80vh]"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
            
            <div className="px-6 md:px-12 max-w-[90rem] mx-auto w-full relative z-20 mb-20">
                <div className="flex flex-col md:flex-row justify-between items-start gap-16">
                    
                    {/* LEFT SIDE: LOGO & DESC */}
                    <div className="md:w-1/3">
                        <div className="mb-10">
                            {/* Logo with Brightness filter to make it pure white if needed */}
                            <img 
                                src={logo} 
                                alt="Energica Logo" 
                                className="h-24 md:h-32 w-auto object-contain filter brightness-0 invert" 
                            />
                        </div>
                        <p className="text-white/80 text-xl font-medium leading-tight max-w-md tracking-tight">
                            Bridging the gap between technical feasibility and financial viability. We ensure renewable projects are optimized for sustainable success.
                        </p>
                    </div>

                    {/* RIGHT SIDE: COLUMNS */}
                    <div className="flex flex-wrap gap-12 md:gap-24 w-full md:w-auto mt-10 md:mt-0">
                        
                        <div className="flex flex-col gap-6">
                            <h4 className="uppercase tracking-[0.3em] text-xs font-black text-white/60 mb-2">// Company</h4>
                            <a href="#about" className="hover:opacity-60 text-white text-2xl font-bold transition-all italic">About Us</a>
                            <a href="#projects" className="hover:opacity-60 text-white text-2xl font-bold transition-all italic">Projects</a>
                            <a href="#careers" className="hover:opacity-60 text-white text-2xl font-bold transition-all italic">Careers</a>
                        </div>

                        <div className="flex flex-col gap-6">
                            <h4 className="uppercase tracking-[0.3em] text-xs font-black text-white/60 mb-2">// Socials</h4>
                            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:opacity-60 text-white text-2xl font-bold transition-all italic">LinkedIn</a>
                            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:opacity-60 text-white text-2xl font-bold transition-all italic">Instagram</a>
                            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:opacity-60 text-white text-2xl font-bold transition-all italic">Twitter</a>
                        </div>

                        <div className="flex flex-col gap-6">
                            <h4 className="uppercase tracking-[0.3em] text-xs font-black text-white/60 mb-2">// Legal</h4>
                            <a href="#" className="hover:opacity-60 text-white text-2xl font-bold transition-all italic">Privacy Policy</a>
                            <a href="#" className="hover:opacity-60 text-white text-2xl font-bold transition-all italic">Terms of Service</a>
                        </div>
                    </div>

                </div>
            </div>

            {/* --- THE BIG TITLE REVEAL (MASKED) --- */}
            <div className="w-full border-t-2 border-dashed border-white/30 overflow-hidden relative mt-auto">
                 <div className="w-full overflow-hidden">
                    <h1 
                        ref={bigTextRef}
                        /* Massive Montserrat Black text size */
                        className="text-[22vw] font-black leading-[0.75] text-white text-center select-none tracking-tighter italic"
                    >
                        ENERGICA
                    </h1>
                 </div>
            </div>

            {/* Bottom copyright bar */}
            <div className="bg-black/10 py-6 px-6 md:px-12 flex justify-between items-center text-[10px] font-black uppercase tracking-[0.4em] text-white/40">
                <span>© 2025 Energica Sustain Foundation</span>
                <span className="hidden md:block">Powering India’s Solar Ecosystem</span>
            </div>

        </footer>
    );
};

export default Footer;