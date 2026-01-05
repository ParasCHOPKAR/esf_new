// src/components/about/OurImpact.tsx

import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';

// Ensure ScrollTrigger is registered
gsap.registerPlugin(ScrollTrigger);

const impactData = [
    { label: "projects delivered successfully", value: 7500, suffix: "+" },
    { label: "Associated partners", value: 5000, suffix: "+" },
    { label: "Established", value: 2015 },
    { label: "industry-trained specialists", value: 10000, suffix: "+" },
];

const OurImpact = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const counters = gsap.utils.toArray(".impact-value");

            counters.forEach((counter: any) => {
                const targetValue = parseInt(counter.dataset.target);

                // GSAP to animate the number value
                gsap.fromTo(counter, 
                    { innerText: 0 }, 
                    {
                        innerText: targetValue,
                        duration: 2.5,
                        ease: "power4.out",
                        snap: { innerText: 1 }, 
                        scrollTrigger: {
                            trigger: counter,
                            start: "top 85%",
                            toggleActions: "play none none reset",
                        },
                        onUpdate: function() {
                            counter.textContent = Math.round(this.targets()[0].innerText);
                        }
                    }
                );
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="bg-white text-[#C80000] py-16 md:py-32 px-4 md:px-20 overflow-hidden relative">
            
            {/* Subtle Noise Texture for depth on white background */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0" style={{ backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/7/76/Noise.png")' }}></div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header Section */}
                <span className="text-[#C80000] font-mono tracking-widest text-xs md:text-sm uppercase font-bold block mb-4">
                    Measurable Results
                </span>
                
                {/* Responsive Heading */}
                <h2 className="text-[10vw] md:text-8xl font-black uppercase leading-[0.9] mb-12 md:mb-20 text-[#C80000] break-words">
                    Our <span className="text-gray-300">Impact.</span>
                </h2>

                {/* Grid Layout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
                    {impactData.map((item, idx) => (
                        <div key={idx} className="flex flex-col border-l-2 border-[#C80000]/20 pl-6 py-4 md:h-40 justify-center group hover:border-[#C80000] transition-colors duration-500">
                            
                            <div className="flex items-baseline gap-1">
                                {/* Animated Number */}
                                <h3 
                                    className="impact-value text-5xl md:text-7xl font-black text-[#C80000] leading-none tabular-nums"
                                    data-target={item.value}
                                    data-suffix={item.suffix}
                                >
                                    0
                                </h3>
                                {/* Suffix separate to prevent jumpy animation */}
                                <span className="text-2xl md:text-3xl font-black text-[#C80000]/60">{item.suffix}</span>
                            </div>
                            
                            <p className="text-xs md:text-sm uppercase tracking-widest text-gray-500 mt-2 font-mono">
                                {item.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OurImpact;