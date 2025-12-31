import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';

const MarqueeSection = () => {
    const slider = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Smooth linear infinite scroll
            gsap.to(slider.current, { 
                xPercent: -50, 
                duration: 20, 
                ease: "linear", 
                repeat: -1 
            });
        });
        return () => ctx.revert();
    }, []);

    return (
        /* UPDATED: ENERGICA BRAND RED BG (#C80000) */
        <div className="bg-[#C80000] text-white py-8 overflow-hidden relative z-20 border-y border-white/10">
            <div ref={slider} className="flex whitespace-nowrap w-fit">
                {/* FONT UPDATE: 
                    - Montserrat Black (900)
                    - Italic (Matches Brand Logo Style) 
                */}
                <h1 
                    style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 900 }}
                    className="text-[4vw] uppercase leading-none px-4 flex items-center gap-12 italic tracking-tighter"
                >
                    <span>☀️ Solarizing Maharashtra</span>
                    <span className="opacity-40">•</span>
                    <span>100+ MW Supplied</span>
                    <span className="opacity-40">•</span>
                    <span>500+ Integrators Trained</span>
                    <span className="opacity-40">•</span>
                    <span>PM Surya Ghar Scheme</span>
                    <span className="opacity-40">•</span>
                </h1>
                
                {/* Duplicate for seamless looping */}
                <h1 
                    style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 900 }}
                    className="text-[4vw] uppercase leading-none px-4 flex items-center gap-12 italic tracking-tighter"
                >
                    <span>☀️ Solarizing Maharashtra</span>
                    <span className="opacity-40">•</span>
                    <span>100+ MW Supplied</span>
                    <span className="opacity-40">•</span>
                    <span>500+ Integrators Trained</span>
                    <span className="opacity-40">•</span>
                    <span>PM Surya Ghar Scheme</span>
                    <span className="opacity-40">•</span>
                </h1>
            </div>
        </div>
    );
};

export default MarqueeSection;