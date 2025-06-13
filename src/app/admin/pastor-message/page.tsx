"use client";

import AdminLayout from "../layout";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { motion } from "framer-motion";

interface PastorMessage {
  title: string;
  content: string;
  image: string;
  author: string;
  role: string;
}

export default function PastorMessagePage() {
  const { data: session, status } = useSession();
  const [message, setMessage] = useState<PastorMessage>({
    title: "",
    content: "",
    image: "",
    author: "Pasteur Herman Tano",
    role: "Pasteur Principal"
  });
  const [loading, setLoading] = useState(true);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  
  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await fetch('/api/pastor-message');
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération du message');
        }
        const data = await response.json();
        
        // Handle both cases: data.message and direct message object
        const messageData = data.message || data;
        
        if (messageData && typeof messageData === 'object') {
          setMessage(messageData);
        } else {
          console.error('Données reçues:', data);
          throw new Error('Données du message invalides');
        }
      } catch (error) {
        console.error('Erreur lors de la récupération du message:', error);
        // Set an empty message if there's an error
        setMessage({
          title: "",
          content: "",
          image: "",
          author: "Pasteur Herman Tano",
          role: "Pasteur Principal"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchMessage();
  }, []);

  if (status === "loading" || loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement en cours...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return <div className="flex justify-center items-center min-h-screen">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Accès non autorisé</h2>
        <p className="text-gray-600">Vous devez être connecté pour accéder à cette page.</p>
      </div>
    </div>;
  }

  if (!message) {
    return <div className="flex justify-center items-center min-h-screen">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Erreur</h2>
        <p className="text-gray-600">Impossible de charger le message du pasteur.</p>
      </div>
    </div>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Début de la soumission', message);
    
    try {
      // Clone the current message to avoid mutating the state directly
      const updateData = { ...message };
      let newImageUrl = updateData.image;

      // Vérifier si nous avons un fichier à uploader
      if (file) {
        console.log('Début de l\'upload de l\'image');
        
        // Créer le formData avec le fichier
        const formData = new FormData();
        formData.append('image', file);
        formData.append('title', message.title);
        formData.append('description', message.content);
        
        // Faire l\'upload
        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: formData
        });
        
        if (!uploadResponse.ok) {
          const errorData = await uploadResponse.json();
          console.error('Erreur lors de l\'upload:', errorData);
          throw new Error(errorData.error || 'Erreur lors du téléchargement de l\'image');
        }
        
        const uploadData = await uploadResponse.json();
        console.log('Upload réussi, données:', uploadData);
        
        if (!uploadData.success || !uploadData.data || uploadData.data.length === 0) {
          throw new Error('Erreur lors du traitement de l\'image');
        }
        
        // Mettre à jour l'URL de l'image
        const fileName = uploadData.data[0].url.split('/').pop() || 'past.jpg';
newImageUrl = `/images/${fileName}`; // ✅ CORRECT

      }

      // Préparer les données pour la mise à jour du message
      const updateMessage = { ...message };
      updateMessage.image = newImageUrl;
      console.log('Données à envoyer:', updateMessage);

      // Faire la requête pour mettre à jour le message
      const response = await fetch('/api/pastor-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateMessage),
      });

      // Analyser la réponse
      const data = await response.json();
      console.log('Réponse complète:', {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
        data
      });
      
      if (response.ok) {
        console.log('Mise à jour réussie');
        alert('Message mis à jour avec succès');
        // Update the local state with the new data
        setMessage(updateMessage);
      } else {
        console.error('Erreur de l\'API:', data.error);
        throw new Error(data.error || 'Erreur lors de la mise à jour');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Erreur lors de la mise à jour du message');
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFile(file);
      
      // Create a preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white overflow-hidden shadow rounded-lg"
          >
            <div className="p-6">
              <h2 className="text-3xl font-bold text-center mb-8">Modifier le Message du Pasteur</h2>
              
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Image Preview */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <label className="block text-lg font-semibold mb-2">Image actuelle</label>
                    {message.image && (
                      <div className="relative h-64 rounded-lg overflow-hidden">
                        <Image
                          src={message.image}
                          alt="Image actuelle"
                          fill
                          className="object-cover"
                          priority
                        />
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <label className="block text-lg font-semibold mb-2">Nouvelle image</label>
                    <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
                      {previewImage ? (
                        <div className="relative w-full h-full rounded-lg overflow-hidden">
                          <Image
                            src={previewImage}
                            alt="Aperçu"
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full">
                          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                          <p className="mt-2 text-sm text-gray-500">Cliquez ou faites glisser une image ici</p>
                        </div>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                        id="image-upload"
                      />
                      <label
                        htmlFor="image-upload"
                        className="mt-2 cursor-pointer text-blue-600 hover:text-blue-700"
                      >
                        Choisir une image
                      </label>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-6">
                  <div className="space-y-4">
                    <label className="block text-lg font-semibold">
                      Titre
                    </label>
                    <input
                      type="text"
                      value={message.title}
                      onChange={(e) => {
                        setMessage(prev => ({ ...prev, title: e.target.value }));
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Entrez le titre du message"
                    />
                  </div>

                  <div className="space-y-4">
                    <label className="block text-lg font-semibold">
                      Contenu du message
                    </label>
                    <textarea
                      value={message.content}
                      onChange={(e) => {
                        setMessage(prev => ({ ...prev, content: e.target.value }));
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-48 resize-none"
                      placeholder="Entrez le contenu du message du Pasteur..."
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-colors font-semibold text-lg"
                    >
                      Enregistrer les modifications
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </AdminLayout>
  );
}
