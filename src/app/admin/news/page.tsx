"use client";

import AdminLayout from "../layout";
import { useState } from "react";

interface News {
  title: string;
  content: string;
  image: string;
  date: string;
}

export default function NewsPage() {
  const [news, setNews] = useState<News[]>([]);
  const [newNews, setNewNews] = useState<News>({
    title: "",
    content: "",
    image: "",
    date: new Date().toISOString().split('T')[0]
  });

  const fetchNews = async () => {
    try {
      const response = await fetch('/api/news');
      const data = await response.json();
      setNews(data.news);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/news', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newNews),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'ajout');
      }

      setNewNews({
        title: "",
        content: "",
        image: "",
        date: new Date().toISOString().split('T')[0]
      });
      fetchNews();
    } catch (error) {
      console.error('Error:', error);
      alert('Erreur lors de l\'ajout de l\'actualité');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette actualité ?')) {
      return;
    }

    try {
      const response = await fetch(`/api/news/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la suppression');
      }

      fetchNews();
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
                      value={newNews.title}
                      onChange={(e) => setNewNews({ ...newNews, title: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                      Contenu
                    </label>
                    <textarea
                      id="content"
                      name="content"
                      value={newNews.content}
                      onChange={(e) => setNewNews({ ...newNews, content: e.target.value })}
                      rows={4}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                      URL de l'image
                    </label>
                    <input
                      type="text"
                      id="image"
                      name="image"
                      value={newNews.image}
                      onChange={(e) => setNewNews({ ...newNews, image: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
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
                    <div key={item.title} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{item.title}</h4>
                          <p className="text-sm text-gray-500">{item.date}</p>
                        </div>
                        <button
                          onClick={() => handleDelete(item.title)}
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
