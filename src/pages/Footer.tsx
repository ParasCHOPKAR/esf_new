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
                    start: "top 70%", 
                    end: "bottom bottom", 
                    scrub: 1, 
                }
            });

        }, footerRef);

        return () => ctx.revert();
    }, []);

    return (
        <footer ref={footerRef} className="bg-[#C80000] text-white pt-24 pb-0 border-t border-red-800 relative z-20 overflow-hidden flex flex-col justify-between min-h-[70vh]">
            
            <div className="px-6 md:px-12 max-w-[90rem] mx-auto w-full relative z-20 mb-16">
                <div className="flex flex-col md:flex-row justify-between items-start gap-16">
                    
                    {/* LEFT SIDE: LOGO & DESC */}
                    <div className="md:w-1/3">
                        <div className="mb-8">
                            <img 
                                src={logo} 
                                alt="Energica Logo" 
                                className="h-28 w-auto object-contain brightness-0 invert" 
                            />
                        </div>
                        <p className="text-red-100 text-lg leading-relaxed max-w-md">
                            Bridging the gap between technical feasibility and financial viability. We assess renewable projects to ensure investments are sound, compliant, and optimized for success.
                        </p>
                    </div>

                    {/* RIGHT SIDE: COLUMNS */}
                    <div className="flex flex-wrap gap-20 w-full md:w-auto mt-10 md:mt-0">
                        <div className="flex flex-col gap-5">
                            <h4 className="uppercase tracking-widest text-sm font-bold text-white/70 mb-2">Company</h4>
                            <a href="#about" className="hover:text-black text-white text-xl transition-colors">About Us</a>
                            <a href="#projects" className="hover:text-black text-white text-xl transition-colors">Projects</a>
                            <a href="#careers" className="hover:text-black text-white text-xl transition-colors">Careers</a>
                        </div>

                        <div className="flex flex-col gap-5">
                            <h4 className="uppercase tracking-widest text-sm font-bold text-white/70 mb-2">Socials</h4>
                            <a href="https://www.linkedin.com/in/solar-bni-91b6702b8/" className="hover:text-black text-white text-xl transition-colors">LinkedIn</a>
                            <a href="" className="hover:text-black text-white text-xl transition-colors">Twitter</a>
                            <a href="https://www.instagram.com/solar.bni/?next=%2F&hl=en" className="hover:text-black text-white text-xl transition-colors">Instagram</a>
                        </div>

                        <div className="flex flex-col gap-5">
                            <h4 className="uppercase tracking-widest text-sm font-bold text-white/70 mb-2">Legal</h4>
                            <a href="#" className="hover:text-black text-white text-xl transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-black text-white text-xl transition-colors">Terms</a>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- THE BIG TITLE REVEAL (FULL VISIBILITY FIX) --- */}
            <div className="w-full border-t border-dashed border-red-400/30 overflow-hidden relative mt-auto bg-[#C80000]">
                 <div className="w-full overflow-hidden flex items-center justify-center">
                    <h1 
                        ref={bigTextRef}
                        /* FIX: Changed to 18.5vw to ensure all characters fit within the 100vw container.
                           Added 'leading-none' and 'inline-block' to prevent vertical clipping.
                        */
                        className="text-[18.5vw] font-black leading-none text-white text-center select-none tracking-tighter w-full whitespace-nowrap inline-block translate-y-2"
                    >
                        ENERGICA
                    </h1>
                 </div>
            </div>

        </footer>
    );
};

export default Footer;