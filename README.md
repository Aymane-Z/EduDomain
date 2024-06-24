

# EduDomain - Gestion des Résidences Universitaires

EduDomain est une application web conçue pour simplifier la gestion des résidences universitaires. Développée avec Node.js et React.js utilisant PrimeReact, elle offre une solution robuste pour gérer les demandes de logement, la facturation et les interactions avec les résidents.

![alt text](frontend/public/favicon.png)

## Fonctionnalités

- **Authentification des utilisateurs** : Système sécurisé de connexion et d'inscription pour les étudiants et les administrateurs.
- **Gestion du patrimoine** : Les gestionnaires peuvent gérer les différents niveaux du patrimoine de plusieurs résidences avec des structures hiérarchiques.
- **Tableau de bord** : Reporting dynamique pour l'affichage des indicateurs clés de performance.
- **Demandes de logement** : Les étudiants peuvent postuler pour un logement, suivre les mises à jour de statut, et gérer leurs informations de logement.
- **Facturation et paiements** : Système de facturation intégré pour le traitement et la gestion des transactions financières.

## Technologies utilisées

- **Frontend** : [React.js avec PrimeReact](https://www.primefaces.org/primereact/)
  - Approche SPA (Single Page Application).
  - Utilisation de hooks et de context API pour la gestion de l'état.
- **Backend** : [Node.js avec Express](https://expressjs.com/)
  - Conception d'API robuste pour des interactions sécurisées et évolutives.
  - Utilisation de Sequelize pour la gestion de la base de données.
- **Base de données par défaut** : [MySQL](https://www.mysql.com/)

## Pour commencer

### Prérequis

- Node.js
- MySQL

### Installation

1. **Cloner le dépôt**
   ```bash
   git clone https://github.com/Aymane-Z/EduDomain.git
   ```

2. **Installer les dépendances**
   ```bash
   # Installer les dépendances du frontend
   cd ./frontend
   npm install
   
   # Installer les dépendances du backend
   cd ./nodejs-express-api
   npm install
   ```

3. **Configurer l'environnement**
   ```bash
   cp .env.example .env
   # Modifier le fichier .env dans les dossiers frontend et backend avec vos identifiants de base de données et autres configurations nécessaires
   ```

4. **Exécuter les migrations** (si vous utilisez un ORM comme Sequelize)
   ```bash
   npx sequelize-cli db:migrate
   ```

5. **Lancer l'application** : (Modifier les ports comme vous le souhaitez dans les fichiers .env)
   ```bash
   # Pour le backend
   cd ./nodejs-express-api
   npm start

   # Pour le frontend
   cd ./frontend
   npm start
   ```

## Contribution

Les contributions sont les bienvenues ! N'hésitez pas à soumettre des pull requests ou à ouvrir des issues pour discuter des modifications proposées ou des améliorations.

## Remerciements

- Un merci spécial à tous les contributeurs et testeurs qui ont aidé à façonner et améliorer cette application.
