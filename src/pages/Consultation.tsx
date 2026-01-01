import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// --- DATA SOURCE WITH HIGH-RES IMAGES ---
const services = [
  {
    id: "01",
    title: "Project Consultation",
    subtitle: "Private & Government",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1600",
    desc: "Comprehensive advisory services ensuring policy compliance and technical excellence. We specialize in feasibility studies and end-to-end guidance.",
  },
  {
    id: "02",
    title: "Distressed Assets",
    subtitle: "Renewable Sector",
    image: "https://images.unsplash.com/photo-1548337138-e87d889cc369?auto=format&fit=crop&q=80&w=1600",
    desc: "Strategic assessment and restructuring for underperforming projects. We conduct technical due diligence and implement financial revival strategies.",
  },
  {
    id: "03",
    title: "Infrastructure Dev",
    subtitle: "Large-Scale Execution",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1600",
    desc: "End-to-end planning for massive initiatives including Solar Parks, high-capacity transmission, and public utility integration.",
  },
  {
    id: "04",
    title: "Energy Contracts",
    subtitle: "Legal & Technical",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=1600",
    desc: "Expert assistance in managing critical energy contracts. We handle EPC, O&M, and PPA agreements to ensure smooth execution.",
  },
  {
    id: "05",
    title: "Asset Revival",
    subtitle: "Optimization & Repowering",
    image: "https://images.unsplash.com/photo-1548337138-e87d889cc369?auto=format&fit=crop&q=80&w=1600",
    desc: "Technical solutions to bring defunct assets back to operation, focusing on repowering and performance optimization.",
  }
];

const Consultation = () => {
  const container = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. HERO ANIMATION
      gsap.from(".hero-line", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power4.out"
      });

      // 2. LIST ANIMATION (Entrance & Hover Logic)
      const rows = gsap.utils.toArray<HTMLElement>(".service-row");
      rows.forEach((item) => {
        const line = item.querySelector(".separator");
        const content = item.querySelectorAll(".animate-content");
        const bgImg = item.querySelector(".row-bg-image");

        // Entrance Stagger
        const rowTl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        });

        rowTl.fromTo(line, 
          { scaleX: 0, transformOrigin: "left" }, 
          { scaleX: 1, duration: 1.5, ease: "expo.out" }
        )
        .from(content, {
          y: 40,
          opacity: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out"
        }, "-=1");

        // Parallax Effect on background image when scrolling
        gsap.to(bgImg, {
          yPercent: 20,
          ease: "none",
          scrollTrigger: {
            trigger: item,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      });

    }, container);

    const timer = setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => { ctx.revert(); clearTimeout(timer); };
  }, []);

  return (
    <div ref={container} className="bg-white text-gray-900 min-h-screen relative z-10 overflow-hidden pt-24 md:pt-32 pb-20 px-4 sm:px-6 md:px-12 font-sans">
      
      {/* Background Ambience (Subtle Gray/Red gradients) */}
      <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-gray-50 to-transparent pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-multiply" style={{ backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/7/76/Noise.png")' }} />

      <div className="max-w-7xl mx-auto relative z-20">
        
        {/* --- HERO SECTION --- */}
        <div className="mb-24 md:mb-48">
          <h1 className="hero-line text-[10vw] sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-[0.9] mb-6 text-gray-900">
            Consultation <br/> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C80000] to-red-900">
              & Strategy
            </span>
          </h1>
          <p className="hero-line text-base sm:text-xl md:text-2xl text-gray-500 max-w-2xl font-light leading-relaxed border-l-2 border-[#C80000] pl-6 mt-8">
            Expert advisory services for private & government sectors. We turn complex energy challenges into streamlined, profitable infrastructure.
          </p>
        </div>

        {/* --- SERVICE LIST --- */}
        <div className="w-full relative">
          {services.map((service, index) => (
            <div key={index} className="service-row group relative py-16 md:py-28 cursor-pointer overflow-hidden">
              
              {/* Background Reveal Logic - Made Clearer by using higher base opacity and lower gray tint */}
              <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out">
                <div 
                  className="row-bg-image absolute inset-[-20%] w-[140%] h-[140%] bg-cover bg-center grayscale-[0.5] group-hover:grayscale-0 transition-all duration-1000"
                  style={{ backgroundImage: `url(${service.image})` }}
                />
                {/* Light Overlay to keep text readable on white bg */}
                <div className="absolute inset-0 bg-white/90 group-hover:bg-white/70 transition-colors duration-700" />
              </div>

              {/* Animated Separator */}
              <div className="separator absolute top-0 left-0 w-full h-[1px] bg-gray-200 group-hover:bg-[#C80000] transition-colors duration-500 z-10" />
              
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-16 items-center relative z-10">
                
                {/* Column 1: Index */}
                <div className="md:col-span-2 animate-content">
                  <span className="service-id block text-lg font-mono text-[#C80000] group-hover:tracking-[0.5em] transition-all duration-500">
                    /{service.id}
                  </span>
                </div>

                {/* Column 2: Title */}
                <div className="md:col-span-6 animate-content">
                  <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold uppercase leading-none text-gray-900 group-hover:italic transition-all duration-500">
                    {service.title}
                  </h2>
                  <span className="block mt-4 font-mono text-xs tracking-[0.3em] text-gray-400 uppercase group-hover:text-gray-600 transition-colors">
                    [{service.subtitle}]
                  </span>
                </div>

                {/* Column 3: Description */}
                <div className="md:col-span-4 animate-content">
                  <p className="text-base text-gray-500 font-light leading-relaxed mb-6 group-hover:text-gray-900 transition-colors">
                    {service.desc}
                  </p>
                  
                  <div className="flex items-center gap-4 text-[#C80000] group-hover:gap-8 transition-all duration-500">
                    <div className="h-px w-8 bg-[#C80000] group-hover:w-16 transition-all duration-500" />
                    <span className="text-xs font-bold uppercase tracking-[0.2em]">View Case Study</span>
                  </div>
                </div>

              </div>
            </div>
          ))}
          {/* Bottom border for the last item */}
          <div className="w-full h-[1px] bg-gray-200" />
        </div>

        {/* --- CTA SECTION --- */}
        <div className="mt-40 bg-gray-50 rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden group border border-gray-100 shadow-sm">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#C80000]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            
            <h2 className="relative z-10 text-4xl md:text-7xl font-bold uppercase tracking-tighter mb-10 text-gray-900">
                Let's Build the <br/> <span className="text-[#C80000]">Green Grid.</span>
            </h2>
            
            <button className="relative z-10 px-10 py-5 bg-[#C80000] text-white font-black uppercase tracking-widest rounded-full hover:bg-gray-900 transition-all duration-500 shadow-xl shadow-red-100">
                Contact Strategy Team
            </button>
        </div>

      </div>
    </div>
  );
};

export default Consultation;