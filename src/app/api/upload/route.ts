import { NextResponse } from 'next/server';
import * as fs from 'fs';
import path from 'path';
import { createHash } from 'crypto';

// Créer un dossier pour stocker les images si nécessaire
const imagesDir = path.join(process.cwd(), 'public', 'images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('image') as File[];
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;

    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'No files uploaded' }, { status: 400 });
    }

    const uploadedImages = [];
    
    for (const file of files) {
      // Créer un hash unique pour le nom du fichier
      const hash = createHash('md5');
      hash.update(file.name + Date.now());
      const fileName = `${hash.digest('hex')}-${file.name}`;

      // Vérifier le type MIME de l'image
      const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        return NextResponse.json({ error: 'Invalid file type' }, { status: 400 });
      }

      // Vérifier la taille du fichier (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        return NextResponse.json({ error: 'File too large (max 5MB)' }, { status: 400 });
      }

      // Sauvegarder le fichier
      const filePath = path.join(imagesDir, fileName);
      const buffer = Buffer.from(await file.arrayBuffer());
      await fs.promises.writeFile(filePath, buffer);

      // Ajouter les informations de l'image à la liste
      uploadedImages.push({
        url: `/images/${fileName}`,
        title,
        description,
        id: Date.now(),
        type: file.type
      });
    }

    // Lire les images existantes
    const imagesFile = path.join(process.cwd(), 'src/app/api/upload/images.json');
    
    // Créer le fichier JSON s'il n'existe pas
    if (!fs.existsSync(imagesFile)) {
      await fs.promises.writeFile(imagesFile, JSON.stringify([], null, 2));
    }

    const existingImages = JSON.parse(await fs.promises.readFile(imagesFile, 'utf-8'));

    // Ajouter les nouvelles images
    const allImages = [...existingImages, ...uploadedImages];

    // Sauvegarder les images mises à jour
    await fs.promises.writeFile(imagesFile, JSON.stringify(allImages, null, 2));

    // Retourner les informations de toutes les images
    return NextResponse.json({
      success: true,
      data: uploadedImages
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
  }
}

// Endpoint pour récupérer toutes les images
export async function GET() {
  try {
    const imagesFile = path.join(process.cwd(), 'src/app/api/upload/images.json');
    
    // Vérifier si le fichier existe
    if (!fs.existsSync(imagesFile)) {
      return NextResponse.json([], { status: 200 }); // Retourner un tableau vide si le fichier n'existe pas
    }

    const imagesData = JSON.parse(await fs.promises.readFile(imagesFile, 'utf-8'));
    
    // Vérifier si les images existent réellement
    const imagesDir = path.join(process.cwd(), 'public', 'images');
    const existingImages = await fs.promises.readdir(imagesDir);
    
    // Filtrer les images qui existent réellement
    const validImages = imagesData.filter((image: any) => {
      const imagePath = path.join(imagesDir, image.url.replace('/images/', ''));
      return existingImages.includes(path.basename(imagePath));
    });

    return NextResponse.json(validImages);
  } catch (error) {
    console.error('Error fetching images:', error);
    return NextResponse.json({ error: 'Failed to fetch images' }, { status: 500 });
  }
}