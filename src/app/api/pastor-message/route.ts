import { NextResponse } from "next/server";
import path from 'path';
import { promises as fs } from 'fs';

const DATA_FILE = path.join(process.cwd(), 'data', 'pastor-message.json');

// Default message data
const DEFAULT_MESSAGE = {
  title: "Un Message de notre Pasteur",
  content: "Chers frères et sœurs, que la paix de Dieu soit avec vous.\nNous sommes ici pour vous accueillir et vous accompagner dans votre parcours spirituel. Notre mission est de vous aider à grandir dans votre foi et à vivre selon les enseignements de notre Seigneur Jésus-Christ.\n\nRejoignez-nous pour partager des moments de prière, d'enseignement biblique et de communion fraternelle. Nous sommes là pour vous soutenir et vous guider dans votre cheminement spirituel.",
  image: '/image/past.jpg'
};

// Helper function to read message data
async function readMessageData() {
  try {
    await fs.access(DATA_FILE);
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error: any) {
    // If file doesn't exist, create it with default data
    if (error.code === 'ENOENT') {
      try {
        await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
        await fs.writeFile(DATA_FILE, JSON.stringify(DEFAULT_MESSAGE, null, 2));
        return DEFAULT_MESSAGE;
      } catch (writeError) {
        console.error('Error creating message file:', writeError);
        return DEFAULT_MESSAGE;
      }
    }
    console.error('Error reading message file:', error);
    return DEFAULT_MESSAGE;
  }
}

export async function GET() {
  try {
    const messageData = await readMessageData();
    return NextResponse.json(messageData);
  } catch (error) {
    console.error('Error in GET /api/pastor-message:', error);
    // Return default data if there's an error
    return NextResponse.json(DEFAULT_MESSAGE);
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
      // En production, nous utilisons l'URL directe de l'image
      // Au lieu de copier le fichier, nous stockons simplement l'URL
      console.log('Image mise à jour avec succès');
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
