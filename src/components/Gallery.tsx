'use client'
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ImageWithFallback from './ImageWithFallback';

interface GalleryProps {
  images: {
    id: string;
    url: string;
    title: string;
    description?: string;
    public_id: string;
  }[];
  isLoading?: boolean;
}

export default function Gallery({ images: initialImages, isLoading: initialIsLoading = false }: GalleryProps) {
  const [galleryImages, setGalleryImages] = useState<GalleryProps['images']>(initialImages);
  const [isLoading, setLoading] = useState(initialIsLoading);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Gestion des erreurs
  const handleError = (message: string): void => {
    setError(message);
  };

  // Chargement initial
  useEffect(() => {
    if (!initialImages || initialImages.length === 0) {
      fetchImages();
    } else {
      setGalleryImages(initialImages);
    }
  }, [initialImages]);

  // Récupération des images
  const fetchImages = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await fetch('/api/upload');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setGalleryImages(data);
    } catch (error) {
      setGalleryImages([]);
    } finally {
      setLoading(false);
    }
  };

  // Sélection d'image
  const handleImageClick = (id: string): void => {
    setSelectedImage(id);
  };

  // Fermeture de la lightbox
  const handleClose = (): void => {
    setSelectedImage(null);
  };

  // Gestion des états
  if (isLoading) {
    return <div className="gallery-container">Chargement des images...</div>;
  }

  if (error) {
    return <div className="gallery-container">Erreur: {error}</div>;
  }

  if (!galleryImages || galleryImages.length === 0) {
    return <div className="gallery-container">Aucune image trouvée</div>;
  }

  // Rendu
  return (
    <div className="gallery-container">
      {/* Grid de miniatures */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {galleryImages.map((image) => {
          return (
            <motion.div
              key={image.id}
              className="relative overflow-hidden rounded-lg cursor-pointer"
              onClick={() => handleImageClick(image.id)}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              {/* Image avec fallback */}
              <div className="relative w-full h-full">
                {image.url && image.url.startsWith('https://') && image.url.includes('res.cloudinary.com') ? (
                  <ImageWithFallback
                    src={image.url}
                    alt={image.title}
                    width={300}
                    height={200}
                    className="rounded-lg hover:opacity-90 transition-opacity"
                    onError={() => handleError('Erreur lors du chargement de l\'image')}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-red-500">
                    URL invalide
                  </div>
                )}
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2 text-white">
                <h3 className="text-sm font-semibold">{image.title}</h3>
              </div>
            </motion.div>
          );
        })}
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
            <div className="relative">
              <ImageWithFallback
                src={galleryImages.find(img => img.id === selectedImage)?.url || ''}
                alt={galleryImages.find(img => img.id === selectedImage)?.title || ''}
                width={800}
                height={600}
                className="rounded-lg"
                onError={() => handleError('Erreur lors du chargement de l\'image')}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

