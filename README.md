# Cross-Platform Scrollbar Evaluation POC

> **🚀 Try It in 30 Seconds:** `npm install && npm start` → Open http://localhost:3001

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm start

# 3. Open in browser
# Navigate to http://localhost:3001

# 4. Test all implementations
# - Switch between implementations in the dropdown
# - Use "Grid View" to compare all 4 side-by-side
# - Try different scenarios from the sidebar
```

### 📊 Quick Comparison

| Implementation    | Bundle Size | Browser Support | Maintenance |  **Score**  |
| ----------------- | ----------- | --------------- | ----------- | :---------: |
| Native CSS        | 0 KB        | ✅✅⚠️          | Low         | **8.5/10**  |
| SimpleBar         | ~20 KB      | ✅✅✅          | Low         | **7.5/10**  |
| OverlayScrollbars | ~50 KB      | ✅✅✅          | Low         | **9/10** ⭐ |
| Custom React      | ~2 KB       | ✅✅✅          | High        | **6-9/10**  |

**Legend:** ✅ Full support | ⚠️ Limited support

---

## 1. Purpose & Problem Statement

The purpose of this Proof of Concept (POC) is to evaluate different methods of implementing scrollbars in a modern web application.

Native scrollbars look and behave differently depending on the operating system (Windows vs. macOS) and browser (Chrome vs. Safari vs. Firefox). On Windows, scrollbars are often thick, permanent, and take up layout space, whereas on macOS, they are typically floating, thin, and only appear when scrolling.

This POC provides a shared test harness to objectively answer:
_"Which scrollbar implementation provides the best balance of visual consistency, cross-platform/browser consistency, accessibility, performance, maintainability, and developer experience for a production frontend application?"_

## 2. Target Design

To evaluate whether each implementation can achieve visual consistency, they have all been configured to match the **Ontada Design System** specifications:

**Desktop/Tablet (≥768px):**

- **Width:** 8px
- **Border Radius:** 4px (normal), 8px (hover/active states)
- **Position:** 3px offset from edge (overlay style)

**Mobile (<768px):**

- **Width:** 6px (optimized for touch devices)
- **Border Radius:** 3px (normal), 6px (hover/active states)
- **Position:** 2px offset from edge

**All Breakpoints:**

- **Thumb Colors:**
  - Normal: `#bac5cc` at 90% opacity
  - Hover/Active: `#627386` at 80% opacity
- **Track:** Transparent (true overlay scrollbar)
- **Type:** Overlay scrollbar that floats over content without affecting layout

All implementations reference design tokens in `src/styles/tokens.css` for consistent responsive theming.

**📚 Documentation:**

- **[QUICK_REFERENCE.md](./QUICK_REFERENCE.md)** - One-page cheat sheet for discovery & migration 📋
- **[MULTI_REPO_QUICK_START.md](./MULTI_REPO_QUICK_START.md)** - Quick start guide for multi-repo/MFE migration 🚀
- **[MIGRATION_TRACKER.md](./MIGRATION_TRACKER.md)** - Track progress across multiple repositories 📊
- **[BUNDLE_ANALYSIS.md](./BUNDLE_ANALYSIS.md)** - Detailed bundle size comparison & optimization tips 📦
- **[SIMPLEBAR_IMPLEMENTATION_GUIDE.md](./SIMPLEBAR_IMPLEMENTATION_GUIDE.md)** - Complete SimpleBar setup guide (Recommended Solution ⭐)
  - Includes **Shared Library Component** setup for multi-repo/MFE environments
  - Includes **Automated Discovery Prompt** to find all scrollbar implementations across repos
  - Complete migration strategies and code examples
- **[IMPLEMENTATION_EXAMPLES.md](./IMPLEMENTATION_EXAMPLES.md)** - Code examples and comparison of all 4 approaches
- **[.copilot/skills/discover-scrollbars.md](.copilot/skills/discover-scrollbars.md)** - Automated discovery skill 🤖
- **[scripts/](./scripts/)** - Discovery scripts (Bash and Windows Batch)

## 3. Implementations Evaluated

This POC includes **four different scrollbar implementations**.

### A. Native Browser Scrollbar (`NativeScrollbar.js`)

- **How it works:** Uses standard HTML/CSS overflow with `::-webkit-scrollbar` (for Chrome/Edge/Safari) and `scrollbar-width`/`scrollbar-color` (for Firefox).
- **Score:** 8.5/10 - Best for performance-critical applications with zero dependencies

### B. Custom React Scrollbar (`CustomScrollbar.js`)

- **How it works:** A bespoke React implementation. Hides the native scrollbar using `scrollbar-width: none` and `::-webkit-scrollbar { display: none; }`. Renders a custom absolute-positioned `div` for the track and thumb, syncing DOM scroll events and drag events.
- **Score:** 6-9/10 - High maintenance cost, only for special requirements

### C. SimpleBar (`SimpleBarScrollbar.js`)

- **How it works:** Uses the popular `simplebar-react` library. It hides the native scrollbars and uses a MutationObserver and ResizeObserver to update a custom DOM structure that mimics the scrollbar.
- **Score:** 7.5/10 - Good for existing SimpleBar users

📚 **See [SIMPLEBAR_IMPLEMENTATION_GUIDE.md](./SIMPLEBAR_IMPLEMENTATION_GUIDE.md) for complete setup instructions, use cases, and best practices.**

### D. OverlayScrollbars (`OverlayScrollbar.js`) ⭐ **RECOMMENDED**

