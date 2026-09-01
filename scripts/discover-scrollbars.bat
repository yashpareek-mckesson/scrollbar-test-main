@echo off
REM ################################################################################
REM Scrollbar Implementation Discovery Script (Windows)
REM
REM Purpose: Automatically discover all scrollbar implementations in a repository
REM Usage: discover-scrollbars.bat [output-file]
REM
REM If no output file is specified, results are printed to console
REM
REM Example: discover-scrollbars.bat > SCROLLBAR_FINDINGS.txt
REM ################################################################################

setlocal enabledelayedexpansion

REM Get repository name (current directory name)
for %%I in (.) do set REPO_NAME=%%~nxI

REM Print header
echo ==========================================
echo SCROLLBAR IMPLEMENTATION DISCOVERY
echo Repository: %REPO_NAME%
echo Date: %date% %time%
echo ==========================================
echo.

REM ################################################################################
REM 1. Check package.json for scrollbar dependencies
REM ################################################################################
echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo 1. CHECKING PACKAGE.JSON FOR SCROLLBAR LIBRARIES
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.

if exist package.json (
    echo Checking package.json...
    findstr /i /c:"scrollbar" /c:"simplebar" /c:"overlay" package.json
    if errorlevel 1 (
        echo ✓ No scrollbar libraries found in package.json
    ) else (
        echo Found scrollbar dependencies above
    )
) else (
    echo ⚠ package.json not found
)

REM ################################################################################
REM 2. Search for CSS scrollbar styling
REM ################################################################################
echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo 2. SEARCHING FOR CSS SCROLLBAR STYLING
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.

echo Searching for ::-webkit-scrollbar in CSS files...
findstr /s /n /i "::-webkit-scrollbar" src\*.css src\*.scss src\*.less 2>nul
if errorlevel 1 (
    echo ✓ No ::-webkit-scrollbar found
) else (
    echo Found ::-webkit-scrollbar usage above
)

echo.
echo Searching for scrollbar-width and scrollbar-color...
findstr /s /n /i "scrollbar-width scrollbar-color" src\*.css src\*.scss src\*.less 2>nul
if errorlevel 1 (
    echo ✓ No Firefox scrollbar properties found
) else (
    echo Found Firefox scrollbar properties above
)

echo.
echo Searching for overflow: scroll/auto patterns...
findstr /s /n /i "overflow.*scroll overflow.*auto" src\*.css src\*.scss src\*.less 2>nul
if errorlevel 1 (
    echo ✓ No overflow scroll/auto found
) else (
    echo Found overflow scroll/auto above
)

REM ################################################################################
REM 3. Search for scrollbar library imports
REM ################################################################################
echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo 3. SEARCHING FOR SCROLLBAR LIBRARY IMPORTS
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.

echo Searching for scrollbar imports in JS/TS files...
findstr /s /n /i "scrollbar" src\*.js src\*.jsx src\*.ts src\*.tsx 2>nul | findstr /i "import from require"
if errorlevel 1 (
    echo ✓ No scrollbar library imports found
) else (
    echo Found scrollbar imports above
)

echo.
echo Checking for specific libraries...

REM Check for each popular scrollbar library
echo   • Checking for simplebar-react...
findstr /s /n /i "simplebar-react" src\*.js src\*.jsx src\*.ts src\*.tsx 2>nul
if errorlevel 1 (echo     Not found) else (echo     Found above)

echo   • Checking for react-custom-scrollbars...
findstr /s /n /i "react-custom-scrollbars" src\*.js src\*.jsx src\*.ts src\*.tsx 2>nul
if errorlevel 1 (echo     Not found) else (echo     Found above)

echo   • Checking for overlayscrollbars...
findstr /s /n /i "overlayscrollbars" src\*.js src\*.jsx src\*.ts src\*.tsx 2>nul
if errorlevel 1 (echo     Not found) else (echo     Found above)

echo   • Checking for perfect-scrollbar...
findstr /s /n /i "perfect-scrollbar" src\*.js src\*.jsx src\*.ts src\*.tsx 2>nul
if errorlevel 1 (echo     Not found) else (echo     Found above)

REM ################################################################################
REM 4. Search for custom scrollbar components
REM ################################################################################
echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo 4. SEARCHING FOR CUSTOM SCROLLBAR COMPONENTS
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.

echo Finding files with 'scrollbar' or 'ScrollContainer' in filename...
dir /s /b src\*scrollbar*.* src\*scroll*container*.* 2>nul
if errorlevel 1 (
    echo ✓ No custom scrollbar component files found
) else (
    echo Found custom scrollbar files above
)

echo.
echo Searching for Scroll-related component definitions...
findstr /s /n /i "class.*Scroll function.*Scroll const.*Scroll" src\*.js src\*.jsx src\*.ts src\*.tsx 2>nul | findstr /i "scrollbar scrollcontainer scrollable"
if errorlevel 1 (
    echo ✓ No scroll-related component definitions found
) else (
    echo Found scroll component definitions above
)

REM ################################################################################
REM 5. Check for Module Federation configuration
REM ################################################################################
echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo 5. CHECKING FOR MODULE FEDERATION CONFIGURATION
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.

echo Looking for webpack/federation config files...
dir /s /b webpack.config.js webpack.*.js module-federation.config.js rsbuild.config.js 2>nul
if errorlevel 1 (
    echo ✓ No webpack/federation config files found (not an MFE^)
) else (
    echo Found config files above
    echo.
    echo Checking for shared scrollbar dependencies...
    findstr /s /n /i "shared.*scrollbar shared.*simplebar" webpack*.js module-federation*.js rsbuild*.js 2>nul
    if errorlevel 1 (
        echo ✓ No scrollbar dependencies currently shared
    ) else (
        echo Found shared scrollbar dependencies above
    )
)

REM ################################################################################
REM Summary
REM ################################################################################
echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo SUMMARY
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.

echo Repository: %REPO_NAME%
echo.
echo Discovery complete. Review findings above.
echo.
echo If scrollbar implementations were found, you should:
echo   1. Review all findings carefully
echo   2. Generate a migration plan using:
echo      @workspace Use the .copilot/skills/discover-scrollbars.md skill
echo   3. See MULTI_REPO_QUICK_START.md for migration guide
echo.
echo ==========================================
echo DISCOVERY COMPLETE
echo ==========================================

endlocal
