import { PrismaClient } from '@prisma/client';

async function checkDatabase() {
  console.log('Vérification de la connexion à la base de données...');
  
  const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
  });

  try {
    // Tester la connexion
    await prisma.$connect();
    console.log('✅ Connecté à la base de données avec succès!');
    
    // Vérifier les tables existantes
    const result = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public';
    `;
    
    console.log('\nTables dans la base de données:');
    console.log(result);
    
    // Vérifier si la table News existe
    const newsTableExists = await prisma.$queryRaw`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'News'
      );
    `;
    
    console.log('\nLa table News existe-t-elle ?');
    console.log(newsTableExists);
    
  } catch (error) {
    console.error('❌ Erreur lors de la vérification de la base de données:');
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

checkDatabase()
  .catch(console.error)
  .finally(() => process.exit(0));
