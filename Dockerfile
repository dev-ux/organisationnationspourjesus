# Étape de build
FROM node:20

WORKDIR /app

# Copier le package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste du code
COPY . .

# Construire l'application
RUN npm run build

# Étape finale pour production
FROM node:20

WORKDIR /app

# Installer les dépendances de production
COPY package*.json ./
RUN npm install --only=production pm2

# Copier les fichiers de build depuis l'étape précédente
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
RUN npm install --only=production

# Exposer le port 3000
EXPOSE 3000

# Commande de démarrage
CMD ["npm", "start"]
