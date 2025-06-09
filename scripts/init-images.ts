import * as fs from 'fs';
import path from 'path';

// Créer le dossier images s'il n'existe pas
const imagesDir = path.join(process.cwd(), 'public', 'images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Copier les images existantes
const images = [
  'onj1.jpg',
  'onj2.jpg',
  'onj3.jpg',
  'onj4.jpg'
];

images.forEach(image => {
  const sourcePath = path.join(process.cwd(), 'public', image);
  const destPath = path.join(imagesDir, image);
  
  if (fs.existsSync(sourcePath)) {
    fs.copyFileSync(sourcePath, destPath);
    console.log(`Copied ${image} to ${destPath}`);
  }
});

// Créer ou mettre à jour le fichier JSON
const imagesJson = [
  {
    id: 1,
    url: '/images/onj1.jpg',
    title: 'Activité Missionnaire',
    description: 'Une journée de mission dans la communauté'
  },
  {
    id: 2,
    url: '/images/onj2.jpg',
    title: 'Formation Biblique',
    description: 'Séance de formation biblique'
  },
  {
    id: 3,
    url: '/images/onj3.jpg',
    title: 'Célébration',
    description: 'Moment de louange et de célébration'
  },
  {
    id: 4,
    url: '/images/onj4.jpg',
    title: 'Service Communautaire',
    description: 'Service rendu à la communauté'
  }
];

const imagesJsonPath = path.join(process.cwd(), 'src/app/api/upload/images.json');
fs.writeFileSync(imagesJsonPath, JSON.stringify(imagesJson, null, 2));
console.log('Updated images.json');
