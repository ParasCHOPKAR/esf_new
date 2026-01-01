import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
// 1. Import Link for navigation
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const container = useRef(null);
  const glowRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {

      // 1. Background Glow "Breathing" Animation (Subtle for white bg)
      gsap.to(glowRef.current, {
        scale: 1.2,
        opacity: 0.3,
        duration: 4,
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
        duration: 1,
        ease: "power4.out"
      });

      // 3. Grid Items Stagger
      tl.from(".grid-item", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out"
      }, "-=0.5");

      // 4. Cool Line Expansion Animation (The Borders)
      tl.fromTo(".expand-line",
        { width: 0 },
        { width: "100%", duration: 1, ease: "expo.out", stagger: 0.2 }
        , "-=0.5");

      // 5. Paragraph Fade In
      tl.from(".desc-text", {
        opacity: 0,
        y: 20,
        duration: 1,
        stagger: 0.2
      }, "-=0.8");

      // 6. Button Fade In
      tl.from(".cta-button", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.5");

    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={container} className="bg-white text-gray-900 min-h-[80vh] flex flex-col items-center justify-center px-6 md:px-20 py-20 relative overflow-hidden">

      {/* Decorative Green Glow - Adjusted for White BG visibility */}
      <div
        ref={glowRef}
        className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#C80000/5 rounded-full blur-[120px] pointer-events-none"
      ></div>

      <div className="max-w-6xl z-10 relative text-center mx-auto">
        <span className="main-title text-[#C80000] font-bold tracking-widest text-sm uppercase mb-4 block">
          About Us
        </span>

        <h2 className="main-title text-4xl md:text-6xl font-bold uppercase leading-tight mb-16 text-gray-900">
          Driving Success Through <br />
          <span className="text-gray-400">Innovation & Integrity.</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 text-left mb-16">

          {/* Column 1: Who We Are */}
          <div className="grid-item">
            <div className="w-fit mb-6">
              <h3 className="text-2xl font-bold uppercase text-gray-900 mb-2">
                Who We Are
              </h3>
              <div className="expand-line h-[2px] bg-[#C80000] w-full"></div>
            </div>

            <p className="desc-text text-gray-600 leading-relaxed text-lg">
              At <span className="text-gray-900 font-semibold">Energica Sustain Foundation</span>, we believe in a client-centric approach.
              <br /><br />
              Our team of seasoned experts combines industry knowledge with innovative thinking to deliver solutions that drive success. We are committed to maintaining the highest standards of professionalism and integrity.
            </p>
          </div>

          {/* Column 2: What We Do */}
          <div className="grid-item">
            <div className="w-fit mb-6">
              <h3 className="text-2xl font-bold uppercase text-gray-900 mb-2">
                What We Do
              </h3>
              <div className="expand-line h-[2px] bg-[#C80000] w-full"></div>
            </div>

            <p className="desc-text text-gray-600 leading-relaxed text-lg">
              We assess the technical aspects of projects to ensure they meet investment criteria. We evaluate feasibility, performance risks, and compliance with standards.
              <br /><br />
              By providing critical insights, we help lenders and clients make informed financing decisions and manage risks effectively throughout the project lifecycle.
            </p>
          </div>

        </div>

        {/* --- BUTTON --- */}
        <div className="cta-button flex justify-center">
          <Link 
            to="/about" 
            className="group relative overflow-hidden rounded-full border border-[#C800005] px-10 py-4 font-mono text-sm font-bold uppercase tracking-widest transition-all duration-300 hover:bg-[#C80000]"
          >
            {/* 1. Initial Text */}
            <span className="inline-block text-[#C80000] transition-transform duration-300 group-hover:-translate-y-[150%]">
              Get to know us
            </span>

            {/* 2. Hover Text */}
            <span className="absolute left-0 top-0 flex h-full w-full items-center justify-center text-white translate-y-[150%] transition-transform duration-300 group-hover:translate-y-0">
              About Us ↗
            </span>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default AboutSection;