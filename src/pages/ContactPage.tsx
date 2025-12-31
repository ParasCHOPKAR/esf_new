import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

// --- 1. REUSABLE ANIMATION HELPERS ---
const revealVariants = {
    hidden: { y: "100%" },
    visible: (i: number) => ({
        y: "0%",
        transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1], delay: 0.05 * i }
    })
};

const MaskedText = ({ text, className = "" }: { text: string, className?: string }) => {
    const words = text.split(" ");
    return (
        <div className={`overflow-hidden ${className} flex flex-wrap gap-x-4`}>
            {words.map((word, i) => (
                <div key={i} className="overflow-hidden relative inline-block">
                    <motion.span
                        custom={i}
                        variants={revealVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="inline-block"
                    >
                        {word}
                    </motion.span>
                </div>
            ))}
        </div>
    );
};

const ContactPage = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    // --- 2. PAGE ENTRANCE ANIMATION (GSAP) ---
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            
            // 1. Page Reveal
            gsap.fromTo(containerRef.current, 
                { autoAlpha: 0 },
                { 
                    autoAlpha: 1, 
                    duration: 1, 
                    ease: "power2.out",
                    onComplete: () => ScrollTrigger.refresh()
                }
            );

            // 2. Form Input Stagger
            gsap.from(".contact-input", {
                y: 30,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: "power3.out",
                delay: 0.6
            });

            // 3. Map Reveal
            gsap.from(".map-container", {
                scale: 0.98,
                opacity: 0,
                duration: 1.5,
                ease: "expo.out",
                scrollTrigger: {
                    trigger: ".map-container",
                    start: "top 90%",
                }
            });

        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        /* UPDATED: ENERGICA BRAND RED BACKGROUND */
        <div ref={containerRef} className="bg-[#C80000] text-white min-h-screen pt-32 pb-20 px-6 md:px-12 overflow-hidden invisible" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            
            {/* NOISE OVERLAY */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.08] z-0 mix-blend-overlay" style={{ backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/7/76/Noise.png")' }}></div>

            <div className="max-w-7xl mx-auto relative z-10">

                {/* --- HEADER --- */}
                <div className="mb-24">
                    <motion.span 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-white font-mono tracking-[0.4em] text-xs uppercase font-black block mb-6 opacity-70"
                    >
                        // INITIATE PROTOCOL
                    </motion.span>
                    <h1 className="text-5xl md:text-9xl font-black uppercase leading-[0.85] tracking-tighter italic">
                        <MaskedText text="Architect The" />
                        <span className="block opacity-40 not-italic font-bold">
                             <MaskedText text="Future With Us." />
                        </span>
                    </h1>
                </div>

                {/* --- CONTENT GRID --- */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 mb-32">
                    
                    {/* LEFT: INFO */}
                    <div className="space-y-16">
                        <div>
                            <h3 className="text-[10px] font-mono text-white/50 uppercase tracking-[0.3em] mb-6 font-bold">Encrypted Details</h3>
                            <p className="text-2xl md:text-4xl font-black leading-none mb-4 italic tracking-tight">connect@solarbni.com</p>
                            <div className="space-y-2">
                                <p className="text-xl md:text-2xl text-white/80 font-medium tracking-tight">+91 77700 11558</p>
                                <p className="text-xl md:text-2xl text-white/80 font-medium tracking-tight">+91 77198 18283</p>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-[10px] font-mono text-white/50 uppercase tracking-[0.3em] mb-6 font-bold">Strategic HQ</h3>
                            <p className="text-xl md:text-3xl text-white leading-tight font-bold italic tracking-tighter uppercase">
                                Xion Mall, Hinjewadi,<br />
                                Pune, Maharashtra 411057
                            </p>
                        </div>

                        <div className="pt-10 border-t border-white/20">
                            <h3 className="text-[10px] font-mono text-white/50 uppercase tracking-[0.3em] mb-8 font-bold">Social Links</h3>
                            <div className="flex flex-wrap gap-8">
                                {["LinkedIn", "Twitter", "Instagram"].map((social, i) => (
                                    <a key={i} href="#" className="text-lg hover:italic hover:pl-2 transition-all duration-300 uppercase font-black tracking-widest border-b-2 border-white/10 hover:border-white">
                                        {social}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: FORM */}
                    <form className="space-y-10 bg-black/10 p-8 md:p-12 rounded-[2rem] border border-white/10 backdrop-blur-sm">
                        {["Name", "Email", "Subject"].map((label, i) => (
                            <div key={i} className="contact-input relative group">
                                <input 
                                    type={label === "Email" ? "email" : "text"} 
                                    placeholder={label.toUpperCase()}
                                    className="w-full bg-transparent border-b-2 border-white/20 py-4 text-xl font-bold focus:outline-none focus:border-white transition-all placeholder:text-white/20 text-white uppercase tracking-tighter"
                                />
                            </div>
                        ))}
                        
                        <div className="contact-input relative group">
                            <textarea 
                                rows={4}
                                placeholder="MESSAGE CONTENT"
                                className="w-full bg-transparent border-b-2 border-white/20 py-4 text-xl font-bold focus:outline-none focus:border-white transition-all placeholder:text-white/20 text-white uppercase tracking-tighter resize-none"
                            ></textarea>
                        </div>

                        <div className="contact-input pt-6">
                            <button className="w-full md:w-auto px-12 py-5 bg-white text-[#C80000] font-black uppercase tracking-[0.2em] italic text-sm hover:bg-black hover:text-white transition-all duration-500 rounded-full shadow-2xl">
                                Send Transmission ↗
                            </button>
                        </div>
                    </form>

                </div>

                {/* --- MAP SECTION --- */}
                <div className="map-container group w-full h-[600px] rounded-[3rem] overflow-hidden relative border-4 border-white shadow-2xl transition-all duration-700">
                    <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.355180907147!2d73.7313360751926!3d18.55800088254422!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bb0435f99217%3A0x633198031d8e1363!2sXion%20Mall!5e0!3m2!1sen!2sin!4v1709191000000!5m2!1sen!2sin"
                        width="100%" 
                        height="100%" 
                        className="w-full h-full border-0 filter grayscale brightness-[0.6] contrast-[1.2] transition-all duration-1000 group-hover:filter-none group-hover:brightness-100 group-hover:contrast-100"
                        allowFullScreen={true} 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Energica HQ Location"
                    ></iframe>
                    
                    {/* Brand Vignette */}
                    <div className="absolute inset-0 bg-[#C80000]/10 pointer-events-none mix-blend-multiply transition-opacity duration-700 group-hover:opacity-0"></div>
                </div>

            </div>
        </div>
    );
};

export default ContactPage;