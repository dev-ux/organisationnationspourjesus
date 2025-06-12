import bcrypt from 'bcryptjs';

async function generateHash(password: string) {
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);
  console.log('Hash:', hash);
  return hash;
}

generateHash('admin123');
