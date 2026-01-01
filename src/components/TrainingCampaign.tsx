import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// --- DATA SOURCE WITH IMAGES ---
const solarTech = [
  {
    title: "Current Technology",
    image: "/images/off_grid_system.avif",
    desc: "Modern solar uses high-efficiency mono/bifacial modules, microinverters, hybrid inverters, lithium batteries, smart monitoring, AI-based maintenance and IoT-enabled energy management.",
    tags: ["Mono/Bifacial", "AI Maintenance", "IoT"]
  },
  {
    title: "Grid-Tied System",
    image: "/images/grid-tie-system-shut-down.jpg",
    desc: "Solar system connected directly to the utility grid; no batteries; excess energy exported. Ideal for homes/industries wanting reduced bills through net metering.",
    tags: ["Net Metering", "Zero Battery"]
  },
  {
    title: "Off-Grid System",
    image: "/images/Cover-Image-2.jpg",
    desc: "Standalone solar setup with batteries; works without grid; provides backup in remote/rural areas where grid supply is weak or unavailable.",
    tags: ["Battery Backup", "Remote Access"]
  }
];

const newTech = [
  {
    title: "Hybrid Inverters",
    image: "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?auto=format&fit=crop&q=80&w=1200",
    desc: "Combine solar + grid + battery functionality. Allow backup, peak shaving, smart energy management and work in both on-grid and off-grid modes."
  },
  {
    title: "Microinverters",
    image: "https://images.unsplash.com/photo-1592833159155-c62df1b65634?auto=format&fit=crop&q=80&w=1200",
    desc: "Module-level inverters installed behind each panel. Improve efficiency, eliminate string losses, enhance safety (no high DC voltage) and offer panel-wise monitoring."
  },
  {
    title: "Lithium-ion Batteries",
    image: "https://images.unsplash.com/photo-1595246140625-573b715d11dc?auto=format&fit=crop&q=80&w=1200",
    desc: "Advanced storage with long life, high efficiency, fast charging, deep cycle capability, and compact size. Ideal for hybrid and off-grid systems."
  }
];

const capacityBuilding = [
  {
    title: "Sustainability",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=1200",
    desc: "Emphasis on eco-friendly practices, renewable energy adoption, waste reduction, resource optimization, and long-term environmental responsibility."
  },
  {
    title: "Administration",
    image: "/images/administration.jpg",
    desc: "Improving organizational workflows, documentation, communication systems, coordination processes, and overall operational management."
  },
  {
    title: "Accounting",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=1200",
    desc: "Training in financial management, budgeting, bookkeeping, auditing, compliance, and digital accounting tools for transparent operations."
  }
];

