import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import fs from 'fs';
import { promises as fsPromises } from 'fs';
import path from 'path';
import { createHash } from 'crypto';

interface NewsItem {
  id: number;
  titre: string;
  date: string;
  description: string;
  image: string;
  contenu: string;
}

const newsFilePath = path.join(process.cwd(), 'src', 'data', 'news.json');
const imagesDir = path.join(process.cwd(), 'public', 'image');

// Créer les dossiers nécessaires
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Charger les actualités depuis le fichier
function loadNews(): NewsItem[] {
  try {
    const data = fs.readFileSync(newsFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Erreur lors du chargement des actualités:', error);
    return [];
  }
}

// Sauvegarder les actualités dans le fichier
function saveNews(news: NewsItem[]): void {
  try {
    fs.writeFileSync(newsFilePath, JSON.stringify(news, null, 2));
  } catch (error) {
    console.error('Erreur lors de la sauvegarde des actualités:', error);
    throw error;
  }
}

export async function GET() {
  const news = await loadNews();
  return NextResponse.json({ news });
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('image') as File;
    const titre = formData.get('titre') as string;
    const date = formData.get('date') as string;
    const contenu = formData.get('contenu') as string;
    const description = formData.get('description') as string;

    // Vérifier que tous les champs requis sont présents
    if (!file || !titre || !date || !contenu || !description) {
      return NextResponse.json(
        { error: "Tous les champs sont requis" },
        { status: 400 }
      );
    }

    // Vérifier le type MIME de l'image
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Type de fichier non valide. Seules les images (jpeg, png, webp) sont autorisées" },
        { status: 400 }
      );
    }

    // Vérifier la taille du fichier (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Le fichier est trop grand (max 5MB)" },
        { status: 400 }
      );
    }

    // Créer un hash unique pour le nom du fichier
    const hash = createHash('md5');
    hash.update(file.name + Date.now());
    const fileName = `${hash.digest('hex')}-${file.name}`;

    // Sauvegarder le fichier
    const filePath = path.join(imagesDir, fileName);
    const buffer = Buffer.from(await file.arrayBuffer());
    await fsPromises.writeFile(filePath, buffer);

    // Créer la nouvelle actualité
    const news = await loadNews();
    const newId = Math.max(...news.map(n => n.id), 0) + 1;
    
    const newsItem: NewsItem = {
      id: newId,
      titre,
      date,
      description,
      image: `/image/${fileName}`,
      contenu
    };

    // Ajouter et sauvegarder l'actualité
    const updatedNews = [...news, newsItem];
    await saveNews(updatedNews);
    return NextResponse.json({ message: "Actualité ajoutée avec succès" });
  } catch (error) {
    console.error('Erreur lors de l\'ajout de l\'actualité:', error);
    return NextResponse.json(
      { error: "Erreur lors de l\'ajout de l\'actualité" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const titre = searchParams.get('titre');

    if (!titre) {
      return NextResponse.json(
        { error: 'Titre requis' },
        { status: 400 }
      );
    }

    const news = await loadNews();
    const index = news.findIndex((item) => item.titre === titre);

    if (index === -1) {
      return NextResponse.json(
        { error: 'Actualité non trouvée' },
        { status: 404 }
      );
    }

    const updatedNews = [...news];
    updatedNews.splice(index, 1);
    await saveNews(updatedNews);
    
    return NextResponse.json({ message: 'Actualité supprimée avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la suppression' },
      { status: 500 }
    );
  }
}
