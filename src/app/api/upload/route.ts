import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';
import { createHash } from 'crypto';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

// Mémoire temporaire (à remplacer par DB)
let images: any[] = [];

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

    const newImage = {
      id: Date.now(),
      url: uploadResult.secure_url,
      title,
      description,
      public_id: uploadResult.public_id,
    };

    images.push(newImage);

    return NextResponse.json(newImage); // retourne l'image seule (plus simple à gérer)
  } catch (error) {
    console.error('Error uploading image:', error);
    return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
  }
}

export async function GET() {
  try {
    return NextResponse.json(images);
  } catch (error) {
    console.error('Error fetching images:', error);
    return NextResponse.json({ error: 'Failed to fetch images' }, { status: 500 });
  }
}
