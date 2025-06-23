"use client";

import AdminLayout from "../layout";
import { useState, useEffect } from "react";
import Image from "next/image";

interface News {
  titre: string;
  description: string;
  image: string;
  date: string;
  contenu: string;
}

export default function NewsPage() {
  const [news, setNews] = useState<News[]>([]);
  const [newNews, setNewNews] = useState<News>({
    titre: "",
    description: "",
    image: "",
    date: new Date().toISOString().split('T')[0],
    contenu: ""
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const fetchNews = async () => {
    try {
      const response = await fetch('/api/news');
      const data = await response.json();
      setNews(data);
    } catch (error) {
      console.error('Error fetching news:', error);
      alert('Erreur lors du chargement des actualités');
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedImage) {
      alert('Veuillez sélectionner une image');
      return;
    }

    try {
      // D'abord télécharger l'image
      const formData = new FormData();
      formData.append('image', selectedImage);
      formData.append('title', newNews.titre);
      formData.append('description', newNews.description);

      const imageResponse = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });

      if (!imageResponse.ok) {
        throw new Error('Erreur lors du téléchargement de l\'image');
      }

      const imageData = await imageResponse.json();
      
      // Ensuite créer l'actualité avec l'URL de l'image
      const newsData = {
        titre: newNews.titre,
        description: newNews.description,
        image: imageData.url,
        date: newNews.date,
        contenu: newNews.description
      };

      const response = await fetch('/api/news', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newsData)
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'ajout de l\'actualité');
      }

      setNewNews({
        titre: "",
        description: "",
        image: "",
        date: new Date().toISOString().split('T')[0],
        contenu: ""
      });
      setSelectedImage(null);
      setPreviewImage(null);
      fetchNews();
    } catch (error) {
      console.error('Error:', error);
      alert('Erreur lors de l\'ajout de l\'actualité');
    }
  };

  const handleDelete = async (titre: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette actualité ?')) {
      return;
    }

    try {
      const response = await fetch(`/api/news/${titre}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la suppression');
      }

      await fetchNews();
    } catch (error) {
      console.error('Error:', error);
      alert('Erreur lors de la suppression de l\'actualité');
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-6">Actualités</h2>
              
              <div className="mb-8">
                <h3 className="text-lg font-medium mb-4">Ajouter une nouvelle actualité</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                      Titre
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={newNews.titre}
                      onChange={(e) => setNewNews({ ...newNews, titre: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Titre de l'actualité"
                    />
                  </div>

                  <div>
                    <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                      Contenu
                    </label>
                    <textarea
                      id="content"
                      name="content"
                      value={newNews.description}
                      onChange={(e) => setNewNews({ ...newNews, description: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 h-32"
                      placeholder="Contenu de l'actualité"
                    ></textarea>
                  </div>

                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                      Date
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={newNews.date}
                      onChange={(e) => setNewNews({ ...newNews, date: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                      Image
                    </label>
                    <div className="mt-2">
                      {previewImage && (
                        <div className="mb-4">
                          <img
                            src={previewImage}
                            alt="Preview"
                            className="w-64 h-48 object-cover rounded-lg"
                          />
                        </div>
                      )}
                      <input
                        type="file"
                        id="image"
                        name="image"
                        onChange={handleImageChange}
                        accept="image/*"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Ajouter
                  </button>
                </form>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Liste des actualités</h3>
                <div className="space-y-4">
                  {news.map((item) => (
                    <div key={item.titre} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{item.titre}</h4>
                          <p className="text-sm text-gray-500">{item.date}</p>
                        </div>
                        <button
                          onClick={() => handleDelete(item.titre)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Supprimer
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
