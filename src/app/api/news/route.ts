import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';

// Désactive la mise en cache pour cette route
export const dynamic = 'force-dynamic';

// Type pour les données de l'actualité
interface NewsItem {
  id: number;
  titre: string;
  date: Date;
  description: string;
  contenu: string;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// Type pour la réponse de l'API
interface ApiResponse<T> {
  data?: T;
  error?: string;
}

// Création d'une instance Prisma avec un type personnalisé
const prisma = new PrismaClient() as any;

export async function GET() {
  try {
    const news: NewsItem[] = await prisma.news.findMany({
      orderBy: { date: 'desc' },
    });
    
    const response: ApiResponse<{ news: NewsItem[] }> = { data: { news } };
    return NextResponse.json(response);
  } catch (error) {
    console.error('Erreur lors de la récupération des actualités:', error);
    const response: ApiResponse<null> = { error: 'Erreur lors de la récupération des actualités' };
    return NextResponse.json(response, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const titre = formData.get('titre') as string;
    const date = formData.get('date') as string;
    const contenu = formData.get('contenu') as string;
    const description = formData.get('description') as string;
    const file = formData.get('image') as File | null;

    let imagePath: string | null = null;
    
    if (file) {
      // Pour simplifier, on stocke juste le nom du fichier
      // En production, il faudrait téléverser le fichier vers un stockage externe
      imagePath = `/uploads/${file.name}`;
    }

    const newNews = await prisma.news.create({
      data: {
        titre,
        date: new Date(date),
        description,
        contenu,
        image: imagePath,
      },
    });
    
    const response: ApiResponse<NewsItem> = { data: newNews };
    return NextResponse.json(response, { status: 201 });
    
  } catch (error) {
    console.error('Erreur lors de la création de l\'actualité:', error);
    const response: ApiResponse<null> = { error: 'Erreur lors de la création de l\'actualité' };
    return NextResponse.json(response, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      const response: ApiResponse<null> = { error: 'ID requis' };
      return NextResponse.json(response, { status: 400 });
    }

    await prisma.news.delete({
      where: { id: parseInt(id, 10) },
    });

    const response: ApiResponse<{ message: string }> = { data: { message: 'Actualité supprimée avec succès' } };
    return NextResponse.json(response);
    
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'actualité:', error);
    const response: ApiResponse<null> = { error: 'Erreur lors de la suppression de l\'actualité' };
    return NextResponse.json(response, { status: 500 });
  }
}
