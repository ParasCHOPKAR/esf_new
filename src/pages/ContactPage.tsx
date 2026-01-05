import React, { useLayoutEffect, useRef, useState } from 'react';
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
        <div className={`overflow-hidden ${className} flex flex-wrap gap-x-2`}>
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
    
    // --- FORM LOGIC ---
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        // We use lowerCase names to match your script: data.name, data.email, etc.
        setFormData({ ...formData, [e.target.name.toLowerCase()]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            // Updated to match your specific Script ID: AKfycby...
            const scriptURL = "https://script.google.com/macros/s/AKfycbygxr5hFGElzZ5LTRQgl9uqIJ2Nfy_nHB1odqQGeOJncWnthnQeqVZRnyKcrplbi757KA/exec";

            await fetch(scriptURL, {
                method: "POST",
                mode: "no-cors", // Required for cross-domain Google Script
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData), // Matches your JSON.parse in image_9d0625.png
            });

            // Since no-cors doesn't return a response, we assume success if the fetch doesn't throw
            setStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });
            alert("Data submitted successfully to ESF DATA sheet!");
        } catch (error) {
            console.error("Submission error:", error);
            setStatus('error');
            alert("Failed to send data.");
        }
    };

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(containerRef.current, 
                { autoAlpha: 0, y: 50 },
                { autoAlpha: 1, y: 0, duration: 1.2, ease: "power4.out" }
            );
            gsap.from(".contact-input", {
                y: 30, opacity: 0, duration: 1, stagger: 0.1, ease: "power3.out", delay: 0.5
            });
            gsap.from(".map-container", {
                scale: 0.95, opacity: 0, duration: 1.5, ease: "power4.out",
                scrollTrigger: { trigger: ".map-container", start: "top 85%" }
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="bg-white text-[#C80000] min-h-screen pt-32 pb-20 px-6 md:px-12 overflow-hidden invisible relative">
            <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0" style={{ backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/7/76/Noise.png")' }}></div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-20">
                    <motion.span 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-[#C80000] font-mono tracking-[0.2em] text-sm uppercase font-bold block mb-4"
                    >
                        Get In Touch
                    </motion.span>
                    <h1 className="text-5xl md:text-8xl font-black uppercase leading-[0.85] tracking-tighter text-[#C80000]">
                        <MaskedText text="Let's Build The" />
                        <span className="block opacity-40">
                             <MaskedText text="Future Together." />
                        </span>
                    </h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 mb-32">
                    <div className="space-y-12">
                        <div>
                            <h3 className="text-sm font-mono text-[#C80000]/60 uppercase tracking-widest mb-4">Contact Details</h3>
                            <p className="text-2xl md:text-3xl font-bold leading-tight mb-2 text-[#C80000]">connect@solarbni.com</p>
                            <p className="text-xl text-[#C80000]/70">+91 77700 11558</p>
                            <p className="text-xl text-[#C80000]/70">+91 77198 18283</p>
                        </div>

                        <div>
                            <h3 className="text-sm font-mono text-[#C80000]/60 uppercase tracking-widest mb-4">Headquarters</h3>
                            <p className="text-xl md:text-2xl text-[#C80000] leading-relaxed max-w-sm">
                                Xion Mall,<br />
                                Hinjewadi, Wakad Road,<br />
                                Pune, Maharashtra 411057
                            </p>
                        </div>

                        <div className="pt-8 border-t border-[#C80000]/20">
                            <h3 className="text-sm font-mono text-[#C80000]/60 uppercase tracking-widest mb-6">Socials</h3>
                            <div className="flex gap-8">
                                {["LinkedIn", "Twitter", "Instagram"].map((social, i) => (
                                    <a key={i} href="#" className="text-lg hover:opacity-60 transition-colors uppercase font-bold tracking-wider text-[#C80000]">
                                        {social}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    <form className="space-y-8" onSubmit={handleSubmit}>
                        {["Name", "Email", "Subject"].map((label, i) => (
                            <div key={i} className="contact-input relative group">
                                <input 
                                    required
                                    name={label} // Passes "Name", "Email", etc.
                                    value={formData[label.toLowerCase() as keyof typeof formData]}
                                    onChange={handleChange}
                                    type={label === "Email" ? "email" : "text"} 
                                    placeholder={label}
                                    className="w-full bg-transparent border-b border-[#C80000]/30 py-4 text-xl focus:outline-none focus:border-[#C80000] transition-colors placeholder:text-[#C80000]/40 text-[#C80000]"
                                />
                            </div>
                        ))}
                        
                        <div className="contact-input relative group">
                            <textarea 
                                required
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows={4}
                                placeholder="Message"
                                className="w-full bg-transparent border-b border-[#C80000]/30 py-4 text-xl focus:outline-none focus:border-[#C80000] transition-colors placeholder:text-[#C80000]/40 text-[#C80000] resize-none"
                            ></textarea>
                        </div>

                        <div className="contact-input pt-4">
                            <button 
                                type="submit"
                                disabled={status === 'loading'}
                                className="px-10 py-4 border border-[#C80000] text-[#C80000] font-bold uppercase tracking-widest hover:bg-[#C80000] hover:text-white transition-all duration-300 disabled:opacity-50"
                            >
                                {status === 'loading' ? 'Sending...' : 'Send Message'}
                            </button>
                        </div>
                    </form>
                </div>

                <div className="map-container group w-full h-[500px] rounded-3xl overflow-hidden relative border border-[#C80000]/10 transition-all duration-500 shadow-xl bg-gray-100">
                    <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m1m3!1d3781.564560416972!2d73.73887017519343!3d18.59367468251503!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bb016a7071e7%3A0x6b87693950b188c!2sXion%20Mall!5e0!3m2!1sen!2sin!4v1704460000000!5m2!1sen!2sin"
                        width="100%" 
                        height="100%" 
                        className="w-full h-full border-0 transition-all duration-700 grayscale group-hover:grayscale-0 opacity-80 group-hover:opacity-100"
                        allowFullScreen={true} 
                        loading="lazy" 
                        title="Energica Office Map"
                    ></iframe>
                    <div className="absolute inset-0 bg-[#C80000]/5 pointer-events-none transition-opacity duration-500 group-hover:opacity-0"></div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;