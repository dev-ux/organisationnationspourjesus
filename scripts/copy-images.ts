import * as fs from 'fs';
import path from 'path';

const images = [
  'onj1.jpg',
  'onj2.jpg',
  'onj3.jpg',
  'onj4.jpg'
];

const imagesDir = path.join(process.cwd(), 'public', 'images');

// Créer le dossier s'il n'existe pas
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Copier les images dans le dossier public/images
images.forEach(image => {
  const sourcePath = path.join(process.cwd(), 'public', image);
  const destPath = path.join(imagesDir, image);
  
  if (fs.existsSync(sourcePath)) {
    fs.copyFileSync(sourcePath, destPath);
    console.log(`Copied ${image} to ${destPath}`);
  }
});
