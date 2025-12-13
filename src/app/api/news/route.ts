import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

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
    return NextResponse.json(response, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      }
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des actualités:', error);
    const response: ApiResponse<null> = { error: 'Erreur lors de la récupération des actualités' };
    return NextResponse.json(response, { 
      status: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      }
    });
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
      try {
        // Créer le dossier public/image s'il n'existe pas
        const uploadDir = path.join(process.cwd(), 'public', 'image');
        await mkdir(uploadDir, { recursive: true });
        
        // Générer un nom de fichier unique pour éviter les conflits
        const timestamp = Date.now();
        const fileName = `${timestamp}_${file.name}`;
        const filePath = path.join(uploadDir, fileName);
        
        // Convertir le fichier en buffer et l'écrire sur le disque
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        await writeFile(filePath, buffer);
        
        // Stocker le chemin relatif pour l'accès web
        imagePath = `/image/${fileName}`;
      } catch (error) {
        console.error('Erreur lors de l\'upload de l\'image:', error);
        // Continuer sans image si l'upload échoue
      }
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
    return NextResponse.json(response, { 
      status: 201,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      }
    });
    
  } catch (error) {
    console.error('Erreur lors de la création de l\'actualité:', error);
    const response: ApiResponse<null> = { error: 'Erreur lors de la création de l\'actualité' };
    return NextResponse.json(response, { 
      status: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      }
    });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      const response: ApiResponse<null> = { error: 'ID requis' };
      return NextResponse.json(response, { 
        status: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        }
      });
    }

    await prisma.news.delete({
      where: { id: parseInt(id, 10) },
    });

    const response: ApiResponse<{ message: string }> = { data: { message: 'Actualité supprimée avec succès' } };
    return NextResponse.json(response, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      }
    });
    
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'actualité:', error);
    const response: ApiResponse<null> = { error: 'Erreur lors de la suppression de l\'actualité' };
    return NextResponse.json(response, { 
      status: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      }
    });
  }
}

// Gérer les requêtes OPTIONS pour CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
