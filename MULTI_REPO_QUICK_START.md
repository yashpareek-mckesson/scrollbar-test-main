# Multi-Repo ScrollableContainer Migration - Quick Start Guide

This guide provides a streamlined workflow for migrating scrollbar implementations across multiple repositories and micro-frontends (MFEs) to a shared library component.

---

## 📋 Overview

**Goal:** Create a reusable `ScrollableContainer` component in a shared library and replace all existing scrollbar implementations across multiple repos/MFEs.

**Architecture:**
```
Shared Library (@yourorg/ui-components)
    ↓ exports ScrollableContainer
    ↓
┌───────────┬───────────┬───────────┬───────────┐
│   MFE 1   │   MFE 2   │   MFE 3   │   App 1   │
│ (Patient) │  (Admin)  │ (Billing) │ (Marketing)│
└───────────┴───────────┴───────────┴───────────┘
```

---

## 🚀 Execution Workflow

### Step 1: Identify Your Repositories

List all repositories that need migration:

- [ ] **Library Repo**: `@yourorg/ui-components` (or similar)
- [ ] **Consumer Repo 1**: _____________________
- [ ] **Consumer Repo 2**: _____________________
- [ ] **Consumer Repo 3**: _____________________
- [ ] **Consumer Repo 4**: _____________________

---

### Step 2: Run Discovery in Each Repo

**For EACH repository listed above, run this discovery process:**

#### 2.1 Navigate to Repository

```bash
cd /path/to/repository
```

#### 2.2 Run the Discovery Script

**Option A: Using the provided bash script**

```bash
# Copy the discovery script from SIMPLEBAR_IMPLEMENTATION_GUIDE.md section "Automated Discovery & Migration Prompt"
# Or create it manually:

cat > discover-scrollbars.sh << 'EOF'
#!/bin/bash
echo "=========================================="
echo "SCROLLBAR IMPLEMENTATION DISCOVERY"
echo "Repository: $(basename $(pwd))"
echo "=========================================="

echo ""
echo "1. Checking package.json for scrollbar libraries..."
if [ -f package.json ]; then
  echo "Dependencies:"
  cat package.json | grep -E "scrollbar|simplebar|overlay" || echo "  None found"
fi

echo ""
echo "2. Searching for CSS scrollbar styling..."
echo "  ::-webkit-scrollbar usage:"
grep -r "::-webkit-scrollbar" src/ --include="*.css" --include="*.scss" -l 2>/dev/null | wc -l
grep -r "::-webkit-scrollbar" src/ --include="*.css" --include="*.scss" -l 2>/dev/null

echo ""
echo "3. Searching for scrollbar library imports..."
grep -r "from.*scrollbar\|import.*Scrollbar" src/ --include="*.js" --include="*.jsx" --include="*.ts" --include="*.tsx" -n 2>/dev/null

echo ""
echo "4. Searching for custom scrollbar components..."
find src/ -iname "*scrollbar*" -o -iname "*scroll*container*" 2>/dev/null

echo ""
echo "5. Checking for module federation config..."
find . -maxdepth 3 -name "webpack*.js" -o -name "*federation*.js" 2>/dev/null

echo ""
echo "=========================================="
echo "Discovery complete. Review findings above."
echo "=========================================="
EOF

chmod +x discover-scrollbars.sh
./discover-scrollbars.sh > SCROLLBAR_FINDINGS.txt
```

**Option B: Manual search commands**

```bash
# 1. Check package.json
cat package.json | grep -E "scrollbar|simplebar|overlay"

# 2. Find CSS scrollbar styling
grep -r "::-webkit-scrollbar" src/ --include="*.css" --include="*.scss" -n

# 3. Find scrollbar imports
grep -r "from.*scrollbar\|import.*Scrollbar" src/ --include="*.js" --include="*.jsx" --include="*.ts" --include="*.tsx" -n

# 4. Find custom scrollbar components
find src/ -iname "*scrollbar*" -o -iname "*scroll*container*"

# 5. Find module federation configs
find . -maxdepth 3 -name "webpack*.js" -o -name "*federation*.js"
```

