import React, { useState } from "react";
import { getOptimizedImageUrl } from "@/src/utils/imageOptimizer";

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
  widthOptimize?: number;
  heightOptimize?: number;
  loading?: "lazy" | "eager";
}

export default function OptimizedImage({
  src,
  alt,
  className = "",
  fallbackSrc = "https://images.unsplash.com/photo-1578269174936-2709b6aeb913?auto=format&fit=crop&q=80&w=800",
  widthOptimize = 800,
  heightOptimize = 550,
  loading = "lazy",
  ...props
}: OptimizedImageProps) {
  const [loaded, setLoaded] = useState(false);
  const optimizedInitial = getOptimizedImageUrl(src, { width: widthOptimize, height: heightOptimize, quality: 80 });
  const [imgSrc, setImgSrc] = useState(optimizedInitial);

  return (
    <div className={`relative overflow-hidden bg-gray-100 ${className}`}>
      {/* Shimmer skeleton using pulse animation */}
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
          <div className="w-full h-full bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 bg-[length:200%_100%] animate-[pulse_1.5s_infinite] absolute inset-0" />
          <div className="w-8 h-8 border-2 border-red-600/15 border-t-red-600 rounded-full animate-spin relative z-10" />
        </div>
      )}
      <img
        src={imgSrc}
        alt={alt}
        loading={loading}
        decoding="async"
        referrerPolicy="no-referrer"
        onLoad={() => setLoaded(true)}
        onError={() => {
          setLoaded(true);
          if (imgSrc !== fallbackSrc) {
            setImgSrc(fallbackSrc);
          }
        }}
        className={`w-full h-full object-cover transition-opacity duration-300 ease-out ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        {...props}
      />
    </div>
  );
}
