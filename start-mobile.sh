#!/bin/bash

APP_DIR="./gbz-mobile-app"
ENV_FILE="$APP_DIR/.env"

DEFAULT_IP="192.168.1.10"
DEFAULT_PORT="3000"

read -p "Entrez l'adresse IP de l'ordinateur (par exemple $DEFAULT_IP, vous pouvez l'obtenir avec ipconfig): " USER_IP
IP="${USER_IP:-$DEFAULT_IP}"

echo "Création / mise à jour du fichier .env avec EXPO_PUBLIC_API_URL=http://$IP:$DEFAULT_PORT"

cat > "$ENV_FILE" <<EOL
EXPO_PUBLIC_API_URL=http://$IP:$DEFAULT_PORT
EOL

cd "$APP_DIR" || exit

echo "Installation des dépendances npm..."
npm install

echo "Démarrage de l'application Expo..."
npm start
