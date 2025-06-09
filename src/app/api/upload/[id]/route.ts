import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    // Lire le fichier JSON
    const imagesFile = path.join(process.cwd(), 'src/app/api/upload/images.json');
    const imagesData = JSON.parse(await fs.readFile(imagesFile, 'utf-8'));

    // Trouver l'image à supprimer
    const imageIndex = imagesData.findIndex((img: any) => img.id === parseInt(id));
    
    if (imageIndex === -1) {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 });
    }

    // Supprimer le fichier image
    const imagePath = path.join(process.cwd(), 'public', imagesData[imageIndex].url.replace('/images/', ''));
    try {
      await fs.access(imagePath);
      await fs.unlink(imagePath);
    } catch (error) {
      console.log('File does not exist:', imagePath);
    }

    // Mettre à jour le fichier JSON
    imagesData.splice(imageIndex, 1);
    await fs.writeFile(imagesFile, JSON.stringify(imagesData, null, 2));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting image:', error);
    return NextResponse.json({ error: 'Failed to delete image' }, { status: 500 });
  }
}
