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
    console.log('Début du montage du NAS...');
    
    const nasHost = process.env.NEXT_PUBLIC_NAS_HOST;
    const nasUser = process.env.NEXT_PUBLIC_NAS_USER;
    const nasPassword = process.env.NEXT_PUBLIC_NAS_PASSWORD;
    const nasPath = process.env.NEXT_PUBLIC_NAS_PATH;
    const localPath = path.join(process.cwd(), 'temp', 'nas');

    if (!nasHost || !nasUser || !nasPassword || !nasPath) {
      console.error('Configuration NAS incomplète:', {
        nasHost,
        nasUser: nasUser ? '***' : undefined,
        nasPassword: nasPassword ? '***' : undefined,
        nasPath
      });
      return false;
    }

    console.log('Configuration NAS:', {
      nasHost,
      nasPath,
      localPath
    });

    // Vérifier si le montage existe déjà
    console.log('Vérification du montage existant...');
    const existingMount = await new Promise((resolve) => {
      exec(`mount | grep "${localPath}"`, (err, stdout) => {
        console.log('Résultat du check mount:', stdout);
        resolve(!err && stdout.trim());
      });
    });

    if (!existingMount) {
      // Créer le dossier local si nécessaire
      console.log('Création du dossier local...');
      await fsPromises.mkdir(localPath, { recursive: true });
      
      // Monter le NAS
      console.log('Montage du NAS...');
      await new Promise((resolve, reject) => {
        exec(`mount -t cifs -o username=${nasUser},password=${nasPassword} //${nasHost}${nasPath} ${localPath}`, (err, stdout, stderr) => {
          console.log('Stdout:', stdout);
          console.error('Stderr:', stderr);
          if (err) {
            console.error('Erreur lors du montage:', err);
            reject(err);
          } else {
            console.log('NAS monté avec succès');
            resolve(true);
          }
        });
      });
    } else {
      console.log('Le NAS est déjà monté');
    }

    return true;
  } catch (error) {
    console.error('Erreur lors du montage du NAS:', error);
    throw error;
  }
}

// Charger les actualités depuis le fichier
async function loadNews(): Promise<NewsItem[]> {
  try {
    console.log('Chemin du fichier news:', newsFilePath);
    
    // Vérifier si le fichier existe
    const exists = await fsPromises.access(newsFilePath).then(() => true).catch(() => false);
    console.log('Fichier existe:', exists);

    if (!exists) {
      console.log('Création du fichier news.json...');
      await fsPromises.writeFile(newsFilePath, JSON.stringify([], null, 2));
      return [];
    }

    const data = await fsPromises.readFile(newsFilePath, 'utf8');
    console.log('Données lues du fichier:', data);
    const news = JSON.parse(data);
    console.log('Actualités chargées:', news);
    return news;
  } catch (error) {
    console.error('Erreur lors du chargement des actualités:', error);
    throw error;
  }
}

// Sauvegarder les actualités dans le fichier
async function saveNews(news: NewsItem[]): Promise<void> {
  try {
    console.log('Sauvegarde des actualités:', news);
    console.log('Chemin du fichier:', newsFilePath);
    
    // Vérifier si le dossier existe
    const dir = path.dirname(newsFilePath);
    await fsPromises.mkdir(dir, { recursive: true });
    
    await fsPromises.writeFile(newsFilePath, JSON.stringify(news, null, 2));
    console.log('Actualités sauvegardées avec succès');
  } catch (error) {
    console.error('Erreur lors de la sauvegarde des actualités:', error);
    throw error;
  }
}

// Vérifier les permissions du dossier
async function checkDirectoryPermissions(): Promise<boolean> {
  try {
    const stats = await fsPromises.stat(imagesDir);
    console.log('Stat du dossier images:', stats);
    return stats.isDirectory();
  } catch (error) {
    console.error('Erreur lors de la vérification des permissions:', error);
    return false;
  }
}

export async function GET() {
  try {
    console.log('Début de la requête GET...');
    
    // Vérifier d'abord le montage du NAS
    const mounted = await mountNAS();
    if (!mounted) {
      return NextResponse.json(
        { error: "Impossible de monter le NAS" },
        { status: 500 }
      );
    }

    // Vérifier les permissions
    const hasPermissions = await checkDirectoryPermissions();
    if (!hasPermissions) {
      return NextResponse.json(
        { error: "Droits d'accès insuffisants" },
        { status: 403 }
      );
    }

    // Charger les actualités
    const news = await loadNews();
    console.log('Actualités chargées:', news);
    
    return NextResponse.json({ news });
  } catch (error) {
    console.error('Erreur lors de la récupération des actualités:', error);
    return NextResponse.json(
      { 
        error: "Erreur lors de la récupération des actualités",
        details: error instanceof Error ? error.message : 'Une erreur inconnue est survenue'
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log('Début de la requête POST...');
    
    const mounted = await mountNAS();
    if (!mounted) {
      return NextResponse.json(
        { error: "Impossible de monter le NAS" },
        { status: 500 }
      );
    }

    const hasPermissions = await checkDirectoryPermissions();
    if (!hasPermissions) {
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

    console.log('Données reçues:', {
      titre,
      date,
      description,
      contenu,
      'taille du fichier': file?.size
    });

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
    
    console.log('Sauvegarde du fichier:', filePath);
    await fsPromises.writeFile(filePath, buffer);
    console.log('Fichier sauvegardé avec succès');

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

    console.log('Nouvelle actualité créée:', newsItem);

    // Ajouter et sauvegarder l'actualité
    const updatedNews = [...news, newsItem];
    await saveNews(updatedNews);
    
    return NextResponse.json({ message: "Actualité ajoutée avec succès", news: newsItem });
  } catch (error) {
    console.error('Erreur lors de l\'ajout de l\'actualité:', error);
    return NextResponse.json(
      { 
        error: "Erreur lors de l\'ajout de l\'actualité",
        details: error instanceof Error ? error.message : 'Une erreur inconnue est survenue'
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    console.log('Début de la requête DELETE...');
    
    const mounted = await mountNAS();
    if (!mounted) {
      return NextResponse.json(
        { error: "Impossible de monter le NAS" },
        { status: 500 }
      );
    }

    const hasPermissions = await checkDirectoryPermissions();
    if (!hasPermissions) {
      return NextResponse.json(
        { error: "Droits d'accès insuffisants" },
        { status: 403 }
      );
    }

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
      { 
        error: "Erreur lors de la suppression de l\'actualité",
        details: error instanceof Error ? error.message : 'Une erreur inconnue est survenue'
      },
      { status: 500 }
    );
  }
}