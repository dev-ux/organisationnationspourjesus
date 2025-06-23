import fs from 'fs';
import path from 'path';

interface Image {
  id: number;
  url: string;
  title: string;
  description: string;
  [key: string]: any; // Allow other properties while maintaining type safety
}

const imagesPath = path.join(process.cwd(), 'public', 'images.json');

// Lire le fichier images.json
const imagesJson = fs.readFileSync(imagesPath, 'utf8');
const images = JSON.parse(imagesJson);

// Créer un set pour suivre les IDs utilisés
const usedIds = new Set<number>();

// Fonction pour générer un ID unique
function generateUniqueID(): number {
  let id = Math.floor(Math.random() * 1000000000000);
  while (usedIds.has(id)) {
    id = Math.floor(Math.random() * 1000000000000);
  }
  usedIds.add(id);
  return id;
}

// Mettre à jour les IDs pour chaque image
const updatedImages = images.map((image: Image) => ({
  ...image,
  id: generateUniqueID()
}));

// Écrire le fichier mis à jour
fs.writeFileSync(imagesPath, JSON.stringify(updatedImages, null, 2));

console.log('IDs des images mis à jour avec succès !');
