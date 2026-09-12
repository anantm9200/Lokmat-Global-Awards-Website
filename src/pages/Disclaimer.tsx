import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import { AlertCircle } from "lucide-react";

export default function Disclaimer() {
  return (
    <div className="w-[100vw] overflow-x-hidden min-h-screen bg-[#FAFAFA] text-[#111111] flex flex-col font-sans">
      <Navbar />
      <main className="flex-1 w-[100vw] pt-[127px] pb-[30px] md:pt-[147px] md:pb-32 px-[3%] max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-6 text-red-600 font-bold uppercase tracking-widest text-xs">
          <AlertCircle className="w-5 h-5" /> Important Notice
        </div>
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-8">
          Disclaimer
        </h1>
        <div className="prose prose-lg max-w-none text-gray-600 space-y-6 leading-relaxed font-light">
          <p>
            The information provided on Lokmat Experiences website is for general informational and platform engagement purposes only.
          </p>
          <h2 className="text-xl font-bold text-[#111111] pt-4">Event Details & Statements</h2>
          <p>
            While Lokmat Media Pvt. Ltd. makes every effort to keep event itineraries, speaker lists, venue arrangements, and partner details accurate and up to date, changes may occur due to operational or diplomatic reasons without prior notice.
          </p>
          <h2 className="text-xl font-bold text-[#111111] pt-4">External Links & Partners</h2>
          <p>
            Links to external partner websites or media coverage are provided for convenience. Lokmat Media Pvt. Ltd. is not responsible for the content, privacy policies, or practices of third-party external sites.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
