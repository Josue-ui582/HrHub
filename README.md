# 📝 RH Presence Manager

Une solution complète de gestion des présences et de reporting RH, conçue pour offrir une visibilité en temps réel sur l'activité des employés.

---

## 🚀 Stack Technique

Le projet utilise une architecture moderne **Fullstack TypeScript** :

| Partie | Technologie |
| :--- | :--- |
| **Frontend** | React (Vite), TypeScript, Ant Design, Tailwind CSS |
| **Backend** | Node.js, Express.js, TypeScript |
| **Base de données** | PostgreSQL via Prisma ORM |
| **Authentification** | JWT (JSON Web Tokens) & Context API |

---

## 🛠️ Fonctionnalités Clés

* **Gestion des Rôles** : Accès différenciés pour les Administrateurs et les Utilisateurs (USER/ADMIN).
* **Dashboard Dynamique** : Visualisation des heures totales, moyenne par employé et effectif actif.
* **Registre de Présences** : Table de données interactive avec recherche en temps réel par nom d'employé.
* **Formatage Intelligent** : Conversion automatique des durées (minutes en heures/minutes lisibles).
* **Sécurité** : Protection des routes côté client et middleware de vérification des rôles côté serveur.

---

## ⚙️ Installation & Configuration

### 1. Prérequis
- Node.js (v18+)
- PostgreSQL installé et actif

### 2. Backend
```bash
cd backend
npm install
npm run dev
```
### 3. Frontend
```bash
cd frontend
npm install
npm run dev
```
#### 4. Route pour accéder à la documentation api
```bash
http://localhost:5000/api-docs/
``
