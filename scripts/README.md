# Discovery Scripts

This directory contains automated scripts for discovering scrollbar implementations across repositories.

## Available Scripts

### 🐧 discover-scrollbars.sh (Linux/macOS/Git Bash)

Bash script for Unix-based systems and Windows Git Bash.

**Usage:**
```bash
# Make executable (first time only)
chmod +x discover-scrollbars.sh

# Run in current directory
./discover-scrollbars.sh

# Save output to file
./discover-scrollbars.sh > SCROLLBAR_FINDINGS.txt

# Copy to other repos
cp discover-scrollbars.sh /path/to/other/repo/
```

### 🪟 discover-scrollbars.bat (Windows)

Batch file for Windows Command Prompt and PowerShell.

**Usage:**
```cmd
REM Run in current directory
discover-scrollbars.bat

REM Save output to file
discover-scrollbars.bat > SCROLLBAR_FINDINGS.txt

REM Copy to other repos
copy discover-scrollbars.bat C:\path\to\other\repo\
```

**PowerShell:**
```powershell
# Run script
.\scripts\discover-scrollbars.bat

# Save output
.\scripts\discover-scrollbars.bat | Out-File SCROLLBAR_FINDINGS.txt

# Copy to other repos
Copy-Item .\scripts\discover-scrollbars.bat -Destination C:\path\to\other\repo\
```

## What These Scripts Do

Both scripts perform the same discovery tasks:

1. ✅ Check `package.json` for scrollbar dependencies
2. ✅ Search for CSS scrollbar styling (`::-webkit-scrollbar`, `scrollbar-width`, etc.)
3. ✅ Find scrollbar library imports (simplebar, react-custom-scrollbars, etc.)
4. ✅ Identify custom scrollbar components
5. ✅ Check Module Federation configuration
6. ✅ Provide summary of findings

## Output Format

The scripts output:
- Color-coded results (on supported terminals)
- File paths and line numbers for each finding
- Categorized findings by type
- Summary count of total implementations
- Next steps guidance

**Example Output:**
```
==========================================
SCROLLBAR IMPLEMENTATION DISCOVERY
Repository: my-app
Date: 2026-08-31 10:30:45
==========================================

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. CHECKING PACKAGE.JSON FOR SCROLLBAR LIBRARIES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Found scrollbar dependencies:
    "react-custom-scrollbars": "^4.2.1",

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2. SEARCHING FOR CSS SCROLLBAR STYLING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Found 3 instances of ::-webkit-scrollbar:
src/components/DataTable/DataTable.css:45:  ::-webkit-scrollbar {
src/pages/Dashboard/styles.css:120:  .container::-webkit-scrollbar {
src/layouts/Sidebar/Sidebar.css:23:  ::-webkit-scrollbar-thumb {

...
```

## Using Across Multiple Repos

### Method 1: Copy Script to Each Repo

```bash
# Create a list of your repos
repos=(
  "/path/to/repo1"
  "/path/to/repo2"
  "/path/to/repo3"
)

# Copy script to all repos
for repo in "${repos[@]}"; do
  cp discover-scrollbars.sh "$repo/scripts/"
  echo "Copied to $repo"
done
```

### Method 2: Run from External Location

```bash
# Save script in a common location
cp discover-scrollbars.sh ~/bin/discover-scrollbars

# Make it executable
chmod +x ~/bin/discover-scrollbars

# Add to PATH (add to ~/.bashrc or ~/.zshrc)
export PATH="$HOME/bin:$PATH"

# Now run from any repository
cd /path/to/any/repo
discover-scrollbars > SCROLLBAR_FINDINGS.txt
```

### Method 3: Batch Discovery for All Repos

**Create a master discovery script:**

