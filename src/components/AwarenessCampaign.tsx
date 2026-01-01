import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { QRCodeCanvas } from "qrcode.react";

gsap.registerPlugin(ScrollTrigger);

// --- COMPLETED DATA SOURCE ---
const policies = [
  {
    id: "01",
    title: "PM Surya Ghar",
    subtitle: "Muft Bijli Yojana",
    intro: "A flagship scheme targeting 1 crore households to provide up to 300 units of free electricity monthly through rooftop solar installations.",
    benefits: [
      "Subsidy of ₹30,000 per kW up to 2 kW",
      "Additional ₹18,000 per kW for 3 kW",
      "Total subsidy capped at ₹78,000",
      "Zero cost electricity for up to 300 units"
    ],
    eligibility: "Indian citizens with a valid electricity connection and available roof space. Specifically targets residential segments.",
    formLink: "https://pmsuryaghar.gov.in/",
    accent: "#C80000",
  },
  {
    id: "02",
    title: "PM KUSUM",
    subtitle: "Solar for Farmers",
    intro: "The Pradhan Mantri Kisan Urja Suraksha evam Utthaan Mahabhiyan ensures energy security for farmers and de-dieselizes the farm sector.",
    benefits: [
      "60% subsidy on standalone solar pumps",
      "30% loan availability from banks",
      "Farmer only pays 10% of total cost",
      "Sell surplus power to DISCOMs for income"
    ],
    eligibility: "Individual farmers, Water User Associations, and Farmer Producer Organizations (FPOs) with cultivable land.",
    formLink: "https://pmkusum.mnre.gov.in/",
    accent: "#eab308",
  },
  {
    id: "03",
    title: "SMART Program",
    subtitle: "Community Empowerment",
    intro: "Specifically designed for BPL and EWS households to reduce energy poverty through high-subsidy micro-solar deployments.",
    benefits: [
      "Up to 95% Subsidy for BPL households",
      "Covers 1kW to 2kW residential systems",
      "Community-led maintenance models",
      "Local employment in solar assembly"
    ],
    eligibility: "Valid BPL card holders or individuals with annual income below ₹2.5 Lakhs. Monthly consumption must be ≤ 100 units.",
    formLink: "https://docs.google.com/forms/d/e/1FAIpQLSewTuhnj135QhGgx6nOYtvG2lUn8vycPUh3YeVR3QTfQxiPnA/viewform",
    accent: "#3b82f6",
  },
  {
    id: "04",
    title: "Green Open Access",
    subtitle: "Industrial Power",
    intro: "Allows small and large scale industries to bypass local DISCOM monopolies and buy cheaper renewable energy directly from generators.",
    benefits: [
      "Reduced per-unit cost for large industries",
      "Banking facilities for renewable power",
      "100% Renewable Purchase Obligation (RPO) compliance",
      "No capacity limit sanctions for green energy"
    ],
    eligibility: "Commercial and Industrial consumers with a sanctioned or contracted load of 100 kW or above.",
    formLink: "https://posoco.in/green-open-access/",
    accent: "#10b981",
  },
  {
    id: "05",
    title: "Virtual Net Metering",
    subtitle: "Shared Generation",
    intro: "Perfect for high-rises where roof space is small but consumers are many. Generation from one plant is credited to multiple meters.",
    benefits: [
      "Benefit of solar for apartment owners",
      "Solar credits for those without personal roofs",
      "Pro-rata distribution of savings",
      "Lower maintenance cost per household"
    ],
    eligibility: "Consumers living in multi-storey buildings or housing societies within the same DISCOM jurisdiction.",
    formLink: "https://docs.google.com/forms/d/e/1FAIpQLSebn5m1sdE7hqOGuoZ7nfqpUlFDt52uYvNo_ZmEKgdq918WBA/viewform",
    accent: "#8b5cf6",
  },
  {
    id: "06",
    title: "Group Net Metering",
    subtitle: "Enterprise Efficiency",
    intro: "Allows entities with multiple branches to install a large plant at one location and adjust production against bills of other locations.",
    benefits: [
      "Centralized plant management",
      "Offset bills of city branches using rural roofs",
      "Maximize large-scale factory roof ROI",
      "Unified billing for government/corporate bodies"
    ],
    eligibility: "Legal entities (Trusts, Schools, Corps, Govt) with multiple electricity connections under the same DISCOM.",
    formLink: "https://docs.google.com/forms/d/e/1FAIpQLSdRNdPd-mskf94i2AJzVEBxzUWHeouXBOLbwPoNPeAuFyWeSQ/viewform",
    accent: "#f43f5e",
  },
];

