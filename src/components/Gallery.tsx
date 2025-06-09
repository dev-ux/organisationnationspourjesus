'use client'

import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';

interface GalleryProps {
  images: Array<{
    id: number;
    url: string;
    title: string;
    description?: string;
  }>;
}

export default function Gallery({ images }: GalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const handleImageClick = (id: number) => {
    setSelectedImage(id);
  };

  const handleClose = () => {
    setSelectedImage(null);
  };

  return (
    <div className="gallery-container">
      {/* Grid de miniatures */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {images.map((image) => (
          <motion.div
            key={image.id}
            className="relative rounded-lg overflow-hidden cursor-pointer"
            onClick={() => handleImageClick(image.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Image
              src={image.url}
              alt={image.title}
              width={300}
              height={200}
              className="w-full h-full object-cover"
              priority={image.id === 1}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2 text-white">
              <h3 className="text-sm font-semibold">{image.title}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
          <div className="relative">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-white text-2xl"
            >
              &times;
            </button>
            <Image
              src={images.find(img => img.id === selectedImage)!.url}
              alt={images.find(img => img.id === selectedImage)!.title}
              width={800}
              height={600}
              className="max-w-screen-lg max-h-screen object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}

// Styles are now included in the component's className attributes directly
