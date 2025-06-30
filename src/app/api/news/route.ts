import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import fs from 'fs';
import { promises as fsPromises } from 'fs';
import path from 'path';
import { createHash } from 'crypto';
import { exec } from 'child_process';

interface NewsItem {
  id: number;
  titre: string;
  date: string;
  description: string;
  image: string;
  contenu: string;
}

const newsFilePath = path.join(process.cwd(), 'src', 'data', 'news.json');
const imagesDir = path.join(process.cwd(), 'temp', 'nas', 'image');

// Fonction pour monter le NAS
async function mountNAS(): Promise<boolean> {
  try {
    const nasHost = process.env.NEXT_PUBLIC_NAS_HOST;
    const nasUser = process.env.NEXT_PUBLIC_NAS_USER;
    const nasPassword = process.env.NEXT_PUBLIC_NAS_PASSWORD;
    const nasPath = process.env.NEXT_PUBLIC_NAS_PATH;
    const localPath = path.join(process.cwd(), 'temp', 'nas');

    if (!nasHost || !nasUser || !nasPassword || !nasPath) {
      console.error('Configuration NAS incomplète');
      return false;
    }

    // Vérifier si le montage existe déjà
    const existingMount = await new Promise((resolve) => {
      exec(`mount | grep "${localPath}"`, (err, stdout) => {
        resolve(!err && stdout.trim());
      });
    });

    if (!existingMount) {
      // Créer le dossier local si nécessaire
      await fsPromises.mkdir(localPath, { recursive: true });

      // Monter le NAS
      await new Promise((resolve, reject) => {
        exec(`mount -t cifs -o username=${nasUser},password=${nasPassword} //${nasHost}${nasPath} ${localPath}`, (err) => {
          if (err) {
            console.error('Erreur lors du montage du NAS:', err);
            reject(err);
          } else {
            console.log('NAS monté avec succès');
            resolve(true);
          }
        });
      });
    }

    return true;
  } catch (error) {
    console.error('Erreur lors du montage du NAS:', error);
    throw error;
  }
}

// Créer les dossiers nécessaires asynchrone
async function createDirectories() {
  try {
    const localPath = path.join(process.cwd(), 'temp', 'nas');
    await fsPromises.access(localPath).catch(async () => {
      await fsPromises.mkdir(localPath, { recursive: true });
      console.log('Dossier temporaire créé:', localPath);
    });
    
    // Vérifier et créer le dossier images
    await fsPromises.access(imagesDir).catch(async () => {
      await fsPromises.mkdir(imagesDir, { recursive: true });
      console.log('Dossier images créé:', imagesDir);
    });
    
    // Vérifier et créer le fichier news.json si nécessaire
    await fsPromises.access(newsFilePath).catch(async () => {
      await fsPromises.writeFile(newsFilePath, JSON.stringify([], null, 2));
      console.log('Fichier news.json créé:', newsFilePath);
    });
  } catch (error) {
    console.error('Erreur lors de la création des dossiers:', error);
    throw error;
  }
}

// Charger les actualités depuis le fichier
async function loadNews(): Promise<NewsItem[]> {
  try {
    console.log('Chemin du fichier news:', newsFilePath);
    const data = await fsPromises.readFile(newsFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Erreur lors du chargement des actualités:', error);
    throw error;
  }
}

// Sauvegarder les actualités dans le fichier
async function saveNews(news: NewsItem[]): Promise<void> {
  try {
    console.log('Sauvegarde des actualités dans:', newsFilePath);
    await fsPromises.writeFile(newsFilePath, JSON.stringify(news, null, 2));
  } catch (error) {
    console.error('Erreur lors de la sauvegarde des actualités:', error);
    throw error;
  }
}

// Vérifier les permissions du dossier
async function checkDirectoryPermissions(): Promise<boolean> {
  try {
    const stats = await fsPromises.stat(imagesDir);
    return stats.isDirectory();
  } catch (error) {
    console.error('Erreur lors de la vérification des permissions:', error);
    return false;
  }
}

export async function GET() {
  try {
    await mountNAS();
    const news = await loadNews();
    return NextResponse.json({ news });
  } catch (error) {
    console.error('Erreur lors de la récupération des actualités:', error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des actualités" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await mountNAS();
    
    if (!await checkDirectoryPermissions()) {
      return NextResponse.json(
        { error: "Droits d'accès insuffisants" },
        { status: 403 }
      );
    }

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

    // Sauvegarder le fichier sur le NAS
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
    await mountNAS();
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
      { error: "Erreur lors de la suppression de l\'actualité" },
      { status: 500 }
    );
  }
}