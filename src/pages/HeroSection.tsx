import React, { useLayoutEffect, useRef } from "react";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import ContentSection from "./ContentSection";
import solar from "../assets/solar-Panels.jpg";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
    const bg1 = useRef(null);
    const img_container = useRef(null);
    const container = useRef(null); 
    const text1 = useRef(null);
    const text2 = useRef(null);
    const img = useRef(null);

    useLayoutEffect(() => {
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
            .to(img.current, { transform: "translateZ(2200px)" }) 
            .to(text1.current, { y: -300, opacity: 0 }, "<0.05") 
            .to(text2.current, { y: -300, opacity: 0 }, "<0.05") 
            .fromTo(container.current, 
                { yPercent: 100, scaleY: 2 }, 
                { yPercent: 0, scaleY: 1 } 
            ); 
        });

        return () => ctx.revert();
    }, []);

    return (
        <div className="relative">
            {/* Background color set to #C80000 */}
            <div ref={bg1} className="bg-[#C80000] absolute h-screen w-screen -z-10"></div>

            <section>
                <div ref={img_container} className="w-screen h-[100dvh] flex items-center justify-center overflow-hidden">
                    <div className="image-wrapper perspective relative flex items-center justify-center">

                        <img 
                            ref={img} 
                            src={solar} 
                            className="masked-image brightness-100 contrast-110" 
                            alt="Solar Farm" 
                        />

                        <div className="absolute z-20 flex flex-col items-center justify-center text-center w-full px-4">

                            <h1 
                                ref={text1} 
                                className="text-[11vw] md:text-[120px] font-black leading-none drop-shadow-2xl flex items-center justify-center whitespace-nowrap uppercase tracking-tighter"
                                style={{ fontFamily: 'Inter, sans-serif' }}
                            >
                                <div className="flex -space-x-[0.02em] md:-space-x-[0.02em] items-center">
                                    {['E', 'N', 'E', 'R'].map((char, i) => (
                                        <span 
                                            key={i}
                                            // UPDATED: Changed from transparent to #C80000
                                            className="text-[#C80000]"
                                            style={{ 
                                                // UPDATED: Changed stroke to White or Red depending on your preference 
                                                // Keeping 1px white stroke to make red letters pop against the background image
                                                WebkitTextStroke: "1px #C80000",
                                                opacity: 1,
                                                display: 'inline-block'
                                            }}
                                        >
                                            {char}
                                        </span>
                                    ))}
                                </div>

                                <span className="text-white tracking-[-0.08em] ml-[-0.02em]">
                                    GICA
                                </span>
                            </h1>

                            <h2 
                                ref={text2} 
                                className="mt-2 md:mt-4 text-[1.8vw] md:text-[16px] font-bold tracking-[0.65em] text-white drop-shadow-md uppercase"
                            >
                                SUSTAIN FOUNDATION
                            </h2>

                        </div>
                    </div>
                </div>

                <div className="last">
                    <ContentSection ref={container} />
                </div>
            </section>
        </div>
    );
};

export default HeroSection;