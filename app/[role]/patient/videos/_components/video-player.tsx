import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";
import MuxPlayer from "@mux/mux-player-react";

interface VideoPlayerProps {
  isOpen: boolean;
  onClose: () => void;
  playbackId: string;
  title: string;
}

export function VideoPlayer({ isOpen, onClose, playbackId, title }: VideoPlayerProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl p-0 overflow-hidden bg-black">
        <div className="relative">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-50 text-white hover:bg-white/20 p-2 rounded-full transition"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Mux Video Player */}
          <div className="aspect-video relative">
            <MuxPlayer
              streamType="on-demand"
              playbackId={playbackId}
              metadata={{
                video_title: title,
                player_name: "Health Education Player",
              }}
              autoPlay
              accentColor="#0284c7" // You can customize this color
              thumbnailTime={1}
              defaultHiddenCaptions
              style={{
                height: "100%",
                maxWidth: "100%",
                borderRadius: "0.5rem",
              }}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 