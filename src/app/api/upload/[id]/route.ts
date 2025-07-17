import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

let images: any[] = []; // ⛔ remplace ceci par une base de données ou stockage persistant

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id, 10);
    const imageToDelete = images.find((img) => img.id === id);

    if (!imageToDelete) {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 });
    }

    // Supprimer de Cloudinary
    await cloudinary.uploader.destroy(imageToDelete.public_id);

    // Supprimer de la liste locale (mock)
    images = images.filter((img) => img.id !== id);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Error deleting image:', err);
    return NextResponse.json({ error: 'Failed to delete image' }, { status: 500 });
  }
}
