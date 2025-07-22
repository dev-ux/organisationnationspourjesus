import { PrismaClient } from '@prisma/client';
import BlogSectionClient from '../blog/BlogSection';

const prisma = new PrismaClient();

export default async function BlogSectionServer() {
  try {
    // Récupération directe des données depuis Prisma en utilisant le type généré
    type NewsItem = {
      id: number;
      titre: string;
      date: string;
      description: string;
      contenu: string;
      image: string | null;
    };

    const news: NewsItem[] = await prisma.$queryRaw`
      SELECT id, titre, date, description, contenu, image FROM "News"
      ORDER BY date DESC
    `;

    // Formatage des données pour le composant client
    const formattedPosts = news.map((item) => ({
      id: item.id.toString(),
      title: item.titre,
      date: item.date,
      images: item.image ? [item.image] : [],
      excerpt: item.description,
      content: item.contenu,
      // Ajout des champs manquants pour le type BlogPost
      titre: item.titre,
      description: item.description,
      contenu: item.contenu
    }));

    // On passe les données déjà chargées au composant client
    return <BlogSectionClient initialPosts={formattedPosts} />;
  } catch (error) {
    console.error('Erreur lors du chargement des actualités:', error);
    return (
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-600">Erreur lors du chargement des actualités</p>
          </div>
        </div>
      </div>
    );
  }
}
