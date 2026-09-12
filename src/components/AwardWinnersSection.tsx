import { useState, useEffect, useCallback } from "react";
import { LokmatEvent } from "@/src/types";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

interface AwardData {
  awardName: string;
  awardSubtitle?: string;
  trophyImage: string;
}

const TROPHY_IMAGES: Record<string, string> = {
  "Hong Kong Trophy": "https://static.wixstatic.com/media/548938_d09ae19c52eb479496863821f04cb8a3~mv2.png",
  "Hong Kong Trophy, Hong Kong": "https://static.wixstatic.com/media/548938_d09ae19c52eb479496863821f04cb8a3~mv2.png",
  "Dubai Trophy": "https://static.wixstatic.com/media/548938_951587d6f5e44ae3803383883269cbc1~mv2.png",
  "Dubai Trophy, Dubai": "https://static.wixstatic.com/media/548938_951587d6f5e44ae3803383883269cbc1~mv2.png",
  "Lokmat Global Excellence Award": "https://static.wixstatic.com/media/548938_2fa722912316444dba5be87e11bd33bf~mv2.png",
  "Lokmat Global Excellence Award, Cairo": "https://static.wixstatic.com/media/548938_2fa722912316444dba5be87e11bd33bf~mv2.png",
  "Lokmat Global Changemakers Award, Mauritius": "https://static.wixstatic.com/media/548938_cf283b32490245b7abef56f00903fe4f~mv2.png",
  "Lokmat Global Icon Power Couple Award, Mauritius": "https://static.wixstatic.com/media/548938_b856ac21fdd24a5e951624170c5b8b60~mv2.png",
  "Lokmat Global Power Couple Award, Mauritius": "https://static.wixstatic.com/media/548938_084bb6b595a84c96acb0730d79c98240~mv2.png",
  "Lokmat Bharat Bhushan Award": "https://static.wixstatic.com/media/548938_977bc89c8ad94e958d1c97178adfc1dd~mv2.png",
  "Lokmat Bharat Bhushan Award, London": "https://static.wixstatic.com/media/548938_977bc89c8ad94e958d1c97178adfc1dd~mv2.png",
  "Lokmat Global Icon Award": "https://static.wixstatic.com/media/548938_9d91ea1bcf164e6aaaa5795885ac6050~mv2.png",
  "Lokmat Global Icon Award, Cairo": "https://static.wixstatic.com/media/548938_9d91ea1bcf164e6aaaa5795885ac6050~mv2.png",
  "Lokmat Global Industry Awards": "https://static.wixstatic.com/media/548938_c0f2feec36ad400cab92653b3557c53b~mv2.png",
  "Lokmat Global Industry Awards, Baku": "https://static.wixstatic.com/media/548938_c0f2feec36ad400cab92653b3557c53b~mv2.png",
  "Lokmat Global Sakhi Awards, Singapore": "https://static.wixstatic.com/media/548938_adfd1b5219f548d0a8697c797d80fb12~mv2.png",
  "Lokmat Global Sakhi Awards, London": "https://static.wixstatic.com/media/548938_6403716513614bd6a16dc3de4b04a482~mv2.png",
  "Lokmat Gujarat Ratna Awards": "https://static.wixstatic.com/media/548938_c03bea0990074d6e8c592946d198ccaa~mv2.png",
  "Lokmat Gujarat Ratna Awards, London": "https://static.wixstatic.com/media/548938_c03bea0990074d6e8c592946d198ccaa~mv2.png",
  "Lokmat Global Trailblazers Awards": "https://static.wixstatic.com/media/548938_26ae440f87a444aaac8a54c53dbdb646~mv2.png",
  "Lokmat Global Trailblazers Awards, Singapore": "https://static.wixstatic.com/media/548938_26ae440f87a444aaac8a54c53dbdb646~mv2.png",
  "Lokmat Global Trailblazers Awards, Baku": "https://static.wixstatic.com/media/548938_26ae440f87a444aaac8a54c53dbdb646~mv2.png",
  "Lokmat Maharashtra Ratna Awards": "https://static.wixstatic.com/media/548938_45d96b0c26284e84bc98deeceb49a956~mv2.png",
  "Lokmat Maharashtra Ratna Awards, London": "https://static.wixstatic.com/media/548938_45d96b0c26284e84bc98deeceb49a956~mv2.png",
  "Lokmat Kohinoor of India": "https://static.wixstatic.com/media/548938_c5d7c9f2c54545dc906d0c699cf5dc9d~mv2.png",
  "Lokmat Kohinoor of India, London": "https://static.wixstatic.com/media/548938_c5d7c9f2c54545dc906d0c699cf5dc9d~mv2.png",
  "Lokmat Marudhar Sanman": "https://static.wixstatic.com/media/548938_cd16264bdf15472b8e9ecd547bd24ecb~mv2.png",
  "Lokmat Marudhar Sanman, Singapore": "https://static.wixstatic.com/media/548938_cd16264bdf15472b8e9ecd547bd24ecb~mv2.png",
};

