"use client";

interface FacebookVideoProps {
  videoId: string;
}

export default function FacebookVideo({ videoId }: FacebookVideoProps) {
  return (
    <div className="aspect-video relative rounded-lg overflow-hidden">
      <iframe
        src={`https://www.facebook.com/pasteurhermanntano/videos/1294477868897506`}
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
