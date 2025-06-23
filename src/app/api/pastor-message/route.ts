import { NextResponse } from "next/server";
import path from 'path';
import { promises as fs } from 'fs';

const DATA_FILE = path.join(process.cwd(), 'data', 'pastor-message.json');

// Fonction pour initialiser le fichier
async function initializeDataFile() {
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify({
      title: "",
      content: "",
      image: ""
    }, null, 2));
  }
}

// Initialiser le fichier lors du démarrage
initializeDataFile().catch(console.error);

export async function GET() {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    const messageData = JSON.parse(data);
    return NextResponse.json({ message: messageData });
  } catch (error) {
    console.error('Erreur lors de la lecture du message:', error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération du message" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Vérifier que les champs requis sont présents
    if (!data.title || !data.content) {
      return NextResponse.json(
        { error: "Les champs titre et contenu sont requis" },
        { status: 400 }
      );
    }

    // Sauvegarder les données
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
    
    // Si une nouvelle image a été fournie, mettre à jour le fichier
    if (data.image) {
      // Extraire le nom du fichier de l'URL
      const fileName = data.image.split('/').pop();
      if (fileName) {
        // Créer le dossier image s'il n'existe pas
        const imageDir = path.join(process.cwd(), 'public', 'image');
        try {
          await fs.access(imageDir);
        } catch {
          await fs.mkdir(imageDir, { recursive: true });
        }

        // Copier le fichier de l'upload vers le dossier images
        const sourcePath = path.join(process.cwd(), 'public', 'image', fileName);
        const destPath = path.join(process.cwd(), 'public', 'image', 'past.jpg');
        
        try {
          // Vérifier si le fichier source existe
          await fs.access(sourcePath);

          // Copier le fichier
          await fs.copyFile(sourcePath, destPath);
          console.log('Image mise à jour avec succès');
        } catch (error) {
          console.error('Erreur lors de la copie de l\'image:', error);
          throw error; // Propager l'erreur pour que l'utilisateur soit informé
        }
      }
    }
    
    return NextResponse.json({
      message: "Message mis à jour avec succès",
      data
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du message:', error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour du message" },
      { status: 500 }
    );
  }
}