const awardDataMap: Record<string, AwardData[]> = {
  // Dubai - 1 Trophy
  "dubai-2023": [
    {
      awardName: "Dubai Trophy, Dubai",
      trophyImage: "https://static.wixstatic.com/media/548938_951587d6f5e44ae3803383883269cbc1~mv2.png"
    }
  ],

  // Singapore - 3 Awards
  "singapore-2024": [
    {
      awardName: "Lokmat Marudhar Sanman, Singapore",
      trophyImage: "https://static.wixstatic.com/media/548938_cd16264bdf15472b8e9ecd547bd24ecb~mv2.png"
    },
    {
      awardName: "Lokmat Global Sakhi Awards, Singapore",
      trophyImage: "https://static.wixstatic.com/media/548938_adfd1b5219f548d0a8697c797d80fb12~mv2.png"
    },
    {
      awardName: "Lokmat Global Trailblazers Awards, Singapore",
      trophyImage: "https://static.wixstatic.com/media/548938_26ae440f87a444aaac8a54c53dbdb646~mv2.png"
    }
  ],
  "1": [
    {
      awardName: "Lokmat Marudhar Sanman, Singapore",
      trophyImage: "https://static.wixstatic.com/media/548938_cd16264bdf15472b8e9ecd547bd24ecb~mv2.png"
    },
    {
      awardName: "Lokmat Global Sakhi Awards, Singapore",
      trophyImage: "https://static.wixstatic.com/media/548938_adfd1b5219f548d0a8697c797d80fb12~mv2.png"
    },
    {
      awardName: "Lokmat Global Trailblazers Awards, Singapore",
      trophyImage: "https://static.wixstatic.com/media/548938_26ae440f87a444aaac8a54c53dbdb646~mv2.png"
    }
  ],

  // Baku - 2 Awards
  "baku-2024": [
    {
      awardName: "Lokmat Global Trailblazers Awards, Baku",
      trophyImage: "https://static.wixstatic.com/media/548938_26ae440f87a444aaac8a54c53dbdb646~mv2.png"
    },
    {
      awardName: "Lokmat Global Industry Awards, Baku",
      trophyImage: "https://static.wixstatic.com/media/548938_c0f2feec36ad400cab92653b3557c53b~mv2.png"
    }
  ],

  // Hong Kong - 1 Trophy
  "hong-kong-macau-2025": [
    {
      awardName: "Hong Kong Trophy, Hong Kong",
      trophyImage: "https://static.wixstatic.com/media/548938_d09ae19c52eb479496863821f04cb8a3~mv2.png"
    }
  ],

  // London - 5 Awards (Complete row of 5)
  "london-2025": [
    {
      awardName: "Lokmat Bharat Bhushan Award, London",
      trophyImage: "https://static.wixstatic.com/media/548938_977bc89c8ad94e958d1c97178adfc1dd~mv2.png"
    },
    {
      awardName: "Lokmat Global Sakhi Awards, London",
      trophyImage: "https://static.wixstatic.com/media/548938_6403716513614bd6a16dc3de4b04a482~mv2.png"
    },
    {
      awardName: "Lokmat Gujarat Ratna Awards, London",
      trophyImage: "https://static.wixstatic.com/media/548938_c03bea0990074d6e8c592946d198ccaa~mv2.png"
    },
    {
      awardName: "Lokmat Kohinoor of India, London",
      trophyImage: "https://static.wixstatic.com/media/548938_c5d7c9f2c54545dc906d0c699cf5dc9d~mv2.png"
    },
    {
      awardName: "Lokmat Maharashtra Ratna Awards, London",
      trophyImage: "https://static.wixstatic.com/media/548938_45d96b0c26284e84bc98deeceb49a956~mv2.png"
    }
  ],

  // Cairo - 2 Awards
  "cairo-2026": [
    {
      awardName: "Lokmat Global Excellence Award, Cairo",
      trophyImage: "https://static.wixstatic.com/media/548938_2fa722912316444dba5be87e11bd33bf~mv2.png"
    },
    {
      awardName: "Lokmat Global Icon Award, Cairo",
      trophyImage: "https://static.wixstatic.com/media/548938_9d91ea1bcf164e6aaaa5795885ac6050~mv2.png"
    }
  ],

  // Mauritius - 3 Awards
  "mauritius-2026": [
    {
      awardName: "Lokmat Global Changemakers Award, Mauritius",
      trophyImage: "https://static.wixstatic.com/media/548938_cf283b32490245b7abef56f00903fe4f~mv2.png"
    },
    {
      awardName: "Lokmat Global Icon Power Couple Award, Mauritius",
      trophyImage: "https://static.wixstatic.com/media/548938_b856ac21fdd24a5e951624170c5b8b60~mv2.png"
    },
    {
      awardName: "Lokmat Global Power Couple Award, Mauritius",
      trophyImage: "https://static.wixstatic.com/media/548938_084bb6b595a84c96acb0730d79c98240~mv2.png"
    }
  ]
};

