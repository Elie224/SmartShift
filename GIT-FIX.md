# Corriger l’erreur « could not lock config file / File exists »

Si tu as :

```
error: could not lock config file C:/Users/KOURO/OneDrive/Desktop/startup/.git/config: File exists
fatal: could not set 'core.repositoryformatversion' to '0'
```

c’est que le dossier `.git` est corrompu ou verrouillé. **Il faut le supprimer entièrement**, puis refaire `git init`.

---

## Étapes (à faire dans cet ordre)

### 1. Fermer Cursor
Ferme Cursor complètement (sinon il peut bloquer `.git`).

### 2. Supprimer le dossier `.git`
- Ouvre l’**Explorateur Windows**.
- Va dans `C:\Users\KOURO\OneDrive\Desktop\startup`.
- Repère le dossier **`.git`** (si tu ne le vois pas : Affichage → cocher « Éléments masqués »).
- **Clic droit** sur `.git` → **Supprimer**.
- Si Windows dit « Accès refusé » ou « utilisé par un programme » :
  - Ferme tous les terminaux (PowerShell, CMD, Git Bash).
  - Réessaie de supprimer `.git`.
  - Tu peux aussi redémarrer le PC puis supprimer `.git`.

### 3. Ouvrir un terminal en dehors de Cursor
Ouvre **PowerShell** ou **CMD** (menu Démarrer, pas le terminal de Cursor).

### 4. Aller dans le projet et lancer les commandes Git

```bash
cd C:\Users\KOURO\OneDrive\Desktop\startup
```

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

### 5. Rouvrir Cursor
Une fois le push réussi, tu peux rouvrir le projet dans Cursor.

---

## Si la suppression de `.git` échoue toujours

- **OneDrive** : arrête la sync pour le dossier `startup` (clic droit sur le dossier → Libre à la demande / toujours sur cet appareil, etc.) puis supprime `.git`.
- Ou **déplace le projet** hors de OneDrive (par ex. `C:\Users\KOURO\Desktop\startup` ou `C:\Dev\startup`), supprime `.git`, puis refais les commandes ci‑dessus.
