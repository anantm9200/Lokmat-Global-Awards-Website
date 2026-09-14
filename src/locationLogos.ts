import { getOptimizedImageUrl } from "./utils/imageOptimizer";

export const LOCATION_LOGOS: Record<string, string> = {
  mauritius: getOptimizedImageUrl("https://static.wixstatic.com/media/548938_9e17a561cd3a45d49344c302d18c3e59~mv2.png", { width: 120, height: 120, quality: 80 }),
  baku: getOptimizedImageUrl("https://static.wixstatic.com/media/548938_1ab989b4e53944148b356acca3d590bd~mv2.png", { width: 120, height: 120, quality: 80 }),
  dubai: getOptimizedImageUrl("https://static.wixstatic.com/media/548938_a197a9bae5b84d93920a8f6feeb15841~mv2.png", { width: 120, height: 120, quality: 80 }),
  "hong kong": getOptimizedImageUrl("https://static.wixstatic.com/media/548938_ffe099d2f4ed4e8eb57c90cabf19628f~mv2.png", { width: 120, height: 120, quality: 80 }),
  macau: getOptimizedImageUrl("https://static.wixstatic.com/media/548938_ffe099d2f4ed4e8eb57c90cabf19628f~mv2.png", { width: 120, height: 120, quality: 80 }),
  london: getOptimizedImageUrl("https://static.wixstatic.com/media/548938_1fd265b8996d407995b8147541858509~mv2.jpg", { width: 120, height: 120, quality: 80 }),
  cairo: getOptimizedImageUrl("https://static.wixstatic.com/media/548938_f3b5076c66b8459ab236b19a2cce9775~mv2.png", { width: 120, height: 120, quality: 80 }),
  egypt: getOptimizedImageUrl("https://static.wixstatic.com/media/548938_f3b5076c66b8459ab236b19a2cce9775~mv2.png", { width: 120, height: 120, quality: 80 }),
  singapore: getOptimizedImageUrl("https://static.wixstatic.com/media/548938_e9fa4e9a5f1b40f9a16d85af6ca4b2dd~mv2.png", { width: 120, height: 120, quality: 80 }),
};

export function getLocationLogo(locationOrTitle: string): string {
  const str = (locationOrTitle || "").toLowerCase();
  if (str.includes("mauritius")) return LOCATION_LOGOS["mauritius"];
  if (str.includes("cairo") || str.includes("egypt")) return LOCATION_LOGOS["cairo"];
  if (str.includes("dubai")) return LOCATION_LOGOS["dubai"];
  if (str.includes("hong kong") || str.includes("macau")) return LOCATION_LOGOS["hong kong"];
  if (str.includes("london")) return LOCATION_LOGOS["london"];
  if (str.includes("singapore")) return LOCATION_LOGOS["singapore"];
  if (str.includes("baku")) return LOCATION_LOGOS["baku"];
  return LOCATION_LOGOS["mauritius"];
}