**Option C: Use the Discovery Skill (Recommended) 🤖**

Invoke the automated discovery skill:

```
@workspace Use the .copilot/skills/discover-scrollbars.md skill to:
1. Find all scrollbar implementations in this repository
2. Identify if this is the library or a consumer repo
3. Generate a detailed migration plan with code examples
4. Provide risk assessment and timeline

Repository: [REPO_NAME]
```

This skill automates all discovery steps and generates a complete migration plan.

#### 2.3 Document Findings

Create `SCROLLBAR_FINDINGS_[REPO_NAME].md` with:

```markdown
# Scrollbar Findings - [REPO_NAME]

## Repository Type
- [ ] Shared Library (@yourorg/ui-components)
- [ ] Consumer Application/MFE

## Implementations Found

### Native CSS Scrollbars
- File: ___________________________ (Line: ___)
- File: ___________________________ (Line: ___)

### Library-Based (react-custom-scrollbars, etc.)
- File: ___________________________ (Line: ___)
- File: ___________________________ (Line: ___)

### Custom Components
- File: ___________________________
- File: ___________________________

### Dependencies to Remove
- Package: ________________________ (version: _____)

## Estimated Effort
- Number of files to modify: _____
- Estimated hours: _____
- Risk level: Low / Medium / High

## Priority
- [ ] Critical (customer-facing, high-traffic)
- [ ] Important (internal tools, medium-traffic)
- [ ] Low (admin panels, low-traffic)
```

---

### Step 3: Execute Migration by Repository Type

Based on findings, follow the appropriate path:

---

## 🏗️ PATH A: Shared Library Repository

**If this is `@yourorg/ui-components` or your shared component library:**

### A1. Create ScrollableContainer Component

Follow the complete guide in **[SIMPLEBAR_IMPLEMENTATION_GUIDE.md](./SIMPLEBAR_IMPLEMENTATION_GUIDE.md)** section "Shared Library Component for Multi-Repo/MFE"

Quick checklist:
- [ ] Create `src/styles/scrollbar-tokens.css`
- [ ] Create `src/components/ScrollableContainer/ScrollableContainer.jsx`
- [ ] Create `src/components/ScrollableContainer/ScrollableContainer.css`
- [ ] Create `src/components/ScrollableContainer/ScrollableContainer.test.jsx`
- [ ] Create Storybook stories (optional)
- [ ] Export from `src/index.js`
- [ ] Add `simplebar-react` to package.json dependencies
- [ ] Update library version (e.g., 2.0.0 → 2.1.0)

### A2. Build and Publish

```bash
# Build the library
npm run build

# Test locally first
npm link

# Publish to registry
npm publish --registry=https://your-registry.com

# Or for public NPM
npm publish --access public
```

### A3. Announce to Teams

Use the communication template from **SIMPLEBAR_IMPLEMENTATION_GUIDE.md** section "Step 6: Migration Communication"

Send announcement to:
- Development team Slack/Teams channel
- Architecture review channel
- Product/Design team
- Documentation site

---

## 📦 PATH B: Consumer Repository/MFE

**If this is a consumer application or micro-frontend:**

### B1. Install Shared Library

```bash
npm install @yourorg/ui-components@^2.1.0

# Or if testing locally
npm link @yourorg/ui-components
```

### B2. Update Module Federation Config (MFE Only)

If this is a micro-frontend, ensure `simplebar-react` is shared:

**File: `webpack.config.js` or `module-federation.config.js`**

```js
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: 'yourMfeName',
      remotes: {
        uiComponents: 'uiComponents@http://localhost:3001/remoteEntry.js',
      },
      shared: {
        react: { singleton: true, requiredVersion: '^18.0.0' },
        'react-dom': { singleton: true, requiredVersion: '^18.0.0' },
        'simplebar-react': { singleton: true, requiredVersion: '^3.3.2' }, // ADD THIS
      },
    }),
  ],
};
```

### B3. Replace Scrollbar Implementations

For each file found in Step 2, replace according to the implementation type:

#### **Type 1: Native CSS → ScrollableContainer**

