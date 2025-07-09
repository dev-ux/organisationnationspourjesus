"use client";

interface FacebookVideoProps {
  videoId: string;
}

export default function FacebookVideo({ videoId }: FacebookVideoProps) {
  return (
    <div className="aspect-video relative rounded-lg overflow-hidden">
      <iframe
        src={`https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Fvideo.php%3Fv%3D${videoId}&show_text=false&width=560`}
        width="100%"
        height="100%"
        style={{ position: 'absolute', top: 0, left: 0 }}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full"
      />
    </div>
  );
}
