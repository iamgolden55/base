import { useState } from "react";
import { Play, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VideoPlayer } from "./video-player";

export function VideoHero() {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <>
      <div className="relative h-[65vh] w-full">
        {/* Hero Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/90 to-neutral-900/20" />
          <video
            autoPlay
            muted
            loop
            className="h-full w-full object-cover"
            poster="/images/banner.png"
          >
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Content */}
        <div className="relative h-full flex flex-col justify-end p-6 sm:p-10">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Understanding Modern Healthcare
          </h1>
          <p className="text-sm sm:text-base text-white/90 max-w-[40rem] mb-6">
            Explore the latest advancements in medical science and healthcare practices
            through our comprehensive video library curated by leading healthcare professionals.
          </p>
          <div className="flex items-center gap-3">
            <Button size="lg" className="font-semibold" onClick={handlePlay}>
              <Play className="h-4 w-4 mr-2" />
              Play Now
            </Button>
            <Button variant="outline" size="lg" className="font-semibold">
              <Info className="h-4 w-4 mr-2" />
              More Info
            </Button>
          </div>
        </div>
      </div>

      {/* Video Player Modal */}
      <VideoPlayer
        isOpen={isPlaying}
        onClose={() => setIsPlaying(false)}
        playbackId="DS00Spx1CV902MCtPj5WknGlR102V5HFkDe"
        title="Understanding Modern Healthcare"
      />
    </>
  );
} 