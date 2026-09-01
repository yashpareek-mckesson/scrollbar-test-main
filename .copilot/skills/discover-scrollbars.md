---
description: Discover all scrollbar implementations in a repository and generate a migration plan to replace them with the shared ScrollableContainer component
keywords: scrollbar, migration, discovery, audit, simplebar
---

# Scrollbar Implementation Discovery & Migration Planning

This skill analyzes a repository to find all existing scrollbar implementations and generates a detailed migration plan for replacing them with the shared `ScrollableContainer` component from `@yourorg/ui-components`.

## What This Skill Does

1. Identifies the repository type (shared library vs consumer app/MFE)
2. Searches for all scrollbar implementations (CSS, libraries, custom components)
3. Documents findings with file paths and line numbers
4. Generates a prioritized migration plan with code examples
5. Provides risk assessment and timeline estimates
6. Creates testing checklists

## When to Use This Skill

- Starting a scrollbar migration project in a new repository
- Auditing existing scrollbar implementations
- Planning refactoring work for design system compliance
- Preparing multi-repo migration estimates
- Before creating migration tickets/stories

## Instructions

### Step 1: Identify Repository Context

First, determine:

- **Repository name**: What is this repo called?
- **Repository type**: Is this the shared component library or a consumer app/MFE?
- **Technology stack**: React version, build tools, state management
- **Module federation**: Is this using Webpack Module Federation?

### Step 2: Search for Scrollbar Implementations

Run comprehensive searches to find all scrollbar usage:

#### A. Native CSS Scrollbars

Search for:

- `::-webkit-scrollbar` pseudo-elements
- `scrollbar-width` property (Firefox)
- `scrollbar-color` property (Firefox)
- `overflow: scroll` or `overflow: auto` patterns

**Commands:**

```bash
# Find webkit scrollbar styling
grep -r "::-webkit-scrollbar" src/ --include="*.css" --include="*.scss" --include="*.less" -n

# Find Firefox scrollbar properties
grep -r "scrollbar-width\|scrollbar-color" src/ --include="*.css" --include="*.scss" -n

# Find overflow properties
grep -r "overflow:\s*\(scroll\|auto\)" src/ --include="*.css" --include="*.scss" -A 3 -B 3
```

#### B. Scrollbar Libraries

Search for these libraries in `package.json` and import statements:

- `simplebar-react` (SimpleBar - target library, but may need style updates)
- `react-custom-scrollbars` (popular but unmaintained)
- `react-custom-scrollbars-2` (fork of above)
- `overlayscrollbars` / `overlayscrollbars-react`
- `perfect-scrollbar`
- `react-scrollbars-custom`
- `rc-scrollbars` (Ant Design related)

**Commands:**

```bash
# Check package.json dependencies
cat package.json | grep -E "scrollbar|simplebar|overlay" --color=always

# Find all scrollbar-related imports
grep -r "from\s*['\"].*scrollbar" src/ --include="*.js" --include="*.jsx" --include="*.ts" --include="*.tsx" -n
grep -r "import\s*.*Scrollbar" src/ --include="*.js" --include="*.jsx" --include="*.ts" --include="*.tsx" -n
grep -r "require\(['\"].*scrollbar" src/ -n

# Search for specific libraries
grep -r "simplebar-react\|react-custom-scrollbars\|overlayscrollbars\|perfect-scrollbar" src/ --include="*.js" --include="*.jsx" --include="*.ts" --include="*.tsx" -n
```

#### C. Custom Scrollbar Components

Search for custom-built scrollbar components:

**Commands:**

```bash
# Find files with "scrollbar" in filename
find src/ -type f \( -iname "*scrollbar*" -o -iname "*scroll*container*" \)

# Find ScrollableContainer or similar component names
grep -r "class.*Scroll\|function.*Scroll\|const.*Scroll.*=" src/ --include="*.js" --include="*.jsx" --include="*.ts" --include="*.tsx" | grep -i "scrollbar\|scrollcontainer\|scrollable"

# Find exported scrollbar components
grep -r "export.*Scroll" src/ --include="*.js" --include="*.jsx" --include="*.ts" --include="*.tsx"

# Find components with "scrollable" prop or className
grep -r "scrollable\|isScrollable" src/ --include="*.js" --include="*.jsx" --include="*.ts" --include="*.tsx" -n
```

