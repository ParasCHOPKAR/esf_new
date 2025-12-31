import React, { useLayoutEffect, useRef } from "react";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import ContentSection from "./ContentSection";
// 1. IMPORT YOUR LOCAL IMAGE
import solar from "../assets/solar-Panels.jpg";

gsap.registerPlugin(ScrollTrigger);

const HeroSection: React.FC = () => {
    const bg1 = useRef<HTMLDivElement>(null);
    const img_container = useRef<HTMLDivElement>(null);
    const container = useRef<HTMLDivElement>(null); 
    const text1 = useRef<HTMLHeadingElement>(null);
    const text2 = useRef<HTMLHeadingElement>(null);
    const text3 = useRef<HTMLParagraphElement>(null);
    const img = useRef<HTMLImageElement>(null);

    useLayoutEffect(() => {
        // Safety Check
        if (!bg1.current || !img_container.current || !container.current) return;

        const ctx = gsap.context(() => {
            // 1. Pin the background
            ScrollTrigger.create({
                trigger: bg1.current,
                pin: bg1.current,
                pinSpacing: false,
                start: "top top",
                endTrigger: ".last", 
                end: "bottom bottom",
            });

            // 2. Set initial state for ContentSection
            gsap.set(container.current, { 
                marginTop: -(container.current?.offsetHeight || 0) 
            });

            // 3. The Main Timeline
            gsap.timeline({
                scrollTrigger: {
                    trigger: img_container.current,
                    pin: img_container.current,
                    scrub: 1,
                    start: "0% 0%",
                }
            })
            // ZOOM Effect
            .to(img.current, { transform: "translateZ(2200px)", ease: "none" }) 
            // Text Group Moves Up & Fades Out
            .to([text1.current, text2.current, text3.current], { 
                y: -300, 
                opacity: 0, 
                stagger: 0.05, 
                ease: "power2.inOut" 
            }, "<0.05") 
            // Content Slides Up from bottom
            .fromTo(container.current, 
                { yPercent: 100, scaleY: 2 }, 
                { yPercent: 0, scaleY: 1, ease: "none" } 
            ); 
        });

        return () => ctx.revert();
    }, []);

    return (
        <div className="relative">
            {/* UPDATED: DEEP BLACK BACKGROUND (#0b0b0b) */}
            <div ref={bg1} className="bg-[#0b0b0b] absolute h-screen w-screen -z-10"></div>

            <section>
                <div ref={img_container} className="w-screen h-[100dvh] flex items-center justify-center overflow-hidden">
                    <div className="image-wrapper perspective relative flex items-center justify-center">

                        {/* Image - Adjusted for black background contrast */}
                        <img 
                            ref={img} 
                            src={solar} 
                            className="masked-image brightness-90 contrast-125 opacity-60" 
                            alt="Solar Farm" 
                        />
                        
                        {/* Circular Overlay for text legibility (Matches reference image style) */}
                        <div className="absolute inset-0 bg-black/20 rounded-full scale-75 blur-3xl pointer-events-none"></div>

                        {/* Center Text Overlay */}
                        <div className="absolute z-20 flex flex-col items-center justify-center text-center w-full px-4 text-white">

                            {/* Main Title: Montserrat Black + Italic Style for ENERGICA® */}
                            <h1 
                                ref={text1} 
                                style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 900 }}
                                className="text-[14vw] md:text-[150px] leading-none tracking-tighter flex items-center justify-center italic whitespace-nowrap drop-shadow-2xl"
                            >
                                ENERGICA
                                <span className="text-[4vw] md:text-[45px] not-italic align-top mt-[-2%] font-bold">®</span>
                            </h1>

                            {/* Subtitle: Noto Sans Devanagari for Categories */}
                            <h2 
                                ref={text2} 
                                style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                                className="mt-2 md:mt-4 text-[2.2vw] md:text-[22px] font-bold tracking-widest uppercase opacity-90 drop-shadow-lg"
                            >
                                Grid Tied | Off Grid | Hybrid | Micro | Utility
                            </h2>

                            {/* Slogan: Montserrat Medium */}
                            <p 
                                ref={text3}
                                style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500 }}
                                className="mt-10 md:mt-16 text-[3.2vw] md:text-[26px] max-w-5xl leading-tight tracking-tight drop-shadow-lg"
                            >
                                Powering India’s Solar Ecosystem with reliable PV components
                            </p>

                        </div>
                    </div>
                </div>

                {/* ContentSection linked via ref for GSAP slide-up */}
                <div className="last">
                    <ContentSection ref={container} />
                </div>
            </section>
        </div>
    );
};

export default HeroSection;