- **How it works:** Uses `overlayscrollbars-react` (v2.16.0). A modern, highly robust library that utilizes native scrolling mechanics while injecting a styled visual overlay.
- **Score:** 9/10 - Best for production applications, cross-browser consistency
- **Repository:** https://github.com/KingSora/OverlayScrollbars

📚 **See [IMPLEMENTATION_EXAMPLES.md](./IMPLEMENTATION_EXAMPLES.md) for ready-to-use code examples and detailed comparison.**

---

## 4. How to Run the POC

### Prerequisites

- Node.js (v18+ recommended)
- `npm`

### Installation & Execution

```bash
npm install
npm start
```

The application will launch at `http://localhost:3001`.

### Additional npm Scripts

```bash
# Run scrollbar discovery script (Bash/Git Bash)
npm run discover

# Run scrollbar discovery script (Windows)
npm run discover:win

# Analyze bundle size impact
npm run analyze
```

---

## 5. How to Evaluate (Manual Testing Checklist)

To properly evaluate this POC, you must run it on both **Windows** and **macOS**, and ideally test in **Chrome, Edge, Firefox, and Safari**.

### Setup

1. Open the POC in your browser.
2. Observe the Sidebar for Navigation.
3. Observe the Header to switch between implementations (Native, Custom, SimpleBar, OverlayScrollbars) or toggle **Grid View** (side-by-side).

### Visual & Functional Testing

For each scenario (Long Text, Data Table, Nested Scroll, Dynamic Content), test the following on your target OS/Browser combinations:

- [ ] **Visual Parity:** Does it match the target design?
  - Desktop/Tablet (≥768px): 8px width, 3px offset, rounded, hover states
  - Mobile (<768px): 6px width, 2px offset, responsive behavior
- [ ] **Mouse Wheel:** Does scrolling with a standard mouse wheel feel natural?
- [ ] **Trackpad:** Does two-finger trackpad scrolling feel smooth? (Especially test this on macOS).
- [ ] **Thumb Dragging:** Can you click and drag the scrollbar thumb smoothly? Does it follow your cursor?
- [ ] **Track Clicking:** If you click the empty space above/below the thumb in the track, does it page up/down correctly? (Note: The Custom implementation uses a percentage jump, which is technically non-standard).
- [ ] **Keyboard:** Click inside the content area. Can you use Arrow Up/Down, Page Up/Down, Home, and End?
- [ ] **Resize / Dynamic:** Go to the "Dynamic Content" scenario. Click "Add 5 Items" rapidly. Does the scrollbar thumb resize immediately and correctly?

### The Evaluation Matrix

1. Click **Evaluation Matrix** in the sidebar.
2. Read through the criteria (Visual Fidelity, Performance, Accessibility, etc.).
3. Adjust the **Weights (1-3)** based on your project's priorities (e.g., if accessibility is critical, weight it 3).
4. Assign a score (1-5) for each implementation based on your manual testing.
5. Review the **Weighted Total** at the bottom to determine your winner.
   _(Note: Your scores are saved locally in your browser so you can switch between browsers on the same machine without losing data, though sharing between a Mac and PC will require manual transcription)._

---

## 6. Accessibility & Performance Considerations

- **Accessibility (a11y):** Native CSS is always the winner here. Screen readers understand native scroll areas. Focus management is handled by the browser. Custom implementations (including SimpleBar/OverlayScrollbars) often require `tabindex` hacks or careful ARIA management if they interfere with the native scrolling container.
- **Performance:** Native wins. Any custom implementation requires attaching event listeners (`scroll`, `mousemove`) which fire at high frequency. While modern libraries use `requestAnimationFrame` to mitigate layout thrashing, there is an unavoidable main-thread cost compared to native compositor-thread scrolling.

## 7. Known Limitations

- **Firefox Styling:** The `NativeScrollbar` implementation in Firefox will not match the target design exactly. Firefox only supports `scrollbar-width: thin` (you cannot specify 12px) and `scrollbar-color`. You cannot style the border-radius or hover states natively in Firefox. This is a fundamental platform limitation you must weigh in your decision matrix.

---

## 8. Documentation

This POC includes comprehensive documentation to help you choose and implement the right scrollbar solution:

### 📚 [IMPLEMENTATION_EXAMPLES.md](./IMPLEMENTATION_EXAMPLES.md)

Complete code examples with pros/cons for each approach:

- **Native CSS Scrollbar** - Zero dependencies, best performance
- **OverlayScrollbars** - Recommended for production (9/10)
- **SimpleBar** - Popular library, good for existing users
- **Custom React** - Full control, high maintenance

Includes:

- ✅ Ready-to-use code snippets
- ✅ Installation instructions
- ✅ Detailed pros and cons lists
- ✅ Quick comparison table
- ✅ Migration paths between approaches

---

## 9. Recommended Approach

Based on comprehensive evaluation:

**🥇 For Production: OverlayScrollbars (Score: 9/10)**

- 100% cross-browser consistency
- Native scrolling behavior with custom appearance
- Excellent accessibility and mobile support
- Active maintenance and TypeScript support

**🥈 For Zero Dependencies: Native CSS (Score: 8.5/10)**

- Best performance, smallest bundle
- Good enough for most use cases
- Accept Firefox limitations

See [IMPLEMENTATION_EXAMPLES.md](./IMPLEMENTATION_EXAMPLES.md) for detailed code examples and migration strategies.
