import { useState, type FormEvent } from "react";
import { MapPin, Phone, ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import footerLogo from "../assets/images/regenerated_image_1781776578908.png";
import { navigationData } from "@/src/config/navigation";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e: FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim();
    if (!cleanEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Store in localStorage
      const existing = localStorage.getItem("lokmat_newsletter_subscribers");
      const list = existing ? JSON.parse(existing) : [];
      list.push({ email: cleanEmail, date: new Date().toISOString() });
      localStorage.setItem("lokmat_newsletter_subscribers", JSON.stringify(list));

      // Call API
      await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: cleanEmail })
      });
    } catch (err) {
      console.error("Subscription error:", err);
    } finally {
      setIsSubmitting(false);
      setIsSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-[#e40009] text-white pt-[30px] md:pt-14 pb-6 relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-800 rounded-full mix-blend-multiply filter blur-[120px] opacity-40 pointer-events-none transform translate-x-1/3 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-red-600 rounded-full mix-blend-multiply filter blur-[100px] opacity-40 pointer-events-none transform -translate-x-1/2 translate-y-1/3"></div>

      <div className="w-full px-[3%] relative z-10">
        
        {/* Top Newsletter Section */}
        <div className="bg-red-800/40 border border-white/10 rounded-2xl p-6 md:p-8 mb-10 flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-sm">
          <div className="md:w-1/2">
            <h3 className="text-xl md:text-2xl font-bold mb-2 tracking-tight">Join Our Newsletter</h3>
            <p className="text-red-100 text-sm md:text-base">
              Stay updated with the latest Lokmat events, award announcements,<br className="hidden sm:block" /> and exclusive highlights.
            </p>
          </div>
          <div className="md:w-1/2 w-full">
            <form className="flex flex-col gap-2.5" onSubmit={handleSubscribe}>
              <div className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (isSubscribed) setIsSubscribed(false);
                  }}
                  placeholder="Enter your email address" 
                  className="w-full px-5 py-3 rounded-xl bg-white text-[#111111] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white/80 transition-all font-medium text-sm shadow-inner"
                  required
                />
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-white text-[#e40009] font-bold uppercase tracking-widest text-xs rounded-xl hover:bg-gray-50 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 whitespace-nowrap shadow-md cursor-pointer disabled:opacity-70"
                >
                  <span>{isSubmitting ? "Subscribing..." : "Subscribe"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <AnimatePresence>
                {isSubscribed && (
                  <motion.div 
                    initial={{ opacity: 0, y: -4, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -4, scale: 0.98 }}
                    transition={{ duration: 0.25 }}
                    className="flex items-center gap-2.5 text-white bg-black/25 border border-white/20 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium backdrop-blur-sm"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                    <span>Thank you for subscribing! You've been successfully added to our mailing list.</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-8 mb-10">
          
          {/* Brand Area */}
          <div className="md:col-span-2 lg:col-span-2 flex flex-col items-start pr-0 lg:pr-12">
            <img 
              src={footerLogo} 
              alt="Lokmat Events Logo" 
              loading="lazy"
              referrerPolicy="no-referrer"
              className="w-[240px] h-[75px] object-contain mb-3"
            />
            <p className="text-red-100 leading-relaxed text-sm">
              Celebrating excellence, leadership, culture, business, entertainment, and community impact through landmark events and prestigious awards.
            </p>
          </div>

          {/* Dynamic Footer Menu */}
          <div className="col-span-1 lg:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-8">
            {navigationData.map((menu) => (
              <div key={menu.label}>
                {menu.href ? (
                  <h4 className="text-lg font-bold mb-4 tracking-wide whitespace-nowrap">
                    {menu.isExternal || menu.href.startsWith("http") ? (
                      <a href={menu.href} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center group whitespace-nowrap">
                        <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 -ml-5 transition-all text-red-300" />
                        <span className="whitespace-nowrap">{menu.label}</span>
                      </a>
                    ) : (
                      <Link to={menu.href} className="hover:text-white transition-colors flex items-center group whitespace-nowrap">
                        <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 -ml-5 transition-all text-red-300" />
                        <span className="whitespace-nowrap">{menu.label}</span>
                      </Link>
                    )}
                  </h4>
                ) : (
                  <h4 className="text-lg font-bold mb-4 tracking-wide whitespace-nowrap">{menu.label}</h4>
                )}
                {menu.items && (
                  <ul className="space-y-3 text-red-100 font-medium text-[15px]">
                    {menu.items.map((item) => (
                      <li key={item.label} className="whitespace-nowrap">
                        {item.isExternal || item.href.startsWith("http") ? (
                          <a href={item.href} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center group whitespace-nowrap">
                            <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 -ml-5 transition-all text-red-300 flex-shrink-0" />
                            <span className="whitespace-nowrap">{item.label}</span>
                          </a>
                        ) : (
                          <Link to={item.href} className="hover:text-white transition-colors flex items-center group whitespace-nowrap">
                            <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 -ml-5 transition-all text-red-300 flex-shrink-0" />
                            <span className="whitespace-nowrap">{item.label}</span>
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8 border-t border-b border-white/15 mb-8 items-center">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center flex-shrink-0 shadow-sm">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-xs text-red-200 font-semibold uppercase tracking-widest mb-1.5">Office Address</p>
              <p className="font-medium text-white leading-relaxed text-sm md:text-base">
                Lokmat Media Pvt. Ltd.<br />
                Law College Rd, Shanti Sheela Society, Erandwane, Pune, Maharashtra 411038
              </p>
            </div>
          </div>
          <div className="flex items-start md:items-center gap-4 md:justify-end">
            <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center flex-shrink-0 shadow-sm">
              <Phone className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-xs text-red-200 font-semibold uppercase tracking-widest mb-1.5">Phone</p>
              <a 
                href="tel:02066848586" 
                className="font-bold text-white hover:text-red-200 transition-colors text-lg md:text-xl tracking-wide inline-block"
              >
                020 6684 8586
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-4 text-red-200 text-sm font-medium">
          <p>© 2026 Lokmat GLOCON. All Rights Reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
            <Link to="/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link>
            {/* Hidden CMS Link for Admin */}
            <a href="/add-event" className="opacity-0 cursor-default hover:opacity-100 focus:opacity-100 transition-opacity">/admin</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
