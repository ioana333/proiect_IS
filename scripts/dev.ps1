# deschide două ferestre PowerShell: backend și frontend
$RepoRoot = Resolve-Path (Join-Path (Split-Path -Path $PSCommandPath -Parent) "..")
$Backend  = Join-Path $RepoRoot "APP\backend"
$Frontend = Join-Path $RepoRoot "APP\frontend"

Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd `"$Backend`"; npm run dev"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd `"$Frontend`"; npm run dev"
