import BlogSectionDesktop from '../blog/BlogSectionDesktop';

export default async function BlogSectionDesktopServer() {
  try {
    // Récupérer les données depuis l'API route
    const response = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/news`, {
      cache: 'no-store', // Désactiver le cache pour avoir les données fraîches
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des actualités');
    }

    const result = await response.json();
    
    if (result.error) {
      throw new Error(result.error);
    }

    const news = result.data?.news || [];

    // Formatage des données pour le composant client
    const formattedPosts = news.map((item: any) => ({
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
    return <BlogSectionDesktop initialPosts={formattedPosts} />;
  } catch (error) {
    console.error('Erreur lors du chargement des actualités:', error);
    // Retourner un composant avec un message d'erreur plus convivial
    return (
      <div className="py-24 sm:py-32 hidden lg:block">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Actualités</h2>
            <p className="text-gray-600">Les actualités seront bientôt disponibles.</p>
          </div>
        </div>
      </div>
    );
  }
}
