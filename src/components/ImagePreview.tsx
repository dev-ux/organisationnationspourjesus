'use client'

import Image from 'next/image';
import { motion } from 'framer-motion';

interface ImagePreviewProps {
  id: number;
  url: string;
  title: string;
  onDelete: (id: number) => void;
}

export default function ImagePreview({ id, url, title, onDelete }: ImagePreviewProps) {
  return (
    <motion.div
      key={String(id)}
      className="relative overflow-hidden rounded-lg cursor-pointer"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      {/* Bouton de suppression */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(id);
        }}
        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
        title="Supprimer"
      >
        ✕
      </button>
      
      {/* Image */}
      <Image
        src={url}
        alt={title}
        width={300}
        height={200}
        className="object-cover w-full h-full"
        onError={(e) => {
          e.currentTarget.src = '/public/image/onj1.jpg';
        }}
      />
      
      {/* Titre */}
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2 text-white">
        <h3 className="text-sm font-semibold">{title}</h3>
      </div>
    </motion.div>
  );
}
