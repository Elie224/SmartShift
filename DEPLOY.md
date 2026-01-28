# GitHub + Netlify – SmartShift

## 1. Créer le dépôt sur GitHub

1. Va sur [https://github.com/new](https://github.com/new).
2. Nomme le dépôt **SmartShift**.
3. **Ne coche pas** « Add a README ».
4. Clique sur **Create repository**.

---

## 2. Commandes manuelles (à exécuter dans un terminal)

Ouvre **PowerShell**, **CMD** ou **Git Bash**, puis va dans le dossier du projet :

```bash
cd C:\Users\KOURO\OneDrive\Desktop\startup
```

**Si un dossier `.git` existe et pose problème** : ferme Cursor, supprime le dossier `.git` (Explorateur Windows → clic droit → Supprimer), rouvre le projet.

Ensuite, exécute ces commandes **une par une** (ou copie-colle tout le bloc) :

```bash
git init
```

```bash
git add .
```

```bash
git commit -m "Initial commit – SmartShift site"
```

```bash
git branch -M main
```

```bash
git remote add origin https://github.com/Elie224/SmartShift.git
```

```bash
git push -u origin main
```

Si `git remote add` dit que `origin` existe déjà :

```bash
git remote set-url origin https://github.com/Elie224/SmartShift.git
git push -u origin main
```

---

## 3. Déployer sur Netlify

1. Va sur [https://www.netlify.com](https://www.netlify.com) et connecte-toi (avec GitHub).
2. **Add new site** → **Import an existing project**.
3. Choisis **GitHub** et autorise Netlify si besoin, puis sélectionne le dépôt **Elie224/SmartShift**.
4. Configuration du build : le fichier **`netlify.toml`** à la racine définit déjà `publish = "."` et `command = ""`. Tu peux laisser les champs par défaut, ou vérifier :
   - **Branch to deploy** : `main`.
   - **Build command** : vide (site statique).
   - **Publish directory** : `.` (racine du projet).
5. **Deploy site**. Netlify te donnera une URL du type `https://xxx.netlify.app`.

---

**Admin** : Accessible à `/pages/admin.html` (ex. `https://ton-site.netlify.app/pages/admin.html`). Identifiants configurables dans `pages/admin.html` (`ADMIN_EMAIL`, `ADMIN_PASSWORD`).

## Dépannage

- **`could not lock config file ... File exists`** → Voir **[GIT-FIX.md](GIT-FIX.md)** : fermer Cursor, supprimer tout le dossier `.git`, rouvrir un terminal hors Cursor, refaire `git init` puis les commandes.
- **Erreur d’auth au push** : connecte-toi à GitHub (navigateur), ou utilise un [Personal Access Token](https://github.com/settings/tokens) comme mot de passe.
- **404 sur /css, /js, /images** : vérifie que **Publish directory** (Netlify) = `.` et que le site est servi à la racine.
