import { PrismaClient } from '@prisma/client';
import path from 'path';
import fs from 'fs';

// Charger les données depuis le fichier JSON
const newsFilePath = path.join(process.cwd(), 'src', 'data', 'news.json');
const newsData = JSON.parse(fs.readFileSync(newsFilePath, 'utf-8'));

async function migrateNews() {
  console.log('Début de la migration des actualités...');
  
  const prisma = new PrismaClient();
  
  try {
    // Vérifier si la table News contient déjà des données
    const existingCount = await prisma.news.count();
    
    if (existingCount > 0) {
      console.log(`La table News contient déjà ${existingCount} enregistrements.`);
      console.log('Voulez-vous vider la table avant de procéder à la migration ? (O/N)');
      
      // Attendre la réponse de l'utilisateur (lecture synchrone pour simplifier)
      const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
      });
      
      const answer = await new Promise(resolve => {
        readline.question('> ', (input: string) => {
          readline.close();
          resolve(input.trim().toLowerCase());
        });
      });
      
      if (answer === 'o' || answer === 'oui') {
        console.log('Vidage de la table News...');
        await prisma.news.deleteMany({});
        console.log('Table News vidée avec succès.');
      } else {
        console.log('Migration annulée par l\'utilisateur.');
        return;
      }
    }
    
    // Préparer les données pour l'insertion
    const newsToCreate = newsData.map((item: any) => ({
      titre: item.titre,
      date: new Date(item.date),
      description: item.description,
      image: item.image,
      contenu: item.contenu,
      // Les champs createdAt et updatedAt seront gérés automatiquement par Prisma
    }));
    
    // Insérer les données
    console.log(`Insertion de ${newsToCreate.length} actualités...`);
    const result = await prisma.news.createMany({
      data: newsToCreate,
      skipDuplicates: true,
    });
    
    console.log(`Migration terminée avec succès ! ${result.count} actualités ont été importées.`);
    
  } catch (error) {
    console.error('Erreur lors de la migration :', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Exécuter la migration
migrateNews()
  .catch((e) => {
    console.error('Erreur non gérée :', e);
    process.exit(1);
  })
  .finally(async () => {
    process.exit(0);
  });
