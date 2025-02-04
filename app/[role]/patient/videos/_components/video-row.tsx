import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Play, Clock } from "lucide-react";
import { useState } from "react";
import { VideoPreview } from "./video-preview";

interface VideoRowProps {
  title: string;
  category: string;
}

export function VideoRow({ title, category }: VideoRowProps) {
  const [selectedVideo, setSelectedVideo] = useState<any>(null);

  // Mock video data - replace with real data
  const handleVideoClick = (index: number) => {
    setSelectedVideo({
      id: `${index}`,
      title: `Medical Video ${index}`,
      description: "This comprehensive medical video explores the latest advancements in healthcare technology and treatment methods. Watch to learn more about cutting-edge medical practices and their impact on patient care.",
      thumbnail: `/images/${category}-${index}.jpg`,
      duration: "23 minutes",
      views: "10K",
      date: "Feb 2024",
      category: category
    });
  };

  return (
    <div className="space-y-4 px-6">
      <h2 className="text-xl font-semibold text-foreground/90">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <Card 
            key={i}
            onClick={() => handleVideoClick(i)}
            className={cn(
              "group relative overflow-hidden rounded-xl border-0",
              "aspect-video cursor-pointer transition-all duration-300",
              "hover:scale-105 hover:shadow-xl hover:z-10"
            )}
          >
            {/* Thumbnail Image */}
            <img
              src={`/images/daniel-schludi-mAGZNECMcUg-unsplash.jpg`}
              alt={`Video thumbnail ${i}`}
              className="h-full w-full object-cover"
            />

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="rounded-full bg-white/20 p-3 backdrop-blur-sm">
                <Play className="h-6 w-6 text-white" fill="white" />
              </div>
            </div>

            {/* Content Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <h3 className="text-white font-medium line-clamp-1 text-sm">
                Video Title {i}
              </h3>
              <div className="flex items-center gap-2 mt-2 text-xs text-white/80">
                <Clock className="h-3 w-3" />
                <span>23m</span>
                <span>•</span>
                <span>10K views</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <VideoPreview
        isOpen={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
        video={selectedVideo}
      />
    </div>
  );
} 