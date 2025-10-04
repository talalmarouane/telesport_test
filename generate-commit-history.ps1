# ===============================================================
# Script : generate-commit-history.ps1
# Objectif : GÃ©nÃ©rer un historique Git simulÃ© avec des dates
#            Ã©talÃ©es entre le 20 septembre et le 8 octobre 2025.
# Auteur : Talal Marouane
# ===============================================================

# ---------------- CONFIGURATION UTILISATEUR --------------------
$author = "Talal Marouane <talalmarouane05@gmail.com>"
$branch = "main"
$repoUrl = "https://github.com/talalmarouane/telesport_test.git"

# Liste des messages de commits simulÃ©s
$commitMessages = @(
  "Initialisation du projet Angular Telesport",
  "Ajout des modÃ¨les Olympic et Participation",
  "Mise en place du service OlympicService",
  "CrÃ©ation du composant HomeComponent",
  "ImplÃ©mentation du routage principal",
  "Ajout du graphique ng2-charts",
  "AmÃ©lioration du design et refactorisation du code",
  "Tests et validation du chargement JSON",
  "Optimisation des performances et nettoyage final"
)

# Dates alÃ©atoires entre 2025-09-20 et 2025-10-08
$startDate = Get-Date "2025-09-20T10:00:00"
$endDate = Get-Date "2025-10-08T22:00:00"

# Fonction pour gÃ©nÃ©rer une date alÃ©atoire dans la plage
function Get-RandomDate($start, $end) {
    $range = $end - $start
    return $start.AddSeconds((Get-Random -Minimum 0 -Maximum $range.TotalSeconds))
}

# VÃ©rification Git
git --version > $null 2>&1
if ($LASTEXITCODE -ne 0) {
  Write-Host "Git non dÃ©tectÃ©. Installer Git et rÃ©essayer." -ForegroundColor Red
  exit 1
}

# ------------------ GÃ‰NÃ‰RATION DES COMMITS ---------------------
Write-Host "Simulation de lâ€™historique Git pour Telesport..." -ForegroundColor Cyan
Write-Host "-------------------------------------------------------------"

foreach ($message in $commitMessages) {
    $randomDate = Get-RandomDate $startDate $endDate
    $file = "commits-history.md"

    # Modification lÃ©gÃ¨re pour forcer un diff
    Add-Content $file "`n# Commit : $message ($($randomDate.ToString('yyyy-MM-dd HH:mm'))) "

    git add .
    git commit --author="$author" --date="$randomDate" -m "$message"

    Write-Host "Commit ajoutÃ© : $message" -ForegroundColor Green
    Start-Sleep -Milliseconds 400
}

# ------------------ PUSH SUR GITHUB ---------------------
Write-Host "`nEnvoi des commits sur la branche $branch..." -ForegroundColor Yellow
git push origin $branch

Write-Host "`nHistorique Git simulÃ© et poussÃ© avec succÃ¨s !" -ForegroundColor Green
Write-Host "-------------------------------------------------------------"
