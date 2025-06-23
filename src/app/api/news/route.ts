import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import * as fs from 'fs';
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

// Créer un dossier pour stocker les images si nécessaire
const imagesDir = path.join(process.cwd(), 'public', 'image');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

let news: NewsItem[] = [
  {
    id: 1,
    titre: "Nouvelle Session de Samedi des Miracles",
    date: "2025-05-25",
    description: "Découvrez notre prochaine session de Samedi des Miracles avec des témoignages inspirants et des temps de prière spéciaux.",
    image: "/image/actualite1.jpg",
    contenu: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  }
];

export async function GET() {
  return NextResponse.json({ news });
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('image') as File;
    const title = formData.get('title') as string;
    const date = formData.get('date') as string;
    const content = formData.get('content') as string;

    if (!file) {
      return NextResponse.json(
        { error: "Aucun fichier image n'a été sélectionné" },
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
    await fs.promises.writeFile(filePath, buffer);

    // Créer la nouvelle actualité
    const newId = news.length > 0 ? Math.max(...news.map(n => n.id)) + 1 : 1;
    const newNews: NewsItem = {
      id: newId,
      titre: title,
      date: date,
      description: content,
      image: `/image/${fileName}`,
      contenu: content
    };

    news = [...news, newNews];
    return NextResponse.json({ message: "Actualité ajoutée avec succès" });
  } catch (error) {
    console.error('Erreur lors de l\'ajout de l\'actualité:', error);
    return NextResponse.json(
      { error: "Erreur lors de l\'ajout de l\'actualité" },
      { status: 500 }
    );
  }
}
