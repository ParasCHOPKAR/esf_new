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
      gsap.to(`.service-item-${rowId} .title`, { x: 20, color: "#ffffff", duration: 0.3 });
      gsap.to(`.service-item-${rowId} .arrow`, { opacity: 1, x: 0, duration: 0.3 });
    }
  };

  const handleMouseLeave = (rowId: string) => {
    if (window.innerWidth > 768) {
      setActiveId(null);
      gsap.to(cursorRef.current, { scale: 0, opacity: 0, duration: 0.3 });
      gsap.to(`.service-item-${rowId} .title`, { x: 0, color: "rgba(255,255,255,0.9)", duration: 0.3 });
      gsap.to(`.service-item-${rowId} .arrow`, { opacity: 0, x: -20, duration: 0.3 });
    }
  };

  const handleClick = (rowId: string) => {
    if (window.innerWidth <= 768) {
      setActiveId(prev => prev === rowId ? null : rowId);
    }
  };

  return (
    // UPDATED: BRAND RED BACKGROUND
    <div ref={ref} className="bg-[#C80000] text-white min-h-screen relative py-12 md:py-24 overflow-hidden md:cursor-none" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      
      {/* 1. FLOATING CURSOR IMAGE */}
      <div 
        ref={cursorRef}
        className="hidden md:block absolute top-0 left-0 w-[320px] h-[200px] pointer-events-none z-50 rounded-xl overflow-hidden opacity-0 scale-0 shadow-[0_20px_50px_rgba(0,0,0,0.3)] border-4 border-white"
      >
        <img src={cursorImg} alt="Service Preview" className="w-full h-full object-cover" />
      </div>

      <div ref={containerRef} className="max-w-7xl mx-auto px-6 md:px-10 relative">
        
        {/* HEADER */}
        <div className="mb-16 md:mb-24 border-b border-white/20 pb-10 relative z-20">
            <span className="text-white font-mono tracking-[0.3em] text-xs md:text-sm uppercase font-black block mb-4 opacity-70">
                // OUR EXPERTISE
            </span>
            <h2 className="section-header-title text-[10vw] md:text-8xl font-black uppercase tracking-tighter leading-[0.85] text-white italic">
                Advisory <span className="opacity-30 not-italic">Services</span>
            </h2>
        </div>

        {/* LIST */}
        <div className="flex flex-col relative z-20">
            {data.map((item, idx) => (
                <div 
                    key={idx}
                    onClick={() => handleClick(idx.toString())} 
                    className={`service-item service-item-${idx} group relative border-b border-white/10 py-8 md:py-14 transition-all duration-500
                      ${activeId === idx.toString() ? 'bg-white/5' : 'bg-transparent'} 
                      cursor-pointer`}
                    onMouseEnter={() => handleMouseEnter(item.img, idx.toString())}
                    onMouseLeave={() => handleMouseLeave(idx.toString())}
                >
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-30 pointer-events-none">
                        
                        {/* Number & Title */}
                        <div className="flex items-center gap-6 md:gap-12 md:w-2/3 w-full">
                            <span className={`font-mono text-lg md:text-2xl transition-opacity duration-300 ${activeId === idx.toString() ? 'opacity-100' : 'opacity-40'}`}>
                                0{idx + 1}
                            </span>
                            <h3 className={`title text-3xl sm:text-4xl md:text-6xl font-black uppercase transition-all duration-500 italic tracking-tighter
                              ${activeId === idx.toString() ? 'text-white translate-x-4' : 'text-white/80'}`}>
                                {item.title}
                            </h3>
                        </div>

                        {/* Short Desc & Arrow */}
                        <div className="flex items-center gap-4 md:w-1/3 justify-between w-full pl-12 md:pl-0">
                            <span className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-white font-bold bg-black/20 px-3 py-1 rounded-full border border-white/10">
                                {item.short}
                            </span>
                            <span className={`md:hidden text-2xl transition-transform duration-300 ${activeId === idx.toString() ? 'rotate-90' : ''}`}>
                                →
                            </span>
                            <span className="arrow text-white text-3xl md:text-4xl opacity-0 transform -translate-x-6 transition-all hidden md:block">
                                ↗
                            </span>
                        </div>
                    </div>

                    {/* Expandable Details */}
                    <div 
                      className={`overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] relative z-30 
                      ${activeId === idx.toString() ? 'max-h-[800px] opacity-100 mt-8' : 'max-h-0 opacity-0 mt-0'}`}
                    >
                        <div className="pt-4 md:pt-8 pl-0 md:pl-24 max-w-4xl">
                            {/* MOBILE IMAGE */}
                            <div className="block md:hidden w-full h-[250px] mb-6 rounded-xl overflow-hidden shadow-xl border-2 border-white/20">
                              <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                            </div>

                            <p className="text-lg md:text-2xl text-white/90 leading-tight font-medium tracking-tight">
                                {item.desc}
                            </p>
                            
                            <div className="mt-8 flex gap-4">
                                <div className="h-[2px] w-12 bg-white self-center"></div>
                                <span className="text-xs font-black tracking-widest uppercase">Explore protocol</span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>

      </div>

      {/* Background Ambience Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/7/76/Noise.png")' }}></div>
    </div>
  );
});

export default ContentSection;