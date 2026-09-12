import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import { FileText } from "lucide-react";

export default function Terms() {
  return (
    <div className="w-[100vw] overflow-x-hidden min-h-screen bg-[#FAFAFA] text-[#111111] flex flex-col font-sans">
      <Navbar />
      <main className="flex-1 w-[100vw] pt-[127px] pb-[30px] md:pt-[147px] md:pb-32 px-[3%] max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-6 text-red-600 font-bold uppercase tracking-widest text-xs">
          <FileText className="w-5 h-5" /> Legal Terms
        </div>
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-8">
          Terms & Conditions
        </h1>
        <div className="prose prose-lg max-w-none text-gray-600 space-y-6 leading-relaxed font-light">
          <p>
            Welcome to Lokmat Experiences. By accessing or using this website, attending our summits, or engaging with our event platforms, you agree to comply with and be bound by the following Terms & Conditions.
          </p>
          <h2 className="text-xl font-bold text-[#111111] pt-4">1. Intellectual Property</h2>
          <p>
            All content, brand logos, event graphics, trademarks, photography, and video recordings displayed on this website are the property of Lokmat Media Pvt. Ltd. or its respective brand partners. Unauthorized reproduction or redistribution is prohibited.
          </p>
          <h2 className="text-xl font-bold text-[#111111] pt-4">2. Event Participation & Conduct</h2>
          <p>
            Lokmat reserves the right to alter event schedules, speaker lineups, venues, or access rules for summits and awards. Attendees are expected to maintain professional decorum at all official functions.
          </p>
          <h2 className="text-xl font-bold text-[#111111] pt-4">3. Governing Law & Jurisdiction</h2>
          <p>
            These terms shall be governed by and construed in accordance with the laws of India, with jurisdiction in Maharashtra.
          </p>
          <h2 className="text-xl font-bold text-[#111111] pt-4">4. Office Contact</h2>
          <p>
            For official inquiries regarding these terms:
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