const AwarenessCampaign = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".policy-card").forEach((card: any) => {
        ScrollTrigger.create({
          trigger: card,
          start: "top 10%",
          end: "bottom top",
          scrub: true,
          onUpdate: (self) => {
            gsap.to(card, {
              scale: 1 - self.progress * 0.05,
              filter: `brightness(${1 - self.progress * 0.05})`,
            });
          },
        });
      });

      gsap.to(titleRef.current, {
        opacity: 0,
        y: -100,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=400",
          scrub: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-white text-gray-900 min-h-screen font-sans">
      {/* HEADER SECTION */}
      <div className="h-[60vh] flex flex-col items-center justify-center text-center px-6">
        <div ref={titleRef}>
          <span className="text-[#C80000] tracking-[0.4em] text-xs md:text-sm font-black block mb-4 uppercase">
            // Policy & Awareness
          </span>
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-none">
            GOVERNMENT<br />
            <span className="text-gray-200">INITIATIVES</span>
          </h1>
        </div>
      </div>

      {/* CARDS SECTION */}
      <div className="max-w-5xl mx-auto px-4 pb-40">
        {policies.map((policy, i) => (
          <div key={i} className="policy-card sticky top-32 mb-16">
            <motion.div 
              className="bg-white rounded-[2rem] border border-gray-100 p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.05)]"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
            >
              <div className="grid md:grid-cols-12 gap-10">
                
                {/* Left Side: Content */}
                <div className="md:col-span-7">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="font-mono text-xl text-[#C80000] font-bold">/{policy.id}</span>
                    <span className="h-[1px] w-12 bg-gray-200"></span>
                    <span className="uppercase text-xs tracking-widest font-bold text-gray-400">{policy.subtitle}</span>
                  </div>
                  
                  <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-gray-900 leading-none">
                    {policy.title}
                  </h2>
                  
                  <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                    {policy.intro}
                  </p>
                  
                  <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                    <p className="text-sm leading-relaxed">
                      <strong className="text-gray-900 block mb-1 uppercase tracking-tighter">Eligibility Requirements:</strong> 
                      <span className="text-gray-500 font-medium">{policy.eligibility}</span>
                    </p>
                  </div>
                </div>

                {/* Right Side: Benefits & CTA */}
                <div className="md:col-span-5 flex flex-col justify-between">
                  <div className="mb-8">
                    <h4 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-6">Key Benefits</h4>
                    <ul className="space-y-4">
                      {policy.benefits.map((b, idx) => (
                        <li key={idx} className="text-gray-700 text-sm font-bold flex items-start gap-3">
                          <span className="text-[#C80000]">●</span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-col items-center md:items-stretch">
                    {/* QR CODE */}
                    <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 mb-6 flex items-center justify-center gap-4">
                        <div className="bg-white p-2 rounded-lg shadow-sm">
                            <QRCodeCanvas value={policy.formLink} size={80} level="H" />
                        </div>
                        <p className="text-[10px] leading-tight text-gray-400 font-bold uppercase tracking-widest">
                            Scan to access <br/> official portal
                        </p>
                    </div>

                    <a
                      href={policy.formLink}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full bg-[#C80000] text-white font-black py-5 text-center rounded-2xl hover:bg-gray-900 transition-all duration-300 shadow-xl shadow-red-100 uppercase tracking-widest text-xs"
                    >
                      Verify Eligibility ↗
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AwarenessCampaign;