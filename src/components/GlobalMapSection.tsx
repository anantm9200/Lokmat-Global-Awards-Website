import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { Plus, Minus, RotateCcw, Globe, Compass } from "lucide-react";
import { geoEquirectangular, geoPath, geoGraticule } from "d3-geo";
import { feature } from "topojson-client";
import land110m from "world-atlas/land-110m.json";

interface MapNode {
  id: string;
  name: string;
  category: string;
  longitude: number;
  latitude: number;
  dotColor: string;
  isFeatured?: boolean;
}

const mapNodes: MapNode[] = [
  {
    id: "asia",
    name: "Asia",
    category: "ASIA REGION",
    longitude: 78.96,
    latitude: 20.59,
    dotColor: "#F04438",
    isFeatured: true
  },
  {
    id: "europe",
    name: "Europe",
    category: "EUROPE REGION",
    longitude: 10.0,
    latitude: 50.0,
    dotColor: "#FFFFFF"
  },
  {
    id: "africa",
    name: "Africa",
    category: "AFRICA REGION",
    longitude: 22.0,
    latitude: 10.0,
    dotColor: "#A0AEC0"
  }
];

const VIEWBOX_WIDTH = 1000;
const VIEWBOX_HEIGHT = 500;

export default function GlobalMapSection() {
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>("asia");
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoomScale, setZoomScale] = useState<number>(1);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // Drag and Inertia refs
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const velocityRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const animFrameRef = useRef<number | null>(null);
  const dragTimeRef = useRef<number>(0);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  // GeoJSON features memoized
  const landGeoJson = useMemo(() => {
    return feature(land110m as any, land110m.objects.land as any);
  }, []);

  const graticuleGeoJson = useMemo(() => {
    return geoGraticule()();
  }, []);

  // Flat Equirectangular Projection
  const projection = useMemo(() => {
    return geoEquirectangular()
      .scale(155)
      .translate([VIEWBOX_WIDTH / 2, VIEWBOX_HEIGHT / 2]);
  }, []);

  const pathGenerator = useMemo(() => {
    return geoPath().projection(projection);
  }, [projection]);

  // Land and graticule SVG paths
  const landPath = useMemo(() => {
    return pathGenerator(landGeoJson as any) || "";
  }, [pathGenerator, landGeoJson]);

  const graticulePath = useMemo(() => {
    return pathGenerator(graticuleGeoJson as any) || "";
  }, [pathGenerator, graticuleGeoJson]);

  // Inertia animation loop
  const stopInertia = useCallback(() => {
    if (animFrameRef.current !== null) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
  }, []);

  const startInertia = useCallback(() => {
    stopInertia();
    let { x: vx, y: vy } = velocityRef.current;

    const step = () => {
      vx *= 0.92;
      vy *= 0.92;

      if (Math.abs(vx) < 0.1 && Math.abs(vy) < 0.1) {
        animFrameRef.current = null;
        return;
      }

      setPanOffset((prev) => ({
        x: Math.max(-400, Math.min(400, prev.x + vx)),
        y: Math.max(-250, Math.min(250, prev.y + vy))
      }));

      animFrameRef.current = requestAnimationFrame(step);
    };

    animFrameRef.current = requestAnimationFrame(step);
  }, [stopInertia]);

  // Controls
  const handleZoomIn = () => setZoomScale((prev) => Math.min(prev + 0.25, 2.2));
  const handleZoomOut = () => setZoomScale((prev) => Math.max(prev - 0.2, 0.8));
  const handleReset = () => {
    stopInertia();
    setZoomScale(1);
    setPanOffset({ x: 0, y: 0 });
    setHoveredNodeId("asia");
  };

  // Dragging Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    stopInertia();
    setIsDragging(true);
    dragTimeRef.current = Date.now();
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    velocityRef.current = { x: 0, y: 0 };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;

    dragStartRef.current = { x: e.clientX, y: e.clientY };

    velocityRef.current = { x: dx, y: dy };

    setPanOffset((prev) => ({
      x: Math.max(-500, Math.min(500, prev.x + dx)),
      y: Math.max(-300, Math.min(300, prev.y + dy))
    }));
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const elapsed = Date.now() - dragTimeRef.current;
    if (elapsed < 300) {
      startInertia();
    }
  };

  // Touch Handlers for Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      stopInertia();
      setIsDragging(true);
      dragTimeRef.current = Date.now();
      dragStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      velocityRef.current = { x: 0, y: 0 };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;

    const dx = e.touches[0].clientX - dragStartRef.current.x;
    const dy = e.touches[0].clientY - dragStartRef.current.y;

    dragStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };

    velocityRef.current = { x: dx, y: dy };

    setPanOffset((prev) => ({
      x: Math.max(-500, Math.min(500, prev.x + dx)),
      y: Math.max(-300, Math.min(300, prev.y + dy))
    }));
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    startInertia();
  };

  // Keyboard accessibility handler
  const handleKeyDown = (e: React.KeyboardEvent, node: MapNode) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setHoveredNodeId(node.id);
    } else if (e.key === "Escape") {
      setHoveredNodeId(null);
    }
  };

  // Projected marker coordinates
  const projectedNodes = useMemo(() => {
    return mapNodes.map((node) => {
      const pos = projection([node.longitude, node.latitude]);
      return {
        ...node,
        x: pos ? pos[0] : 0,
        y: pos ? pos[1] : 0
      };
    });
  }, [projection]);

  return (
    <section className="pt-[30px] pb-[30px] md:py-16 bg-white relative overflow-hidden border-t border-gray-100">
      <div className="w-full px-[3%]">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-100 text-red-600 font-bold text-xs uppercase tracking-widest mb-3">
            <Globe className="w-3.5 h-3.5 text-red-600 animate-pulse" />
            <span>International Footprint</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#111111]">
            Global Presence
          </h2>
          <p className="text-gray-500 font-light mt-3 text-base md:text-lg">
            Connecting key economic corridors and thought leaders across Asia, Europe, and Africa.
          </p>
        </div>

        {/* Flat World Map Container - #070809 with subtle diagonal halftone texture */}
        <div 
          ref={mapContainerRef}
          className="relative w-full rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl overflow-hidden flex flex-col justify-between select-none border border-gray-800/80"
          style={{
            backgroundColor: "#070809",
            backgroundImage: "repeating-linear-gradient(135deg, rgba(255, 255, 255, 0.018) 0px, rgba(255, 255, 255, 0.018) 1px, transparent 1px, transparent 3px)",
            minHeight: "620px",
            height: "78vh",
            maxHeight: "820px"
          }}
        >
          {/* Top Bar Controls */}
          <div className="relative z-20 flex items-center justify-between w-full">
            {/* Status Indicator Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0E0F11]/90 backdrop-blur-md border border-white/10 text-white text-xs font-semibold shadow-lg">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_#F04438]" />
              <span className="tracking-widest uppercase text-[10px] font-black text-gray-300 flex items-center gap-1.5">
                <Compass className="w-3 h-3 text-red-400" />
                <span>DRAG TO EXPLORE</span>
              </span>
            </div>

            {/* Zoom & Reset Controls */}
            <div className="flex items-center bg-[#0E0F11]/90 backdrop-blur-md border border-white/15 rounded-xl overflow-hidden shadow-xl">
              <button
                onClick={handleZoomIn}
                aria-label="Zoom In"
                className="p-2.5 text-gray-300 hover:text-white hover:bg-white/10 transition-colors border-r border-white/10 focus:outline-none"
              >
                <Plus className="w-4 h-4" />
              </button>
              <button
                onClick={handleZoomOut}
                aria-label="Zoom Out"
                className="p-2.5 text-gray-300 hover:text-white hover:bg-white/10 transition-colors border-r border-white/10 focus:outline-none"
              >
                <Minus className="w-4 h-4" />
              </button>
              <button
                onClick={handleReset}
                aria-label="Reset Map View"
                className="p-2.5 text-gray-300 hover:text-white hover:bg-white/10 transition-colors focus:outline-none"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Draggable Flat Map Stage */}
          <div 
            className={`relative w-full my-auto py-2 flex items-center justify-center overflow-hidden h-[380px] sm:h-auto ${
              isDragging ? "cursor-grabbing" : "cursor-grab"
            }`}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="w-full h-full flex items-center justify-center transition-transform duration-75 ease-out"
              style={{
                transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomScale})`,
                transformOrigin: "center center"
              }}
            >
              <svg
                viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
                className="w-auto h-[360px] min-w-[720px] sm:w-full sm:h-auto sm:min-w-0 sm:max-h-[580px] object-contain filter drop-shadow-[0_20px_60px_rgba(0,0,0,0.9)]"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  {/* Diagonal Pattern for Charcoal Continents */}
                  <pattern
                    id="continentPattern"
                    width="4"
                    height="4"
                    patternUnits="userSpaceOnUse"
                    patternTransform="rotate(135)"
                  >
                    <rect width="4" height="4" fill="#242526" />
                    <line
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="4"
                      stroke="rgba(255, 255, 255, 0.035)"
                      strokeWidth="0.7"
                    />
                  </pattern>

                  {/* Soft Radial Ambient Lighting Behind Active Nodes */}
                  <radialGradient id="glowRed" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#F04438" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#F04438" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Technical Dotted Graticule Grid Lines */}
                <path
                  d={graticulePath}
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.05)"
                  strokeWidth="0.7"
                  strokeDasharray="3 4"
                />

                {/* Charcoal Landmasses with Halftone Diagonal Pattern */}
                <path
                  d={landPath}
                  fill="url(#continentPattern)"
                  stroke="rgba(255, 255, 255, 0.08)"
                  strokeWidth="0.6"
                  strokeLinejoin="round"
                />

                {/* Interactive Location Markers */}
                {projectedNodes.map((node) => {
                  const isHovered = hoveredNodeId === node.id && !isDragging;
                  const isFeatured = node.isFeatured;
                  const nodeColor = node.dotColor;

                  return (
                    <g
                      key={node.id}
                      transform={`translate(${node.x}, ${node.y})`}
                      className="cursor-default transition-transform duration-300 pointer-events-auto"
                      aria-label={`${node.name} - ${node.category}`}
                      onMouseEnter={() => !isDragging && setHoveredNodeId(node.id)}
                    >
                      {/* Outer Glow Halo Ring */}
                      <circle
                        r={isHovered ? "28" : isFeatured ? "20" : "15"}
                        fill={nodeColor}
                        opacity={isHovered ? "0.35" : "0.15"}
                        className={`transition-all duration-300 ${isFeatured ? "animate-pulse" : ""}`}
                      />

                      {/* Middle Ring */}
                      <circle
                        r={isHovered ? "15" : isFeatured ? "11" : "9"}
                        fill="none"
                        stroke={nodeColor}
                        strokeWidth={isHovered ? "2.5" : "1.5"}
                        opacity={isHovered ? "0.9" : "0.6"}
                        className="transition-all duration-300"
                      />

                      {/* Solid Inner Dot */}
                      <circle
                        r={isHovered ? "8" : "5"}
                        fill={nodeColor}
                        className={`transition-all duration-300 filter drop-shadow-[0_0_10px_${nodeColor}]`}
                      />

                      {/* Dark Card Tooltip (Dark Futuristic Styling) */}
                      {isHovered && (
                        <foreignObject
                          x="-90"
                          y="-68"
                          width="180"
                          height="58"
                          className="overflow-visible pointer-events-none z-50 animate-fadeIn"
                        >
                          <div className="relative flex flex-col items-center justify-center">
                            {/* Card Box */}
                            <div className="bg-[#0E0F11]/96 backdrop-blur-md border border-white/15 rounded-xl px-4 py-2.5 shadow-[0_18px_50px_rgba(0,0,0,0.6)] text-left w-full max-w-[170px]">
                              <span className="text-[10px] font-black tracking-widest text-[#F04438] uppercase block mb-0.5">
                                {node.category}
                              </span>
                              <h3 className="text-sm font-bold text-white leading-tight">
                                {node.name}
                              </h3>
                            </div>

                            {/* Downward Pointer Triangle */}
                            <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[7px] border-t-[#0E0F11]/96 -mt-[1px]" />
                          </div>
                        </foreignObject>
                      )}
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Bottom Left Legend Box (GLOBAL PRESENCE: Asia, Africa, Europe) */}
          <div className="relative z-20 pt-4 border-t border-white/10 flex items-center justify-between">
            <div className="bg-[#0E0F11]/90 backdrop-blur-xl border border-white/15 p-3.5 rounded-2xl shadow-2xl">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">
                GLOBAL PRESENCE
              </span>
              <div className="flex flex-wrap items-center gap-5">
                <div 
                  className="flex items-center gap-2 cursor-pointer group"
                  onClick={() => setHoveredNodeId("asia")}
                  onMouseEnter={() => setHoveredNodeId("asia")}
                  tabIndex={0}
                  role="button"
                  aria-label="Focus Asia"
                  onKeyDown={(e) => handleKeyDown(e, mapNodes[0])}
                >
                  <span className="w-3 h-3 rounded-full bg-[#F04438] shadow-[0_0_10px_#F04438]" />
                  <span className="text-xs font-bold text-white group-hover:text-red-400 transition-colors">Asia</span>
                </div>
                <div 
                  className="flex items-center gap-2 cursor-pointer group"
                  onClick={() => setHoveredNodeId("africa")}
                  onMouseEnter={() => setHoveredNodeId("africa")}
                  tabIndex={0}
                  role="button"
                  aria-label="Focus Africa"
                  onKeyDown={(e) => handleKeyDown(e, mapNodes[2])}
                >
                  <span className="w-3 h-3 rounded-full bg-gray-400 shadow-[0_0_10px_#A0AEC0]" />
                  <span className="text-xs font-medium text-gray-200 group-hover:text-white transition-colors">Africa</span>
                </div>
                <div 
                  className="flex items-center gap-2 cursor-pointer group"
                  onClick={() => setHoveredNodeId("europe")}
                  onMouseEnter={() => setHoveredNodeId("europe")}
                  tabIndex={0}
                  role="button"
                  aria-label="Focus Europe"
                  onKeyDown={(e) => handleKeyDown(e, mapNodes[1])}
                >
                  <span className="w-3 h-3 rounded-full bg-white shadow-[0_0_10px_#FFFFFF]" />
                  <span className="text-xs font-medium text-gray-200 group-hover:text-white transition-colors">Europe</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
