import React, { forwardRef, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';

// IMPORT LOCAL IMAGES
import PowerConnection from "../assets/PowerConnection.avif";
import advise from "../assets/DistressedSolar.webp";
import land from "../assets/land.avif";
import contracts from "../assets/contracts.avif";

gsap.registerPlugin(ScrollTrigger);

const data = [
  {
    id: "01",
    title: "Distressed Assets",
    short: "Revival Strategies",
    desc: "Feasibility studies for reconstructing distressed assets. We assess market conditions, technical status, and financial viability to calculate ROI and minimize risks.",
    img: advise
  },
  {
    id: "02",
    title: "Infra Development",
    short: "Design & Execution",
    desc: "End-to-end execution from site selection to commissioning. We handle permits, construction, and technology installation for seamless renewable energy integration.",
    img: PowerConnection
  },
  {
    id: "03",
    title: "Land Procurement",
    short: "Site Selection",
    desc: "Strategic land acquisition near substations to minimize transmission costs. We ensure regulatory compliance and handle environmental impact assessments.",
    img: land
  },
  {
    id: "04",
    title: "Energy Contracts",
    short: "Drafting & Advisory",
    desc: "Expert drafting of CapEx and OpEx proposals. Our third-party consultation ensures thorough evaluation to optimize financial and operational decisions.",
    img: contracts
  }
];

const ContentSection = forwardRef<HTMLDivElement>((props, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  
  const [cursorImg, setCursorImg] = useState(data[0].img);
  const [activeId, setActiveId] = useState<string | null>(null);

  useLayoutEffect(() => {
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    const ctx = gsap.context(() => {
      
      // 1. Header Animation
      gsap.from(".section-header-title", {
        y: 30, opacity: 0, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 80%" }
      });

      // 2. Initial Fade In
      gsap.from(".service-item", {
        y: 50, opacity: 0, duration: 1, stagger: 0.1,
        scrollTrigger: { trigger: containerRef.current, start: "top 75%" }
      });

      // 3. Mouse Follower
      if (isDesktop && cursorRef.current) {
        gsap.set(cursorRef.current, { xPercent: -50, yPercent: -50 });
        const xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.3, ease: "power3" });
        const yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.3, ease: "power3" });

        const moveCursor = (e: MouseEvent) => {
          if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            xTo(e.clientX - rect.left);
            yTo(e.clientY - rect.top);
          }
        };

        const containerEl = containerRef.current;
        if (containerEl) containerEl.addEventListener("mousemove", moveCursor);
        return () => { if (containerEl) containerEl.removeEventListener("mousemove", moveCursor); };
      }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleMouseEnter = (img: string, rowId: string) => {
    if (window.innerWidth > 768) {
      setCursorImg(img);
      setActiveId(rowId); 
      gsap.to(cursorRef.current, { scale: 1, opacity: 1, duration: 0.3 });
      gsap.to(`.service-item-${rowId} .title`, { x: 20, duration: 0.3 });
      gsap.to(`.service-item-${rowId} .arrow`, { opacity: 1, x: 0, duration: 0.3 });
    }
  };

  const handleMouseLeave = (rowId: string) => {
    if (window.innerWidth > 768) {
      setActiveId(null);
      gsap.to(cursorRef.current, { scale: 0, opacity: 0, duration: 0.3 });
      gsap.to(`.service-item-${rowId} .arrow`, { opacity: 0, x: -20, duration: 0.3 });
    }
  };

  return (
    <div ref={ref} className="bg-white text-gray-800 min-h-screen relative py-12 md:py-20 overflow-hidden md:cursor-none">
      
      {/* FLOATING CURSOR IMAGE */}
      <div 
        ref={cursorRef}
        className="hidden md:block absolute top-0 left-0 w-[280px] h-[180px] pointer-events-none z-10 rounded-xl overflow-hidden opacity-0 scale-0 shadow-2xl border-2 border-white/50"
      >
        <img src={cursorImg} alt="Preview" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gray-900/10"></div>
      </div>

      <div ref={containerRef} className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 relative">
        
        {/* HEADER - FIXED TO ONE LINE AND RED/GRAY */}
        <div className="mb-12 md:mb-20 border-b border-gray-100 pb-6 md:pb-10 relative z-20">
            <span className="text-[#C80000] font-mono tracking-widest text-xs md:text-sm uppercase font-bold block mb-2">
                Our Expertise
            </span>
            <h2 className="section-header-title text-[8vw] md:text-8xl font-black uppercase tracking-tighter leading-none text-[#C80000] whitespace-nowrap overflow-hidden">
                Advisory <span className="text-gray-300">Services</span>
            </h2>
        </div>

        {/* LIST */}
        <div className="flex flex-col relative z-20">
            {data.map((item, idx) => (
                <div 
                    key={idx}
                    className={`service-item service-item-${idx} group relative border-b border-gray-100 py-6 md:py-12 transition-colors duration-300
                      ${activeId === idx.toString() ? 'bg-gray-50/50' : 'bg-transparent'} cursor-pointer`}
                    onMouseEnter={() => handleMouseEnter(item.img, idx.toString())}
                    onMouseLeave={() => handleMouseLeave(idx.toString())}
                    onClick={() => setActiveId(activeId === idx.toString() ? null : idx.toString())}
                >
                    <div className="flex flex-col md:flex-row items-start md:items-baseline justify-between gap-4 md:gap-6 relative z-30 pointer-events-none">
                        
                        <div className="flex items-baseline gap-4 md:gap-8 md:w-1/2 w-full">
                            <span className={`font-mono text-lg md:text-xl transition-colors ${activeId === idx.toString() ? 'text-[#C80000]' : 'text-gray-300'}`}>/{item.id}</span>
                            <h3 className={`title text-2xl sm:text-3xl md:text-5xl font-black uppercase transition-all duration-300 
                              ${activeId === idx.toString() ? 'text-[#C80000] translate-x-2' : 'text-gray-600'}`}>
                                {item.title}
                            </h3>
                        </div>

                        <div className="flex items-center gap-4 md:w-1/2 justify-between w-full pl-10 md:pl-0">
                            <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-gray-400 font-bold">
                                {item.short}
                            </span>
                            <span className={`arrow text-[#C80000] text-2xl md:text-3xl transition-all ${activeId === idx.toString() ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
                                ↗
                            </span>
                        </div>
                    </div>

                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${activeId === idx.toString() ? 'max-h-[500px] opacity-100 mt-6' : 'max-h-0 opacity-0'}`}>
                        <div className="pl-0 md:pl-[120px] max-w-2xl">
                            <p className="text-sm md:text-lg text-gray-500 leading-relaxed font-medium">
                                {item.desc}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
});

export default ContentSection;