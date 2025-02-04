import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, X, Clock, Eye, Calendar, Info, Share2, Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";

interface VideoPreviewProps {
  isOpen: boolean;
  onClose: () => void;
  video?: {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    duration: string;
    views: string;
    date: string;
    category: string;
  };
}

export function VideoPreview({ isOpen, onClose, video }: VideoPreviewProps) {
  if (!video) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl p-0 overflow-hidden bg-background/95 backdrop-blur-sm">
        <div className="grid md:grid-cols-5 gap-0">
          {/* Left Side - Thumbnail */}
          <div className="md:col-span-3 relative aspect-video">
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center group">
              <Button 
                size="lg"
                className="opacity-90 hover:opacity-100 hover:scale-105 transition"
                onClick={() => console.log('Play video')}
              >
                <Play className="h-5 w-5 mr-2" fill="white" />
                Play Now
              </Button>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white hover:bg-white/20 p-2 rounded-full transition"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Right Side - Content */}
          <div className="md:col-span-2 p-6 flex flex-col h-full">
            {/* Title and Badge */}
            <div className="space-y-2 mb-4">
              <Badge variant="secondary" className="uppercase text-xs">
                {video.category}
              </Badge>
              <h2 className="text-2xl font-semibold leading-tight">{video.title}</h2>
            </div>

            {/* Metadata */}
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                <span>{video.duration}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Eye className="h-4 w-4" />
                <span>{video.views} views</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                <span>{video.date}</span>
              </div>
            </div>

            {/* Description */}
            <div className="flex-grow">
              <div className="prose prose-sm dark:prose-invert">
                <p className="text-muted-foreground leading-relaxed">
                  {video.description}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4 mt-6">
              <div className="flex items-center gap-2">
                <Button className="flex-1" onClick={() => console.log('Play video')}>
                  <Play className="h-4 w-4 mr-2" />
                  Play Now
                </Button>
                <Button 
                  variant="outline" 
                  size="icon"
                  className={cn(
                    "hover:text-primary hover:border-primary transition-colors",
                  )}
                >
                  <Bookmark className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon"
                  className="hover:text-primary hover:border-primary transition-colors"
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
              <Button 
                variant="ghost" 
                className="w-full text-muted-foreground hover:text-primary"
                onClick={() => console.log('More info')}
              >
                <Info className="h-4 w-4 mr-2" />
                More Information
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 