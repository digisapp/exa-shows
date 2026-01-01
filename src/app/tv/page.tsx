"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  X,
  List,
  Tv,
} from "lucide-react";
import { GlassButton } from "@/components/ui";

interface Video {
  id: string;
  youtubeId: string;
  title: string;
  duration: string;
}

// Mock playlist
const playlist: Video[] = [
  { id: "1", youtubeId: "dQw4w9WgXcQ", title: "Miami Swim Week 2024 - Opening Night", duration: "18:45" },
  { id: "2", youtubeId: "dQw4w9WgXcQ", title: "Cannes Beachwear Collection", duration: "12:30" },
  { id: "3", youtubeId: "dQw4w9WgXcQ", title: "Dubai Fashion Forward Highlights", duration: "22:15" },
  { id: "4", youtubeId: "dQw4w9WgXcQ", title: "Ibiza Summer Collection 2024", duration: "15:00" },
  { id: "5", youtubeId: "dQw4w9WgXcQ", title: "Monaco Yacht Fashion Show", duration: "25:30" },
  { id: "6", youtubeId: "dQw4w9WgXcQ", title: "Los Angeles Runway Night", duration: "14:20" },
  { id: "7", youtubeId: "dQw4w9WgXcQ", title: "Miami Swim Week 2023 - Day 1", duration: "45:00" },
  { id: "8", youtubeId: "dQw4w9WgXcQ", title: "Miami Swim Week 2023 - Day 2", duration: "42:00" },
];

export default function TVModePage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [showPlaylist, setShowPlaylist] = useState(false);

  const currentVideo = playlist[currentIndex];

  // Auto-hide controls
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const hideControls = () => {
      timeout = setTimeout(() => {
        if (isPlaying && !showPlaylist) {
          setShowControls(false);
        }
      }, 3000);
    };

    hideControls();
    return () => clearTimeout(timeout);
  }, [isPlaying, showPlaylist, showControls]);

  const handleMouseMove = useCallback(() => {
    setShowControls(true);
  }, []);

  const nextVideo = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % playlist.length);
  }, []);

  const prevVideo = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case " ":
        case "k":
          e.preventDefault();
          setIsPlaying((prev) => !prev);
          break;
        case "ArrowRight":
        case "l":
          nextVideo();
          break;
        case "ArrowLeft":
        case "j":
          prevVideo();
          break;
        case "m":
          setIsMuted((prev) => !prev);
          break;
        case "f":
          toggleFullscreen();
          break;
        case "Escape":
          if (showPlaylist) setShowPlaylist(false);
          else router.push("/videos");
          break;
        case "p":
          setShowPlaylist((prev) => !prev);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextVideo, prevVideo, toggleFullscreen, showPlaylist, router]);

  return (
    <div
      className="fixed inset-0 bg-black z-50 cursor-none"
      onMouseMove={handleMouseMove}
      style={{ cursor: showControls ? "auto" : "none" }}
    >
      {/* Video player */}
      <div className="absolute inset-0">
        <iframe
          src={`https://www.youtube.com/embed/${currentVideo.youtubeId}?autoplay=${isPlaying ? 1 : 0}&mute=${isMuted ? 1 : 0}&controls=0&rel=0&modestbranding=1&playsinline=1`}
          title={currentVideo.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        />
      </div>

      {/* Gradient overlays */}
      <div
        className={`absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/80 to-transparent transition-opacity duration-300 ${
          showControls ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        className={`absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-300 ${
          showControls ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Top bar */}
      <div
        className={`absolute top-0 left-0 right-0 p-6 flex items-center justify-between transition-opacity duration-300 ${
          showControls ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push("/videos")}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X size={24} className="text-white" />
          </button>
          <div className="flex items-center gap-2">
            <Tv size={24} className="text-[#FF69B4]" />
            <span className="text-white font-bold text-xl">TV Mode</span>
          </div>
        </div>

        <button
          onClick={() => setShowPlaylist((prev) => !prev)}
          className={`p-3 rounded-full transition-colors ${
            showPlaylist ? "bg-[#FF69B4]" : "bg-white/10 hover:bg-white/20"
          }`}
        >
          <List size={24} className="text-white" />
        </button>
      </div>

      {/* Bottom controls */}
      <div
        className={`absolute bottom-0 left-0 right-0 p-6 transition-opacity duration-300 ${
          showControls ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Video info */}
        <div className="mb-6">
          <p className="text-white/60 text-sm mb-1">
            Now Playing ({currentIndex + 1}/{playlist.length})
          </p>
          <h2 className="text-white text-2xl font-bold">{currentVideo.title}</h2>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={prevVideo}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <SkipBack size={24} className="text-white" />
            </button>

            <button
              onClick={() => setIsPlaying((prev) => !prev)}
              className="p-4 rounded-full bg-white hover:bg-white/90 transition-colors"
            >
              {isPlaying ? (
                <Pause size={28} className="text-black" />
              ) : (
                <Play size={28} className="text-black ml-1" />
              )}
            </button>

            <button
              onClick={nextVideo}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <SkipForward size={24} className="text-white" />
            </button>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMuted((prev) => !prev)}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              {isMuted ? (
                <VolumeX size={24} className="text-white" />
              ) : (
                <Volume2 size={24} className="text-white" />
              )}
            </button>

            <button
              onClick={toggleFullscreen}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              {isFullscreen ? (
                <Minimize size={24} className="text-white" />
              ) : (
                <Maximize size={24} className="text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Keyboard shortcuts hint */}
        <div className="mt-4 text-white/40 text-sm">
          <span className="mr-4">Space: Play/Pause</span>
          <span className="mr-4">← →: Prev/Next</span>
          <span className="mr-4">M: Mute</span>
          <span className="mr-4">F: Fullscreen</span>
          <span>P: Playlist</span>
        </div>
      </div>

      {/* Playlist sidebar */}
      {showPlaylist && (
        <div className="absolute top-0 right-0 bottom-0 w-96 bg-black/90 backdrop-blur-xl border-l border-white/10 overflow-y-auto animate-[slide-in-right_0.3s_ease]">
          <div className="p-6">
            <h3 className="text-xl font-bold text-white mb-6">Playlist</h3>
            <div className="space-y-2">
              {playlist.map((video, index) => (
                <button
                  key={video.id}
                  onClick={() => {
                    setCurrentIndex(index);
                    setShowPlaylist(false);
                  }}
                  className={`w-full text-left p-4 rounded-xl transition-all ${
                    index === currentIndex
                      ? "bg-[#FF69B4]/20 border border-[#FF69B4]/50"
                      : "bg-white/5 hover:bg-white/10 border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-white/40 text-sm w-6">{index + 1}</span>
                    <div className="flex-1">
                      <p
                        className={`font-medium line-clamp-1 ${
                          index === currentIndex ? "text-[#FF69B4]" : "text-white"
                        }`}
                      >
                        {video.title}
                      </p>
                      <p className="text-white/40 text-sm">{video.duration}</p>
                    </div>
                    {index === currentIndex && (
                      <div className="w-2 h-2 bg-[#FF69B4] rounded-full animate-pulse" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slide-in-right {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}