// Curated authentic award winners and event articles pictures for each event (3 in a row)
const articlesAndWinnersMap: Record<string, string[]> = {
  // Mauritius 2026
  "mauritius-2026": [
    "https://static.wixstatic.com/media/548938_33bb469960ad492e9505703b25d99b87~mv2.jpeg",
    "https://static.wixstatic.com/media/548938_30bd8fe984454c739901e269ca801885~mv2.jpeg",
    "https://static.wixstatic.com/media/548938_e5c40bbbf62c44caad59c9e84b17841c~mv2.jpeg",
    "https://static.wixstatic.com/media/548938_55bfdcda2bd84414b320b069b85fc28a~mv2.jpeg",
    "https://static.wixstatic.com/media/548938_1005a7325ceb435f9af5c5e6dff9f0bf~mv2.jpeg",
    "https://static.wixstatic.com/media/548938_1d9566605f734e9583adfeaa46083606~mv2.jpeg",
    "https://static.wixstatic.com/media/548938_04a01ed137724faab90ce2a52b1c5ef4~mv2.jpeg"
  ],

  // London 2025
  "london-2025": [
    "https://static.wixstatic.com/media/548938_e42346ac7d7e4ef9b50ac68a952eea6c~mv2.jpeg",
    "https://static.wixstatic.com/media/548938_da551661f0444968b53bafe248281a61~mv2.jpeg",
    "https://static.wixstatic.com/media/548938_9bd2855437c04b7aad71caffae3ab252~mv2.jpeg",
    "https://static.wixstatic.com/media/548938_35cecfe04af3451da9e0e6286e088f71~mv2.jpeg",
    "https://static.wixstatic.com/media/548938_d9b2d4faf17d4255b6abadebcbfcfc8f~mv2.jpeg",
    "https://static.wixstatic.com/media/548938_d72349cae02544d5be3c328ffc8a64e9~mv2.jpeg"
  ],

  // Singapore 2024
  "singapore-2024": [
    "https://static.wixstatic.com/media/548938_efdc106b18524864b77cdfe1ac50b35a~mv2.jpeg",
    "https://static.wixstatic.com/media/548938_ddcc88784e0742b48da4ce9a569df2e7~mv2.jpeg",
    "https://static.wixstatic.com/media/548938_4e9ac6bac28e4a15ad4a316dda9ef398~mv2.jpeg",
    "https://static.wixstatic.com/media/548938_154397bd05a04687a3b30e33a4dc3091~mv2.jpeg",
    "https://static.wixstatic.com/media/548938_2bf0e8b4ec3a41b2bed785dc87de6793~mv2.jpeg",
    "https://static.wixstatic.com/media/548938_f3d8cab9403e49feabb1319e33c54115~mv2.jpeg",
    "https://static.wixstatic.com/media/548938_540ecff1e3d04e608932d2e4070c6896~mv2.jpeg",
    "https://static.wixstatic.com/media/548938_a7624194ce2e49c7bcb85680df176e30~mv2.jpeg",
    "https://static.wixstatic.com/media/548938_b0edcbd8d3d348d499a03b36d8b5b4f4~mv2.jpeg",
    "https://static.wixstatic.com/media/548938_73b0dc2e8c6a4c2db9c7e4ffeb2dce7f~mv2.jpeg",
    "https://static.wixstatic.com/media/548938_a7f297c16d8b4e078c061e3d26ad929c~mv2.jpeg",
    "https://static.wixstatic.com/media/548938_c0860565d08942fe90d5d17233c77632~mv2.jpeg"
  ],
  "1": [
    "https://static.wixstatic.com/media/548938_efdc106b18524864b77cdfe1ac50b35a~mv2.jpeg",
    "https://static.wixstatic.com/media/548938_ddcc88784e0742b48da4ce9a569df2e7~mv2.jpeg",
    "https://static.wixstatic.com/media/548938_4e9ac6bac28e4a15ad4a316dda9ef398~mv2.jpeg",
    "https://static.wixstatic.com/media/548938_154397bd05a04687a3b30e33a4dc3091~mv2.jpeg",
    "https://static.wixstatic.com/media/548938_2bf0e8b4ec3a41b2bed785dc87de6793~mv2.jpeg",
    "https://static.wixstatic.com/media/548938_f3d8cab9403e49feabb1319e33c54115~mv2.jpeg",
    "https://static.wixstatic.com/media/548938_540ecff1e3d04e608932d2e4070c6896~mv2.jpeg",
    "https://static.wixstatic.com/media/548938_a7624194ce2e49c7bcb85680df176e30~mv2.jpeg",
    "https://static.wixstatic.com/media/548938_b0edcbd8d3d348d499a03b36d8b5b4f4~mv2.jpeg",
    "https://static.wixstatic.com/media/548938_73b0dc2e8c6a4c2db9c7e4ffeb2dce7f~mv2.jpeg",
    "https://static.wixstatic.com/media/548938_a7f297c16d8b4e078c061e3d26ad929c~mv2.jpeg",
    "https://static.wixstatic.com/media/548938_c0860565d08942fe90d5d17233c77632~mv2.jpeg"
  ],

  // Baku 2024
  "baku-2024": [
    "https://static.wixstatic.com/media/548938_d6e6fb602cde4cb8ab4673a9b1a75c4e~mv2.jpg",
    "https://static.wixstatic.com/media/548938_801555c0b96f487f8435536325b6902e~mv2.jpg",
    "https://static.wixstatic.com/media/548938_178658f08f6d487697300102e2df05ed~mv2.jpg",
    "https://static.wixstatic.com/media/548938_df3137aca94d4ffdb8ec6f3730c99f92~mv2.jpg",
    "https://static.wixstatic.com/media/548938_60d5ac560b6c4236a2aba9cd75a4c542~mv2.jpg",
    "https://static.wixstatic.com/media/548938_e72e0a23d7194c1cb1497c0c0fc99b6c~mv2.jpg"
  ],

  // Hong Kong & Macau 2025
  "hong-kong-macau-2025": [
    "https://static.wixstatic.com/media/548938_9548fde182f34469ae7b8aa41b781a81~mv2.jpg",
    "https://static.wixstatic.com/media/548938_30e8b7fde488472a881490e41fe8e18a~mv2.jpg",
    "https://static.wixstatic.com/media/548938_fab36fabbc74484b9d4f9a66702fef69~mv2.jpg",
    "https://static.wixstatic.com/media/548938_007934490b504024afc2cc6ccc472252~mv2.jpg",
    "https://static.wixstatic.com/media/548938_29614dff8fbb4da69212e1af35d7961e~mv2.jpg",
    "https://static.wixstatic.com/media/548938_11904c4021e84c8ead2f68bd201bbe9c~mv2.jpg"
  ],

  // Cairo 2026
  "cairo-2026": [
    "https://static.wixstatic.com/media/548938_2a7180acb60d4c80819cebd3edc65aef~mv2.jpeg",
    "https://static.wixstatic.com/media/548938_588c9887056e4d48a8490aff1d22b8b5~mv2.jpeg"
  ],

  // Dubai 2023
  "dubai-2023": [
    "https://static.wixstatic.com/media/548938_e27482ebd1ef499db675193aa77055e0~mv2.jpg",
    "https://static.wixstatic.com/media/548938_2f1808df0b0b4e80a0ba733650a0db15~mv2.jpg",
    "https://static.wixstatic.com/media/548938_6dd00c145aac47b6bdf40b683f982968~mv2.jpg",
    "https://static.wixstatic.com/media/548938_a14443078d4b410191b30a24d8839c04~mv2.jpg",
    "https://static.wixstatic.com/media/548938_ec71c951ee4a481fa68dcb6d95d01b33~mv2.jpg",
    "https://static.wixstatic.com/media/548938_7bb51081bba74cdf921b3bc4cb4935a0~mv2.jpg"
  ]
};

