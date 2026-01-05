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
        <div ref={component} className="bg-white text-white overflow-hidden">

            <div className="py-12 md:py-20 px-4 md:px-10 text-center bg-white">
              <p className="text-[#C80000]/70 uppercase tracking-widest text-xs md:text-sm mb-2 font-bold">
                Government Initiatives
              </p>

              <h2 className="text-[#C80000] text-3xl md:text-5xl font-black uppercase tracking-tighter">
                Key Solar Schemes
              </h2>
            </div>


            <div ref={slider} className="w-[400vw] h-[100dvh] flex flex-nowrap">

                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className="gallery-panel w-screen h-[100dvh] flex-none flex items-center justify-center relative border-r border-gray-100 bg-white"
                    >
                        {/* Background Image - Redness reduced by removing red overlay and using natural tones */}
                        <div className="absolute inset-0 z-0 bg-black">
                            <img
                                src={slide.img}
                                alt={slide.title}
                                className="w-full h-full object-cover opacity-60 transition-transform duration-1000 hover:scale-110"
                                loading="eager"
                            />
                            {/* Linear Black gradient instead of Red to make the image look natural while keeping text readable */}
                            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
                        </div>

                        <div className="relative z-10 max-w-4xl px-6 md:px-10 flex flex-col md:flex-row items-center gap-6 md:gap-10 mt-10 md:mt-0">
                            
                            {/* Background number with subtle red tint */}
                            <div className="text-[25vw] md:text-[12rem] font-black text-white/5 absolute -top-16 left-4 md:-top-40 md:left-0 select-none z-0">
                                0{index + 1}
                            </div>

                            <div className="flex flex-col relative z-10 text-center md:text-left">
                                <span className="text-white font-mono tracking-widest mb-2 md:mb-4 font-bold text-xs md:text-base bg-[#C80000] px-3 py-1 w-max mx-auto md:mx-0 rounded shadow-lg">
                                    {slide.subtitle}
                                </span>
                                
                                <h3 className="text-4xl sm:text-5xl md:text-8xl font-black uppercase leading-[0.9] mb-4 md:mb-6 tracking-tighter drop-shadow-2xl">
                                    {slide.title}
                                </h3>
                                
                                <p className="text-base md:text-2xl font-medium text-white/90 max-w-lg mx-auto md:mx-0 leading-tight">
                                    {slide.desc}
                                </p>
                                
                                <button 
                                    onClick={handleNavigation}
                                    className="mt-6 md:mt-8 px-6 py-2 md:px-8 md:py-3 bg-[#C80000] text-white text-xs md:text-sm tracking-widest uppercase font-black hover:bg-white hover:text-[#C80000] transition-all duration-300 w-max mx-auto md:mx-0 border border-[#C80000]"
                                >
                                    Check Eligibility
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    );
};

export default GallerySection;