**File: `batch-discover-all-repos.sh`**
```bash
#!/bin/bash

# List of repositories to scan
repos=(
  "/path/to/ui-components"
  "/path/to/patient-portal-mfe"
  "/path/to/admin-dashboard-mfe"
  "/path/to/billing-app"
)

output_dir="./discovery-results"
mkdir -p "$output_dir"

echo "Starting batch discovery for ${#repos[@]} repositories..."
echo ""

for repo in "${repos[@]}"; do
  if [ -d "$repo" ]; then
    repo_name=$(basename "$repo")
    output_file="$output_dir/FINDINGS_${repo_name}.txt"
    
    echo "Scanning: $repo_name..."
    cd "$repo"
    ./scripts/discover-scrollbars.sh > "$output_file" 2>&1
    
    echo "  ✓ Results saved to: $output_file"
  else
    echo "  ✗ Repository not found: $repo"
  fi
done

echo ""
echo "Batch discovery complete!"
echo "Results saved in: $output_dir"
```

**Usage:**
```bash
chmod +x batch-discover-all-repos.sh
./batch-discover-all-repos.sh
```

This creates:
```
discovery-results/
├── FINDINGS_ui-components.txt
├── FINDINGS_patient-portal-mfe.txt
├── FINDINGS_admin-dashboard-mfe.txt
└── FINDINGS_billing-app.txt
```

## Troubleshooting

### Script doesn't execute (Linux/macOS)

**Issue**: Permission denied
```bash
bash: ./discover-scrollbars.sh: Permission denied
```

**Solution**:
```bash
chmod +x discover-scrollbars.sh
```

### Script doesn't find anything

**Issue**: No results even though scrollbars exist

**Solution**: Check that you're in the repository root directory with a `src/` folder
```bash
# Verify you're in the right place
ls -la
# Should see: package.json, src/, etc.
```

### Colors not showing (Windows)

**Issue**: Color codes appear as text like `\033[0;32m`

**Solution**: Use Windows Terminal or Git Bash instead of Command Prompt, or redirect output to file:
```cmd
discover-scrollbars.bat > findings.txt
type findings.txt
```

### Script takes too long

**Issue**: Script runs for several minutes

**Solution**: The script searches recursively. If you have `node_modules/` or large build directories, consider:
```bash
# Temporarily exclude directories
# Edit the script to add: --exclude-dir=node_modules
grep -r "::-webkit-scrollbar" src/ --exclude-dir=node_modules ...
```

## Integration with CI/CD

You can integrate these scripts into your CI pipeline to detect new scrollbar implementations:

**Example GitHub Actions workflow:**

```yaml
name: Check for Scrollbar Usage

on: [pull_request]

jobs:
  check-scrollbars:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Run Scrollbar Discovery
        run: |
          chmod +x ./scripts/discover-scrollbars.sh
          ./scripts/discover-scrollbars.sh > findings.txt
          
      - name: Check for New Scrollbars
        run: |
          if grep -q "TOTAL IMPLEMENTATIONS: [1-9]" findings.txt; then
            echo "⚠️ Warning: New scrollbar implementations detected"
            cat findings.txt
            echo "Please use ScrollableContainer from @yourorg/ui-components"
            exit 1
          fi
          
      - name: Upload Findings
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: scrollbar-findings
          path: findings.txt
```

## Next Steps After Running Discovery

1. **Review the output** carefully
2. **Use the Copilot skill** to generate a full migration plan:
   ```
   @workspace Use the .copilot/skills/discover-scrollbars.md skill
   ```
3. **Follow the migration guide** in [MULTI_REPO_QUICK_START.md](../MULTI_REPO_QUICK_START.md)
4. **Track progress** using the template in [QUICK_REFERENCE.md](../QUICK_REFERENCE.md)

## Related Documentation

- **[.copilot/skills/discover-scrollbars.md](../.copilot/skills/discover-scrollbars.md)**: Automated discovery skill
- **[QUICK_REFERENCE.md](../QUICK_REFERENCE.md)**: One-page cheat sheet
- **[MULTI_REPO_QUICK_START.md](../MULTI_REPO_QUICK_START.md)**: Migration guide
- **[SIMPLEBAR_IMPLEMENTATION_GUIDE.md](../SIMPLEBAR_IMPLEMENTATION_GUIDE.md)**: Complete reference
