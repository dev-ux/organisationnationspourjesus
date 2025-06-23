'use client'

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
<<<<<<< HEAD
import ImageList from '@/components/ImageList';
=======
import ImagePreview from '@/components/ImagePreview';
import Gallery from '@/components/Gallery';
>>>>>>> fix-gallery-component

export default function AddPicturePage() {
  const router = useRouter();
  const [newImages, setNewImages] = useState<{
    title: string;
    description: string;
    files: File[];
    previews: string[];
  }>({
    title: '',
    description: '',
    files: [],
    previews: []
  });

  // Rafraîchir la liste des images après l'upload
  const handleUploadSuccess = () => {
    router.refresh();
  };

  useEffect(() => {
    // Créer des URLs d'aperçu pour chaque fichier
    if (newImages.files.length > 0) {
      const previews = newImages.files.map(file => 
        URL.createObjectURL(file)
      );
      setNewImages(prev => ({
        ...prev,
        previews
      }));
    }
  }, [newImages.files]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setNewImages({
      ...newImages,
      files
    });
  };

  const handleRemoveImage = (index: number) => {
    const newFiles = newImages.files.filter((_, i) => i !== index);
    const newPreviews = newImages.previews.filter((_, i) => i !== index);
    setNewImages(prev => ({
      ...prev,
      files: newFiles,
      previews: newPreviews
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newImages.files.length === 0) return;
    
    try {
      const formData = new FormData();
      formData.append('title', newImages.title);
      formData.append('description', newImages.description);
      
      newImages.files.forEach((file, index) => {
        formData.append('image', file, file.name);
      });

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      
      if (data.success) {
        // Redirection vers la galerie après succès
        router.push('/galerie');
      }
    } catch (error) {
      console.error('Error uploading images:', error);
      alert('Error uploading images');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Ajouter des Images</h1>
<<<<<<< HEAD
        <div className="space-y-8">
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Titre
              </label>
              <input
                type="text"
                id="title"
                value={newImages.title}
                onChange={(e) => setNewImages(prev => ({ ...prev, title: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                value={newImages.description}
                onChange={(e) => setNewImages(prev => ({ ...prev, description: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Images
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="mt-1 block w-full"
              />
              <div className="flex flex-wrap gap-4 mt-4">
                {newImages.files.map((file, index) => (
                  <div key={index} className="relative w-32 h-32 bg-gray-100 rounded">
                    <img
                      src={newImages.previews[index]}
                      alt={file.name}
                      className="w-full h-full object-cover rounded"
                    />
                    <button
                      onClick={() => handleRemoveImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
=======

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
              {/* Zone de prévisualisation des images */}
              {newImages.previews.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
                  {newImages.previews.map((preview, index) => (
                    <ImagePreview
                      key={index}
                      id={index}
                      url={preview}
                      title="Image à prévisualiser"
                      onDelete={() => handleRemoveImage(index)}
                    />
                  ))}
                </div>
              )}

              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">
                  Titre
                </label>
                <input
                  type="text"
                  value={newImages.title}
                  onChange={(e) => setNewImages({ ...newImages, title: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Entrez un titre pour les images"
                />
              </div>

              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  value={newImages.description}
                  onChange={(e) => setNewImages({ ...newImages, description: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 h-32"
                  placeholder="Ajoutez une description des images"
                />
              </div>

              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">
                  Sélectionnez des images
                </label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                  className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>

              {newImages.files.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                  {newImages.files.map((file, index) => (
                    <div key={index} className="relative w-32 h-32 bg-gray-100 rounded overflow-hidden">
                      <img
                        src={newImages.previews[index]}
                        alt={file.name}
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveImage(index);
                        }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
>>>>>>> fix-gallery-component
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors font-semibold text-lg"
              disabled={newImages.files.length === 0}
            >
              {newImages.files.length === 0 ? 'Ajouter des images' : 'Ajouter les images'}
            </button>
          </form>
<<<<<<< HEAD
          <ImageList />
        </div>
=======
        </motion.div>

        {/* Section pour afficher les images existantes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8"
        >
          <h2 className="text-2xl font-semibold mb-4">Images existantes</h2>
          <Gallery
            images={newImages.files.map((file, index) => ({
              id: index,
              url: newImages.previews[index],
              title: newImages.title,
              description: newImages.description
            }))}
          />
        </motion.div>
>>>>>>> fix-gallery-component
      </div>
    </div>
  );
}
