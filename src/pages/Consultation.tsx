import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// --- DATA SOURCE WITH BRAND ALIGNED IMAGES ---
const services = [
  {
    id: "01",
    title: "Project Consultation",
    subtitle: "Private & Government",
    // Corporate Office/Consultation view
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1600",
    desc: "Comprehensive advisory services ensuring policy compliance and technical excellence. We specialize in feasibility studies and end-to-end guidance.",
  },
  {
    id: "02",
    title: "Distressed Assets",
    subtitle: "Renewable Sector",
    // FIXED: Maintenance/Industrial Wind & Solar focus
 image: "https://images.unsplash.com/photo-1548337138-e87d889cc369?auto=format&fit=crop&q=80&w=1600",
    desc: "Strategic assessment and restructuring for underperforming projects. We conduct technical due diligence and implement financial revival strategies.",
  },
  {
    id: "03",
    title: "Infrastructure Dev",
    subtitle: "Large-Scale Execution",
    // FIXED: Large Scale Solar Park/Infrastructure view
  image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1600",
    desc: "End-to-end planning for massive initiatives including Solar Parks, high-capacity transmission, and public utility integration.",
  },
  {
    id: "04",
    title: "Energy Contracts",
    subtitle: "Legal & Technical",
    // Legal/Contractual documentation view
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=1600",
    desc: "Expert assistance in managing critical energy contracts. We handle EPC, O&M, and PPA agreements to ensure smooth execution.",
  },
  {
    id: "05",
    title: "Asset Revival",
    subtitle: "Optimization & Repowering",
    // Repowering/Technical repair view
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

      // 2. LIST ANIMATION
      const rows = gsap.utils.toArray<HTMLElement>(".service-row");
      rows.forEach((item) => {
        const line = item.querySelector(".separator");
        const content = item.querySelectorAll(".animate-content");
        const bgImg = item.querySelector(".row-bg-image");

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

        // Subtle Parallax
        gsap.to(bgImg, {
          yPercent: 15,
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

    return () => ctx.revert();
  }, []);

  return (
    /* UPDATED: Background to Energica Red */
    <div ref={container} className="bg-[#C80000] text-white min-h-screen relative z-10 overflow-hidden pt-24 md:pt-32 pb-20 px-4 sm:px-6 md:px-12 font-sans">
      
      {/* Background Noise Overlay for Texture */}
      <div className="absolute inset-0 opacity-[0.08] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/7/76/Noise.png")' }} />

      <div className="max-w-7xl mx-auto relative z-20">
        
        {/* --- HERO SECTION --- */}
        <div className="mb-24 md:mb-48">
          <h1 className="hero-line font-montserrat text-[10vw] sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-[0.9] mb-6 italic">
            Strategy <br/> 
            <span className="text-white drop-shadow-lg">
              & Solutions
            </span>
          </h1>
          <p className="hero-line text-base sm:text-xl md:text-2xl text-white/80 max-w-2xl font-medium leading-relaxed border-l-4 border-white pl-6 mt-8">
            Precision consulting for the solar ecosystem. We transform technical challenges into high-yield renewable infrastructure.
          </p>
        </div>

        {/* --- SERVICE LIST --- */}
        <div className="w-full relative">
          {services.map((service, index) => (
            <div key={index} className="service-row group relative py-16 md:py-24 cursor-pointer overflow-hidden border-b border-white/10">
              
              {/* Background Reveal: Shifts from Red to Image */}
              <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
                <div 
                  className="row-bg-image absolute inset-[-10%] w-[120%] h-[120%] bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-1000"
                  style={{ backgroundImage: `url(${service.image})` }}
                />
                {/* Brand Red Multiply Overlay */}
                <div className="absolute inset-0 bg-[#C80000]/60 mix-blend-multiply transition-colors duration-700" />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-700" />
              </div>

              {/* Animated Separator */}
              <div className="separator absolute top-0 left-0 w-full h-[2px] bg-white transition-all duration-500 z-10" />
              
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-16 items-center relative z-10">
                
                <div className="md:col-span-2 animate-content">
                  <span className="font-mono text-lg font-bold text-white/60 group-hover:text-white transition-all">
                    /{service.id}
                  </span>
                </div>

                <div className="md:col-span-6 animate-content">
                  <h2 className="font-montserrat text-4xl sm:text-5xl md:text-6xl font-black uppercase leading-none italic transition-all duration-500">
                    {service.title}
                  </h2>
                  <span className="block mt-4 font-mono text-xs tracking-[0.3em] text-white/70 uppercase">
                    [{service.subtitle}]
                  </span>
                </div>

                <div className="md:col-span-4 animate-content">
                  <p className="text-base text-white/90 font-medium leading-relaxed mb-6">
                    {service.desc}
                  </p>
                  
                  <div className="flex items-center gap-4 text-white group-hover:gap-8 transition-all duration-500">
                    <div className="h-[2px] w-8 bg-white group-hover:w-16 transition-all duration-500" />
                    <span className="text-xs font-black uppercase tracking-[0.2em]">View Details</span>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* --- CTA SECTION --- */}
        <div className="mt-40 bg-white text-[#C80000] rounded-[2rem] p-12 md:p-20 text-center relative overflow-hidden group">
            <h2 className="font-montserrat relative z-10 text-4xl md:text-7xl font-black uppercase tracking-tighter mb-10 italic">
                Empower Your <br/> <span className="">Solar Grid.</span>
            </h2>
            <button className="relative z-10 px-12 py-5 bg-[#C80000] text-white font-black uppercase tracking-widest rounded-full hover:scale-105 transition-all duration-500 border-2 border-transparent hover:border-white">
                Talk to an Expert
            </button>
        </div>

      </div>
    </div>
  );
};

export default Consultation;