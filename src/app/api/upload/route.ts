import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { createHash } from 'crypto';
import path from 'path';
import * as fs from 'fs';

// Configuration de Cloudinary avec tes variables d'environnement
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    if (typeof title !== 'string' || typeof description !== 'string') {
      return NextResponse.json({ error: 'Invalid title or description' }, { status: 400 });
    }

    // Vérifier la taille du fichier
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'File too large (max 5MB)' }, { status: 400 });
    }

    // Générer un nom unique pour le fichier
    const fileName = createHash('md5').update(file.name + Date.now()).digest('hex') + path.extname(file.name);

    // Convertir le fichier en buffer
    const buffer = Buffer.from(await file.arrayBuffer());
    
    // Télécharger l'image vers Cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(buffer.toString('base64'), {
      public_id: fileName,
      resource_type: 'auto',
      folder: 'organisationnationspourjesus', // Ajouter un dossier spécifique
      use_filename: true,
      unique_filename: true
    });

    const image = {
      url: cloudinaryResponse.secure_url,
      title,
      description,
      id: Date.now(),
      type: cloudinaryResponse.resource_type
    };

    // Ajouter l'image à la liste
    const imagesFile = path.join(process.cwd(), 'public', 'image.json');
    let imagesData = [];

    if (fs.existsSync(imagesFile)) {
      imagesData = JSON.parse(await fs.promises.readFile(imagesFile, 'utf-8'));
    }

    imagesData.push(image);
    await fs.promises.writeFile(imagesFile, JSON.stringify(imagesData, null, 2), 'utf-8');

    return NextResponse.json({
      success: true,
      data: image
    });
  } catch (error: any) {
    console.error('Error uploading image:', error);
    return NextResponse.json({ 
      error: error.message || 'Failed to upload image',
      details: error.error?.message || undefined
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    const imagesFile = path.join(process.cwd(), 'public', 'image.json');
    
    if (!fs.existsSync(imagesFile)) {
      return NextResponse.json([], { status: 200 });
    }

    const imagesData = JSON.parse(await fs.promises.readFile(imagesFile, 'utf-8'));
    return NextResponse.json(imagesData);
  } catch (error: any) {
    console.error('Error fetching images:', error);
    return NextResponse.json({ 
      error: error.message || 'Failed to fetch images',
      details: error.error?.message || undefined
    }, { status: 500 });
  }
}
