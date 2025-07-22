import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';
import prisma from '@/lib/db';

// Type personnalisé pour le client Prisma avec le modèle News
type PrismaWithNews = Omit<PrismaClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use'> & {
  news: {
    findMany: (args?: any) => Promise<any[]>;
    create: (args: any) => Promise<any>;
    delete: (args: any) => Promise<any>;
  };
};

const prismaWithNews = prisma as unknown as PrismaWithNews;

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface NewsItem {
  id: number;
  titre: string;
  date: string;
  description: string;
  image: string | null;
  contenu: string;
  createdAt: Date;
  updatedAt: Date;
}

export async function GET() {
  try {
    const news = await prismaWithNews.news.findMany({
      orderBy: {
        date: 'desc',
      },
    });
    
    return NextResponse.json({ news });
  } catch (error) {
    console.error('Erreur lors de la récupération des actualités:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des actualités' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('image') as File | null;
    const titre = formData.get('titre') as string;
    const date = formData.get('date') as string;
    const contenu = formData.get('contenu') as string;
    const description = formData.get('description') as string;

    // Vérifier que tous les champs requis sont présents
    if (!titre || !date || !contenu || !description) {
      return NextResponse.json(
        { error: "Tous les champs sont requis" },
        { status: 400 }
      );
    }

    let imagePath: string | null = null;

    // Traitement de l'image si elle est fournie
    if (file) {
      // Vérifier le type MIME de l'image
      const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        return NextResponse.json(
          { error: "Type de fichier non valide. Seules les images (jpeg, png, webp) sont autorisées" },
          { status: 400 }
        );
      }
      
      // Pour l'instant, on stocke juste le nom du fichier
      // Dans une version complète, vous voudrez peut-être télécharger l'image sur un service comme Cloudinary
      imagePath = `/uploads/${file.name}`;
    }

    // Créer une nouvelle actualité dans la base de données
    const newNews = await prismaWithNews.news.create({
      data: {
        titre,
        date: new Date(date),
        description,
        image: imagePath,
        contenu,
      },
    });
    
    return NextResponse.json(newNews, { status: 201 });
    
  } catch (error) {
    console.error('Erreur lors de la création de l\'actualité:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la création de l\'actualité' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'ID requis' },
        { status: 400 }
      );
    }

    // Supprimer l'actualité de la base de données
    await prismaWithNews.news.delete({
      where: {
        id: parseInt(id, 10),
      },
    });

    return NextResponse.json({ message: 'Actualité supprimée avec succès' });
    
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'actualité:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la suppression de l\'actualité' },
      { status: 500 }
    );
  }
}