**Before:**
```jsx
// Component.jsx
<div className="scrollable-content">
  {content}
</div>
```

```css
/* Component.css */
.scrollable-content {
  overflow: auto;
  height: 400px;
}
.scrollable-content::-webkit-scrollbar {
  width: 12px;
}
```

**After:**
```jsx
// Component.jsx
import { ScrollableContainer } from '@yourorg/ui-components';

<ScrollableContainer maxHeight="400px">
  {content}
</ScrollableContainer>
```

```css
/* Component.css - DELETE scrollbar CSS */
/* Removed: .scrollable-content styles */
```

---

#### **Type 2: react-custom-scrollbars → ScrollableContainer**

**Before:**
```jsx
import { Scrollbars } from 'react-custom-scrollbars';

<Scrollbars style={{ height: 400 }}>
  {content}
</Scrollbars>
```

**After:**
```jsx
import { ScrollableContainer } from '@yourorg/ui-components';

<ScrollableContainer maxHeight="400px">
  {content}
</ScrollableContainer>
```

**With refs:**

```jsx
// Before
const scrollbarRef = useRef(null);
const scrollToTop = () => scrollbarRef.current.scrollToTop();

<Scrollbars ref={scrollbarRef}>{content}</Scrollbars>
```

```jsx
// After
const scrollbarRef = useRef(null);
const scrollToTop = () => {
  const scrollElement = scrollbarRef.current.getScrollElement();
  scrollElement.scrollTop = 0;
};

<ScrollableContainer ref={scrollbarRef} maxHeight="400px">
  {content}
</ScrollableContainer>
```

---

#### **Type 3: OverlayScrollbars → ScrollableContainer**

**Before:**
```jsx
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';

<OverlayScrollbarsComponent 
  options={{ scrollbars: { autoHide: 'leave' } }}
  style={{ maxHeight: 400 }}
>
  {content}
</OverlayScrollbarsComponent>
```

**After:**
```jsx
import { ScrollableContainer } from '@yourorg/ui-components';

<ScrollableContainer maxHeight="400px" autoHide={true}>
  {content}
</ScrollableContainer>
```

---

#### **Type 4: Custom Component → ScrollableContainer**

**Before:**
```jsx
import CustomScrollbar from '../../components/CustomScrollbar';

<CustomScrollbar height="400px">
  {content}
</CustomScrollbar>
```

**After:**
```jsx
import { ScrollableContainer } from '@yourorg/ui-components';

<ScrollableContainer maxHeight="400px">
  {content}
</ScrollableContainer>
```

---

### B4. Test After Each Change

```bash
# Start dev server
npm start

# Run tests
npm test

# Test in browsers
# - Chrome (Windows & macOS)
# - Firefox
# - Safari
# - Mobile (iOS Safari, Android Chrome)
```

**Manual Testing Checklist:**
- [ ] Mouse wheel scrolling works
- [ ] Click-and-drag thumb works
- [ ] Keyboard navigation (Arrow keys, Page Up/Down)
- [ ] Visual appearance matches design system
- [ ] No console errors
- [ ] Performance acceptable (no lag)

### B5. Cleanup Old Dependencies

After ALL components are migrated:

```bash
# Remove old scrollbar libraries
npm uninstall react-custom-scrollbars react-custom-scrollbars-2 overlayscrollbars overlayscrollbars-react perfect-scrollbar

# Delete custom scrollbar components
rm -rf src/components/CustomScrollbar

# Remove scrollbar CSS from all affected files
# (Already done in Step B3)
```

### B6. Commit and Deploy

```bash
git add .
git commit -m "feat: migrate scrollbars to shared ScrollableContainer component

- Replace [X] native CSS scrollbars
- Replace [Y] library-based scrollbars  
- Replace [Z] custom scrollbar implementations
- Remove old scrollbar dependencies
- All tests passing
- Tested in Chrome, Firefox, Safari"

git push origin feature/migrate-to-shared-scrollbar
```

Create PR using template from **SIMPLEBAR_IMPLEMENTATION_GUIDE.md** section "Phase 6: Code Review & Deployment"

---

## 📊 Track Progress Across All Repos