#### D. Module Federation Configuration

If this is an MFE, check for scrollbar-related shared dependencies:

**Commands:**

```bash
# Find webpack config files
find . -maxdepth 3 -name "webpack.config.js" -o -name "webpack.*.js" -o -name "module-federation.config.js" -o -name "rsbuild.config.js"

# Check for shared scrollbar dependencies
grep -r "shared.*\(simplebar\|scrollbar\)" webpack*.js module-federation*.js rsbuild*.js 2>/dev/null -A 5 -B 5
```

### Step 3: Document Findings

For each scrollbar implementation found, create an inventory entry with:

1. **Location**: Full file path and line numbers
2. **Type**: Native CSS / Library (specify which) / Custom Component
3. **Usage Count**: How many components/pages use it?
4. **Complexity**: Simple / Medium / Complex
5. **Critical Path**: Is it used in critical user flows? (login, checkout, etc.)
6. **Current State**: Working / Broken / Inconsistent appearance

### Step 4: Analyze Repository Type

#### If This is a Shared Library Repository:

Create a plan to:

- [ ] Add `ScrollableContainer` component to the library
- [ ] Create design tokens (`scrollbar-tokens.css`)
- [ ] Write component tests
- [ ] Create Storybook stories
- [ ] Configure build/bundle setup
- [ ] Publish new library version
- [ ] Announce to consuming teams

**Reference**: See SIMPLEBAR_IMPLEMENTATION_GUIDE.md Section 10 for complete implementation.

#### If This is a Consumer Repository/MFE:

Create a plan to:

- [ ] Install `@yourorg/ui-components@^2.x.x`
- [ ] Replace each scrollbar implementation
- [ ] Update Module Federation config (if MFE)
- [ ] Remove old scrollbar dependencies
- [ ] Test across browsers
- [ ] Deploy to staging/production

### Step 5: Generate Migration Plan

For each implementation found, provide:

#### Migration Pattern Examples

**Pattern 1: Native CSS → ScrollableContainer**

Before:

```jsx
<div className="scrollable-content">{content}</div>
```

```css
.scrollable-content {
  overflow: auto;
  height: 400px;
}
.scrollable-content::-webkit-scrollbar {
  width: 12px;
}
```

After:

```jsx
import { ScrollableContainer } from "@yourorg/ui-components";

<ScrollableContainer maxHeight="400px">{content}</ScrollableContainer>;
```

---

**Pattern 2: react-custom-scrollbars → ScrollableContainer**

Before:

```jsx
import { Scrollbars } from "react-custom-scrollbars";

<Scrollbars style={{ height: 400 }}>{content}</Scrollbars>;
```

After:

```jsx
import { ScrollableContainer } from "@yourorg/ui-components";

<ScrollableContainer maxHeight="400px">{content}</ScrollableContainer>;
```

---

**Pattern 3: With Refs (Programmatic Control)**

Before:

```jsx
const ref = useRef();
const scrollToTop = () => ref.current.scrollToTop();

<Scrollbars ref={ref}>{content}</Scrollbars>;
```

After:

```jsx
const ref = useRef();
const scrollToTop = () => {
  const scrollElement = ref.current.getScrollElement();
  scrollElement.scrollTop = 0;
};

<ScrollableContainer ref={ref} maxHeight="400px">
  {content}
</ScrollableContainer>;
```

### Step 6: Risk Assessment

Evaluate and document:

**Bundle Size Impact:**

- Current bundle size: **\_** MB
- Expected increase: ~20KB (SimpleBar)
- Acceptable: Yes / No

**Breaking Changes:**

- API compatibility: Full / Partial / Breaking
- Visual changes: None / Minor / Significant
- User impact: None / Low / Medium / High

**Critical Paths:**

- List any critical user flows affected (e.g., checkout, login, dashboards)
- Priority: High / Medium / Low

**Rollback Plan:**

- Time to rollback: < 10 minutes (git revert)
- Rollback triggers: Production errors, user complaints, accessibility regressions

### Step 7: Create Testing Checklist

Generate a comprehensive test plan:

#### Visual Testing

- [ ] Scrollbar appears with correct 8px width
- [ ] Responsive design (mobile vs desktop)
  - Desktop/Tablet (≥768px): 8px width, 3px offset
  - Mobile (<768px): 6px width, 2px offset from container edges
