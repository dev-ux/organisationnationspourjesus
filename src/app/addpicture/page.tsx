'use client';

import { useState, useEffect } from 'react';

interface PreviewImage {
  file: File;
  previewUrl: string;
}

export default function AddPictureForm() {
  const [images, setImages] = useState<PreviewImage[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Générer des previews quand des fichiers sont sélectionnés
  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const newImages = selectedFiles.map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...newImages]);
  };

  // Retirer une image sélectionnée
  const removeImage = (indexToRemove: number) => {
    const updatedImages = images.filter((_, index) => index !== indexToRemove);
    setImages(updatedImages);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (images.length === 0) {
      setError('Veuillez sélectionner au moins une image.');
      return;
    }

    setUploading(true);
    setError('');
    setSuccess('');

    try {
      for (const { file } of images) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('title', title || file.name);
        formData.append('description', description);

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Erreur inconnue');
        }
      }

      setSuccess('Toutes les images ont été envoyées avec succès !');
      setImages([]);
      setTitle('');
      setDescription('');
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 mt-64 max-w-xl mx-auto bg-white shadow-lg rounded-xl">
      <h2 className="text-xl font-bold">Ajouter des images</h2>

      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-600">{success}</p>}

      <div>
        <label className="block text-sm font-medium">Images</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFilesChange}
          className="mt-1 block w-full text-sm"
        />
      </div>

      {/* Aperçu des images sélectionnées */}
      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-4 mt-4">
          {images.map(({ previewUrl }, index) => (
            <div key={index} className="relative group">
              <img
                src={previewUrl}
                alt={`Image ${index + 1}`}
                className="w-full h-32 object-cover rounded border"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 bg-black bg-opacity-60 text-white text-xs rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                title="Supprimer"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium">Titre (facultatif)</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full rounded border px-2 py-1"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Description (facultatif)</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="mt-1 block w-full rounded border px-2 py-1"
        />
      </div>

      <button
        type="submit"
        disabled={uploading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        {uploading ? 'Envoi en cours...' : 'Envoyer'}
      </button>
    </form>
  );
}
