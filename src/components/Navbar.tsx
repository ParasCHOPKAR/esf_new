import React, { useState, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/Energica.png';

const navItems = [
    { name: "About Us", id: "about", path: "/about" },
    { name: "Awareness Campaigns", id: "schemes" , path:"/awarenesscompaign" },
    { name: "Training Campaigns", id: "training",path:"/Training" },
    { name: "Consultation", id: "consultation",path:"/consultation" },
    { name: "Contact Us", id: "contact", path: "/contact" } 
];

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isHidden, setIsHidden] = useState(false); 
    const menuRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);

    const navigate = useNavigate();
    const location = useLocation();
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() || 0;
        if (latest < 50) setIsHidden(false);
        else if (latest > previous && latest > 50) setIsHidden(true);
        else if (latest < previous) setIsHidden(false);
    });

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Master Timeline for Menu Open
            const tl = gsap.timeline({
                paused: true,
                defaults: { duration: 1, ease: "expo.inOut" }
            });

            tl.to(menuRef.current, {
                x: 0,
                opacity: 1,
                visibility: "visible",
            })
            .from(".menu-link-item", {
                y: 80,
                rotate: 5,
                opacity: 0,
                stagger: 0.1,
                duration: 1.2,
                ease: "expo.out"
            }, "-=0.6")
            .from(".brand-info", {
                opacity: 0,
                y: 20,
                duration: 0.8
            }, "-=0.8");

            (menuRef.current as any).animation = tl;
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const toggleMenu = () => {
        const tl = (menuRef.current as any)?.animation;
        if (tl) {
            if (!isOpen) {
                gsap.set(menuRef.current, { x: "100%", opacity: 0 });
                tl.play();
            } else {
                tl.reverse();
            }
        }
        setIsOpen(!isOpen);
    };

    const navigateTo = (path?: string, id?: string, shouldToggle = true) => {
        if (shouldToggle) toggleMenu();

        setTimeout(() => {
            if (path) navigate(path);
            if (id && location.pathname === "/" && path === "/") {
                const el = document.getElementById(id);
                if (el) el.scrollIntoView({ behavior: "smooth" });
            } else {
                window.scrollTo(0, 0);
            }
        }, 800); // Slightly longer for smooth exit
    };

    return (
        <div ref={containerRef} style={{ fontFamily: "'Montserrat', sans-serif" }}>
            <motion.nav 
                className="fixed top-0 left-0 w-full z-[120] flex justify-between items-center px-6 md:px-10 py-4 bg-transparent text-white"
                variants={{
                    visible: { y: 0, opacity: 1 },
                    hidden: { y: -20, opacity: 0 },
                }}
                animate={isHidden ? "hidden" : "visible"}
                transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
            >
                {/* Logo */}
                <motion.div
                    onClick={() => navigateTo("/", "home", false)}
                    className="cursor-pointer z-[130]"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                    <img src={logo} className="h-10 md:h-16 w-auto object-contain filter brightness-0 invert" alt="Energica Logo" />
                </motion.div>

                {/* Tactical Hamburger Button */}
                <motion.button
                    onClick={toggleMenu}
                    className={`z-[130] group flex flex-col justify-center items-center gap-1.5 cursor-pointer w-14 h-14 rounded-full shadow-2xl transition-colors duration-500 ${
                        isOpen ? 'bg-white/10 backdrop-blur-xl' : 'bg-white'
                    }`}
                >
                    <div className="relative w-6 h-5">
                        <span className={`absolute left-0 w-6 h-[2px] transition-all duration-500 ease-expo ${
                            isOpen ? 'bg-white rotate-45 top-2' : 'bg-[#C80000] top-0'
                        }`}></span>
                        <span className={`absolute left-0 w-6 h-[2px] top-2 transition-all duration-300 ${
                            isOpen ? 'bg-transparent opacity-0 scale-x-0' : 'bg-[#C80000]'
                        }`}></span>
                        <span className={`absolute left-0 w-6 h-[2px] transition-all duration-500 ease-expo ${
                            isOpen ? 'bg-white -rotate-45 top-2' : 'bg-[#C80000] top-4'
                        }`}></span>
                    </div>
                </motion.button>
            </motion.nav>

            {/* Full-screen menu */}
            <div
                ref={menuRef}
                className="fixed top-0 right-0 w-screen h-screen bg-[#C80000] text-white z-[100] flex flex-col justify-center items-center invisible opacity-0 translate-x-full"
            >
                {/* Immersive Noise and Gradient */}
                <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/7/76/Noise.png")' }}></div>
                <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/40 pointer-events-none"></div>

                <ul className="flex flex-col gap-2 w-full max-w-3xl px-10 md:px-20 relative z-10">
                    {navItems.map((item, idx) => (
                        <li key={idx} className="overflow-hidden py-1">
                            <motion.button
                                onClick={() => navigateTo(item.path, item.id)}
                                style={{ fontWeight: 900 }}
                                className="menu-link-item block w-full text-4xl md:text-7xl font-black uppercase tracking-tighter text-left group relative italic"
                            >
                                {/* Animated underline with elastic feel */}
                                <span className="absolute left-0 bottom-0 h-[4px] w-0 bg-white transition-all duration-700 ease-[0.19,1,0.22,1] group-hover:w-full"></span>
                                <span className="relative text-white group-hover:pl-6 transition-all duration-500 ease-out inline-block">
                                    {item.name}
                                </span>
                            </motion.button>
                        </li>
                    ))}
                </ul>

                {/* Bottom Brand Info */}
                <div className="brand-info absolute bottom-10 left-10 md:left-20 text-white/40 font-medium tracking-widest text-[11px] uppercase space-y-1">
                    <p>© Energica Sustain Foundation // 2025</p>
                    <div className="h-[1px] w-12 bg-white/20"></div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;