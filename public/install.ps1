# CastSprint Windows Automated Installer
# Usage: irm https://castsprint.app/install.ps1 | iex

$ErrorActionPreference = "Stop"

$Repo = "CastSprint/CastSprint"
$FallbackVersion = "0.3.3"

Write-Host @"
   ______           __   _____             _       __ 
  / ____/___ ______/ /_ / ___/____  _____ (_)____ / /_
 / /   / __ `/ ___/ __/ \__ \/ __ \/ ___// // __ \/ __/
/ /___/ /_/ (__  ) /_  ___/ / /_/ / /   / // / / / /_  
\____/\__,_/____/\__/ /____/ .___/_/   /_//_/ /_/\__/  
                          /_/                          
"@ -ForegroundColor Cyan

Write-Host "CastSprint Native Windows Installer" -ForegroundColor Green
Write-Host "100% Free Forever · Zero Watermarks · Zero Telemetry · Low-Latency Engine"
Write-Host "Created by TA Shanto (https://tashanto.com)`n"

# 1. Resolve Latest Version
Write-Host "==> 1. Resolving latest CastSprint release... " -NoNewline
try {
    $Release = Invoke-RestMethod -Uri "https://api.github.com/repos/$Repo/releases/latest" -Headers @{ "User-Agent" = "CastSprint-Installer" }
    $Tag = $Release.tag_name
} catch {
    $Tag = "v$FallbackVersion"
}
$Version = $Tag.TrimStart("v")
Write-Host $Tag -ForegroundColor Green

# 2. Download ZIP
$AssetUrl = "https://github.com/$Repo/releases/download/$Tag/CastSprint-v$Version-Windows-x64.zip"
$TempZip = "$env:TEMP\CastSprint-$Version.zip"
$InstallDir = "$env:LOCALAPPDATA\Programs\CastSprint"

Write-Host "==> 2. Downloading $AssetUrl..."
Invoke-WebRequest -Uri $AssetUrl -OutFile $TempZip -UseBasicParsing

# 3. Extract and Install
Write-Host "==> 3. Installing to $InstallDir..."
if (Test-Path $InstallDir) {
    Remove-Item -Recurse -Force $InstallDir
}
New-Item -ItemType Directory -Force -Path $InstallDir | Out-Null
Expand-Archive -Path $TempZip -DestinationPath $InstallDir -Force
Remove-Item -Force $TempZip

# 4. Add to User Path
$UserPath = [Environment]::GetEnvironmentVariable("PATH", "User")
if ($UserPath -notlike "*$InstallDir*") {
    [Environment]::SetEnvironmentVariable("PATH", "$UserPath;$InstallDir", "User")
    $env:PATH = "$env:PATH;$InstallDir"
    Write-Host "==> 4. Added CastSprint to user PATH."
}

# 5. Create Desktop & Start Menu Shortcut
try {
    $WshShell = New-Object -ComObject WScript.Shell
    
    # Desktop Shortcut
    $DesktopPath = [Environment]::GetFolderPath("Desktop")
    $Shortcut = $WshShell.CreateShortcut("$DesktopPath\CastSprint.lnk")
    $Shortcut.TargetPath = "$InstallDir\castsprint_receiver.exe"
    $Shortcut.WorkingDirectory = $InstallDir
    $Shortcut.Description = "CastSprint Mobile Screen Mirroring"
    $Shortcut.Save()

    # Start Menu Shortcut
    $StartMenuPath = [Environment]::GetFolderPath("Programs")
    $StartShortcut = $WshShell.CreateShortcut("$StartMenuPath\CastSprint.lnk")
    $StartShortcut.TargetPath = "$InstallDir\castsprint_receiver.exe"
    $StartShortcut.WorkingDirectory = $InstallDir
    $StartShortcut.Save()
    Write-Host "==> 5. Created Desktop & Start Menu shortcuts."
} catch {
    Write-Host "[NOTE] Could not create shortcuts automatically."
}

Write-Host "`n[SUCCESS] CastSprint v$Version installed successfully!" -ForegroundColor Green
Write-Host "Launch it from the Start Menu, Desktop shortcut, or run in PowerShell:" -ForegroundColor Yellow
Write-Host "  castsprint_receiver`n" -ForegroundColor Cyan

Write-Host "Support the Creator:" -ForegroundColor Yellow
Write-Host "  • Portfolio: https://tashanto.com"
Write-Host "  • Support on SupportKori: https://www.supportkori.com/iamtashanto`n"
