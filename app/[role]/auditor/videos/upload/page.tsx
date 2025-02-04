"use client";
import { useState } from "react";
import { Upload, Video, X, Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const ALLOWED_TYPES = ["video/mp4", "video/quicktime"];
const MAX_FILE_SIZE = 500 * 1024 * 1024; // 500MB

export default function VideoUploadPage() {
  const [uploading, setUploading] = useState(false);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (!file) return;

    if (!ALLOWED_TYPES.includes(file.type)) {
      toast.error("Please upload MP4 or MOV files only");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      toast.error("File size should be less than 500MB");
      return;
    }

    setVideoFile(file);
    // Generate video thumbnail
    const url = URL.createObjectURL(file);
    setThumbnail(url);
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoFile) return;

    try {
      setUploading(true);
      // TODO: Implement actual upload logic to Mux
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulated upload
      toast.success("Video uploaded successfully!");
    } catch (error) {
      toast.error("Failed to upload video");
    } finally {
      setUploading(false);
    }
  };

  const addTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && currentTag.trim() && tags.length < 5) {
      e.preventDefault();
      setTags([...tags, currentTag.trim()]);
      setCurrentTag("");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Upload Medical Video</h1>
        <Button disabled={uploading} onClick={() => window.history.back()}>
          Cancel
        </Button>
      </div>

      <form onSubmit={handleUpload} className="space-y-6">
        {/* Video Upload Area */}
        <div className="border-2 border-dashed rounded-lg p-6 text-center">
          {!videoFile ? (
            <div className="space-y-4">
              <div className="flex items-center justify-center">
                <Video className="h-10 w-10 text-muted-foreground" />
              </div>
              <div>
                <Input
                  type="file"
                  accept="video/mp4,video/quicktime"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="video-upload"
                />
                <Button asChild variant="secondary">
                  <label htmlFor="video-upload" className="cursor-pointer">
                    <Upload className="h-4 w-4 mr-2" />
                    Select Video
                  </label>
                </Button>
                <p className="text-sm text-muted-foreground mt-2">
                  MP4 or MOV, max 500MB
                </p>
              </div>
            </div>
          ) : (
            <div className="relative">
              {thumbnail && (
                <img
                  src={thumbnail}
                  alt="Video thumbnail"
                  className="w-full aspect-video rounded-lg object-cover"
                />
              )}
              <Button
                size="icon"
                variant="destructive"
                className="absolute top-2 right-2"
                onClick={() => {
                  setVideoFile(null);
                  setThumbnail(null);
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Video Details */}
        <div className="space-y-4">
          <Input
            placeholder="Video Title"
            required
            disabled={uploading}
          />

          <Textarea
            placeholder="Video Description"
            required
            className="h-32"
            disabled={uploading}
          />

          <Select disabled={uploading}>
            <SelectTrigger>
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="education">Medical Education</SelectItem>
              <SelectItem value="news">Health News</SelectItem>
              <SelectItem value="wellness">Health & Wellness</SelectItem>
              <SelectItem value="research">Medical Research</SelectItem>
            </SelectContent>
          </Select>

          {/* Tags Input */}
          <div className="space-y-2">
            <div className="flex gap-2 flex-wrap">
              {tags.map((tag, index) => (
                <Badge 
                  key={index}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  {tag}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => setTags(tags.filter((_, i) => i !== index))}
                  />
                </Badge>
              ))}
            </div>
            <Input
              placeholder="Add tags (press Enter)"
              value={currentTag}
              onChange={(e) => setCurrentTag(e.target.value)}
              onKeyDown={addTag}
              disabled={uploading || tags.length >= 5}
            />
            <p className="text-xs text-muted-foreground">
              Add up to 5 tags to help users find your video
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <Button 
          type="submit" 
          disabled={!videoFile || uploading}
          className="w-full"
        >
          {uploading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="h-4 w-4 mr-2" />
              Upload Video
            </>
          )}
        </Button>
      </form>
    </div>
  );
} 