"use client";
import React, { useState, useEffect } from "react";
import { Volume2, VolumeX, Play, Pause } from "lucide-react";
import Link from "next/link";
import { ArrowNarrowRight } from "@untitled-ui/icons-react";
import { BodyText, Heading } from "../Common/Typography";

interface Experience {
  title: string;
  image: string;
}

interface VideoOverlayProps {
  videoUrl?: string;
  posterImage?: string;
}

const VideoOverlay: React.FC<VideoOverlayProps> = ({
  videoUrl = "https://www.youtube.com/watch?v=Nh7fj1jerSY",
  posterImage,
}) => {
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [userInteracted, setUserInteracted] = useState<boolean>(false);

  const experiences: Experience[] = [
    {
      title: "MYSTIC RETREAT",
      image:
        "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=400&fit=crop&crop=center",
    },
    {
      title: "GALA NIGHTS",
      image:
        "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=400&fit=crop&crop=center",
    },
    {
      title: "AMBASSADORS CUP",
      image:
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=400&fit=crop&crop=center",
    },
    {
      title: "AMBASSADORS AWARD",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&crop=center",
    },
  ];

  // Extract video ID from URL
  const getVideoId = (url: string): string => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);
    return match ? match[1] : "";
  };

  const videoId = getVideoId(videoUrl);

  // Auto-start video on page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPlaying(true);
      setUserInteracted(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const toggleMute = (): void => {
    setIsMuted(!isMuted);
  };

  const togglePlayPause = (): void => {
    setIsPlaying(!isPlaying);
    setUserInteracted(true);
  };

  // Click handler for the main section
  const handleSectionClick = () => {
    if (!userInteracted) {
      setUserInteracted(true);
      setIsPlaying(true);
    }
  };

  return (
    <section 
      className="relative w-full h-screen overflow-hidden bg-black cursor-pointer"
      onClick={handleSectionClick}
    >
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <div className="relative w-full h-full">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=${isPlaying ? 1 : 0}&mute=${isMuted ? 1 : 0}&loop=1&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&disablekb=1&fs=0&playsinline=1&playlist=${videoId}&enablejsapi=1&cc_load_policy=0&start=0&end=0&origin=${typeof window !== 'undefined' ? window.location.origin : ''}`}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{
              width: '100vw',
              height: '56.25vw', // 16:9 aspect ratio
              minHeight: '100vh',
              minWidth: '177.78vh', // 16:9 aspect ratio
              border: 'none',
              objectFit: 'cover',
            }}
            allow="autoplay; encrypted-media"
            allowFullScreen={false}
            title="Background Video"
          />
        </div>

        {/* Fallback background */}
        <div
          className="absolute inset-0 w-full h-full bg-gradient-to-br from-purple-900 via-pink-800 to-purple-900 -z-10"
          style={{
            backgroundImage: posterImage ? `url(${posterImage})` : 'url(https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1920&h=1080&fit=crop&crop=center)',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-black/50 z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent z-10" />

        {/* Film Grain Texture */}
        <div
          className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none z-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            animation: "grain 6s steps(8) infinite",
          }}
        />
      </div>

      {/* Video Controls */}
      <div className="absolute top-4 right-4 md:top-6 md:right-6 z-50 flex gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            togglePlayPause();
          }}
          className="group relative p-2 md:p-3 backdrop-blur-2xl border border-white/10 hover:border-amber-300/50 transition-all duration-400 overflow-hidden glass-button"
          aria-label={isPlaying ? "Pause video" : "Play video"}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-amber-300/0 via-amber-300/10 to-amber-300/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-600" />
          {isPlaying ? (
            <Pause size={14} className="md:w-4 md:h-4 relative z-10 text-white/90 group-hover:text-amber-200 transition-colors duration-300" />
          ) : (
            <Play size={14} className="md:w-4 md:h-4 relative z-10 text-white/90 group-hover:text-amber-200 transition-colors duration-300" />
          )}
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleMute();
          }}
          className="group relative p-2 md:p-3 backdrop-blur-2xl border border-white/10 hover:border-amber-300/50 transition-all duration-400 overflow-hidden glass-button"
          aria-label={isMuted ? "Unmute video" : "Mute video"}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-amber-300/0 via-amber-300/10 to-amber-300/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-600" />
          {isMuted ? (
            <VolumeX size={14} className="md:w-4 md:h-4 relative z-10 text-white/90 group-hover:text-amber-200 transition-colors duration-300" />
          ) : (
            <Volume2 size={14} className="md:w-4 md:h-4 relative z-10 text-white/90 group-hover:text-amber-200 transition-colors duration-300" />
          )}
        </button>

        {/* Status Indicators */}
        {!userInteracted && (
          <div className="px-2 py-1 md:px-3 md:py-2 backdrop-blur-2xl border border-yellow-400/30 bg-yellow-500/10 text-yellow-300 text-xs font-medium rounded-xl">
            Click to Play
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="relative z-40 flex items-center w-full min-h-screen">
        <div className="container mx-auto px-4 md:px-6 lg:px-12 xl:px-16 max-w-7xl">
          <div className="max-w-4xl mb-8 md:mb-12">
            <Heading variant="h1" className="text-white mb-3 md:mb-4 font-diamend text-primary-dark-gradient leading-tight text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
              By your side
            </Heading>
            <Heading variant="h2" className="text-white/90 mb-4 md:mb-6 font-light text-xl md:text-2xl lg:text-3xl">
              every step of the way.
            </Heading>
            <BodyText variant="regular" className="text-white/80 mb-6 md:mb-8 max-w-lg text-sm md:text-base">
              We are offering the following information about us virtually.
            </BodyText>
            <Link
              href={`/about`}
              className="py-2 md:py-3 hover:scale-105 active:scale-90 duration-200 ease-in-out transition-all w-auto md:w-[10.5rem] bg-border-primary-dark-gradient text-sm md:text-base leading-6 text-on-surface-black cursor-pointer px-3 md:px-4 gap-2 md:gap-4 flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <span>Explore More</span>
              <ArrowNarrowRight className="w-3 h-3 md:w-4 md:h-4" />
            </Link>
          </div>

          {/* Experience Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-sm md:max-w-md">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="group flex flex-col items-center cursor-pointer experience-item"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative mb-2 md:mb-3">
                  <div className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 overflow-hidden border border-white/20 group-hover:border-amber-300/60 transition-all duration-400 group-hover:scale-105">
                    <img
                      src={exp.image}
                      alt={exp.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                  </div>
                  <div className="absolute inset-0 rounded-full bg-amber-300/15 blur-lg opacity-0 group-hover:opacity-60 transition-opacity duration-400 -z-10 scale-125" />
                </div>
                <BodyText
                  variant="small-trimmed"
                  className="text-white/60 group-hover:text-amber-200 transition-colors duration-300 text-center font-medium tracking-wide text-xs md:text-sm"
                >
                  {exp.title}
                </BodyText>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes grain {
          0%, 100% {
            transform: translate(0, 0);
          }
          12.5% { transform: translate(-2%, -5%); }
          25%   { transform: translate(-8%, 3%); }
          37.5% { transform: translate(4%, -12%); }
          50%   { transform: translate(-3%, 12%); }
          62.5% { transform: translate(-8%, 5%); }
          75%   { transform: translate(8%, 0%); }
          87.5% { transform: translate(2%, 8%); }
        }

        .glass-button {
          border-radius: 8px;
          background: linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%);
          box-shadow: 0 4px 16px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1);
          backdrop-filter: blur(20px);
        }

        .glass-button:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.15);
        }

        .experience-item {
          opacity: 0;
          transform: translateY(20px);
          animation: slideUp 0.6s ease-out forwards;
        }

        @keyframes slideUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .glass-button {
            border-radius: 6px;
          }
        }
      `}</style>
    </section>
  );
};

export default VideoOverlay;