import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';
import streamifier from 'streamifier';
import { createHash } from 'crypto';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
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

    const buffer = Buffer.from(await file.arrayBuffer());

    // Générer nom unique
    const hash = createHash('md5');
    hash.update(file.name + Date.now());
    const fileName = `${hash.digest('hex')}-${file.name}`;

    // Upload via streamifier
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
      id: uploadResult.public_id,
      url: uploadResult.secure_url,
      title: title || file.name,
      description: description || '',
      public_id: uploadResult.public_id,
    };

    return NextResponse.json(newImage);
  } catch (error) {
    console.error('Error uploading image:', error);
    return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
  }
}

export async function GET() {
  try {
    // Vérifier la configuration Cloudinary
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      console.error('❌ Cloudinary configuration missing:', {
        cloud_name: !!process.env.CLOUDINARY_CLOUD_NAME,
        api_key: !!process.env.CLOUDINARY_API_KEY,
        api_secret: !!process.env.CLOUDINARY_API_SECRET
      });
      return NextResponse.json({ error: 'Cloudinary configuration missing' }, { status: 500 });
    }

    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: 'organisationnationspourjesus',
      max_results: 100,
    });

    const images = result.resources.map((resource: any) => ({
      id: resource.public_id,
      url: resource.secure_url,
      title: resource.original_filename || 'Image',
      description: '',
      public_id: resource.public_id,
    }));

    return NextResponse.json(images);
  } catch (error) {
    console.error('❌ Error fetching images from Cloudinary:', error);
    console.error('❌ Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    return NextResponse.json({ 
      error: 'Failed to fetch images',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
