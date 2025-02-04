# Videos Feature Documentation

## Overview
A Netflix-style medical video platform where healthcare professionals can share educational content and users can learn about health-related topics.

## Getting Started

### 1. Prerequisites
```bash
# Install required packages
npm install @mux/mux-node @mux/mux-player-react @mux-elements/mux-video
```

### 2. Environment Setup
Create or update your `.env.local` file:
```env
NEXT_PUBLIC_MUX_ENV_KEY=your_env_key
MUX_TOKEN_ID=your_token_id
MUX_TOKEN_SECRET=your_token_secret
```

Get these values from your Mux dashboard (https://dashboard.mux.com)

## Project Structure

```
app/
├── [role]/
│   ├── patient/
│   │   └── videos/
│   │       ├── page.tsx              # Main videos page
│   │       └── _components/
│   │           ├── video-hero.tsx    # Hero section
│   │           ├── video-row.tsx     # Video list row
│   │           ├── video-player.tsx  # Video player
│   │           └── video-preview.tsx # Video details modal
│   └── auditor/
│       └── videos/
│           └── upload/
│               └── page.tsx          # Upload interface
├── api/
│   └── videos/
│       └── upload/
│           └── route.ts             # Upload API endpoint
```

## Component Guide

### 1. Video Upload (For Auditors)
```typescript
// How to use the upload component
import { VideoUpload } from "@/components/video-upload";

// Example usage
<VideoUpload 
  onSuccess={(videoId) => {
    console.log("Video uploaded:", videoId);
  }}
/>
```

### 2. Video Player
```typescript
// How to use the video player
import { VideoPlayer } from "@/components/video-player";

// Example usage
<VideoPlayer
  playbackId="your_mux_playback_id"
  title="Video Title"
/>
```

## Database Schema

### Videos Table
```sql
CREATE TABLE videos (
  id VARCHAR(255) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  mux_playback_id VARCHAR(255),
  mux_asset_id VARCHAR(255),
  thumbnail_url VARCHAR(255),
  duration INTEGER,
  category VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Bookmarks Table
```sql
CREATE TABLE bookmarks (
  id VARCHAR(255) PRIMARY KEY,
  user_id VARCHAR(255),
  video_id VARCHAR(255),
  status VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (video_id) REFERENCES videos(id)
);
```

## API Routes Guide

### 1. Upload Video
```typescript
// POST /api/videos/upload
const response = await fetch('/api/videos/upload', {
  method: 'POST',
  body: formData, // Include video file and metadata
});
```

### 2. Get Videos
```typescript
// GET /api/videos
const response = await fetch('/api/videos');
const videos = await response.json();
```

### 3. Bookmark Video
```typescript
// POST /api/bookmarks
const response = await fetch('/api/bookmarks', {
  method: 'POST',
  body: JSON.stringify({ videoId, status: 'saved' }),
});
```

## Step-by-Step Implementation Guide

### 1. Setting Up Video Upload
1. Create upload form UI
2. Implement file validation
3. Add Mux integration
4. Handle upload progress
5. Show success/error messages

### 2. Implementing Video Playback
1. Create video player component
2. Add Mux player integration
3. Handle play/pause events
4. Implement fullscreen mode
5. Add quality selection

### 3. Adding Bookmarks
1. Create bookmark button
2. Add bookmark API endpoint
3. Handle bookmark states
4. Implement bookmark list
5. Add remove bookmark feature

## Common Issues & Solutions

### 1. Video Upload Fails
```typescript
// Check file size
if (file.size > MAX_FILE_SIZE) {
  toast.error("File too large");
  return;
}

// Check file type
if (!ALLOWED_TYPES.includes(file.type)) {
  toast.error("Invalid file type");
  return;
}
```

### 2. Player Not Loading
```typescript
// Ensure playback ID is correct
<MuxPlayer
  playbackId={playbackId}
  onError={(error) => {
    console.error("Player error:", error);
    // Show fallback content
  }}
/>
```

## Testing Guide

### 1. Component Testing
```typescript
describe('VideoPlayer', () => {
  it('should render with correct playback ID', () => {
    render(<VideoPlayer playbackId="test-id" />);
    expect(screen.getByTestId('mux-player')).toBeInTheDocument();
  });
});
```

### 2. API Testing
```typescript
describe('Upload API', () => {
  it('should handle video upload', async () => {
    const formData = new FormData();
    // Add test file and metadata
    const response = await fetch('/api/videos/upload', {
      method: 'POST',
      body: formData,
    });
    expect(response.status).toBe(200);
  });
});
```

## Next Steps
1. Add video categories
2. Implement search functionality
3. Add user playlists
4. Implement video recommendations
5. Add analytics tracking

## Need Help?
- Check Mux documentation: https://docs.mux.com
- Review Next.js docs: https://nextjs.org/docs
- Join our Discord community: [Link]
- Open an issue on GitHub: [Link] 