Use this table to track migration status:

| Repository | Type | Implementations Found | Status | Owner | ETA |
|------------|------|----------------------|--------|-------|-----|
| @yourorg/ui-components | Library | N/A | ⏳ In Progress | [Name] | [Date] |
| patient-portal-mfe | Consumer | 8 Native CSS, 3 react-custom-scrollbars | 🔴 Not Started | [Name] | [Date] |
| admin-dashboard-mfe | Consumer | 5 Native CSS, 1 Custom | 🔴 Not Started | [Name] | [Date] |
| billing-app | Consumer | 12 Native CSS | 🔴 Not Started | [Name] | [Date] |
| marketing-site | Consumer | 2 Native CSS | 🔴 Not Started | [Name] | [Date] |

**Status Legend:**
- 🔴 Not Started
- ⏳ In Progress
- ✅ Complete
- 🚀 Deployed to Production

---

## ⏱️ Estimated Timeline

**Per Repository:**
- Library repo: 8-16 hours (one-time setup)
- Consumer repos: 4-16 hours each (depends on # of implementations)

**Example for 5 Repos:**
- Week 1: Library setup + publish + announce
- Week 2: Migrate Repo 1 (lowest risk)
- Week 3: Migrate Repo 2 + Repo 3
- Week 4: Migrate Repo 4 + Repo 5 (highest risk)
- **Total:** 4 weeks

---

## 🆘 Troubleshooting

### Issue: "Cannot find module '@yourorg/ui-components'"

**Solution:**
```bash
# Verify installation
npm list @yourorg/ui-components

# Reinstall if needed
npm install @yourorg/ui-components@latest

# Check registry authentication
npm login --registry=https://your-registry.com
```

### Issue: "simplebar-react not found" in consumer app

**Solution:**
The shared library should include `simplebar-react` as a dependency, but if using Module Federation:

```bash
# Install as peer dependency in consumer
npm install simplebar-react@^3.3.2

# Ensure it's in shared config (see Step B2)
```

### Issue: Scrollbars don't appear

**Solution:**
1. Ensure maxHeight or maxWidth is set
2. Check that content is actually overflowing
3. Verify CSS imports are loading
4. Check browser console for errors

### Issue: Different appearance across repos

**Solution:**
1. Verify all repos use same library version
2. Check if custom CSS is overriding library styles
3. Ensure design tokens are imported
4. Compare browser DevTools computed styles

---

## 📚 Additional Resources

- **[SIMPLEBAR_IMPLEMENTATION_GUIDE.md](./SIMPLEBAR_IMPLEMENTATION_GUIDE.md)** - Complete implementation guide
  - Section 10: Shared Library Component for Multi-Repo/MFE
  - Section 11: Automated Discovery & Migration Prompt
  - Section 12: Safe Multi-Repo Migration Strategy
  
- **[IMPLEMENTATION_EXAMPLES.md](./IMPLEMENTATION_EXAMPLES.md)** - Code examples for all approaches

---

## ✅ Final Checklist

Before marking migration as complete:

- [ ] Library component created and published
- [ ] All consumer repos updated
- [ ] Old dependencies removed from all repos
- [ ] All tests passing
- [ ] Design system compliance verified
- [ ] Documentation updated
- [ ] Team trained on new component
- [ ] Monitoring in place for production
- [ ] Success metrics defined and tracked

---

## 🎯 Success Criteria

**Technical:**
- ✅ Zero production incidents
- ✅ Bundle size increase < 50KB per app
- ✅ Page load time impact < 100ms
- ✅ 100% browser compatibility maintained

**User Experience:**
- ✅ Consistent scrollbar appearance across all apps
- ✅ No increase in user complaints
- ✅ Accessibility standards maintained

**Team:**
- ✅ Reduced maintenance overhead
- ✅ Single source of truth for scrollbars
- ✅ Faster future updates
- ✅ Better design system compliance

---

**Need Help?** Refer to the full guide: [SIMPLEBAR_IMPLEMENTATION_GUIDE.md](./SIMPLEBAR_IMPLEMENTATION_GUIDE.md)
