import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

const InfoSection = () => {
  const container = useRef<HTMLDivElement>(null);
  
  const text = "A lender’s technical advisor plays a pivotal role in bridging the gap between technical feasibility and financial viability, ensuring that investments are sound and well-supported.";
  
  const words = text.split(" ");

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      gsap.from(".word", {
        opacity: 0.1, 
        y: 50,        
        rotationX: -90, 
        filter: "blur(10px)", 
        duration: 1.2,
        stagger: 0.05, 
        ease: "power4.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 70%", 
          end: "bottom 80%",
          scrub: 1, 
        }
      });

      gsap.from(".divider", {
        scaleX: 0,
        opacity: 0,
        duration: 1.5,
        ease: "expo.out",
        scrollTrigger: {
            trigger: container.current,
            start: "top 70%"
        }
      });

    }, container);

    return () => ctx.revert();
  }, []);

  const isHighlight = (word: string) => {
    const cleanWord = word.replace(/[.,]/g, "").toLowerCase();
    const highlights = ["pivotal", "feasibility", "viability", "sound", "investments"];
    return highlights.includes(cleanWord);
  }

  return (
    <div 
      ref={container} 
      // UPDATED: Background to #C80000 and border to a darker red shade
      className="bg-[#C80000] text-white min-h-[60vh] w-full flex flex-col justify-center items-center px-6 md:px-32 py-32 border-t border-red-800 relative overflow-hidden"
    >
      <div className="max-w-6xl text-center z-10 relative">
        
        {/* Label */}
        <div className="mb-12 overflow-hidden">
            <span className="divider inline-block text-white font-mono tracking-[0.3em] text-xs uppercase opacity-80">
                Expert Insight
            </span>
        </div>

        {/* The Rejouice Text Block */}
        <p className="text-3xl md:text-5xl lg:text-6xl font-medium leading-[1.2] md:leading-[1.3] text-white tracking-tight flex flex-wrap justify-center gap-x-3 gap-y-2">
          {words.map((word, index) => (
            <span 
                key={index} 
                // UPDATED: Highlights to white, standard words to a light semi-transparent white
                className={`word inline-block transform-gpu ${isHighlight(word) ? 'text-white font-bold' : 'text-white/60'}`}
            >
              {word}
            </span>
          ))}
        </p>

        {/* Bottom decorative line */}
        <div className="divider w-32 h-[2px] bg-white mx-auto mt-16 rounded-full opacity-50"></div>

      </div>
    </div>
  );
};

export default InfoSection;