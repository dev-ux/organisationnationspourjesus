"use client";

import AdminLayout from "../layout";
import { useState } from "react";
import { useSession } from "next-auth/react";

interface PastorMessage {
  title: string;
  content: string;
  image: string;
}

export default function PastorMessagePage() {
  const [message, setMessage] = useState<PastorMessage>({
    title: "",
    content: "",
    image: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/pastor-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour');
      }

      alert('Message mis à jour avec succès');
    } catch (error) {
      console.error('Error:', error);
      alert('Erreur lors de la mise à jour du message');
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-6">Mot du Pasteur</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Titre
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={message.title}
                    onChange={(e) => setMessage({ ...message, title: e.target.value })}
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
                    value={message.content}
                    onChange={(e) => setMessage({ ...message, content: e.target.value })}
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
                    value={message.image}
                    onChange={(e) => setMessage({ ...message, image: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Enregistrer
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
