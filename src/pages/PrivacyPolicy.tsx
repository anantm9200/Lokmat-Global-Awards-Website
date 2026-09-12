import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import { ShieldCheck } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="w-[100vw] overflow-x-hidden min-h-screen bg-[#FAFAFA] text-[#111111] flex flex-col font-sans">
      <Navbar />
      <main className="flex-1 w-[100vw] pt-[127px] pb-[30px] md:pt-[147px] md:pb-32 px-[3%] max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-6 text-red-600 font-bold uppercase tracking-widest text-xs">
          <ShieldCheck className="w-5 h-5" /> Privacy Policy
        </div>
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-8">
          Privacy Policy
        </h1>
        <div className="prose prose-lg max-w-none text-gray-600 space-y-6 leading-relaxed font-light">
          <p>
            Lokmat Media Pvt. Ltd. (“Lokmat”, “we”, “us”, or “our”) is committed to protecting your privacy and ensuring that your personal data is handled securely and responsibly. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our Lokmat Experiences platform or participate in our events and awards.
          </p>
          <h2 className="text-xl font-bold text-[#111111] pt-4">1. Information We Collect</h2>
          <p>
            We may collect personal details such as your name, email address, phone number, organization, designation, and registration details when you submit inquiries, subscribe to our newsletter, or register for Lokmat events and conclaves.
          </p>
          <h2 className="text-xl font-bold text-[#111111] pt-4">2. How We Use Your Information</h2>
          <p>
            We use the information collected to manage event participation, process award nominations, communicate official updates and event itineraries, respond to inquiries, and improve our platform experience.
          </p>
          <h2 className="text-xl font-bold text-[#111111] pt-4">3. Data Security & Confidentiality</h2>
          <p>
            We maintain robust technical and organizational security measures to protect your personal information against unauthorized access, loss, or misuse.
          </p>
          <h2 className="text-xl font-bold text-[#111111] pt-4">4. Contact Us</h2>
          <p>
            For any questions or concerns regarding this Privacy Policy, please contact us at our office:
          </p>
          <div className="bg-neutral-50 p-6 rounded-xl border border-gray-200 not-prose space-y-2 text-sm text-gray-700">
            <p className="font-bold text-[#111111]">Lokmat Media Pvt. Ltd.</p>
            <p>Law College Rd, Shanti Sheela Society, Erandwane, Pune, Maharashtra 411038</p>
            <p>Phone: <a href="tel:02066848586" className="text-red-600 font-semibold hover:underline">020 6684 8586</a></p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
