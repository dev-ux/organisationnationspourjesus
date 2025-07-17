import { v2 as cloudinary } from 'cloudinary';

// Stockage temporaire des images
let images: Array<{
  id: number;
  url: string;
  title: string;
  description?: string;
  public_id: string;
}> = [];

// Fonction pour initialiser le stockage
export function initializeImageStore() {
  // Vérifier si des images existent déjà dans Cloudinary
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
    api_key: process.env.CLOUDINARY_API_KEY!,
    api_secret: process.env.CLOUDINARY_API_SECRET!,
  });

  // Récupérer les images existantes
  cloudinary.v2.api.resources(
    {
      type: 'upload',
      prefix: 'organisationnationspourjesus',
    },
    (error, result) => {
      if (error) {
        console.error('Error fetching existing images:', error);
        return;
      }

      if (result && result.resources) {
        images = result.resources.map((resource) => ({
          id: Date.now(),
          url: resource.secure_url,
          title: resource.original_filename || 'Image',
          public_id: resource.public_id,
        }));
      }
    }
  );
}

// Fonction pour ajouter une image
export function addImage(image: {
  id: number;
  url: string;
  title: string;
  description?: string;
  public_id: string;
}) {
  images.push(image);
}

// Fonction pour récupérer toutes les images
export function getImages() {
  return images;
}

// Fonction pour supprimer une image
export function removeImage(id: number) {
  images = images.filter((img) => img.id !== id);
}

// Initialiser le stockage au démarrage
initializeImageStore();
