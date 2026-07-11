#!/bin/bash
# Chipsy Top Manager — CI/CD Setup Script
# Automatycznie tworzy repo na GitHubie i konfiguruje Netlify
#
# Uzycie:
#   chmod +x scripts/setup-ci.sh
#   GITHUB_TOKEN=ghp_xxx ./scripts/setup-ci.sh

set -e

REPO_NAME="chipsy-top-manager"
GITHUB_USER=""
TOKEN="${GITHUB_TOKEN}"

# Kolory
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  Chipsy Top Manager — CI/CD Setup${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Sprawdzenie tokena
if [ -z "$TOKEN" ]; then
    echo -e "${RED}BLAD: Brak GITHUB_TOKEN${NC}"
    echo ""
    echo "Jak uzyskac token:"
    echo "  1. Wejdz na https://github.com/settings/tokens"
    echo "  2. Kliknij 'Generate new token (classic)'"
    echo "  3. Zaznacz scope: 'repo' (full control)"
    echo "  4. Kliknij 'Generate token' na dole"
    echo "  5. Skopiuj token i uruchom:"
    echo ""
    echo -e "     ${YELLOW}GITHUB_TOKEN=ghp_xxxxxxxxxx ./scripts/setup-ci.sh${NC}"
    echo ""
    exit 1
fi

# Pobranie nazwy uzytkownika
echo -e "${BLUE}[1/6]${NC} Pobieranie danych uzytkownika GitHub..."
GITHUB_USER=$(curl -s -H "Authorization: token $TOKEN" https://api.github.com/user | grep -o '"login": "[^"]*"' | cut -d'"' -f4)

if [ -z "$GITHUB_USER" ]; then
    echo -e "${RED}BLAD: Nieprawidlowy token GitHub${NC}"
    exit 1
fi

echo -e "  ${GREEN}OK:${NC} Uzytkownik: $GITHUB_USER"

# Sprawdzenie czy repo juz istnieje
echo -e "${BLUE}[2/6]${NC} Sprawdzanie czy repo istnieje..."
REPO_EXISTS=$(curl -s -o /dev/null -w "%{http_code}" -H "Authorization: token $TOKEN" "https://api.github.com/repos/$GITHUB_USER/$REPO_NAME")

if [ "$REPO_EXISTS" = "200" ]; then
    echo -e "  ${YELLOW}UWAGA:${NC} Repo $REPO_NAME juz istnieje!"
    read -p "Czy nadpisac? (t/n): " overwrite
    if [ "$overwrite" != "t" ]; then
        echo "Anulowano."
        exit 0
    fi
    # Usuniecie starego repo
    curl -s -X DELETE -H "Authorization: token $TOKEN" "https://api.github.com/repos/$GITHUB_USER/$REPO_NAME" > /dev/null
    echo -e "  ${GREEN}OK:${NC} Stare repo usuniete"
fi

# Tworzenie repo
echo -e "${BLUE}[3/6]${NC} Tworzenie repo na GitHubie..."
curl -s -X POST -H "Authorization: token $TOKEN" \
    -H "Accept: application/vnd.github.v3+json" \
    https://api.github.com/user/repos \
    -d "{\"name\": \"$REPO_NAME\", \"description\": \"Chipsy Top Manager - darmowa polska gra przegladarkowa tycoon o produkcji chipsow ziemniaczanych\", \"private\": false, \"has_issues\": true, \"has_wiki\": false}" > /dev/null

echo -e "  ${GREEN}OK:${NC} Repo utworzone: https://github.com/$GITHUB_USER/$REPO_NAME"

# Dodanie remote i wypchniecie kodu
echo -e "${BLUE}[4/6]${NC} Wypychanie kodu na GitHub..."
cd "$(dirname "$0")/.."

# Usuniecie starego remote jesli istnieje
git remote remove origin 2>/dev/null || true

# Dodanie nowego remote
git remote add origin "https://$GITHUB_USER:$TOKEN@github.com/$GITHUB_USER/$REPO_NAME.git"

# Push
git push -u origin master --force

echo -e "  ${GREEN}OK:${NC} Kod wypchniety!"

# Wyswietlenie instrukcji Netlify
echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  SUKCES! Repo gotowe!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "${YELLOW}Krok 1:${NC} Skonfiguruj Netlify"
echo "  1. Wejdz na https://app.netlify.com/"
echo "  2. Kliknij 'Add new site' -> 'Import an existing project'"
echo "  3. Wybierz GitHub i znajdz repo: ${BLUE}$REPO_NAME${NC}"
echo "  4. Build settings sa juz w netlify.toml (automatyczne)"
echo "  5. Kliknij 'Deploy site'"
echo ""
echo -e "${YELLOW}Krok 2:${NC} Skonfiguruj domene"
echo "  W Netlify: Site settings -> Domain management"
echo "  Dodaj swoja domene: ${BLUE}chipsy.top${NC}"
echo ""
echo -e "${YELLOW}Twoje repo:${NC} https://github.com/$GITHUB_USER/$REPO_NAME"
echo ""
echo -e "${GREEN}Od teraz kazdy 'git push' automatycznie deployuje na Netlify!${NC}"
echo ""
