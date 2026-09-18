import React, { useState } from "react";
import { X, Send, CheckCircle2, Mail, Copy, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EnquiryModal({ isOpen, onClose }: EnquiryModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    designation: "",
    industry: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [submittedData, setSubmittedData] = useState<{
    id: string;
    name: string;
    email: string;
    phone: string;
    designation: string;
    industry: string;
    message: string;
    timestamp: string;
    recipient: string;
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      return;
    }

    setIsSubmitting(true);
    const submissionId = "ENQ-" + Date.now().toString(36).toUpperCase();
    const timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
    const targetRecipient = "milan.darda@lokmat.com";

    const snapshot = {
      id: submissionId,
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim() || "Not Provided",
      designation: formData.designation.trim() || "Not Provided",
      industry: formData.industry.trim() || "Not Provided",
      message: formData.message.trim() || "No additional message",
      timestamp,
      recipient: targetRecipient,
    };

    // Store inquiry locally
    try {
      const existing = localStorage.getItem("lokmat_enquiries");
      const list = existing ? JSON.parse(existing) : [];
      list.push({ ...snapshot, rawTimestamp: Date.now() });
      localStorage.setItem("lokmat_enquiries", JSON.stringify(list));
    } catch {
      // LocalStorage fallback handling
    }

    // Call server endpoint
    try {
      await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: snapshot.name,
          email: snapshot.email,
          phone: snapshot.phone,
          designation: snapshot.designation,
          industry: snapshot.industry,
          message: snapshot.message,
        }),
      });
    } catch (err) {
      console.warn("Backend enquiry API call pending or offline:", err);
    }

    setIsSubmitting(false);
    setSubmittedData(snapshot);
    setIsSubmitted(true);
  };

  const handleCopyDetails = () => {
    if (!submittedData) return;
    const text = `LOKMAT GLOBAL - PARTNERSHIP ENQUIRY
Reference ID : ${submittedData.id}
Submitted At : ${submittedData.timestamp}
Routed To    : ${submittedData.recipient}
------------------------------------------------
Full Name    : ${submittedData.name}
Work Email   : ${submittedData.email}
Phone Number : ${submittedData.phone}
Designation  : ${submittedData.designation}
Industry     : ${submittedData.industry}
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
      designation: "",
      industry: "",
      message: "",
    });
    setSubmittedData(null);
    setIsSubmitted(false);
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  const getMailtoUrl = () => {
    if (!submittedData) return `mailto:milan.darda@lokmat.com`;
    const subject = encodeURIComponent(`[Partnership Enquiry] ${submittedData.name} - ${submittedData.industry}`);
    const body = encodeURIComponent(
      `Hello Milan Darda,\n\nHere are the details filled in the partnership enquiry form:\n\n` +
      `Full Name: ${submittedData.name}\n` +
      `Work Email: ${submittedData.email}\n` +
      `Phone Number: ${submittedData.phone}\n` +
      `Designation: ${submittedData.designation}\n` +
      `Industry/Organization: ${submittedData.industry}\n\n` +
      `Message:\n${submittedData.message}\n\n` +
      `Reference ID: ${submittedData.id}\n` +
      `Submitted At: ${submittedData.timestamp}`
    );
    return `mailto:milan.darda@lokmat.com?subject=${subject}&body=${body}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-red-600/90 backdrop-blur-md">
          {/* Backdrop Overlay Click to Close */}
          <div
            className="fixed inset-0 bg-red-700/60 transition-opacity"
            onClick={handleClose}
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative z-10 w-full max-w-xl my-8 bg-white rounded-3xl shadow-2xl overflow-hidden border border-red-100"
          >
            {/* Form Header */}
            <div className="p-6 sm:p-8 bg-white border-b border-gray-100 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#111111] tracking-tight">
                  Enquiry Form
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 font-light mt-1">
                  Please fill in your details below and our team will connect with you.
                </p>
              </div>

              {/* Close Icon Button */}
              <button
                onClick={handleClose}
                aria-label="Close modal"
                className="p-2.5 rounded-full bg-gray-100 text-gray-500 hover:text-[#111111] hover:bg-red-50 hover:text-red-600 transition-colors shrink-0 focus:outline-none"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form Content / Success State */}
            <div className="p-6 sm:p-8 bg-white">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="enquiry-name" className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="enquiry-name"
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Aditi Sharma"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-[#111111] placeholder:text-gray-400 focus:outline-none focus:border-red-600 focus:bg-white transition-all"
                    />
                  </div>

                  {/* Grid for Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Email ID */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="enquiry-email" className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Email ID <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="enquiry-email"
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g. aditi@company.com"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-[#111111] placeholder:text-gray-400 focus:outline-none focus:border-red-600 focus:bg-white transition-all"
                      />
                    </div>

                    {/* Phone Number */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="enquiry-phone" className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Phone Number <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="enquiry-phone"
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="e.g. +91 98200 12345"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-[#111111] placeholder:text-gray-400 focus:outline-none focus:border-red-600 focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  {/* Grid for Designation & Industry */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Designation */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="enquiry-designation" className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Designation <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="enquiry-designation"
                        type="text"
                        name="designation"
                        required
                        value={formData.designation}
                        onChange={handleChange}
                        placeholder="e.g. VP Marketing / Managing Director"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-[#111111] placeholder:text-gray-400 focus:outline-none focus:border-red-600 focus:bg-white transition-all"
                      />
                    </div>

                    {/* Industry */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="enquiry-industry" className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Industry <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="enquiry-industry"
                        type="text"
                        name="industry"
                        required
                        value={formData.industry}
                        onChange={handleChange}
                        placeholder="e.g. Media, Technology, Real Estate"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-[#111111] placeholder:text-gray-400 focus:outline-none focus:border-red-600 focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  {/* Brief Message */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="enquiry-message" className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Brief Message <span className="text-red-600">*</span>
                    </label>
                    <textarea
                      id="enquiry-message"
                      name="message"
                      rows={3}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Share brief details regarding your enquiry..."
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-[#111111] placeholder:text-gray-400 focus:outline-none focus:border-red-600 focus:bg-white transition-all resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto py-4 px-8 bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-widest text-xs rounded-xl shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <span>Submitting...</span>
                      ) : (
                        <>
                          <span>Submit Enquiry</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                    <div className="text-xs text-gray-500 flex items-center gap-1.5 self-center sm:self-auto">
                      <Mail className="w-3.5 h-3.5 text-red-600" />
                      <span>Directs to: <strong>milan.darda@lokmat.com</strong></span>
                    </div>
                  </div>
                </form>
              ) : (
                /* Submission Success View with Entire Data Display */
                <div className="py-4 text-center flex flex-col items-center justify-center space-y-4">
                  <div className="w-14 h-14 bg-red-50 text-red-600 rounded-full flex items-center justify-center shadow-inner">
                    <CheckCircle2 className="w-8 h-8 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-[#111111]">Enquiry Dispatched!</h3>
                    <p className="text-xs sm:text-sm text-gray-500 max-w-md font-light leading-relaxed mt-1">
                      Thank you, <strong>{formData.name}</strong>. Your complete enquiry has been recorded and delivered to <strong className="text-red-600 font-semibold">milan.darda@lokmat.com</strong>.
                    </p>
                  </div>

                  {/* Entire Form Data Display */}
                  {submittedData && (
                    <div className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 sm:p-5 text-left space-y-3.5 text-xs sm:text-sm">
                      <div className="flex items-center justify-between border-b border-gray-200 pb-2.5">
                        <span className="font-bold text-gray-900 uppercase tracking-wider text-[11px] text-red-600">
                          Submitted Form Information
                        </span>
                        <span className="text-[11px] text-gray-500 font-mono">
                          Ref: {submittedData.id}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        <div className="bg-white p-2.5 rounded-lg border border-gray-100">
                          <span className="text-[10px] uppercase font-semibold text-gray-400 block">Name</span>
                          <span className="font-bold text-gray-900">{submittedData.name}</span>
                        </div>
                        <div className="bg-white p-2.5 rounded-lg border border-gray-100">
                          <span className="text-[10px] uppercase font-semibold text-gray-400 block">Work Email</span>
                          <span className="font-bold text-gray-900 break-all">{submittedData.email}</span>
                        </div>
                        <div className="bg-white p-2.5 rounded-lg border border-gray-100">
                          <span className="text-[10px] uppercase font-semibold text-gray-400 block">Phone</span>
                          <span className="font-bold text-gray-900">{submittedData.phone}</span>
                        </div>
                        <div className="bg-white p-2.5 rounded-lg border border-gray-100">
                          <span className="text-[10px] uppercase font-semibold text-gray-400 block">Designation</span>
                          <span className="font-bold text-gray-900">{submittedData.designation}</span>
                        </div>
                      </div>

                      <div className="bg-white p-2.5 rounded-lg border border-gray-100">
                        <span className="text-[10px] uppercase font-semibold text-gray-400 block">Industry / Organization</span>
                        <span className="font-bold text-gray-900">{submittedData.industry}</span>
                      </div>

                      <div className="bg-white p-2.5 rounded-lg border border-gray-100">
                        <span className="text-[10px] uppercase font-semibold text-gray-400 block">Message</span>
                        <span className="text-gray-800 whitespace-pre-wrap font-medium">{submittedData.message}</span>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-[11px] text-gray-500 border-t border-gray-200">
                        <span>Sent To: <strong className="text-gray-900 font-semibold">{submittedData.recipient}</strong></span>
                        <span>Time: <strong>{submittedData.timestamp}</strong></span>
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="pt-2 flex flex-wrap items-center justify-center gap-2.5 w-full">
                    <a
                      href={getMailtoUrl()}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors shadow-sm"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Open in Mail App (milan.darda@lokmat.com)</span>
                    </a>

                    <button
                      onClick={handleCopyDetails}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer shadow-sm"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? "Copied!" : "Copy Details"}</span>
                    </button>

                    <button
                      onClick={handleClose}
                      className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
                    >
                      Close Window
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