- [ ] Border-radius transitions (4px → 8px on hover)
- [ ] Color matches design system tokens
- [ ] Horizontal scrollbar doesn't clip vertical scrollbar
- [ ] 11px corner gap when both scrollbars present

#### Functional Testing

- [ ] Mouse wheel scrolling
- [ ] Click-and-drag thumb
- [ ] Click track to jump
- [ ] Keyboard navigation (Arrow keys, Page Up/Down, Home/End)
- [ ] Touch scrolling (mobile)
- [ ] Dynamic content updates
- [ ] Programmatic scrolling APIs

#### Browser Testing

- [ ] Chrome (Windows & macOS)
- [ ] Firefox (Windows & macOS)
- [ ] Safari (macOS)
- [ ] Edge (Windows)
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

#### Performance Testing

- [ ] No scroll lag with large datasets
- [ ] Memory usage acceptable
- [ ] No console errors
- [ ] Bundle size impact reviewed

#### Accessibility Testing

- [ ] Screen reader compatibility
- [ ] Keyboard-only navigation
- [ ] Focus indicators visible
- [ ] ARIA labels present

### Step 8: Estimate Timeline

Provide effort estimates:

**Per Component Migration:**

- Simple (Native CSS): 15-30 minutes
- Medium (Library replacement): 30-60 minutes
- Complex (Custom component with refs/events): 1-2 hours

**Total Repository Estimate:**

- Development: **\_** hours
- Testing: **\_** hours
- Code review: **\_** hours
- Deployment: **\_** hours
- **Total**: **\_** hours (**\_** days)

**Recommended Schedule:**

- Day 1: **\_** (Setup + easy migrations)
- Day 2: **\_** (Complex migrations)
- Day 3: **\_** (Testing + review)
- Day 4: **\_** (Staging deployment)
- Day 5: **\_** (Production deployment + monitoring)

## Expected Output Format

Generate a markdown file: `SCROLLBAR_MIGRATION_PLAN_[REPO_NAME].md`

### Output Structure:

````markdown
# Scrollbar Migration Plan - [Repository Name]

## Executive Summary

- **Repository**: [name]
- **Type**: Shared Library / Consumer App / MFE
- **Current Implementations Found**: [count] ([breakdown by type])
- **Estimated Effort**: [X] hours ([Y] days)
- **Risk Level**: Low / Medium / High
- **Priority**: Critical / Important / Low

## Repository Context

- **Tech Stack**: React [version], [build tool], [other frameworks]
- **Module Federation**: Yes / No
- **Current Scrollbar Libraries**: [list with versions]
- **Traffic Level**: High / Medium / Low
- **Critical Paths**: [list]

## Detailed Findings

### 1. Native CSS Scrollbars ([count] locations)

- `[file path]` (lines [X-Y])
  - Usage: [component/feature name]
  - Complexity: Simple / Medium / Complex
  - Critical: Yes / No

### 2. Library-Based Scrollbars ([count] locations)

- **Library**: [name and version]
- `[file path]` (lines [X-Y])
  - Usage: [component/feature name]
  - Has refs: Yes / No
  - Event handlers: [list]

### 3. Custom Components ([count] locations)

- `[file path]`
  - Used by: [X] components
  - Features: [list special features]
  - Migration complexity: High / Medium / Low

### 4. Module Federation Configuration

- Config file: [path]
- Current shared scrollbar deps: [list]
- Action required: Yes / No

## Migration Plan

### [If Library Repo] Library Implementation Tasks

1. [ ] Create `src/components/ScrollableContainer/`
2. [ ] Add design tokens
3. [ ] Write tests
4. [ ] Create Storybook stories
5. [ ] Build and publish v[X.Y.Z]
6. [ ] Announce to teams

### [If Consumer Repo] Migration Tasks

#### Phase 1: Setup (Est: [X] hours)

1. [ ] Install `@yourorg/ui-components@^2.x.x`
2. [ ] Update Module Federation config (if MFE)
3. [ ] Create feature branch
4. [ ] Test library in isolation

#### Phase 2: Replace Implementations (Est: [X] hours)

**File: [path/to/file1.jsx]**

- Type: [Native CSS / Library / Custom]
- Current: [code snippet]
- New: [code snippet]
- Testing: [specific test cases]

