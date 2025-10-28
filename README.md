# 🏅 Tableau de bord des Jeux Olympiques

Ce projet Angular affiche des visualisations interactives (camembert, courbes, KPIs) à partir de données simulées sur les Jeux Olympiques.
Je propose une navigation simple entre une vue d’ensemble et le détail des performances d’un pays.


---

## ⚙️ Stack technique

- **Angular 20** (Standalone Components, Angular Router)
- **TypeScript 5.9**
- **RxJS 7.8** (gestion des flux + désabonnement via `takeUntil`)
- **Chart.js 4** + **ng2-charts** + **chartjs-plugin-datalabels**
- **SCSS** pour les styles
- **Node.js ≥ 20** et **npm ≥ 9**
- **Angular CLI** pour le développement et le build
- **Karma + Jasmine** pour les tests unitaires

---



## 📦 Installation

1) Cloner le dépôt :
```bash
git clone https://github.com/talalmarouane/telesport_test.git
cd telesport_test
```

2) Installer les dépendances :
```bash
npm install
```

3) Vérifier les versions :
```bash
node -v
npm -v
```

---

## ▶️ Lancer le projet en développement

```bash
npm start
# ou
ng serve
```

Par défaut, l’application s’exécute sur http://localhost:4200

---
## 🚏 Routes de l’application

| Route | Description |
|-------|-------------|
| `/home` | Page d’accueil : vue d’ensemble avec graphique en camembert et KPIs |
| `/detail/:country` | Détail d’un pays : graphique en ligne (médailles par année) |
| `/test` | Page de test des données et du service Olympic |
| `/404` ou route générique `**` | Page “Not Found” avec navigation vers l’accueil |

> Redirection : `/` → `/home`

---

## 🧱 Structure du projet

```text
src/
├─ app/
│  ├─ app.config.ts
│  ├─ app.routes.ts
│  ├─ components/
│  │  ├─ home.component/             # Page d'accueil (camembert + KPIs)
│  │  ├─ component.detail/           # Page de détail par pays (graphique en ligne)
│  │  ├─ test-olympic/               # Composant de test
│  │  └─ not-found/                  # Page 404
│  ├─ core/
│  │  ├─ models/                     # Interfaces (OlympicCountry, Participation)
│  │  └─ services/olympic.ts         # Service pour charger les données JSON
│  └─ assets/mock/olympic.json       # Données d'exemple
├─ index.html
├─ main.ts
└─ styles.scss
```

---

## 🧪 Tests

```bash
npm test
```
- **Karma** pour l’exécution
- **Jasmine** pour l’écriture des tests

---

## 🏗️ Build de production

```bash
npm run build
```
Le build est généré dans `dist/`. Je peux ensuite servir ce dossier via un serveur statique (Nginx, Apache) ou `npx http-server`.

---

## 🧭 Fonctionnalités principales

- Lecture de données depuis `assets/mock/olympic.json`
- Visualisations :
  - Camembert des médailles par pays
  - Courbe des médailles par année (vue détail)
- Calculs :
  - Nombre total d’éditions
  - Nombre total de pays
  - Médailles cumulées par pays
- Navigation fluide entre les pages
- Gestion propre des abonnements RxJS (`takeUntil` + `ngOnDestroy`)

---

## 📊 Données utilisées

Les données sont statiques et chargées depuis :
```
src/assets/mock/olympic.json
```
Exemple de structure (par pays) :
```json
{
  "country": "France",
  "participations": [
    { "year": 2000, "city": "Sydney", "athleteCount": 80, "medalsCount": 12 },
    { "year": 2004, "city": "Athens", "athleteCount": 85, "medalsCount": 10 }
  ]
}
```

---

## 🐞 Dépannage

| Problème | Piste de solution |
|----------|-------------------|
| `Cannot find module 'rxjs/operators'` | Vérifier la version de RxJS (>=7) et réinstaller |
| Données non chargées | Vérifier le chemin du JSON dans `olympic.ts` |
| Graphique vide | S’assurer que `olympic.json` contient des participations |
| Node incompatible | Utiliser **Node 20 LTS** et réinstaller les dépendances |

---

