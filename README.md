# GBZ

## Introduction

Ce projet a été réalisé dans le cadre de ma formation à Ynov Campus, spécialisation Développeur Web. Dans le cadre du projet fil rouge, plusieurs sujets étaient proposés, mais j’ai choisi de me lancer dans un projet personnel. J’y ai vu une opportunité de concrétiser une idée qui me tient à cœur : c’est ainsi qu’est né GBZ, une application de musculation complète, pensée pour les passionnés.



## Contenue

- **Backend NestJS + Prisma**,
- **Interface admin Refine**,
- **Application mobile React Native avec Expo Go**.


## ⚙️ Prérequis

- Node.js (>= 18.x recommandé)
- Docker & Docker Compose
- Expo Go (installée sur votre téléphone IOS/Android)
- Git

## 📦 Installation & Lancement

### 1. Cloner le projet

```bash
git clone https://github.com/HugoGarrigues/GBZ
cd GBZ/
````

### 2. Démarrage des scripts 

Deux scripts sont à votre disposition pour configurer l’environnement :

🗂️ 1. Création du fichier .env pour la base de données
Lancez le script suivant :

```bash
./create-env.sh
```
Il générera automatiquement le fichier .env nécessaire au bon fonctionnement de la base de données.

📱 2. Configuration de l’environnement mobile
Exécutez le script suivant :

```bash
./start-mobile.sh
```

Il vous demandera **votre IP locale**. Elle peut être obtenue avec :

```bash
ipconfig # (Windows)
ifconfig # (Mac/Linux)
```

🧪 Exemple :

```env
192.168.1.17
```

PS : Si le script ne fonctionne pas, faites ces manipulations manuellement :
```bash
cd gbz-mobile-app
npm install
npm start
```

### 3. Lancer l'application avec Docker

```bash
docker compose up --build
```

Les services disponibles :

* 🐘 `postgres` : base de données PostgreSQL
* 🚀 `backend` : serveur NestJS sur le port `3000`
* 🧑‍💼 `admin` : interface web React sur `http://localhost:5173`
* 📱 `mobile` : application Expo Metro sur `http://localhost:8081`

---

## 📱 Utilisation de l’application mobile

1. Assurez-vous que le projet mobile est bien lancé via le script ou `npm start`
2. Scannez le **QR Code** affiché avec l’application **Expo Go** sur votre téléphone
3. L’application mobile se connectera automatiquement au backend via l’URL définie dans `.env`

---

## 📁 Structure du projet

```
GBZ/
├── backend/         
├── auth-antd/       
├── gbz-mobile-app/  
├── docs/
├── docker-compose.yml
├── start-mobile.sh  
├── .gitignore
└── README.md
```

---

## 💡 Commandes utiles

| Commande                            | Description                      |
| ----------------------------------- | -------------------------------- |
| `docker compose up --build`         | Lancer tous les services         |
| `npm start` (dans `gbz-mobile-app`) | Lancer l'app mobile manuellement |
| `./start-mobile.sh`                 | Générer `.env` pour Expo         |
| `npm install` (dans `backend`)      | Installer les dépendances backend|

---

## 🗂️Planning

Un **planning de développement** a également été mis en place à l’aide de [GitHub Projects](https://github.com/HugoGarrigues/GBZ/projects), pour suivre l’avancement, organiser les tâches et prioriser les fonctionnalités.


## 👨‍💻 Contributeurs

* **Hugo Garrigues** - [Lien GitHub](https://github.com/HugoGarrigues)

---
