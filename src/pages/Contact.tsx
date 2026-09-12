import React, { useState, useEffect } from "react";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import { motion, AnimatePresence } from "motion/react";
import { Phone, MapPin, ArrowUpRight, HelpCircle, ChevronDown, ChevronUp, Send, CheckCircle } from "lucide-react";

export default function Contact() {
  // AIO, GEO, and SEO Best Practices: Dynamic Title and Description Updates
  useEffect(() => {
    document.title = "Contact Our Offices & Bureau | Lokmat Events";
    
    // Update Meta Description dynamically for SEO/AIO scrapers
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "Get in touch with Lokmat Media Pvt. Ltd. Office Address: Law College Rd, Shanti Sheela Society, Erandwane, Pune, Maharashtra 411038. Phone: 020 6684 8586.");
    }
  }, []);

  // FAQ Accordion Data
  const faqs = [
    {
      question: "Who can participate in Lokmat Glocon?",
      answer: "Lokmat Glocon welcomes professionals, business owners, entrepreneurs, industrialists, philanthropists, policymakers, corporate leaders, economists, financial thinkers, investors, strategic advisors, domain experts, authors, content creators, AI professionals, MSME leaders, startup founders and changemakers creating impact in their field."
    },
    {
      question: "Which industries are eligible to participate in Lokmat Glocon?",
      answer: "Participation is open across major industries including FMCG, hospitality, food, MSME, real estate, healthcare, pharma, manufacturing, retail, e-commerce, IT & ITES, agriculture, banking, finance, education, travel, tourism, automobiles, jewellery, luxury, energy, telecom, textiles, infrastructure, sustainability, aviation, PSUs, import-export and global business groups."
    },
    {
      question: "How can I enquire or register interest for Lokmat Glocon?",
      answer: "You can enquire by filling out the contact form on this page or by clicking the Enquire Now button. Our team will review your details and connect with you for the next steps."
    }
  ];

  // States
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    subject: "General Inquiry",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const toggleFaq = (idx: number) => {
    setOpenFaqIdx(openFaqIdx === idx ? null : idx);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) {
      alert("Please fill in all required fields.");
      return;
    }
    // Save contact message locally
    const existingMessages = localStorage.getItem("lokmat_contact_messages");
    const list = existingMessages ? JSON.parse(existingMessages) : [];
    list.push({ ...formData, id: Date.now(), timestamp: new Date().toISOString() });
    localStorage.setItem("lokmat_contact_messages", JSON.stringify(list));
    setSubmitted(true);
  };

  const handleReset = () => {
    setFormData({
      name: "",
      phone: "",
      subject: "General Inquiry",
      message: ""
    });
    setSubmitted(false);
  };

  return (
    <div className="w-[100vw] overflow-x-hidden min-h-screen bg-[#FAFAFA] text-[#111111] flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 w-[100vw] pt-[159px] pb-[30px] md:pt-[195px] md:pb-24 px-[3%] relative">
        <div className="w-full flex flex-col items-center text-center">
            
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto mb-[60px] md:mb-16"
            >
              <span className="text-red-600 font-bold tracking-[0.3em] uppercase text-xs mb-3 block">Global Coordinates</span>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight tracking-tight">
                Connect With Us
              </h1>
            </motion.div>
            
            {/* Form (Left) & Contact Details Stack (Right) */}
            <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 text-left mb-[60px] md:mb-20 items-stretch">
              
              {/* Form Block (Left side - 7 Columns) */}
              <div className="lg:col-span-7 bg-white p-8 md:p-12 border border-gray-200 rounded-2xl shadow-sm flex flex-col justify-between">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-3 text-[#111111]">Send us a message</h2>
                  <p className="text-gray-400 font-light text-sm leading-relaxed mb-8">
                    Have a general question? Complete the credentials below and we will route it to the appropriate officer.
                  </p>

                  <AnimatePresence mode="wait">
                    {!submitted ? (
                      <motion.form 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col gap-6" 
                        onSubmit={handleSubmit}
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Full Name *</label>
                            <input 
                              type="text" 
                              required
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-red-600 focus:bg-white transition-all" 
                              placeholder="e.g. Aditi Sharma" 
                            />
                          </div>
                          <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Phone Number *</label>
                            <input 
                              type="tel" 
                              required
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-red-600 focus:bg-white transition-all" 
                              placeholder="e.g. 020 6684 8586" 
                            />
                          </div>
                        </div>

                        <div className="flex flex-col gap-2">
                          <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Subject Of Inquiry</label>
                          <select 
                            value={formData.subject}
                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-red-600 focus:bg-white transition-all cursor-pointer font-medium"
                          >
                            <option value="General Inquiry">General Event Query</option>
                            <option value="Award Nominations">Award Nomination Processes</option>
                            <option value="Press Accreditations">Press / Media Accreditation</option>
                            <option value="Website Feedback">Technical Website Issue</option>
                          </select>
                        </div>

                        <div className="flex flex-col gap-2">
                          <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Message Body *</label>
                          <textarea 
                            rows={6} 
                            required
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-red-600 focus:bg-white transition-all resize-none" 
                            placeholder="Please provide complete details regarding your inquiry..." 
                          />
                        </div>

                        <button 
                          type="submit"
                          className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#111111] text-white rounded-2xl overflow-hidden font-bold tracking-widest uppercase text-sm hover:bg-red-600 hover:scale-105 transition-all duration-300 shadow-xl self-start"
                        >
                          <span className="relative z-10">Send Message</span>
                          <Send className="relative z-10 w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </button>
                      </motion.form>
                    ) : (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-center py-12 space-y-6"
                      >
                        <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                          <CheckCircle className="w-8 h-8" />
                        </div>
                        <div className="space-y-2">
                          <h3 className="text-xl font-bold">Message Lodged Successfully!</h3>
                          <p className="text-gray-500 font-light text-sm max-w-md mx-auto leading-relaxed">
                            Thank you, <strong>{formData.name}</strong>. Your message regarding <em>{formData.subject}</em> has been safely logged in our communications panel. A response will be issued within 1-2 business days.
                          </p>
                        </div>
                        <button 
                          onClick={handleReset}
                          className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-2xl font-bold text-sm uppercase tracking-widest hover:scale-105 transition-all duration-300"
                        >
                          Send Another Message
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Contact Info Stack (Right side - 5 Columns, Vertical Stack) */}
              <div className="lg:col-span-5 flex flex-col gap-8 justify-between">
                
                {/* Office Address Card */}
                <div className="bg-white p-8 md:p-10 border border-gray-200 rounded-2xl shadow-sm flex flex-col justify-between flex-1 group hover:border-red-200 hover:shadow-md transition-all duration-300">
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
                      <MapPin className="w-7 h-7" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-red-600">Office Address</h3>
                    <p className="text-gray-600 leading-relaxed font-normal text-base">
                      <strong className="text-[#111111] font-bold block mb-1">Lokmat Media Pvt. Ltd.</strong>
                      Law College Rd, Shanti Sheela Society,<br />
                      Erandwane, Pune, Maharashtra 411038
                    </p>
                  </div>
                  <a 
                    href="https://maps.google.com/?q=Lokmat+Media+Pvt.+Ltd.+Law+College+Rd+Pune+411038"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pt-6 border-t border-gray-100 mt-8 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-gray-500 group-hover:text-red-600 transition-colors"
                  >
                    <span>View on Google Maps</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>

                {/* Phone Number Card */}
                <div className="bg-white p-8 md:p-10 border border-gray-200 rounded-2xl shadow-sm flex flex-col justify-between flex-1 group hover:border-red-200 hover:shadow-md transition-all duration-300">
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
                      <Phone className="w-7 h-7" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-red-600">Phone Number</h3>
                    <div className="text-gray-600 leading-relaxed text-base space-y-2">
                      <a 
                        href="tel:02066848586"
                        className="text-2xl sm:text-3xl font-bold text-[#111111] hover:text-red-600 transition-colors block tracking-tight mb-2"
                      >
                        020 6684 8586
                      </a>
                      <p className="text-sm text-gray-500 font-light">
                        Office Hours: Monday – Friday, 9:30 AM – 6:00 PM IST
                      </p>
                      <p className="text-xs text-gray-400 font-mono">
                        Central Switchboard Desk • Pune
                      </p>
                    </div>
                  </div>
                  <a 
                    href="tel:02066848586"
                    className="pt-6 border-t border-gray-100 mt-8 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-gray-500 group-hover:text-red-600 transition-colors"
                  >
                    <span>Call 020 6684 8586</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>

              </div>
            </div>

            {/* FAQ Bureau - Full Width Stretching Edge to Edge (3% margin from window edge) */}
            <section className="w-full text-left mb-0 md:mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-red-600 block">Frequently Asked Questions</span>
                  <h2 className="text-2xl md:text-3xl font-bold text-[#111111]">FAQ Bureau</h2>
                </div>
              </div>

              <div className="w-full space-y-4">
                {faqs.map((faq, idx) => {
                  const isOpen = openFaqIdx === idx;
                  return (
                    <div 
                      key={idx} 
                      className="w-full bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm transition-all duration-300"
                    >
                      <button
                        onClick={() => toggleFaq(idx)}
                        className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-base md:text-lg text-[#111111] hover:text-red-600 transition-colors"
                      >
                        <span>{faq.question}</span>
                        {isOpen ? <ChevronUp className="w-5 h-5 shrink-0 text-red-600" /> : <ChevronDown className="w-5 h-5 shrink-0 text-gray-400" />}
                      </button>
                      
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="border-t border-gray-200 bg-neutral-50/50"
                          >
                            <div className="p-6 text-base text-gray-600 leading-relaxed font-normal">
                              {faq.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
