"use client";

import { useRef, useState } from "react";

interface VideoPlayerProps {
  src: string;
  className?: string;
}

export default function VideoPlayer({ src, className = "" }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
  };

  return (
    <div
      className={`relative group cursor-pointer rounded-2xl overflow-hidden shadow-xl ${className}`}
      onClick={togglePlay}
    >
      <div className="aspect-video">
        <video
          ref={videoRef}
          src={src}
          onEnded={handleEnded}
          playsInline
          className="w-full h-full object-cover"
        />
      </div>

      {/* Play/Pause overlay */}
      <div
        className={`absolute inset-0 flex items-center justify-center bg-navy/40 transition-opacity duration-300 ${
          isPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-100"
        }`}
      >
        <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
          {isPlaying ? (
            <svg
              className="w-7 h-7 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          ) : (
            <svg
              className="w-7 h-7 text-white ml-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
}
