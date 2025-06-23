export interface BlogPost {
  id: string;
  titre: string;
  date: string;
  images: string[];
  description: string;
  contenu: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    titre: "GRANDE CAMPAGNE D'ÉVANGÉLISATION",
    date: "22 Mai 2025",
    images: [
      "/image/blog/campagne1.jpg",
      "/image/blog/campagne.jpg",
      "/image/blog/campagne.jpg"
    ],
    description: "ACTIONS SOCIALES - Des canaux de Réveil... C'est ce que nous avons été sur le terrain, hier mercredi.",
    contenu: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  },
  {
    id: "2",
    titre: "INFORMATIONS IMPORTANTES",
    date: "17 Mai 2025",
    images: [
      "/image/blog/info1.jpg",
      "/image/blog/information.jpg",
      "/image/blog/information.jpg"
    ],
    description: "Programme prophétique de réveil et d'évangélisation en cours.",
    contenu: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  },
  {
    id: "3",
    titre: "CAMPAGNE DE RÉVEIL",
    date: "15 Mai 2025",
    images: [
      "/image/blog/revival.jpg",
      "/image/blog/revival.jpg",
      "/image/blog/revival.jpg"
    ],
    description: "Campagne de réveil en cours avec des actions sociales et évangélisation.",
    contenu: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  },
  {
    id: "4",
    titre: "CAMPAGNE D'ÉVANGÉLISATION",
    date: "10 Mai 2025",
    images: [
      "/image/blog/evangelisation.jpg",
      "/image/blog/evangelisation.jpg",
      "/image/blog/evangelisation.jpg"
    ],
    description: "Campagne d'évangélisation et d'actions sociales en cours.",
    contenu: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  },
  {
    id: "5",
    titre: "FORMATION SPIRITUELLE",
    date: "5 Mai 2025",
    images: [
      "/image/blog/formation.jpg",
      "/image/blog/formation.jpg",
      "/image/blog/formation.jpg"
    ],
    description: "Sessions de formation spirituelle pour les disciples.",
    contenu: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  },
  {
    id: "6",
    titre: "RÉUNIONS DE PRIÈRE",
    date: "1 Mai 2025",
    images: [
      "/image/blog/priere.jpg",
      "/image/blog/priere.jpg",
      "/image/blog/priere.jpg"
    ],
    description: "Réunions de prière et intercession pour la communauté.",
    contenu: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  }
];
