import mongoose from 'mongoose';

// Connexion à MongoDB
export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('MongoDB connecté');
  } catch (error) {
    console.error('Erreur de connexion à MongoDB:', error);
    throw error;
  }
};

// Définition du modèle News
const newsSchema = new mongoose.Schema({
  titre: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  contenu: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

export const News = mongoose.models.News || mongoose.model('News', newsSchema);
