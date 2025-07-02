#!/bin/sh

# Dossier cible
TARGET_DIR="./backend"

# Vérifie que le dossier existe
if [ ! -d "$TARGET_DIR" ]; then
  echo "❌ Le dossier $TARGET_DIR n'existe pas. Création..."
  mkdir -p "$TARGET_DIR"
fi

# Demande à l'utilisateur le nom d'utilisateur et le mot de passe
read -p "Nom d'utilisateur PostgreSQL : " DB_USER
read -s -p "Mot de passe PostgreSQL : " DB_PASSWORD
echo

# URL de la base de données
DATABASE_URL="postgres://${DB_USER}:${DB_PASSWORD}@localhost:5432/backend-db"

# Crée le fichier .env
echo "DATABASE_URL=\"$DATABASE_URL\"" > "$TARGET_DIR/.env"

echo "Fichier .env créé dans $TARGET_DIR avec la DATABASE_URL suivante :"
echo "$DATABASE_URL"