const TrainingCampaign = () => {
  const container = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. HERO TEXT DECODE EFFECT
      gsap.from(".hero-char", {
        opacity: 0,
        y: 50,
        rotateX: 90,
        stagger: 0.02,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: { trigger: container.current, start: "top 80%" }
      });

      // 2. THE "CIRCUIT LINE" DRAWING ANIMATION
      gsap.utils.toArray<HTMLElement>(".circuit-line").forEach(line => {
        gsap.fromTo(line, 
          { scaleX: 0, transformOrigin: "left" },
          { 
            scaleX: 1, 
            duration: 1.5, 
            ease: "expo.out",
            scrollTrigger: { trigger: line, start: "top 85%" }
          }
        );
      });

      // 3. TEXT REVEAL & IMAGE PARALLAX STAGGER
      gsap.utils.toArray<HTMLElement>(".spec-row").forEach(row => {
        gsap.from(row.querySelectorAll(".spec-content"), {
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: row, start: "top 85%" }
        });
      });

    }, container);

    const timer = setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => { ctx.revert(); clearTimeout(timer); };
  }, []);

  return (
    <div ref={container} className="bg-white text-gray-900 min-h-screen relative z-10 overflow-hidden py-24 px-4 md:px-12 font-sans selection:bg-[#C80000] selection:text-white">
      
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05]" 
           style={{ backgroundImage: `linear-gradient(to right, #000000 1px, transparent 1px), linear-gradient(to bottom, #000000 1px, transparent 1px)`, backgroundSize: '40px 40px' }}>
      </div>

      <div className="max-w-7xl mx-auto relative z-20">

        {/* --- HERO SECTION --- */}
        <div className="mb-32 md:mb-48 pt-10">
          <div className="flex flex-col border-l border-[#C80000]/50 pl-6 md:pl-10">
            <span className="hero-char font-mono text-[#C80000] text-sm tracking-[0.2em] mb-4 block">
              // EDUCATIONAL_MODULES_V.2.0
            </span>
            <h1 className="text-5xl md:text-8xl font-black uppercase leading-[0.9] tracking-tighter mb-8">
              Training <br/> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-400">Campaigns</span>
            </h1>
            <p className="hero-char text-lg md:text-xl text-gray-600 max-w-2xl leading-relaxed">
              Empowering the next generation of energy integrators through advanced technical workshops, policy framework analysis, and hands-on operational training.
            </p>
          </div>
        </div>

        {/* --- SECTION 1: SOLAR TECH --- */}
        <div className="mb-40">
          <div className="flex items-end justify-between mb-12">
            <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight">Current <span className="text-[#C80000]">Technology</span></h2>
            <span className="hidden md:block font-mono text-gray-400">01 / 03</span>
          </div>

          <div className="border-t border-gray-200">
            {solarTech.map((item, idx) => (
              <div key={idx} className="spec-row group relative border-b border-gray-100 overflow-hidden transition-all duration-700">
                {/* Background Image Reveal on Hover - INCREASED OPACITY FOR CLARITY */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-30 group-hover:scale-105 transition-all duration-1000 bg-cover bg-center pointer-events-none"
                  style={{ backgroundImage: `url(${item.image})` }}
                />
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-10 lg:py-16 relative z-10 px-2 lg:px-6">
                  <div className="spec-content lg:col-span-1 font-mono text-[#C80000]/60 text-sm">{`0${idx + 1}`}</div>
                  <div className="spec-content lg:col-span-4">
                    <h3 className="text-2xl md:text-4xl font-bold uppercase group-hover:translate-x-4 transition-transform duration-500 text-gray-900">
                      {item.title}
                    </h3>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.tags.map((tag, t) => (
                        <span key={t} className="text-[10px] font-mono border border-gray-200 px-2 py-1 text-gray-500 group-hover:border-[#C80000] group-hover:text-[#C80000]">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className="spec-content lg:col-span-6 lg:col-start-7">
                    <p className="text-gray-600 text-lg leading-relaxed group-hover:text-gray-900 transition-colors duration-300">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- SECTION 2: NEW TECH --- */}
        <div className="mb-40">
          <div className="flex items-end justify-between mb-12">
            <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight">New <span className="text-[#C80000]">Integrations</span></h2>
            <span className="hidden md:block font-mono text-gray-400">02 / 03</span>
          </div>

          <div className="relative">
            <div className="hidden lg:block absolute left-[30%] top-0 bottom-0 w-px bg-gray-100"></div>
            {newTech.map((item, idx) => (
              <div key={idx} className="spec-row relative py-12 group">
                <div className="circuit-line absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#C80000] to-transparent opacity-30"></div>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                  <div className="spec-content lg:col-span-3 lg:text-right">
                    <h3 className="text-xl md:text-2xl font-bold uppercase text-[#C80000] group-hover:brightness-75 transition-all">{item.title}</h3>
                  </div>
                  <div className="hidden lg:flex lg:col-span-1 justify-center relative">
                    <div className="w-3 h-3 bg-white border border-[#C80000] rounded-full z-10 group-hover:scale-150 transition-transform"></div>
                  </div>
                  <div className="spec-content lg:col-span-8 flex flex-col md:flex-row gap-6 items-center">
                    <p className="text-gray-600 text-lg font-light leading-relaxed flex-1">{item.desc}</p>
                    {/* Small Image Preview - REMOVED GRAYSCALE FOR CLARITY */}
                    <div className="w-full md:w-32 h-20 overflow-hidden rounded border border-gray-100 group-hover:border-[#C80000]/50 transition-all">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- SECTION 3: CAPACITY BUILDING --- */}
        <div className="mb-40">
           <div className="flex items-end justify-between mb-20">
            <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight">Capacity <span className="text-gray-400">Building</span></h2>
            <span className="hidden md:block font-mono text-gray-400">03 / 03</span>
          </div>

          <div className="space-y-20">
            {capacityBuilding.map((item, idx) => (
              <div key={idx} className="spec-row group relative">
                <div className="flex flex-col md:flex-row gap-6 md:items-baseline relative z-10">
                  <div className="spec-content md:w-1/4">
                    <span className="text-6xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-gray-200 to-transparent group-hover:from-[#C80000]/40 transition-all duration-700">
                      0{idx + 1}
                    </span>
                  </div>
                  <div className="spec-content md:w-3/4 border-l border-gray-100 pl-6 md:pl-10 group-hover:border-[#C80000] transition-colors duration-500">
                    <h3 className="text-2xl md:text-5xl font-bold uppercase mb-4 text-gray-900 group-hover:tracking-widest transition-all duration-500">{item.title}</h3>
                    <p className="text-gray-500 text-xl leading-relaxed max-w-2xl group-hover:text-gray-700">
                      {item.desc}
                    </p>
                  </div>
                </div>
                {/* Large Background Image reveal - INCREASED OPACITY FOR CLARITY */}
                <div 
                  className="absolute right-0 top-0 w-1/3 h-full opacity-0 group-hover:opacity-60 translate-x-10 group-hover:translate-x-0 transition-all duration-1000 pointer-events-none"
                  style={{ 
                    backgroundImage: `url(${item.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    maskImage: 'linear-gradient(to left, black, transparent)'
                  }}
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default TrainingCampaign;