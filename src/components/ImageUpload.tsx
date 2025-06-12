'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ImageUploadProps {
  onImageUpload: (url: string) => void;
}

export default function ImageUpload({ onImageUpload }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      
      // Créer un aperçu de l'image
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      // Préparer les données à envoyer
      const formData = new FormData();
      formData.append('image', file);

      // Envoyer l'image au serveur
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'upload de l\'image');
      }

      const data = await response.json();
      onImageUpload(data.url);
    } catch (error) {
      console.error('Erreur lors de l\'upload:', error);
      alert('Erreur lors de l\'upload de l\'image');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Image du département
      </label>
      <div className="flex items-center gap-4">
        <div className="relative w-32 h-32">
          {preview ? (
            <Image
              src={preview}
              alt="Preview"
              fill
              className="object-cover rounded-lg"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-gray-100 rounded-lg">
              <span className="text-gray-400">Aucune image sélectionnée</span>
            </div>
          )}
        </div>
        <button
          className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => document.getElementById('image-upload')?.click()}
          disabled={uploading}
        >
          {uploading ? 'En cours...' : 'Sélectionner une image'}
        </button>
        <input
          type="file"
          id="image-upload"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </div>
  );
}
