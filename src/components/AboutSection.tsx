import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
// 1. IMPORT YOUR LINK COMPONENT
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const container = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {

      // 1. Background Glow "Breathing" Animation (Subtle White Glow)
      gsap.to(glowRef.current, {
        scale: 1.3,
        opacity: 0.15,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top 70%",
          toggleActions: "play none none reverse"
        }
      });

      // 2. Main Title Slide Up
      tl.from(".main-title", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out"
      });

      // 3. Grid Items Stagger
      tl.from(".grid-item", {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "expo.out"
      }, "-=0.6");

      // 4. Cool Line Expansion Animation (White Borders)
      tl.fromTo(".expand-line",
        { width: 0 },
        { width: "100%", duration: 1.5, ease: "expo.out", stagger: 0.2 }
        , "-=0.8");

      // 5. Paragraph Fade In
      tl.from(".desc-text", {
        opacity: 0,
        y: 30,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out"
      }, "-=1");

      // 6. Button Fade In
      tl.from(".cta-button", {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      }, "-=0.8");

    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div 
        ref={container} 
        /* UPDATED: ENERGICA BRAND RED BACKGROUND */
        className="bg-[#C80000] text-white min-h-[90vh] flex flex-col items-center justify-center px-6 md:px-20 py-32 relative overflow-hidden"
        style={{ fontFamily: "'Montserrat', sans-serif" }}
    >

      {/* Subtle White Glow to create depth against Red */}
      <div
        ref={glowRef}
        className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-white/10 rounded-full blur-[150px] pointer-events-none"
      ></div>

      <div className="max-w-7xl z-10 relative text-center mx-auto">
        
        {/* Sub-label */}
        <span className="main-title text-white font-mono tracking-[0.4em] text-xs md:text-sm uppercase mb-6 block font-black opacity-70">
          // OUR MISSION
        </span>

        {/* Heading: Montserrat Black */}
        <h2 className="main-title text-4xl md:text-7xl font-black uppercase leading-[0.9] mb-24 text-white italic tracking-tighter">
          Driving Success Through <br />
          <span className="opacity-40 not-italic">Innovation & Integrity.</span>
        </h2>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 text-left mb-24">

          {/* Column 1: Who We Are */}
          <div className="grid-item">
            <div className="w-full mb-8">
              <h3 className="text-2xl md:text-3xl font-black uppercase text-white mb-3 tracking-tight italic">
                Who We Are
              </h3>
              {/* Animated White Line */}
              <div className="expand-line h-[3px] bg-white w-full opacity-100"></div>
            </div>

            <p className="desc-text text-white/80 leading-relaxed text-lg font-medium">
              At <span className="text-white font-black underline decoration-2 underline-offset-4">Energica Sustain Foundation</span>, we believe in a client-centric approach.
              <br /><br />
              Our team of seasoned experts combines industry knowledge with innovative thinking to deliver solutions that drive success. We are committed to maintaining the highest standards of professionalism.
            </p>
          </div>

          {/* Column 2: What We Do */}
          <div className="grid-item">
            <div className="w-full mb-8">
              <h3 className="text-2xl md:text-3xl font-black uppercase text-white mb-3 tracking-tight italic">
                What We Do
              </h3>
              {/* Animated White Line */}
              <div className="expand-line h-[3px] bg-white w-full opacity-100"></div>
            </div>

            <p className="desc-text text-white/80 leading-relaxed text-lg font-medium">
              We assess the technical aspects of projects to ensure they meet investment criteria. We evaluate feasibility, performance risks, and compliance with global standards.
              <br /><br />
              By providing critical insights, we help lenders and clients make informed financing decisions and manage risks effectively throughout the project lifecycle.
            </p>
          </div>

        </div>

        {/* --- BRAND BUTTON --- */}
        <div className="cta-button flex justify-center">
          <Link 
            to="/about" 
            className="group relative overflow-hidden rounded-full border-2 border-white px-12 py-5 font-black uppercase tracking-[0.2em] text-sm transition-all duration-500 hover:border-white"
          >
            {/* 1. Initial Text */}
            <span className="inline-block text-white transition-transform duration-500 group-hover:-translate-y-[160%]">
              Explore Our Protocol
            </span>

            {/* 2. Hover Fill & Text */}
            <div className="absolute inset-0 bg-white translate-y-[100%] transition-transform duration-500 group-hover:translate-y-0"></div>
            <span className="absolute left-0 top-0 flex h-full w-full items-center justify-center text-[#C80000] font-black translate-y-[160%] transition-transform duration-500 group-hover:translate-y-0 italic">
              About Energica ↗
            </span>
          </Link>
        </div>

      </div>

      {/* Background Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/7/76/Noise.png")' }}></div>
    </div>
  );
};

export default AboutSection;