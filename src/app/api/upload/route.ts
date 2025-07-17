import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function GET() {
  try {
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
    return NextResponse.json({ error: 'Failed to fetch images' }, { status: 500 });
  }
}
