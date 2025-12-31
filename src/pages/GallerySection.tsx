import React, { useLayoutEffect, useRef } from "react";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useNavigate } from 'react-router-dom';

// IMPORT YOUR LOCAL IMAGES
import PMSURYAGHAR from "../assets/PMSuryaGhar.avif";
import solarRoof from "../assets/SolarInFarm.avif";
import smartProgram from "../assets/SmartProgram.avif";
import antina from "../assets/Antina.avif";

gsap.registerPlugin(ScrollTrigger);

const GallerySection = () => {
    const component = useRef<HTMLDivElement>(null);
    const slider = useRef<HTMLDivElement>(null);
    
    const navigate = useNavigate();

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            const panels = gsap.utils.toArray(".gallery-panel");
            const isMobile = window.innerWidth < 768;

            gsap.to(panels, {
                xPercent: -100 * (panels.length - 1),
                ease: "none",
                scrollTrigger: {
                    trigger: slider.current,
                    pin: true,
                    scrub: 1,
                    snap: 1 / (panels.length - 1),
                    end: () => "+=" + (slider.current!.offsetWidth / (isMobile ? 1 : 3)), 
                }
            });
        }, component);

        return () => ctx.revert();
    }, []);

    const handleNavigation = () => {
        navigate('/awarenesscompaign');
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        setTimeout(() => {
            window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        }, 10);
    };

    const slides = [
        {
            id: 1,
            title: "PM SURYA GHAR",
            subtitle: "Residential Rooftop",
            img: PMSURYAGHAR, 
            desc: "Muft Bijli Yojana. Subsidy up to ₹78,000 for residential households. Target: 1 Crore homes."
        },
        {
            id: 2,
            title: "KUSUM SCHEME",
            subtitle: "Solar for Farmers",
            img: solarRoof, 
            desc: "Diesel-free irrigation. Up to 90% subsidy for standalone solar pumps. Income from surplus power."
        },
        {
            id: 3,
            title: "SMART PROGRAM",
            subtitle: "Community Solar",
            img: smartProgram,
            desc: "Strengthening rural energy security. Focused on BPL and economically weaker sections."
        },
        {
            id: 4,
            title: "OPEN ACCESS",
            subtitle: "Industrial Green Energy",
            img: antina, 
            desc: "For Industries >100 kW. 100% Renewable sourcing to reduce carbon footprint and energy costs."
        }
    ];

    return (
        /* UPDATED: ENERGICA BRAND RED BACKGROUND */
        <div ref={component} className="bg-[#C80000] text-white overflow-hidden" style={{ fontFamily: "'Montserrat', sans-serif" }}>

            <div className="py-16 md:py-28 px-4 md:px-10 text-center relative z-10">
                <p className="text-white font-mono tracking-[0.4em] text-xs md:text-sm mb-4 font-black opacity-70 uppercase">// Government Initiatives</p>
                <h2 className="text-4xl md:text-7xl font-black uppercase italic tracking-tighter">Key Solar <span className="opacity-40 not-italic">Schemes</span></h2>
            </div>

            <div ref={slider} className="w-[400vw] h-[100dvh] flex flex-nowrap">

                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className="gallery-panel w-screen h-[100dvh] flex-none flex items-center justify-center relative border-r border-white/10"
                    >
                        {/* Background Image with Multiply Blend Mode to soak in the Brand Red */}
                        <div className="absolute inset-0 z-0">
                            <img
                                src={slide.img}
                                alt={slide.title}
                                className="w-full h-full object-cover opacity-40 grayscale transition-transform duration-1000 hover:scale-110"
                                loading="eager"
                            />
                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#C80000] via-transparent to-[#C80000]/30"></div>
                        </div>

                        <div className="relative z-10 max-w-6xl px-6 md:px-10 flex flex-col md:flex-row items-center gap-6 md:gap-10">
                            
                            {/* Large Background Index Number */}
                            <div className="text-[30vw] md:text-[15rem] font-black text-white/10 absolute -top-20 left-4 md:-top-56 md:left-0 select-none z-0 italic tracking-tighter">
                                0{index + 1}
                            </div>

                            <div className="flex flex-col relative z-10 text-center md:text-left">
                                <span className="text-white font-mono tracking-[0.3em] mb-4 font-black text-xs md:text-lg uppercase opacity-80">
                                    // {slide.subtitle}
                                </span>
                                
                                <h3 className="text-5xl sm:text-6xl md:text-[10rem] font-black uppercase italic leading-[0.8] mb-8 tracking-tighter">
                                    {slide.title}
                                </h3>
                                
                                <p className="text-lg md:text-3xl font-medium text-white/90 max-w-2xl mx-auto md:mx-0 leading-tight tracking-tight">
                                    {slide.desc}
                                </p>
                                
                                <button 
                                    onClick={handleNavigation}
                                    className="mt-10 md:mt-12 group relative px-8 py-3 md:px-12 md:py-5 overflow-hidden border-2 border-white text-white text-xs md:text-sm font-black tracking-[0.2em] uppercase transition-all w-max mx-auto md:mx-0"
                                >
                                    <div className="absolute inset-0 bg-white translate-y-full transition-transform duration-300 group-hover:translate-y-0 -z-10"></div>
                                    <span className="group-hover:text-[#C80000] transition-colors duration-300 italic">Check Eligibility ↗</span>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

            </div>

            {/* Background Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/7/76/Noise.png")' }}></div>
        </div>
    );
};

export default GallerySection;