interface AwardWinnersSectionProps {
  event: LokmatEvent;
}

export default function AwardWinnersSection({ event }: AwardWinnersSectionProps) {
  const [fullscreenIndex, setFullscreenIndex] = useState<number | null>(null);

  // Get awards list for event
  let awardsList = awardDataMap[event.id];

  // Fallback check by location name
  if (!awardsList) {
    const loc = (event.location || "").toLowerCase();
    if (loc.includes("mauritius")) {
      awardsList = awardDataMap["mauritius-2026"];
    } else if (loc.includes("dubai")) {
      awardsList = awardDataMap["dubai-2023"];
    } else if (loc.includes("singapore")) {
      awardsList = awardDataMap["singapore-2024"];
    } else if (loc.includes("baku")) {
      awardsList = awardDataMap["baku-2024"];
    } else if (loc.includes("hong kong") || loc.includes("macau")) {
      awardsList = awardDataMap["hong-kong-macau-2025"];
    } else if (loc.includes("london")) {
      awardsList = awardDataMap["london-2025"];
    } else if (loc.includes("cairo") || loc.includes("egypt")) {
      awardsList = awardDataMap["cairo-2026"];
    }
  }

  // Generic fallback if still not matched
  if (!awardsList || awardsList.length === 0) {
    const baseTitle = event.title.split(' – ')[0] || event.title;
    awardsList = [
      {
        awardName: `${baseTitle} Trophy`,
        trophyImage: "https://images.unsplash.com/photo-1578269174936-2709b6aeb913?auto=format&fit=crop&q=80&w=800"
      }
    ];
  }

  // Helper to determine the event city name
  const getEventCity = (ev: LokmatEvent): string => {
    const loc = (ev.location || "").toLowerCase();
    const id = (ev.id || "").toLowerCase();
    if (loc.includes("london") || id.includes("london")) return "London";
    if (loc.includes("mauritius") || id.includes("mauritius")) return "Mauritius";
    if (loc.includes("cairo") || id.includes("cairo") || loc.includes("egypt")) return "Cairo";
    if (loc.includes("singapore") || id.includes("singapore")) return "Singapore";
    if (loc.includes("baku") || id.includes("baku")) return "Baku";
    if (loc.includes("hong kong") || loc.includes("macau") || id.includes("hong-kong")) return "Hong Kong";
    if (loc.includes("dubai") || id.includes("dubai")) return "Dubai";
    return ev.location ? ev.location.split(",")[0].trim() : "";
  };

  const eventCity = getEventCity(event);

  const formatAwardTitle = (name: string): string => {
    if (!eventCity) return name;
    if (name.toLowerCase().includes(eventCity.toLowerCase())) {
      return name;
    }
    return `${name}, ${eventCity}`;
  };

  // Get articles and winners pictures
  let pictures = articlesAndWinnersMap[event.id];
  if (!pictures) {
    const loc = (event.location || "").toLowerCase();
    if (loc.includes("mauritius")) {
      pictures = articlesAndWinnersMap["mauritius-2026"];
    } else if (loc.includes("dubai")) {
      pictures = articlesAndWinnersMap["dubai-2023"];
    } else if (loc.includes("singapore")) {
      pictures = articlesAndWinnersMap["singapore-2024"];
    } else if (loc.includes("baku")) {
      pictures = articlesAndWinnersMap["baku-2024"];
    } else if (loc.includes("hong kong") || loc.includes("macau")) {
      pictures = articlesAndWinnersMap["hong-kong-macau-2025"];
    } else if (loc.includes("london")) {
      pictures = articlesAndWinnersMap["london-2025"];
    } else if (loc.includes("cairo") || loc.includes("egypt")) {
      pictures = articlesAndWinnersMap["cairo-2026"];
    }
  }

  if (!pictures || pictures.length === 0) {
    pictures = event.gallery && event.gallery.length >= 3 
      ? event.gallery.slice(0, 6) 
      : [
          "https://static.wixstatic.com/media/548938_e42346ac7d7e4ef9b50ac68a952eea6c~mv2.jpeg",
          "https://static.wixstatic.com/media/548938_da551661f0444968b53bafe248281a61~mv2.jpeg",
          "https://static.wixstatic.com/media/548938_9bd2855437c04b7aad71caffae3ab252~mv2.jpeg",
          "https://static.wixstatic.com/media/548938_35cecfe04af3451da9e0e6286e088f71~mv2.jpeg",
          "https://static.wixstatic.com/media/548938_d9b2d4faf17d4255b6abadebcbfcfc8f~mv2.jpeg",
          "https://static.wixstatic.com/media/548938_d72349cae02544d5be3c328ffc8a64e9~mv2.jpeg"
        ];
  }

  // Lightbox handlers
  const handleCloseFullscreen = useCallback(() => {
    setFullscreenIndex(null);
  }, []);

  const handleNext = useCallback(() => {
    if (fullscreenIndex !== null && pictures) {
      setFullscreenIndex((fullscreenIndex + 1) % pictures.length);
    }
  }, [fullscreenIndex, pictures]);

  const handlePrev = useCallback(() => {
    if (fullscreenIndex !== null && pictures) {
      setFullscreenIndex((fullscreenIndex - 1 + pictures.length) % pictures.length);
    }
  }, [fullscreenIndex, pictures]);

  // Keyboard navigation for fullscreen lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (fullscreenIndex === null) return;
      if (e.key === "Escape") handleCloseFullscreen();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    if (fullscreenIndex !== null) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [fullscreenIndex, handleCloseFullscreen, handleNext, handlePrev]);

  return (
    <div className="w-full">
      {/* 1. Awards Section: Grid of 5 awards in 1 row (starts from left, remainder empty) */}
      <div className="w-full mt-[60px] pt-0 md:my-12 md:pt-10 border-t border-gray-200">
        <h4 className="text-2xl font-bold mb-6 tracking-tight text-[#111111]">
          Awards
        </h4>

        {/* 5-column grid across 1 row on large displays */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {awardsList.map((data, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 shadow-[0_8px_30px_rgba(0,0,0,0.04)] p-3.5 sm:p-4 rounded-2xl sm:rounded-3xl flex flex-col justify-between hover:shadow-[0_12px_36px_rgba(0,0,0,0.08)] hover:border-red-200 transition-all duration-300"
            >
              <div className="min-h-[44px] sm:min-h-[48px] flex flex-col justify-start">
                <h5 className="text-sm sm:text-base font-bold tracking-tight text-[#111111] leading-snug">
                  {formatAwardTitle(data.awardName)}
                </h5>
              </div>

              {/* Trophy image container: 1:1 square aspect ratio, image completely fills the block without any visible grey margin */}
              <div className="relative w-full aspect-square rounded-xl sm:rounded-2xl overflow-hidden mt-3">
                <img
                  src={TROPHY_IMAGES[formatAwardTitle(data.awardName)] || TROPHY_IMAGES[data.awardName] || data.trophyImage}
                  alt={formatAwardTitle(data.awardName)}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.src = "https://static.wixstatic.com/media/548938_2fa722912316444dba5be87e11bd33bf~mv2.png";
                  }}
                  className="w-full h-full object-cover object-center rounded-xl sm:rounded-2xl transition-transform duration-300 hover:scale-105"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Award Winners and Event Articles Section (3 in a row pictures, no title, full screen on click) */}
      <div className="w-full mt-[60px] pt-0 md:my-12 md:pt-10 border-t border-gray-200">
        <h4 className="text-2xl font-bold mb-6 tracking-tight text-[#111111]">
          Award Winners and Event Articles
        </h4>

        {/* 3 in a row pictures: 1:1 ratio, placed on clean white block with rounded corners in original sizes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {pictures.map((imgUrl, idx) => (
            <div
              key={idx}
              onClick={() => setFullscreenIndex(idx)}
              className="group relative aspect-square rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer bg-white border border-gray-200 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] hover:border-gray-300 transition-all duration-300 p-4 sm:p-5 flex items-center justify-center"
            >
              <img
                src={imgUrl}
                alt=""
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain rounded-xl transition-transform duration-300 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center pointer-events-none rounded-2xl sm:rounded-3xl">
                <div className="opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-300 p-3 rounded-full bg-white/95 text-gray-900 shadow-lg border border-gray-100">
                  <Maximize2 className="w-5 h-5 text-gray-900" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {fullscreenIndex !== null && pictures[fullscreenIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleCloseFullscreen}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 select-none"
          >
            {/* Close button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleCloseFullscreen();
              }}
              aria-label="Close full screen"
              className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2.5 sm:p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors cursor-pointer z-50"
            >
              <X className="w-6 h-6 sm:w-7 sm:h-7" />
            </button>

            {/* Counter indicator */}
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 px-4 py-1.5 rounded-full bg-white/10 text-white text-xs sm:text-sm font-medium tracking-wider backdrop-blur-sm">
              {fullscreenIndex + 1} / {pictures.length}
            </div>

            {/* Prev button */}
            {pictures.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                aria-label="Previous image"
                className="absolute left-3 sm:left-6 p-2.5 sm:p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors cursor-pointer z-50"
              >
                <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
              </button>
            )}

            {/* Next button */}
            {pictures.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                aria-label="Next image"
                className="absolute right-3 sm:right-6 p-2.5 sm:p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors cursor-pointer z-50"
              >
                <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
              </button>
            )}

            {/* Main Fullscreen Image */}
            <motion.div
              key={fullscreenIndex}
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[88vh] max-w-[92vw] flex items-center justify-center relative"
            >
              <img
                src={pictures[fullscreenIndex]}
                alt=""
                referrerPolicy="no-referrer"
                className="max-h-[88vh] max-w-[92vw] object-contain rounded-xl shadow-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
