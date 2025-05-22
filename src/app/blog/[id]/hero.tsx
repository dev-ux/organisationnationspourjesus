"use client";

import Image from "next/image";

export default function BlogDetailHero({ post }: { post: { title: string; image?: string } }) {
  return (
    <div className="relative h-[400px] w-full">
      <div className="absolute inset-0">
        <Image
          src={post.image || '/image/blog/formation.jpg'}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="absolute inset-0 bg-black/30"></div>
      <div className="relative">
        <div className="container mx-auto px-8 py-16">
          <div className="max-w-4xl">
            <h1 className="text-3xl font-bold text-white sm:text-4xl">
              {post.title}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
