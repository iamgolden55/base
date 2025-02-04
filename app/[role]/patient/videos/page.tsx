"use client";

import { Suspense, useState, useEffect } from "react";
import { VideoHero } from "./_components/video-hero";
import { VideoRow } from "./_components/video-row";
import { VideoSkeleton } from "./_components/video-skeleton";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function VideosPage() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Show button when page is scrolled up 100px
  const handleScroll = () => {
    if (window.scrollY > 100) {
      setShowScrollTop(true);
    } else {
      setShowScrollTop(false);
    }
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex flex-col w-full relative">
      {/* Hero Section */}
      <Suspense fallback={<VideoSkeleton />}>
        <VideoHero />
      </Suspense>

      {/* Video Categories */}
      <div className="space-y-8 pb-8 pt-6">
        <Suspense fallback={<VideoSkeleton />}>
          <VideoRow 
            title="Trending in Healthcare" 
            category="trending"
          />
        </Suspense>

        <Suspense fallback={<VideoSkeleton />}>
          <VideoRow 
            title="Medical Education" 
            category="education"
          />
        </Suspense>

        <Suspense fallback={<VideoSkeleton />}>
          <VideoRow 
            title="Health & Wellness" 
            category="wellness"
          />
        </Suspense>

        <Suspense fallback={<VideoSkeleton />}>
          <VideoRow 
            title="Latest Medical News" 
            category="news"
          />
        </Suspense>
      </div>

      {/* Scroll to Top Button */}
      <Button
        onClick={scrollToTop}
        className={cn(
          "fixed bottom-6 right-6 rounded-full p-3 shadow-lg",
          "transition-all duration-300 z-50",
          showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
        )}
        size="icon"
      >
        <ArrowUp className="h-5 w-5" />
      </Button>
    </div>
  );
}
