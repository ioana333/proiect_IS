param(
  [switch]$NoSeed = $false,
  [switch]$NoFrontend = $false
)

$ErrorActionPreference = "Stop"

function Header($msg) { Write-Host "`n== $msg ==" -ForegroundColor Cyan }
function Info($msg)   { Write-Host "• $msg" -ForegroundColor Gray }
function Ok($msg)     { Write-Host "✔ $msg" -ForegroundColor Green }
function Warn($msg)   { Write-Host "! $msg" -ForegroundColor Yellow }
function Fail($msg)   { Write-Host "✖ $msg" -ForegroundColor Red }

# Paths (FIXE după structura ta)
$ScriptDir   = Split-Path -Path $PSCommandPath -Parent
$RepoRoot    = Resolve-Path (Join-Path $ScriptDir "..")
$AppDir      = Join-Path $RepoRoot "APP"
$BackendDir  = Join-Path $AppDir    "backend"
$FrontendDir = Join-Path $AppDir    "frontend"
$ComposeFile = Join-Path $AppDir    "docker-compose.yml"

if (-not (Test-Path $BackendDir))  { Fail "Nu găsesc backend la: $BackendDir";  exit 1 }
if (-not (Test-Path $ComposeFile)) { Fail "Nu găsesc docker-compose.yml la: $ComposeFile"; exit 1 }
if (-not (Test-Path $FrontendDir)) { Warn "Nu găsesc frontend la: $FrontendDir (sar peste frontend)"; $NoFrontend = $true }

Header "Verific uneltele"
foreach ($pair in @(@("git","Git"),@("node","Node.js"),@("npm","npm"),@("docker","Docker"))) {
  $cmd,$name = $pair
  if (-not (Get-Command $cmd -ErrorAction SilentlyContinue)) { Fail "$name lipsă ($cmd)"; exit 1 }
  else { Ok "$name OK ($cmd)" }
}

Header "Pornesc Docker Compose (folosind $ComposeFile)"
# rulez docker compose din folderul APP ca să ia corect contextul
Push-Location $AppDir
docker compose up -d
Pop-Location
Ok "Containerele sunt up (verifică 'docker ps')"

Header "Setup backend ($BackendDir)"
Push-Location $BackendDir

if (-not (Test-Path ".env")) {
  if (Test-Path ".env.example") {
    Copy-Item ".env.example" ".env"
    Ok "backend/.env creat din .env.example"
  } else {
    Warn "backend/.env.example lipsește — creează manual backend/.env"
  }
}

try {
  npm ci
  Ok "npm ci (backend)"
} catch {
  Warn "npm ci a eșuat, încerc npm install (backend)"
  npm install
}

npx prisma generate
Ok "prisma generate (backend)"

# dacă DB răspunde, status nu aruncă; apoi migrezi
npx prisma migrate status | Out-Null
npx prisma migrate dev --name bootstrap
Ok "prisma migrate dev (backend)"

if (-not $NoSeed) {
  try {
    npm run seed
    Ok "seed OK"
  } catch {
    Warn "seed a eșuat sau lipsește scriptul — continuăm"
  }
}

Pop-Location

if (-not $NoFrontend) {
  Header "Setup frontend ($FrontendDir)"
  Push-Location $FrontendDir

  if (-not (Test-Path ".env")) {
    if (Test-Path ".env.example") {
      Copy-Item ".env.example" ".env"
      Ok "frontend/.env creat din .env.example"
    } else {
      Warn "frontend/.env.example lipsește — creează manual frontend/.env"
    }
  }

  try {
    npm ci
    Ok "npm ci (frontend)"
  } catch {
    Warn "npm ci a eșuat, încerc npm install (frontend)"
    npm install
  }

  Pop-Location
}

Header "Totul gata ✅"
Info  "API:      http://localhost:4000/api"
Info  "Frontend: http://localhost:5173"
Info  "Pornește serverele în două terminale:"
Info  "  cd .\APP\backend  ; npm run dev"
Info  "  cd .\APP\frontend ; npm run dev"
