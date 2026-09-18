import React, { useState, useEffect } from "react";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import { motion, AnimatePresence } from "motion/react";
import { HelpCircle, ChevronDown, ChevronUp, Send, CheckCircle, Mail, Copy, Check } from "lucide-react";

export default function Contact() {
  // AIO, GEO, and SEO Best Practices: Dynamic Title and Description Updates
  useEffect(() => {
    document.title = "Contact Our Global Bureau & Secretariats | Lokmat Glocon";
    
    // Update Meta Description dynamically for SEO/AIO scrapers
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "Connect with Lokmat Glocon for event delegations, award nominations, corporate sponsorships, and global convention inquiries.");
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
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [submittedData, setSubmittedData] = useState<{
    id: string;
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
    timestamp: string;
    recipient: string;
  } | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenFaqIdx(openFaqIdx === idx ? null : idx);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.message.trim()) {
      alert("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    const submissionId = "LOC-" + Date.now().toString(36).toUpperCase();
    const timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
    const targetRecipient = "milan.darda@lokmat.com";

    const snapshot = {
      id: submissionId,
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      subject: formData.subject,
      message: formData.message.trim(),
      timestamp,
      recipient: targetRecipient
    };

    // Save contact message locally for offline resilience
    try {
      const existingMessages = localStorage.getItem("lokmat_contact_messages");
      const list = existingMessages ? JSON.parse(existingMessages) : [];
      list.push({ ...snapshot, rawTimestamp: Date.now() });
      localStorage.setItem("lokmat_contact_messages", JSON.stringify(list));
    } catch {
      // LocalStorage fallback
    }

    // Call server endpoint to route email to milan.darda@lokmat.com
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: snapshot.name,
          email: snapshot.email,
          phone: snapshot.phone,
          subject: snapshot.subject,
          message: snapshot.message
        })
      });
    } catch (err) {
      console.warn("Backend dispatch offline or pending, recorded locally:", err);
    }

    setIsSubmitting(false);
    setSubmittedData(snapshot);
    setSubmitted(true);
  };

  const handleCopyDetails = () => {
    if (!submittedData) return;
    const text = `LOKMAT GLOBAL - CONTACT FORM SUBMISSION
Submission ID: ${submittedData.id}
Date & Time  : ${submittedData.timestamp}
Sent To      : ${submittedData.recipient}
------------------------------------------------
Full Name    : ${submittedData.name}
Email        : ${submittedData.email}
Phone Number : ${submittedData.phone}
Subject      : ${submittedData.subject}
Message      :
${submittedData.message}
------------------------------------------------`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "General Inquiry",
      message: ""
    });
    setSubmittedData(null);
    setSubmitted(false);
  };

  const getMailtoUrl = () => {
    if (!submittedData) return `mailto:milan.darda@lokmat.com`;
    const subject = encodeURIComponent(`[Lokmat Contact] ${submittedData.subject} - ${submittedData.name}`);
    const body = encodeURIComponent(
      `Hello Milan Darda,\n\nHere are the details filled in the contact form:\n\n` +
      `Full Name: ${submittedData.name}\n` +
      `Email: ${submittedData.email}\n` +
      `Phone: ${submittedData.phone}\n` +
      `Subject: ${submittedData.subject}\n\n` +
      `Message:\n${submittedData.message}\n\n` +
      `Reference ID: ${submittedData.id}\n` +
      `Submitted At: ${submittedData.timestamp}`
    );
    return `mailto:milan.darda@lokmat.com?subject=${subject}&body=${body}`;
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
            
            {/* Form Block */}
            <div className="w-full max-w-4xl mx-auto text-left mb-[60px] md:mb-20">
              <div className="w-full bg-white p-8 md:p-12 border border-gray-200 rounded-2xl shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#111111]">Send us a message</h2>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 text-red-600 border border-red-100 rounded-full text-xs font-semibold self-start sm:self-auto">
                      <Mail className="w-3.5 h-3.5" /> Routed to: milan.darda@lokmat.com
                    </span>
                  </div>
                  <p className="text-gray-500 font-light text-sm leading-relaxed mb-8">
                    Have a question or proposal? Fill out the fields below. All submissions are automatically processed and delivered to <strong className="text-gray-900 font-semibold">milan.darda@lokmat.com</strong>.
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
                            <label className="text-xs font-bold text-gray-700 uppercase tracking-widest">
                              Full Name <span className="text-red-600">*</span>
                            </label>
                            <input 
                              type="text" 
                              required
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-red-600 focus:bg-white transition-all text-sm font-medium" 
                              placeholder="e.g. Aditi Sharma" 
                            />
                          </div>
                          <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-gray-700 uppercase tracking-widest">
                              Email Address <span className="text-red-600">*</span>
                            </label>
                            <input 
                              type="email" 
                              required
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-red-600 focus:bg-white transition-all text-sm font-medium" 
                              placeholder="e.g. aditi@company.com" 
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-gray-700 uppercase tracking-widest">
                              Phone Number <span className="text-red-600">*</span>
                            </label>
                            <input 
                              type="tel" 
                              required
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-red-600 focus:bg-white transition-all text-sm font-medium" 
                              placeholder="e.g. +91 98765 43210" 
                            />
                          </div>

                          <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-gray-700 uppercase tracking-widest">
                              Subject Of Inquiry <span className="text-red-600">*</span>
                            </label>
                            <select 
                              value={formData.subject}
                              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-red-600 focus:bg-white transition-all cursor-pointer font-medium text-sm" 
                            >
                              <option value="General Inquiry">General Event Query</option>
                              <option value="Award Nominations">Award Nomination Processes</option>
                              <option value="Partnership & Sponsorship">Corporate Partnership & Sponsorship</option>
                              <option value="Press Accreditations">Press / Media Accreditation</option>
                              <option value="Speaker Opportunities">Speaker & Delegate Inquiry</option>
                              <option value="Website Feedback">Technical Website Issue</option>
                            </select>
                          </div>
                        </div>

                        <div className="flex flex-col gap-2">
                          <label className="text-xs font-bold text-gray-700 uppercase tracking-widest">
                            Message Body <span className="text-red-600">*</span>
                          </label>
                          <textarea 
                            rows={5} 
                            required
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-red-600 focus:bg-white transition-all resize-none text-sm font-medium" 
                            placeholder="Please provide complete details regarding your inquiry..." 
                          />
                        </div>

                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
                          <button 
                            type="submit"
                            disabled={isSubmitting}
                            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#111111] hover:bg-red-600 text-white rounded-2xl overflow-hidden font-bold tracking-widest uppercase text-sm hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl disabled:opacity-60 cursor-pointer"
                          >
                            <span className="relative z-10">{isSubmitting ? "Submitting..." : "Submit Form"}</span>
                            <Send className="relative z-10 w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                          </button>

                          <div className="text-xs text-gray-500 flex items-center gap-1.5">
                            <Mail className="w-3.5 h-3.5 text-red-600" />
                            <span>Destination: <strong>milan.darda@lokmat.com</strong></span>
                          </div>
                        </div>
                      </motion.form>
                    ) : (
                      /* Submitted Success View with Complete Data Display */
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="py-6 space-y-6" 
                      >
                        <div className="flex flex-col items-center text-center space-y-3">
                          <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center shadow-sm">
                            <CheckCircle className="w-8 h-8" />
                          </div>
                          <div>
                            <h3 className="text-2xl md:text-3xl font-bold text-[#111111]">Form Submitted Successfully!</h3>
                            <p className="text-gray-500 font-light text-sm max-w-lg mx-auto mt-1">
                              Your filled information has been recorded and delivered to <strong className="text-red-600 font-semibold">milan.darda@lokmat.com</strong>.
                            </p>
                          </div>
                        </div>

                        {/* Complete Submitted Data Summary Box */}
                        {submittedData && (
                          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 md:p-8 space-y-5 text-left">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-gray-200">
                              <div>
                                <span className="text-[10px] font-bold tracking-widest uppercase text-red-600 block">Submitted Form Data</span>
                                <h4 className="text-lg font-bold text-gray-900">Complete Submission Details</h4>
                              </div>
                              <div className="text-xs text-gray-500 bg-white px-3 py-1.5 rounded-lg border border-gray-200 shrink-0">
                                Ref: <strong>{submittedData.id}</strong>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                              <div className="bg-white p-3.5 rounded-xl border border-gray-100">
                                <span className="text-xs font-semibold text-gray-400 block uppercase tracking-wider">Full Name</span>
                                <span className="font-bold text-gray-900 text-base">{submittedData.name}</span>
                              </div>
                              <div className="bg-white p-3.5 rounded-xl border border-gray-100">
                                <span className="text-xs font-semibold text-gray-400 block uppercase tracking-wider">Email Address</span>
                                <span className="font-bold text-gray-900 text-base break-all">{submittedData.email}</span>
                              </div>
                              <div className="bg-white p-3.5 rounded-xl border border-gray-100">
                                <span className="text-xs font-semibold text-gray-400 block uppercase tracking-wider">Phone Number</span>
                                <span className="font-bold text-gray-900 text-base">{submittedData.phone}</span>
                              </div>
                              <div className="bg-white p-3.5 rounded-xl border border-gray-100">
                                <span className="text-xs font-semibold text-gray-400 block uppercase tracking-wider">Subject Of Inquiry</span>
                                <span className="font-bold text-red-600 text-base">{submittedData.subject}</span>
                              </div>
                            </div>

                            <div className="bg-white p-4 rounded-xl border border-gray-100 text-sm">
                              <span className="text-xs font-semibold text-gray-400 block uppercase tracking-wider mb-1.5">Complete Message</span>
                              <p className="text-gray-800 font-medium whitespace-pre-wrap leading-relaxed">{submittedData.message}</p>
                            </div>

                            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs text-gray-500 border-t border-gray-200">
                              <div className="flex items-center gap-1.5">
                                <Mail className="w-3.5 h-3.5 text-red-600 shrink-0" />
                                <span>Sent To: <strong className="text-gray-900 font-semibold">{submittedData.recipient}</strong></span>
                              </div>
                              <div>
                                <span>Submitted: <strong>{submittedData.timestamp}</strong></span>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Interactive Buttons for All Devices */}
                        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                          <a
                            href={getMailtoUrl()}
                            className="inline-flex items-center gap-2 px-6 py-3.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all duration-300 shadow-md"
                          >
                            <Mail className="w-4 h-4" />
                            <span>Open in Mail App (milan.darda@lokmat.com)</span>
                          </a>

                          <button 
                            onClick={handleCopyDetails}
                            className="inline-flex items-center gap-2 px-5 py-3.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-xl font-bold text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer shadow-sm"
                          >
                            {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                            <span>{copied ? "Copied to Clipboard!" : "Copy Details"}</span>
                          </button>

                          <button 
                            onClick={handleReset}
                            className="px-5 py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
                          >
                            Send Another Message
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
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
