# Scrollbar Discovery - Quick Reference Card

One-page reference for running scrollbar discovery across multiple repositories.

---

## 🚀 Quick Start (3 Methods)

### Method 1: Use the Skill (Recommended)

```
@workspace Use the .copilot/skills/discover-scrollbars.md skill to analyze this repository and generate a migration plan.

Repository: [NAME]
```

### Method 2: Run Discovery Script

```bash
cd /path/to/repo
./scripts/discover-scrollbars.sh > SCROLLBAR_FINDINGS.txt
```

### Method 3: Manual Commands

```bash
# Check dependencies
cat package.json | grep -E "scrollbar|simplebar"

# Find CSS
grep -r "::-webkit-scrollbar" src/ --include="*.css" -n

# Find imports
grep -r "from.*scrollbar" src/ --include="*.js" --include="*.jsx" -n

# Find components
find src/ -iname "*scrollbar*"
```

---

## 📝 What You're Looking For

| Type        | Search Pattern           | Example                                           |
| ----------- | ------------------------ | ------------------------------------------------- |
| **CSS**     | `::-webkit-scrollbar`    | `.scrollable::-webkit-scrollbar { width: 12px; }` |
| **Library** | `from 'simplebar-react'` | `import SimpleBar from 'simplebar-react'`         |
| **Custom**  | `*Scrollbar*.jsx`        | `src/components/CustomScrollbar/index.jsx`        |
| **Config**  | `webpack.config.js`      | Module Federation shared deps                     |

---

## 📊 Document Findings Template

```markdown
# [REPO_NAME] - Scrollbar Inventory

## Summary

- Type: [ ] Library [ ] Consumer [ ] MFE
- Found: **_ CSS, _** Libraries, \_\_\_ Custom
- Effort: **_ hours (_** days)
- Risk: [ ] Low [ ] Medium [ ] High

## Locations

1. src/components/DataTable/DataTable.css (lines 45-60)
   - Type: Native CSS
   - Complexity: Simple
2. src/pages/Dashboard.jsx (line 12)
   - Type: react-custom-scrollbars
   - Has refs: Yes
3. src/components/CustomScrollbar/index.jsx
   - Type: Custom
   - Used by: 5 components

## Dependencies to Remove

- [ ] react-custom-scrollbars@4.2.1

## Priority: [ ] High [ ] Medium [ ] Low
```

---

## 🔄 Migration Pattern Cheat Sheet

### Native CSS → ScrollableContainer

```jsx
// BEFORE
<div className="scrollable" style={{ height: 400 }}>
  ...
</div>;

// AFTER
import { ScrollableContainer } from "@yourorg/ui-components";
<ScrollableContainer maxHeight="400px">...</ScrollableContainer>;
```

### react-custom-scrollbars → ScrollableContainer

```jsx
// BEFORE
import { Scrollbars } from "react-custom-scrollbars";
<Scrollbars style={{ height: 400 }}>...</Scrollbars>;

// AFTER
import { ScrollableContainer } from "@yourorg/ui-components";
<ScrollableContainer maxHeight="400px">...</ScrollableContainer>;
```

### With Refs

```jsx
// BEFORE
const ref = useRef();
ref.current.scrollToTop();

// AFTER
const ref = useRef();
ref.current.getScrollElement().scrollTop = 0;
```

---

## ✅ Quick Testing Checklist

After migrating each component:

- [ ] Scrollbar appears with correct responsive dimensions
  - Desktop/Tablet (≥768px): 8px width, 3px offset
  - Mobile (<768px): 6px width, 2px offset
- [ ] Mouse wheel works
- [ ] Click-and-drag works
- [ ] Keyboard navigation works (arrows, Page Up/Down)
- [ ] No console errors
- [ ] Tested in Chrome, Firefox, Safari

---

## 📈 Multi-Repo Progress Tracker

| Repo            | Type | Found | Status | Owner | ETA |
| --------------- | ---- | ----- | ------ | ----- | --- |
| ui-components   | Lib  | -     | ⏳     |       |     |
| patient-portal  | MFE  | ?     | 🔴     |       |     |
| admin-dashboard | MFE  | ?     | 🔴     |       |     |
| billing-app     | App  | ?     | 🔴     |       |     |

🔴 Not Started ⏳ In Progress ✅ Complete 🚀 Deployed

---

## 🆘 Common Issues & Fixes

| Issue                   | Solution                          |
| ----------------------- | --------------------------------- |
| Can't find library      | `npm list @yourorg/ui-components` |
| Scrollbar not visible   | Check `maxHeight` is set          |
| Different styles        | Verify same library version       |
| Module Federation error | Add `simplebar-react` to shared   |

---

## 📚 Full Documentation

- **discover-scrollbars.md**: Automated discovery skill
- **MULTI_REPO_QUICK_START.md**: Step-by-step migration guide
- **SIMPLEBAR_IMPLEMENTATION_GUIDE.md**: Complete reference (Sections 10-12)

---

## 💡 Pro Tips

1. **Start with lowest risk repo** - Validate approach first
2. **One component at a time** - Test incrementally
3. **Keep discovery output** - Save for reference during migration
4. **Track in progress table** - Stay organized across repos
5. **Communicate early** - Share plans before starting

---

## ⏱️ Typical Timeline Per Repo

- **Discovery**: 0.5-1 hour
- **Simple repo (1-5 instances)**: 2-4 hours
- **Medium repo (6-15 instances)**: 1-2 days
- **Complex repo (15+ instances)**: 2-5 days
- **Library repo setup**: 1-2 days (one-time)

---

**Need help?** Run: `@workspace Use the discover-scrollbars skill`
