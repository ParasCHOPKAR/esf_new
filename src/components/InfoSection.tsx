import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

const InfoSection = () => {
  const container = useRef<HTMLDivElement>(null);
  
  // The specific brand-aligned insight text
  const text = "A lender’s technical advisor plays a pivotal role in bridging the gap between technical feasibility and financial viability, ensuring that investments are sound and well-supported.";
  
  // Split text into words for the staggered reveal animation
  const words = text.split(" ");

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      // Target all elements with class 'word' for the Rejouice-style reveal
      gsap.from(".word", {
        opacity: 0,
        y: 40,        // Slide up from below
        rotationX: -45, // Subtle 3D tilt
        filter: "blur(12px)", // Start blurry for a cinematic entrance
        duration: 1.5,
        stagger: 0.08, // Stagger delay for the fluid reading effect
        ease: "power4.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%", 
          end: "bottom 80%",
          scrub: 1.5, // Linked to scroll for a premium, controlled feel
        }
      });

      // Animate the decorative divider lines
      gsap.from(".divider-line", {
        scaleX: 0,
        opacity: 0,
        duration: 2,
        ease: "expo.out",
        scrollTrigger: {
            trigger: container.current,
            start: "top 75%"
        }
      });

    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={container} 
      /* UPDATED: ENERGICA BRAND RED BACKGROUND */
      className="bg-[#C80000] text-white min-h-[70vh] w-full flex flex-col justify-center items-center px-6 md:px-32 py-40 relative overflow-hidden"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      {/* Background Noise Texture for a premium editorial look */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/7/76/Noise.png")' }}></div>

      <div className="max-w-6xl text-center z-10 relative">
        
        {/* Top Label */}
        <div className="mb-14 overflow-hidden">
            <span className="divider-line inline-block text-white font-mono tracking-[0.4em] text-xs uppercase font-black opacity-60">
                // STRATEGIC INSIGHT
            </span>
        </div>

        {/* The Animated Text Block: Montserrat Black Italic */}
        <p className="text-3xl md:text-5xl lg:text-7xl font-black italic leading-[1.1] text-white tracking-tighter flex flex-wrap justify-center gap-x-4 gap-y-3">
          {words.map((word, index) => (
            <span 
                key={index} 
                className="word inline-block transform-gpu will-change-[transform,opacity,filter]"
            >
              {word}
            </span>
          ))}
        </p>

        {/* Bottom decorative brand line */}
        <div className="divider-line w-24 h-[4px] bg-white mx-auto mt-20 rounded-full"></div>

      </div>
    </div>
  );
};

export default InfoSection;