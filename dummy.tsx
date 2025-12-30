import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { QRCodeCanvas } from "qrcode.react";

gsap.registerPlugin(ScrollTrigger);

// --- DATA SOURCE ---
const policies = [
  {
    id: "01",
    title: "PM Surya Ghar",
    subtitle: "Muft Bijli Yojana",
    intro: "A flagship scheme targeting 1 crore households to provide free electricity...",
    benefits: [
      "Subsidy of ₹78,000 to ₹1,18,000",
      "Free electricity up to 300 units/month",
      "Reduced carbon footprint",
    ],
    eligibility: "Residential consumers only. Must own the roof rights.",
    formLink:
      "https://docs.google.com/forms/d/e/1FAIpQLSdqPUWgWCrKXsEG2D86Lv6zbb1Pc0quk6i3kxsOJLOX4VOaCg/viewform",
    accent: "#28a745",
  },
  {
    id: "02",
    title: "PM KUSUM",
    subtitle: "Solar for Farmers",
    intro: "Promotes solar-powered agriculture by supporting farmers with solar pumps...",
    benefits: [
      "90% subsidy on solar pumps",
      "Diesel-free reliable irrigation",
      "Income from selling surplus power",
    ],
    eligibility: "Farmers, cooperatives, and panchayats with agricultural land.",
    formLink:
      "https://docs.google.com/forms/d/e/1FAIpQLSeNusoJ6aF1Te3F5yse9obpTqXQnH239utog_5z2Zx2NiitSw/viewform",
    accent: "#eab308",
  },
  {
    id: "03",
    title: "SMART Program",
    subtitle: "Community Empowerment",
    intro: "Focused on making economically weaker and BPL households self-reliant...",
    benefits: [
      "Up to 95% Subsidy for BPL households",
      "Up to 80% Subsidy for General Category (EWS)",
      "Promotes local solar manufacturing",
    ],
    eligibility: "Monthly consumption ≤ 100 units.",
    formLink:
      "https://docs.google.com/forms/d/e/1FAIpQLSewTuhnj135QhGgx6nOYtvG2lUn8vycPUh3YeVR3QTfQxiPnA/viewform",
    accent: "#3b82f6",
  },
  {
    id: "04",
    title: "Green Open Access",
    subtitle: "Industrial Power",
    intro: "Enables industries and commercial users to procure renewable power...",
    benefits: [
      "Lower electricity bills",
      "100% Renewable Sourcing",
      "No capacity limit sanctions",
    ],
    eligibility: "Consumers with contracted demand > 100 kW.",
    formLink:
      "https://docs.google.com/forms/d/e/1FAIpQLSes5Y6U6Jii9LBlmChhQydkgXGEa2ud4oN39VrbjxBDM-1ZNA/viewform",
    accent: "#10b981",
  },
  {
    id: "05",
    title: "Virtual Net Metering",
    subtitle: "Shared Generation",
    intro: "Allows multiple consumers to share generation from a single solar plant...",
    benefits: [
      "Maximizes limited roof space",
      "Shared savings for multi-storey buildings",
      "Supports larger central solar systems",
    ],
    eligibility: "Residential/Commercial units within same DISCOM area.",
    formLink:
      "https://docs.google.com/forms/d/e/1FAIpQLSebn5m1sdE7hqOGuoZ7nfqpUlFDt52uYvNo_ZmEKgdq918WBA/viewform",
    accent: "#8b5cf6",
  },
  {
    id: "06",
    title: "Group Net Metering",
    subtitle: "Enterprise Efficiency",
    intro: "Allows organizations with multiple connections to offset consumption...",
    benefits: [
      "Centralized solar generation",
      "Offsets power across multiple locations",
      "Simplifies billing and management",
    ],
    eligibility:
      "Consumers with multiple connections in the same distribution zone.",
    formLink:
      "https://docs.google.com/forms/d/e/1FAIpQLSdRNdPd-mskf94i2AJzVEBxzUWHeouXBOLbwPoNPeAuFyWeSQ/viewform",
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
          start: "top top",
          end: "bottom top",
          scrub: true,
          onUpdate: (self) => {
            gsap.to(card, {
              scale: 1 - self.progress * 0.05,
              filter: `brightness(${1 - self.progress * 0.3})`,
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
          end: "+=500",
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-[#0b0b0b] text-white min-h-screen">
      <div className="h-[60vh] flex items-center justify-center text-center">
        <div ref={titleRef}>
          <span className="text-[#28a745] tracking-[0.3em] text-sm font-bold block mb-4">
            POLICY & AWARENESS
          </span>
          <h1 className="text-5xl md:text-8xl font-black">
            Government <br />
            <span className="text-gray-600">Initiatives</span>
          </h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 pb-20">
        {policies.map((policy, i) => (
          <div key={i} className="policy-card sticky top-24 mb-10">
            <motion.div className="bg-[#121212] rounded-3xl border border-white/10 p-10">
              <div className="grid md:grid-cols-12 gap-8">
                <div className="md:col-span-7">
                  <h2 className="text-4xl font-black mb-4">{policy.title}</h2>
                  <p className="text-gray-300 mb-6">{policy.intro}</p>
                  <p className="text-sm text-gray-400">
                    <strong>Eligibility:</strong> {policy.eligibility}
                  </p>
                </div>

                <div className="md:col-span-5 flex flex-col justify-between">
                  <ul className="space-y-3">
                    {policy.benefits.map((b, idx) => (
                      <li key={idx} className="text-gray-400 text-sm">
                        ✓ {b}
                      </li>
                    ))}
                  </ul>

                  {/* QR CODE */}
                  <div className="flex justify-center my-6">
                    <div className="bg-white p-2 rounded-lg">
                      <QRCodeCanvas value={policy.formLink} size={90} />
                    </div>
                  </div>

                  <a
                    href={policy.formLink}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-white text-black font-bold py-3 text-center rounded-md hover:bg-[#28a745] hover:text-white transition"
                  >
                    Check Eligibility ↗
                  </a>
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
