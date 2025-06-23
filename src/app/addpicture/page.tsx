'use client'

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import ImagePreview from '@/components/ImagePreview';
import Gallery from '@/components/Gallery';

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
                  <ImagePreview
                    key={index}
                    id={index}
                    url={newImages.previews[index]}
                    title={file.name}
                    onDelete={() => handleRemoveImage(index)}
                  />
                ))}
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Ajouter les images
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}