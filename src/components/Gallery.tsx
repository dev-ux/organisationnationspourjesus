'use client'

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface GalleryProps {
  images: Array<{
    id: number;
    url: string;
    title: string;
    description?: string;
  }>;
  isLoading?: boolean;
}

export default function Gallery({ images: initialImages, isLoading: initialIsLoading = false }: GalleryProps) {
  const [images, setImages] = useState<GalleryProps['images']>(initialImages);
  const [isLoading, setLoading] = useState(initialIsLoading);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async (id: number) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette image ?')) return;

    try {
      const response = await fetch(`/api/upload/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete image');
      }

      // Mettre à jour la liste des images
      const updatedImages = images.filter((img) => img.id !== id);
      setImages(updatedImages);
      
      // Si l'image supprimée était celle sélectionnée, déselectionner
      if (selectedImage === id) {
        setSelectedImage(null);
      }
    } catch (err) {
      setError('Erreur lors de la suppression de l\'image');
      console.error('Error deleting image:', err);
    }
  }; // Si aucune prop images n'est passée, on doit fetcher les images

  useEffect(() => {
    // Update images when the prop changes
    setImages(initialImages);
  }, [initialImages]);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/upload');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setImages(data);
    } catch (error) {
      setImages([]);
    } finally {
      setLoading(false);
    }
  };

  const handleImageClick = (id: number) => {
    setSelectedImage(id);
  };

  const handleClose = () => {
    setSelectedImage(null);
  };

  if (isLoading) {
    return <div className="gallery-container">Chargement des images...</div>;
  }

  if (error) {
    return <div className="gallery-container">Erreur: {error}</div>;
  }

  if (!images || images.length === 0) {
    return <div className="gallery-container">Aucune image trouvée</div>;
  }

  return (
    <div className="gallery-container">
      {/* Grid de miniatures */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {images.map((image) => (
          <motion.div
            key={image.id}
            className="relative overflow-hidden rounded-lg cursor-pointer"
            onClick={() => handleImageClick(image.id)}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            {/* Bouton de suppression */}
            {/* <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(image.id);
              }}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
              title="Supprimer"
            >
              ✕
            </button> */}
            <Image
              src={image.url}
              alt={image.title}
              width={300}
              height={200}
              className="object-cover w-full h-full"
              onError={(e) => {
                e.currentTarget.src = '/images/default-image.jpg';
              }}              
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
