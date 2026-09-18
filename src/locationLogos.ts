export const LOCATION_LOGOS: Record<string, string> = {
  mauritius: "https://static.wixstatic.com/media/548938_438b462f94964b7db67be6832c7f0c8a~mv2.jpeg",
  baku: "https://static.wixstatic.com/media/548938_a5d6be6c6d8e45638fcb7df2bd13c34a~mv2.png",
  dubai: "https://static.wixstatic.com/media/548938_a60af7ec1b614f34a373233455bbd3d7~mv2.png",
  "hong kong": "https://static.wixstatic.com/media/548938_b6ac96c297934e36b9e0d49f52e67036~mv2.png",
  macau: "https://static.wixstatic.com/media/548938_b6ac96c297934e36b9e0d49f52e67036~mv2.png",
  london: "https://static.wixstatic.com/media/548938_f73683c6cb494dae9d199c55838ddf01~mv2.png",
  cairo: "https://static.wixstatic.com/media/548938_37c105393e5d487895641e750062cf92~mv2.png",
  egypt: "https://static.wixstatic.com/media/548938_37c105393e5d487895641e750062cf92~mv2.png",
  singapore: "https://static.wixstatic.com/media/548938_d803581c573846a8bf97d7f6bf982637~mv2.png",
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
