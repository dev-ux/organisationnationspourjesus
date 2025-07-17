import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';
import { createHash } from 'crypto';

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

if (!cloudName || !apiKey || !apiSecret) {
  throw new Error('Cloudinary credentials are missing');
}

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
});

console.log('Cloudinary configuration:', {
  cloud_name: cloudName,
  api_key: '***', // Masqué pour la sécurité
  api_secret: '***' // Masqué pour la sécurité
});

import { addImage, getImages, removeImage } from '@/lib/imageStore';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // Générer nom unique
    const hash = createHash('md5');
    hash.update(file.name + Date.now());
    const fileName = `${hash.digest('hex')}-${file.name}`;

    // ✅ upload via streamifier
    const uploadResult: any = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          public_id: fileName,
          folder: 'organisationnationspourjesus',
          use_filename: true,
          unique_filename: false,
          resource_type: 'image',
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      streamifier.createReadStream(buffer).pipe(stream);
    });

    console.log('Upload result:', {
      secure_url: uploadResult.secure_url,
      public_id: uploadResult.public_id,
      cloud_name: cloudName
    });

    const newImage = {
      id: Date.now(),
      url: uploadResult.secure_url,
      title,
      description,
      public_id: uploadResult.public_id,
    };

    addImage(newImage);

    return NextResponse.json(newImage); // retourne l'image seule (plus simple à gérer)
  } catch (error) {
    console.error('Error uploading image:', error);
    return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const images = getImages();
    return NextResponse.json(images);
  } catch (error) {
    console.error('Error fetching images:', error);
    return NextResponse.json({ error: 'Failed to fetch images' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id, public_id } = await request.json();
    
    // Supprimer de Cloudinary
    await cloudinary.uploader.destroy(public_id);
    
    // Supprimer de notre stockage
    removeImage(id);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting image:', error);
    return NextResponse.json({ error: 'Failed to delete image' }, { status: 500 });
  }
}
