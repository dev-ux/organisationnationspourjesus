"use client";

import AdminLayout from "../layout";
import { useState, useEffect } from "react";
import Image from "next/image";
import Swal from 'sweetalert2';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
});

interface News {
  id: number;
  titre: string;
  date: string;
  description: string;
  image: string;
  contenu: string;
}

export default function NewsPage() {
  const [news, setNews] = useState<News[]>([]);
  const [newNews, setNewNews] = useState<News>({
    id: Date.now(),
    titre: "",
    date: new Date().toISOString().split('T')[0],
    description: "",
    image: "",
    contenu: ""
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const fetchNews = async () => {
    try {
      const response = await fetch('/api/news');
      const data = await response.json();
      // Vérifier si data est un objet avec une propriété news
      const newsData = data.news || data;
      // S'assurer que newsData est un tableau
      setNews(Array.isArray(newsData) ? newsData : []);
    } catch (error) {
      console.error('Error fetching news:', error);
      setNews([]); // S'assurer que news est toujours un tableau
      Toast.fire({
        icon: 'error',
        title: 'Erreur lors du chargement des actualités'
      });
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
      Toast.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Veuillez sélectionner une image'
      });
      return;
    }

    try {
      // Créer un FormData avec toutes les données
      const formData = new FormData();
      formData.append('image', selectedImage);
      formData.append('titre', newNews.titre);
      formData.append('date', newNews.date);
      formData.append('contenu', newNews.contenu);
      formData.append('description', newNews.description);

      // Envoyer directement les données à l'API news
      const response = await fetch('/api/news', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        Toast.fire({
          icon: 'success',
          title: 'Succès',
          text: 'L\'actualité a été ajoutée avec succès'
        });
        setNewNews({
          id: Date.now(),
          titre: "",
          description: "",
          image: "",
          date: new Date().toISOString().split('T')[0],
          contenu: ""
        });
        setSelectedImage(null);
        setPreviewImage(null);
        fetchNews();
      } else {
        Toast.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Erreur lors de l\'ajout de l\'actualité'
        });
      }
    } catch (error) {
      console.error('Error:', error);
      Toast.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Erreur lors de l\'ajout de l\'actualité'
      });
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

      if (response.ok) {
        Toast.fire({
          icon: 'success',
          title: 'Succès',
          text: 'L\'actualité a été supprimée avec succès'
        });
        await fetchNews();
      } else {
        Toast.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Erreur lors de la suppression de l\'actualité'
        });
      }
    } catch (error) {
      console.error('Error:', error);
      Toast.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Erreur lors de la suppression de l\'actualité'
      });
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
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="titre" className="block text-sm font-medium text-gray-700">
                      Titre
                    </label>
                    <input
                      type="text"
                      id="titre"
                      name="titre"
                      value={newNews.titre}
                      onChange={(e) => setNewNews({ ...newNews, titre: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={newNews.description}
                      onChange={(e) => setNewNews({ ...newNews, description: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      rows={3}
                      required
                    />
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
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="contenu" className="block text-sm font-medium text-gray-700">
                      Contenu
                    </label>
                    <textarea
                      id="contenu"
                      name="contenu"
                      value={newNews.contenu}
                      onChange={(e) => setNewNews({ ...newNews, contenu: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      rows={5}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                      Image
                    </label>
                    <div className="mt-2">
                      {previewImage && (
                        <div className="mb-4">
                          <Image
                            src={previewImage}
                            alt="Preview"
                            className="w-64 h-48 object-cover rounded-lg"
                            width={256}
                            height={192}
                          />
                        </div>
                      )}
                      <input
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-500 file:text-indigo-700 hover:file:bg-indigo-100"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Ajouter l'actualité
                  </button>
                </form>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Liste des actualités</h3>
                <div className="space-y-4">
                  {Array.isArray(news) && news.map((item) => (
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
