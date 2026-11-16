#!/usr/bin/env sh
# CastSprint Universal Installer (macOS & Linux)
# Usage: curl -fsSL https://castsprint.app/install.sh | bash

set -e

REPO="CastSprint/CastSprint"
FALLBACK_VERSION="0.3.3"

BOLD='\033[1m'
CYAN='\033[0;36m'
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

printf "${CYAN}"
cat << "EOF"
   ______           __   _____             _       __ 
  / ____/___ ______/ /_ / ___/____  _____ (_)____ / /_
 / /   / __ `/ ___/ __/ \__ \/ __ \/ ___// // __ \/ __/
/ /___/ /_/ (__  ) /_  ___/ / /_/ / /   / // / / / /_  
\____/\__,_/____/\__/ /____/ .___/_/   /_//_/ /_/\__/  
                          /_/                          
EOF
printf "${NC}\n"
printf "${BOLD}CastSprint Universal Desktop Installer${NC}\n"
printf "100%% Free Forever · Zero Watermarks · Zero Telemetry · Rust Engine\n"
printf "Created by ${CYAN}TA Shanto${NC} (https://tashanto.com)\n\n"

# 1. Detect OS and Architecture
OS="$(uname -s)"
ARCH="$(uname -m)"

case "$OS" in
  Darwin)
    PLATFORM="macOS"
    ;;
  Linux)
    PLATFORM="Linux"
    ;;
  *)
    printf "${RED}Unsupported operating system: $OS${NC}\n"
    printf "Windows users should install via PowerShell: irm https://castsprint.app/install.ps1 | iex\n"
    exit 1
    ;;
esac

# 2. Resolve Latest Version
printf "==> 1. Resolving latest CastSprint release... "
LATEST_TAG=$(curl -s "https://api.github.com/repos/${REPO}/releases/latest" | grep '"tag_name":' | sed -E 's/.*"([^"]+)".*/\1/' || true)
if [ -z "$LATEST_TAG" ]; then
  LATEST_TAG="v${FALLBACK_VERSION}"
fi
VERSION="${LATEST_TAG#v}"
printf "${GREEN}${LATEST_TAG}${NC}\n"

TMP_DIR="$(mktemp -d 2>/dev/null || mktemp -d -t 'castsprint')"
cleanup() {
  rm -rf "$TMP_DIR"
}
trap cleanup EXIT

# 3. Download & Install Platform Asset
if [ "$PLATFORM" = "macOS" ]; then
  ASSET_NAME="CastSprint-v${VERSION}-macOS.dmg"
  DOWNLOAD_URL="https://github.com/${REPO}/releases/download/${LATEST_TAG}/${ASSET_NAME}"
  
  printf "==> 2. Downloading ${ASSET_NAME}...\n"
  curl -fL --progress-bar "$DOWNLOAD_URL" -o "${TMP_DIR}/${ASSET_NAME}"
  
  printf "==> 3. Mounting DMG and installing CastSprint.app to /Applications...\n"
  MOUNT_DIR="${TMP_DIR}/mount"
  mkdir -p "$MOUNT_DIR"
  hdiutil attach "${TMP_DIR}/${ASSET_NAME}" -mountpoint "$MOUNT_DIR" -nobrowse -quiet
  
  if [ -d "$MOUNT_DIR/CastSprint.app" ]; then
    rm -rf "/Applications/CastSprint.app"
    cp -R "$MOUNT_DIR/CastSprint.app" /Applications/
    hdiutil detach "$MOUNT_DIR" -quiet
    printf "${GREEN}[SUCCESS] CastSprint.app successfully installed to /Applications!${NC}\n"
    printf "You can open it now by running: ${CYAN}open /Applications/CastSprint.app${NC}\n"
  else
    hdiutil detach "$MOUNT_DIR" -quiet || true
    printf "${RED}Failed to locate CastSprint.app in DMG package.${NC}\n"
    exit 1
  fi

elif [ "$PLATFORM" = "Linux" ]; then
  ASSET_NAME="CastSprint-v${VERSION}-Linux-x86_64.tar.gz"
  DOWNLOAD_URL="https://github.com/${REPO}/releases/download/${LATEST_TAG}/${ASSET_NAME}"
  
  printf "==> 2. Downloading ${ASSET_NAME}...\n"
  curl -fL --progress-bar "$DOWNLOAD_URL" -o "${TMP_DIR}/${ASSET_NAME}"
  
  printf "==> 3. Extracting and installing binary...\n"
  tar -xzf "${TMP_DIR}/${ASSET_NAME}" -C "$TMP_DIR"
  
  EXTRACTED_DIR="${TMP_DIR}/CastSprint-v${VERSION}-Linux-x86_64"
  BIN_SRC="${EXTRACTED_DIR}/bin/castsprint_receiver_linux"
  
  # Determine install directory
  INSTALL_DIR="/usr/local/bin"
  if [ ! -w "$INSTALL_DIR" ]; then
    INSTALL_DIR="${HOME}/.local/bin"
    mkdir -p "$INSTALL_DIR"
  fi
  
  cp "$BIN_SRC" "${INSTALL_DIR}/castsprint"
  chmod +x "${INSTALL_DIR}/castsprint"
  
  # Install desktop entry if ~/.local/share/applications exists
  APP_DIR="${HOME}/.local/share/applications"
  if [ -d "$APP_DIR" ] && [ -f "${EXTRACTED_DIR}/share/applications/castsprint.desktop" ]; then
    cp "${EXTRACTED_DIR}/share/applications/castsprint.desktop" "$APP_DIR/"
    if [ -f "${EXTRACTED_DIR}/share/icons/hicolor/256x256/apps/castsprint.png" ]; then
      ICON_DIR="${HOME}/.local/share/icons/hicolor/256x256/apps"
      mkdir -p "$ICON_DIR"
      cp "${EXTRACTED_DIR}/share/icons/hicolor/256x256/apps/castsprint.png" "$ICON_DIR/"
    fi
  fi
  
  printf "${GREEN}[SUCCESS] CastSprint binary installed to ${INSTALL_DIR}/castsprint!${NC}\n"
  printf "Run it from anywhere with: ${CYAN}castsprint${NC}\n"
fi

printf "\n${CYAN}Useful Links:${NC}\n"
printf "  • GitHub: https://github.com/${REPO}\n"
printf "  • Creator: TA Shanto (https://tashanto.com)\n"
printf "  • Support the project: https://www.supportkori.com/iamtashanto\n\n"
