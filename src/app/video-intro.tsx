"use client";

import React, { useState } from "react";
import Image from "next/image";
import YouTube from 'react-youtube';
import { PlayIcon } from "@heroicons/react/24/outline";

declare global {
  interface Window {
    YT: any;
  }
}


export function VideoIntro() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [player, setPlayer] = useState<YT.Player | null>(null);

  const opts = {
    height: '400',
    width: '768',
    playerVars: {
      autoplay: 1,
    },
  };

  const onReady = (event: { target: YT.Player }) => {
    setPlayer(event.target);
  };

  const onPlay = () => {
    setIsPlaying(true);
  };

  return (
    <div className="p-8">
      <div className="w-full container px-5 overflow-hidden rounded-xl relative mx-auto mt-20 max-w-6xl ">
        {isPlaying ? (
          <YouTube
            videoId="_bAMXfF3oCU"
            opts={opts}
            onReady={onReady}
            onPlay={onPlay}
          />
        ) : (
          <>
            <div className="bg-black/25 z-10 absolute w-full h-full inset-0 rounded-xl" />
            <Image
              width={768}
              height={400}
              src="/image/onj5.jpg"
              className="w-full object-cover scale-110 rounded-xl h-full"
              alt="Eglise des Disciples Accomplis"
            />
            <div className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 z-10">
              <button 
                className="bg-white p-3 rounded-full hover:bg-gray-100 transition-colors"
                onClick={() => {
                  if (player) {
                    player.playVideo();
                  }
                  setIsPlaying(true);
                }}
              >
                <PlayIcon className="h-6 w-6 text-black" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default VideoIntro;