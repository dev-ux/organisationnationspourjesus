import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Image {
  id: number;
  url: string;
  title: string;
  description: string;
}

export default function ImageList() {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/upload');
      const data = await response.json();
      setImages(data);
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      if (confirm('Êtes-vous sûr de vouloir supprimer cette image ?')) {
        const response = await fetch(`/api/upload/${id}`, {
          method: 'DELETE'
        });
        
        if (response.ok) {
          // Mettre à jour la liste des images
          setImages(prev => prev.filter(img => img.id !== id));
        }
      }
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity }}
          className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
        />
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Galerie</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image) => (
          <div key={image.id} className="relative group">
            <img
              src={image.url}
              alt={image.title}
              className="w-full h-64 object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 transition-opacity duration-300 flex items-center justify-center">
              <div className="text-white text-center">
                <h3 className="font-bold mb-1">{image.title}</h3>
                <p className="text-sm mb-2">{image.description}</p>
                <button
                  onClick={() => handleDelete(image.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                >
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
