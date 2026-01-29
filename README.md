# 🚀 SmartShift - Site Web

Site web professionnel statique pour **SmartShift** : création de sites web, applications mobiles, accompagnement à la digitalisation, intégration de l'IA pour automatiser les tâches, logistique et transport.

## 📦 GitHub et déploiement Netlify

Voir **[DEPLOY.md](DEPLOY.md)** pour le détail. Résumé : crée le dépôt **SmartShift** sur [GitHub](https://github.com/new) (vide), puis exécute les commandes du guide. Ensuite, déploie sur [Netlify](https://www.netlify.com) en important le repo.

## 📁 Structure du Projet

```
startup/
├── index.html                 # Page d'accueil
├── css/
│   └── styles.css             # Styles CSS
├── js/
│   └── script.js              # JavaScript
├── images/                    # Images et assets
├── pages/                     # Toutes les pages HTML
│   ├── devis.html             # Devis
│   ├── equipe.html            # Équipe
│   ├── realisations.html      # Réalisations
│   ├── services.html          # Catalogue services
│   ├── admin.html             # Administration (tableau de bord, accès mot de passe)
│   └── service-*.html         # Pages services (web, mobile, digital, etc.)
├── netlify.toml               # Config Netlify (publish = ".")
├── render.yaml                # Config Render (optionnel)
├── DEPLOY.md                  # Guide GitHub + Netlify
└── README.md                  # Documentation
```

## 🛠️ Technologies Utilisées

### Frontend
- **HTML5** - Structure sémantique
- **CSS3** - Design responsive et moderne
- **JavaScript (ES6+)** - Interactions dynamiques
- **Font Awesome** - Icônes
- **Google Fonts** - Typographie

## 🚀 Installation et Démarrage

### Prérequis
- Navigateur web moderne
- Serveur web local (optionnel)

### Installation

1. **Cloner le projet**
```bash
git clone <url-du-repo>
cd startup
```

2. **Ouvrir le site**
- **Important** : utiliser un serveur local et le lancer **depuis la racine du projet** (dossier `startup`). Sinon les assets (`/css/`, `/js/`) renvoient 404. Ne pas ouvrir `index.html` en `file://`.
- Ou utiliser un serveur local :
```bash
  cd startup
  # Avec Python
  python -m http.server 8000

  # Avec Node.js
  npx serve .

  # Avec PHP
  php -S localhost:8000
```
- Puis ouvrir `http://localhost:8000` (accueil) ou `http://localhost:8000/pages/devis.html` (ex.).

### Accès
- **Site web** : `http://localhost:8000` (index à la racine, pages dans `/pages/`)

## 📊 Fonctionnalités

### Site Web
- ✅ **Page d'accueil** - Présentation des services (web, mobile, digitalisation, IA, logistique, transport)
- ✅ **Services détaillés** - Pages par service (6 domaines)
- ✅ **Réalisations** - Page dédiée (projets à venir)
- ✅ **Équipe** - Présentation de l'équipe
- ✅ **Contact** - Footer et formulaire devis (email/WhatsApp)
- ✅ **Devis** - Demande de devis en ligne (email/WhatsApp)
- ✅ **Design responsive** - Mobile-first
- ✅ **Chatbot** - Assistant SmartShift
- ✅ **Newsletter** - Inscription par email

### Formulaires
- ✅ **Contact** - Envoi par email ou WhatsApp
- ✅ **Devis** - Envoi par email ou WhatsApp
- ✅ **Newsletter** - Inscription par email

## 📱 Pages Disponibles

### Pages Principales
- **Accueil** (`/`, `index.html`) - Présentation générale
- **Services** (`/index.html#services`, `pages/services.html`) - Catalogue des 6 services
- **À propos** (`/index.html#about`) - Informations sur l'entreprise
- **Réalisations** (`pages/realisations.html`) - Projets à venir
- **Équipe** (`pages/equipe.html`) - Présentation de l'équipe
- **Devis** (`pages/devis.html`) - Demande de devis
- **Politique de confidentialité** (`pages/confidentialite.html`) - RGPD, protection des données
- **Conditions d'utilisation** (`pages/conditions.html`) - CGU du site
- **Administration** (`pages/admin.html`) - Tableau de bord (accès par mot de passe)

### Pages de Services (6 domaines, dans `pages/`)
- **Création de sites web** (`pages/service-web.html`)
- **Applications mobiles** (`pages/service-mobile.html`)
- **Accompagnement digitalisation** (`pages/service-digital.html`)
- **IA & automatisation** (`pages/service-automation.html`)
- **Logistique** (`pages/service-logistics.html`)
- **Transport** (`pages/service-transport.html`)

## 🔧 Configuration

### Personnalisation
- **Couleurs** : Modifier les variables CSS dans `css/styles.css`
- **Contenu** : Éditer les fichiers HTML
- **Contact** : Modifier les emails et numéros dans `js/script.js`
- **Admin** : Page `pages/admin.html`. Identifiants (email, mot de passe) configurables dans le code : `ADMIN_EMAIL`, `ADMIN_PASSWORD`.

## 🎨 Design

### Couleurs
- **Primaire** : `#2563EB` (Bleu)
- **Secondaire** : `#10B981` (Vert)
- **Sombre** : `#1F2937`
- **Clair** : `#F9FAFB`

### Domaines d'intervention SmartShift
- Création de sites web
- Applications mobiles
- Accompagnement des entreprises à la digitalisation
- Intégration de l'IA pour automatiser les tâches
- Logistique
- Transport

### Typographie
- **Titres** : Poppins (600, 700)
- **Corps** : Open Sans (400, 600)

## 📞 Contact

- **Téléphone** : +33 6 89 30 64 32
- **Email** : smartshift12@gmail.com

## 🚀 Déploiement

### Netlify (recommandé)
1. Pousser le code sur GitHub (voir [DEPLOY.md](DEPLOY.md)).
2. [Netlify](https://www.netlify.com) → **Add new site** → **Import an existing project** → **GitHub** → **Elie224/SmartShift**.
3. **Build command** : vide · **Publish directory** : `.`
4. **Deploy site**. URL type `https://xxx.netlify.app`.

Les chemins `/css/`, `/js/`, `/images/`, `/pages/` sont à la racine.

### Autres hébergeurs
- **Render** – `render.yaml` inclus ; Build : `echo 'Static site – no build'`, Publish : `.`
- **Vercel** – Connecter le repo, Output directory = `.`
- **GitHub Pages** – Hébergement gratuit

## 🔧 Maintenance

### Mises à jour
- **Contenu** : Modifier directement les fichiers HTML
- **Styles** : Éditer `css/styles.css`
- **Fonctionnalités** : Modifier `js/script.js`
- **Images** : Remplacer les fichiers dans le dossier

### Sauvegarde
- **Versioning** : Utiliser Git pour le suivi des versions
- **Backup** : Sauvegarder régulièrement les fichiers
- **Test** : Tester les modifications en local avant déploiement

## 📄 Licence

© 2025 SmartShift. Tous droits réservés.

---

**Développé avec ❤️ par l'équipe SmartShift**

