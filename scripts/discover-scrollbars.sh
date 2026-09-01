#!/bin/bash

################################################################################
# Scrollbar Implementation Discovery Script
#
# Purpose: Automatically discover all scrollbar implementations in a repository
# Usage: ./discover-scrollbars.sh [output-file]
#
# If no output file is specified, results are printed to stdout
#
# Example: ./discover-scrollbars.sh > SCROLLBAR_FINDINGS.txt
################################################################################

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Get repository name
REPO_NAME=$(basename "$(pwd)")
OUTPUT_FILE="$1"

# Header
echo "=========================================="
echo "SCROLLBAR IMPLEMENTATION DISCOVERY"
echo "Repository: $REPO_NAME"
echo "Date: $(date '+%Y-%m-%d %H:%M:%S')"
echo "=========================================="
echo ""

# Function to print section header
print_section() {
    echo ""
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${GREEN}$1${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
}

# Function to count results
count_results() {
    echo "$1" | grep -v "^$" | wc -l | tr -d ' '
}

################################################################################
# 1. Check package.json for scrollbar dependencies
################################################################################
print_section "1. CHECKING PACKAGE.JSON FOR SCROLLBAR LIBRARIES"

if [ -f package.json ]; then
    DEPS=$(cat package.json | grep -E "scrollbar|simplebar|overlay" 2>/dev/null)
    
    if [ -z "$DEPS" ]; then
        echo "✓ No scrollbar libraries found in package.json"
    else
        echo -e "${YELLOW}Found scrollbar dependencies:${NC}"
        echo "$DEPS"
    fi
else
    echo -e "${RED}⚠ package.json not found${NC}"
fi

################################################################################
# 2. Search for CSS scrollbar styling
################################################################################
print_section "2. SEARCHING FOR CSS SCROLLBAR STYLING"

# Webkit scrollbar
echo "Searching for ::-webkit-scrollbar..."
WEBKIT_RESULTS=$(grep -r "::-webkit-scrollbar" src/ --include="*.css" --include="*.scss" --include="*.less" -n 2>/dev/null)
WEBKIT_COUNT=$(count_results "$WEBKIT_RESULTS")

if [ "$WEBKIT_COUNT" -gt 0 ]; then
    echo -e "${YELLOW}Found $WEBKIT_COUNT instances of ::-webkit-scrollbar:${NC}"
    echo "$WEBKIT_RESULTS"
else
    echo "✓ No ::-webkit-scrollbar found"
fi

echo ""

# Firefox scrollbar properties
echo "Searching for scrollbar-width and scrollbar-color..."
FIREFOX_RESULTS=$(grep -r "scrollbar-width\|scrollbar-color" src/ --include="*.css" --include="*.scss" --include="*.less" -n 2>/dev/null)
FIREFOX_COUNT=$(count_results "$FIREFOX_RESULTS")

if [ "$FIREFOX_COUNT" -gt 0 ]; then
    echo -e "${YELLOW}Found $FIREFOX_COUNT instances of Firefox scrollbar properties:${NC}"
    echo "$FIREFOX_RESULTS"
else
    echo "✓ No Firefox scrollbar properties found"
fi

echo ""

# Overflow properties
echo "Searching for overflow: scroll/auto patterns..."
OVERFLOW_RESULTS=$(grep -r "overflow:\s*\(scroll\|auto\)" src/ --include="*.css" --include="*.scss" --include="*.less" -l 2>/dev/null)
OVERFLOW_COUNT=$(count_results "$OVERFLOW_RESULTS")

if [ "$OVERFLOW_COUNT" -gt 0 ]; then
    echo -e "${YELLOW}Found overflow scroll/auto in $OVERFLOW_COUNT files:${NC}"
    echo "$OVERFLOW_RESULTS"
else
    echo "✓ No overflow scroll/auto found"
fi

################################################################################
# 3. Search for scrollbar library imports
################################################################################
print_section "3. SEARCHING FOR SCROLLBAR LIBRARY IMPORTS"

echo "Searching for scrollbar-related imports in JS/TS files..."
IMPORT_RESULTS=$(grep -r "from\s*['\"].*scrollbar\|import\s*.*Scrollbar" src/ --include="*.js" --include="*.jsx" --include="*.ts" --include="*.tsx" -n 2>/dev/null)
IMPORT_COUNT=$(count_results "$IMPORT_RESULTS")

if [ "$IMPORT_COUNT" -gt 0 ]; then
    echo -e "${YELLOW}Found $IMPORT_COUNT scrollbar imports:${NC}"
    echo "$IMPORT_RESULTS"
else
    echo "✓ No scrollbar library imports found"
fi

echo ""

# Search for specific popular libraries
echo "Checking for specific scrollbar libraries..."

declare -a LIBRARIES=("simplebar-react" "react-custom-scrollbars" "react-custom-scrollbars-2" "overlayscrollbars" "overlayscrollbars-react" "perfect-scrollbar" "react-scrollbars-custom" "rc-scrollbars")

for lib in "${LIBRARIES[@]}"; do
    LIB_RESULTS=$(grep -r "$lib" src/ --include="*.js" --include="*.jsx" --include="*.ts" --include="*.tsx" -n 2>/dev/null)
    LIB_COUNT=$(count_results "$LIB_RESULTS")
    
    if [ "$LIB_COUNT" -gt 0 ]; then
        echo -e "${YELLOW}  • $lib: $LIB_COUNT instances${NC}"
        echo "$LIB_RESULTS" | head -5
        if [ "$LIB_COUNT" -gt 5 ]; then
            echo "    ... and $((LIB_COUNT - 5)) more"
        fi
        echo ""
    fi
done

################################################################################
# 4. Search for custom scrollbar components
################################################################################
print_section "4. SEARCHING FOR CUSTOM SCROLLBAR COMPONENTS"

echo "Finding files with 'scrollbar' in filename..."
COMPONENT_FILES=$(find src/ -type f \( -iname "*scrollbar*" -o -iname "*scroll*container*" \) 2>/dev/null)
COMPONENT_COUNT=$(count_results "$COMPONENT_FILES")

if [ "$COMPONENT_COUNT" -gt 0 ]; then
    echo -e "${YELLOW}Found $COMPONENT_COUNT custom scrollbar component files:${NC}"
    echo "$COMPONENT_FILES"
else
    echo "✓ No custom scrollbar component files found"
fi

echo ""

echo "Searching for Scroll-related component definitions..."
COMPONENT_DEFS=$(grep -r "class.*Scroll\|function.*Scroll\|const.*Scroll.*=" src/ --include="*.js" --include="*.jsx" --include="*.ts" --include="*.tsx" 2>/dev/null | grep -i "scrollbar\|scrollcontainer\|scrollable" | head -10)
COMPONENT_DEFS_COUNT=$(count_results "$COMPONENT_DEFS")

if [ "$COMPONENT_DEFS_COUNT" -gt 0 ]; then
    echo -e "${YELLOW}Found scroll-related component definitions (showing first 10):${NC}"
    echo "$COMPONENT_DEFS"
else
    echo "✓ No scroll-related component definitions found"
fi

################################################################################
# 5. Check for Module Federation configuration
################################################################################
print_section "5. CHECKING FOR MODULE FEDERATION CONFIGURATION"

echo "Looking for webpack/federation config files..."
WEBPACK_CONFIGS=$(find . -maxdepth 3 -type f \( -name "webpack.config.js" -o -name "webpack.*.js" -o -name "module-federation.config.js" -o -name "rsbuild.config.js" \) 2>/dev/null)
WEBPACK_COUNT=$(count_results "$WEBPACK_CONFIGS")

if [ "$WEBPACK_COUNT" -gt 0 ]; then
    echo -e "${YELLOW}Found $WEBPACK_COUNT config files:${NC}"
    echo "$WEBPACK_CONFIGS"
    
    echo ""
    echo "Checking for shared scrollbar dependencies..."
    SHARED_DEPS=$(grep -r "shared.*\(simplebar\|scrollbar\)" $WEBPACK_CONFIGS 2>/dev/null -A 5 -B 5)
    
    if [ -z "$SHARED_DEPS" ]; then
        echo "✓ No scrollbar dependencies currently shared"
    else
        echo -e "${YELLOW}Found shared scrollbar dependencies:${NC}"
        echo "$SHARED_DEPS"
    fi
else
    echo "✓ No webpack/federation config files found (not an MFE)"
fi

################################################################################
# Summary
################################################################################
print_section "SUMMARY"

TOTAL_CSS=$((WEBKIT_COUNT + FIREFOX_COUNT))
TOTAL_FINDINGS=$((TOTAL_CSS + IMPORT_COUNT + COMPONENT_COUNT))

echo "Repository Type: $REPO_NAME"
echo ""
echo "Findings:"
echo "  • CSS Scrollbars (webkit + firefox): $TOTAL_CSS"
echo "  • Library Imports: $IMPORT_COUNT"
echo "  • Custom Components: $COMPONENT_COUNT"
echo "  • Module Federation Configs: $WEBPACK_COUNT"
echo "  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  • TOTAL IMPLEMENTATIONS: $TOTAL_FINDINGS"
echo ""

if [ "$TOTAL_FINDINGS" -eq 0 ]; then
    echo -e "${GREEN}✓ No scrollbar implementations found. This repository is clean!${NC}"
else
    echo -e "${YELLOW}⚠ Found $TOTAL_FINDINGS scrollbar implementations that may need migration.${NC}"
fi

echo ""
echo "=========================================="
echo "DISCOVERY COMPLETE"
echo "=========================================="
echo ""
echo "Next Steps:"
echo "  1. Review findings above"
echo "  2. Generate migration plan:"
echo "     @workspace Use the .copilot/skills/discover-scrollbars.md skill"
echo "  3. See MULTI_REPO_QUICK_START.md for migration guide"
echo ""

if [ -n "$OUTPUT_FILE" ]; then
    echo -e "${GREEN}Results saved to: $OUTPUT_FILE${NC}"
fi