**File: [path/to/file2.jsx]**
[... repeat for each file ...]

#### Phase 3: Cleanup (Est: [X] hours)

1. [ ] Remove `[old-library-name]` dependency
2. [ ] Delete custom scrollbar components
3. [ ] Remove CSS scrollbar rules
4. [ ] Update imports

#### Phase 4: Testing (Est: [X] hours)

- [ ] Visual testing checklist
- [ ] Functional testing checklist
- [ ] Browser testing checklist
- [ ] Performance testing checklist
- [ ] Accessibility testing checklist

#### Phase 5: Deployment (Est: [X] hours)

1. [ ] Create PR with migration changes
2. [ ] Code review
3. [ ] QA testing in staging
4. [ ] Production deployment
5. [ ] Post-deployment monitoring

## Risk Assessment

### Bundle Size Impact

- **Before**: [X] MB
- **After**: [Y] MB (+[Z] KB)
- **Impact**: Negligible / Acceptable / Concerning

### Breaking Changes

- **API Compatibility**: [Full / Partial / None]
- **Visual Changes**: [None / Minor / Significant]
- **User Impact**: [None / Low / Medium / High]

### Critical Paths Affected

- [Path 1]: [Impact level]
- [Path 2]: [Impact level]

### Rollback Plan

```bash
git revert [commit-hash]
# Redeploy takes < 10 minutes
```
````

**Rollback Triggers:**

- Production error rate > 5%
- Critical functionality broken
- Accessibility regression
- Performance degradation > 20%

## Testing Strategy

[Include full testing checklist from Step 7]

## Timeline & Ownership

| Phase      | Estimated Time | Owner  | Start Date | End Date | Status         |
| ---------- | -------------- | ------ | ---------- | -------- | -------------- |
| Setup      | [X]h           | [Name] | [Date]     | [Date]   | 🔴 Not Started |
| Migration  | [X]h           | [Name] | [Date]     | [Date]   | 🔴 Not Started |
| Cleanup    | [X]h           | [Name] | [Date]     | [Date]   | 🔴 Not Started |
| Testing    | [X]h           | [Name] | [Date]     | [Date]   | 🔴 Not Started |
| Deployment | [X]h           | [Name] | [Date]     | [Date]   | 🔴 Not Started |

**Total**: [X] hours ([Y] days)

## Success Criteria

✅ All scrollbar implementations migrated  
✅ Zero production errors  
✅ All tests passing  
✅ Design system compliance verified  
✅ Performance metrics maintained  
✅ Accessibility standards met  
✅ Old dependencies removed  
✅ Documentation updated

## Next Steps

1. [ ] Review plan with team
2. [ ] Get stakeholder approval
3. [ ] Create Jira/GitHub issues
4. [ ] Schedule migration sprint
5. [ ] Begin implementation

````

## Related Documentation

- **SIMPLEBAR_IMPLEMENTATION_GUIDE.md**: Complete implementation guide
  - Section 10: Shared Library Component setup
  - Section 12: Safe Multi-Repo Migration Strategy
- **MULTI_REPO_QUICK_START.md**: Quick start for multi-repo migrations
- **IMPLEMENTATION_EXAMPLES.md**: Code examples for all scrollbar types

## Tips for Best Results

1. **Run discovery first, analyze second**: Gather all data before making decisions
2. **Prioritize by risk**: Migrate low-risk components first to validate approach
3. **Test incrementally**: Don't migrate everything at once
4. **Document special cases**: Note any unusual implementations that need custom handling
5. **Communicate early**: Share findings with team before starting work
6. **Save script output**: Keep terminal output for reference during migration

## Example Usage

```bash
# In any repository, run discovery
cd /path/to/repo
grep -r "::-webkit-scrollbar" src/ --include="*.css" -n > findings.txt
grep -r "from.*scrollbar" src/ --include="*.js" -n >> findings.txt
find src/ -iname "*scrollbar*" >> findings.txt

# Review findings
cat findings.txt

# Then use this skill to generate migration plan
````

Or invoke via AI assistant:

```
@workspace Run the "discover-scrollbars" skill to:
1. Find all scrollbar implementations in this repository
2. Identify if this is the library or a consumer repo
3. Generate a detailed migration plan with code examples
4. Provide risk assessment and timeline
```
