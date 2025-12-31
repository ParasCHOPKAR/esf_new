import React, { useState, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

const faqData = [
  {
    question: "How can your consultancy help us understand the renewable energy market better?",
    answer: "We provide deep market intelligence and real-time renewable energy trends to help you stay ahead."
  },
  {
    question: "Do you offer leadership or team development support?",
    answer: "Yes—our programs strengthen leadership and help build cohesive teams across organizations."
  },
  {
    question: "How do you perform renewable asset due diligence?",
    answer: "Through technical, legal, and operational audits to evaluate investment risk and project viability."
  },
  {
    question: "Can you assist with contract negotiation and advisory?",
    answer: "We optimize terms and support negotiation strategy for clean energy procurement."
  },
  {
    question: "How do you improve operational efficiency in renewable projects?",
    answer: "We streamline operations using performance analysis, cost reduction, and optimization insights."
  }
];

const FAQSection = () => {
  const container = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".faq-reveal", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 75%",
        }
      });
    }, container);
    return () => ctx.revert();
  }, []);

  return (
    /* UPDATED: ENERGICA BRAND RED BACKGROUND */
    <div 
      ref={container} 
      className="bg-[#C80000] text-white min-h-screen w-full relative z-10 flex flex-col items-center justify-center p-6 md:p-20 overflow-hidden"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      {/* Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/7/76/Noise.png")' }} />

      <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-16 lg:gap-32 relative z-10">
        
        {/* LEFT SIDE: Brand Title */}
        <div className="lg:w-1/3 faq-reveal">
            <div className="sticky top-32">
                <span className="font-mono tracking-[0.4em] text-xs uppercase font-black opacity-60 mb-6 block">
                    // KNOWLEDGE BASE
                </span>
                <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-[0.9] mb-10">
                    Questions <br/> <span className="opacity-40 not-italic font-bold">Uncovered</span>
                </h2>
                <p className="text-white/80 text-xl font-medium leading-tight max-w-sm">
                    Anticipating your needs. We provide the technical clarity required before you take the next step in your energy transition.
                </p>
            </div>
        </div>

        {/* RIGHT SIDE: Accordion List */}
        <div className="lg:w-2/3 faq-reveal w-full">
            <div className="flex flex-col border-t-2 border-white">
                {faqData.map((item, index) => (
                    <div key={index} className="border-b border-white/20">
                        {/* Question Header */}
                        <button 
                            onClick={() => toggleAccordion(index)}
                            className={`w-full py-10 px-4 text-left flex justify-between items-center transition-all duration-500 ${activeIndex === index ? 'bg-black/10' : 'hover:bg-white/5'}`}
                        >
                            <h3 className={`text-xl md:text-3xl font-black uppercase tracking-tighter transition-all duration-500 ${activeIndex === index ? 'italic pl-4' : ''}`}>
                                {item.question}
                            </h3>
                            
                            {/* Animated Plus/Close Icon */}
                            <div className="relative w-8 h-8 flex-shrink-0 ml-4">
                                <span className={`absolute top-1/2 left-0 w-8 h-[3px] bg-white transition-transform duration-500 ${activeIndex === index ? 'rotate-45' : ''}`}></span>
                                <span className={`absolute top-1/2 left-0 w-8 h-[3px] bg-white transition-transform duration-500 ${activeIndex === index ? '-rotate-45' : 'rotate-90'}`}></span>
                            </div>
                        </button>

                        {/* Answer Body */}
                        <div 
                            className={`overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] ${activeIndex === index ? 'max-h-[300px] opacity-100 mb-8' : 'max-h-0 opacity-0'}`}
                        >
                            <div className="px-6 py-4 bg-black/5 rounded-xl border-l-4 border-white mx-4">
                                <p className="text-white text-lg md:text-2xl font-medium leading-snug">
                                    {item.answer}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

      </div>
    </div>
  );
};

export default FAQSection;