# SimpleBar Implementation Guide for Ontada Design System

This guide provides a complete implementation path for integrating SimpleBar scrollbars matching the Ontada Design System specifications in your React application.

---

## Table of Contents

1. [Why SimpleBar?](#why-simplebar)
2. [Installation](#installation)
3. [Basic Setup](#basic-setup)
4. [Ontada Design System Configuration](#ontada-design-system-configuration)
5. [React Component Integration](#react-component-integration)
6. [Common Use Cases](#common-use-cases)
7. [Advanced Configuration](#advanced-configuration)
8. [Troubleshooting](#troubleshooting)
9. [Migration Guide](#migration-guide)
10. [Best Practices](#best-practices)
11. [Multi-Repo Resources](#multi-repo-resources)

---

## Why SimpleBar?

SimpleBar is an excellent choice for your project because:

- ✅ **Popular & Proven** - 6M+ downloads/month, battle-tested in production
- ✅ **Good Cross-Browser Support** - Consistent appearance across all browsers
- ✅ **Simple API** - Easy to integrate with minimal configuration
- ✅ **React Support** - Dedicated `simplebar-react` package
- ✅ **Auto-Recalculate** - Uses MutationObserver to detect content changes
- ✅ **Mobile-Friendly** - Works on touch devices
- ✅ **Reasonable Bundle Size** - ~20KB minified

**Score: 7.5/10** - Great balance of features and simplicity

---

## Installation

### Step 1: Install SimpleBar Package

```bash
npm install simplebar-react
```

This will install both `simplebar-react` and its dependency `simplebar`.

### Step 2: Verify Installation

Check your `package.json`:

```json
{
  "dependencies": {
    "simplebar-react": "^3.3.2"
  }
}
```

---

## Basic Setup

### Step 1: Create Design Tokens

Create a CSS file for your design tokens (e.g., `src/styles/scrollbar-tokens.css`):

```css
:root {
  /* Scrollbar Design Tokens - Ontada Design System 
   * Figma: https://www.figma.com/design/F2VsZ1PGoH4zCtYYOzYhzChw/Ontada-Design-System?node-id=60489-144411
   */

  /* Desktop/Tablet Dimensions (≥768px) */
  --sb-width: 8px; /* Width for vertical, height for horizontal */
  --sb-radius: 4px; /* Border-radius in normal state */
  --sb-radius-active: 8px; /* Border-radius in hover/active state */
  --sb-offset: 3px; /* Distance from edge (overlay positioning) */

  /* Colors - Light Mode (Default) */
  --sb-track-bg: transparent; /* Transparent track (overlay style) */
  --sb-thumb-bg: rgba(186, 197, 204, 0.9); /* #bac5cc @ 90% */
  --sb-thumb-bg-hover: rgba(98, 115, 134, 0.8); /* #627386 @ 80% */
  --sb-thumb-bg-active: rgba(98, 115, 134, 0.8); /* #627386 @ 80% */
}

/* Mobile/Tablet Breakpoint (<768px) */
@media (max-width: 767px) {
  :root {
    --sb-width: 6px; /* Reduced for touch devices */
    --sb-radius: 3px; /* Proportionally reduced */
    --sb-radius-active: 6px; /* Proportionally reduced */
    --sb-offset: 2px; /* Reduced gap for smaller screens */
  }
}
```

### Step 2: Import Tokens in Your App

```jsx
// src/index.js or src/App.js
import "./styles/scrollbar-tokens.css";
```

---

## Ontada Design System Configuration

### Step 1: Create SimpleBar Style File

Create `src/styles/SimpleBarScrollbar.css`:

```css
/* SimpleBar Custom Styles - Ontada Design System */

/* Override SimpleBar scrollbar thumb */
.simplebar-scrollbar::before {
  background-color: var(--sb-thumb-bg); /* #bac5cc @ 90% */
  border-radius: var(--sb-radius); /* 4px */
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  opacity: 1 !important;
  transition:
    border-radius 0.2s ease,
    background-color 0.2s ease;
}

/* Transparent track (overlay style) */
.simplebar-track {
  background-color: transparent !important;
  border-radius: 0;
}

/* Vertical scrollbar positioning */
.simplebar-track.simplebar-vertical {
  width: var(--sb-width) !important; /* 8px */
  right: var(--sb-offset) !important; /* 3px from right */
  top: var(--sb-offset) !important; /* 3px from top */
  bottom: calc(
    var(--sb-offset) + var(--sb-width)
  ) !important; /* Stop before horizontal */
}

/* Horizontal scrollbar positioning */
.simplebar-track.simplebar-horizontal {
  height: var(--sb-width) !important; /* 8px */
  bottom: var(--sb-offset) !important; /* 3px from bottom */
  left: var(--sb-offset) !important; /* 3px from left */
  right: calc(
    var(--sb-offset) + var(--sb-width)
  ) !important; /* Stop before vertical */
}

/* Hover state - darker color, increased border-radius */
.simplebar-scrollbar.simplebar-hover::before,
.simplebar-track.simplebar-dragging .simplebar-scrollbar::before {
  background-color: var(--sb-thumb-bg-hover); /* #627386 @ 80% */
  border-radius: var(--sb-radius-active); /* 8px */
}

/* Active/dragging state */
.simplebar-track.simplebar-dragging .simplebar-scrollbar::before {
  background-color: var(--sb-thumb-bg-active); /* #627386 @ 80% */
  border-radius: var(--sb-radius-active); /* 8px */
}

/* Hide scrollbar when not needed */
.simplebar-track[style*="display: none"] {
  display: none !important;
}
```

### Step 2: Import Styles

```jsx
// In your component or App.js
import "simplebar-react/dist/simplebar.min.css"; // Base SimpleBar styles
import "./styles/SimpleBarScrollbar.css"; // Your custom Ontada styles
```

---

## React Component Integration

### Method 1: Direct Component Usage (Recommended)

```jsx
import React from "react";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import "./styles/SimpleBarScrollbar.css";

function MyComponent() {
  return (
    <SimpleBar style={{ maxHeight: "400px" }}>
      <div>
        <h1>Your Content</h1>
        <p>Long scrollable content goes here...</p>
        <p>SimpleBar will automatically add scrollbars when needed.</p>
      </div>
    </SimpleBar>
  );
}

export default MyComponent;
```

### Method 2: Create a Reusable Wrapper Component

```jsx
// src/components/ScrollableContainer.js
import React from "react";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import "./ScrollableContainer.css";

const ScrollableContainer = ({
  children,
  maxHeight = "100%",
  autoHide = false,
  className = "",
  ...props
}) => {
  return (
    <SimpleBar
      style={{ maxHeight }}
      autoHide={autoHide}
      className={`scrollable-container ${className}`}
      {...props}
    >
      {children}
    </SimpleBar>
  );
};

export default ScrollableContainer;
```

Usage:

```jsx
import ScrollableContainer from "./components/ScrollableContainer";

function MyPage() {
  return (
    <ScrollableContainer maxHeight="600px">
      <div>Your content here</div>
    </ScrollableContainer>
  );
}
```

---

## Common Use Cases

### Use Case 1: Data Table with Fixed Headers

```jsx
import React from "react";
import SimpleBar from "simplebar-react";

function DataTable({ data }) {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
          </tr>
        </thead>
      </table>

      <SimpleBar style={{ maxHeight: "400px" }}>
        <table>
          <tbody>
            {data.map((row) => (
              <tr key={row.id}>
                <td>{row.name}</td>
                <td>{row.email}</td>
                <td>{row.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </SimpleBar>
    </div>
  );
}
```

### Use Case 2: Sidebar Navigation

```jsx
import React from "react";
import SimpleBar from "simplebar-react";

function Sidebar() {
  return (
    <aside className="sidebar" style={{ width: "250px", height: "100vh" }}>
      <div className="sidebar-header">
        <h2>Navigation</h2>
      </div>

      <SimpleBar style={{ maxHeight: "calc(100vh - 80px)" }}>
        <nav>
          <ul>
            <li>
              <a href="/dashboard">Dashboard</a>
            </li>
            <li>
              <a href="/patients">Patients</a>
            </li>
            <li>
              <a href="/appointments">Appointments</a>
            </li>
            {/* Many more items... */}
          </ul>
        </nav>
      </SimpleBar>
    </aside>
  );
}
```

### Use Case 3: Modal with Scrollable Content

```jsx
import React from "react";
import SimpleBar from "simplebar-react";

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Modal Title</h2>
          <button onClick={onClose}>×</button>
        </div>

        <SimpleBar style={{ maxHeight: "60vh" }}>
          <div className="modal-body">{children}</div>
        </SimpleBar>

        <div className="modal-footer">
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
```

### Use Case 4: Horizontal Card Gallery

```jsx
import React from "react";
import SimpleBar from "simplebar-react";

function CardGallery({ cards }) {
  return (
    <SimpleBar style={{ maxWidth: "100%" }}>
      <div style={{ display: "flex", gap: "16px", padding: "16px" }}>
        {cards.map((card) => (
          <div key={card.id} className="card" style={{ minWidth: "250px" }}>
            <img src={card.image} alt={card.title} />
            <h3>{card.title}</h3>
            <p>{card.description}</p>
          </div>
        ))}
      </div>
    </SimpleBar>
  );
}
```

### Use Case 5: Chat Messages Container

```jsx
import React, { useEffect, useRef } from "react";
import SimpleBar from "simplebar-react";

function ChatMessages({ messages }) {
  const scrollableNodeRef = useRef(null);

  // Auto-scroll to bottom on new message
  useEffect(() => {
    if (scrollableNodeRef.current) {
      const scrollElement = scrollableNodeRef.current.getScrollElement();
      scrollElement.scrollTop = scrollElement.scrollHeight;
    }
  }, [messages]);

  return (
    <SimpleBar ref={scrollableNodeRef} style={{ maxHeight: "500px" }}>
      <div className="messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`message ${msg.sender}`}>
            <p>{msg.text}</p>
            <span className="timestamp">{msg.timestamp}</span>
          </div>
        ))}
      </div>
    </SimpleBar>
  );
}
```

---

## Advanced Configuration

### Configuration Options

```jsx
<SimpleBar
  // Auto-hide scrollbar when not scrolling
  autoHide={false} // Set to true for auto-hide behavior
  // Force scrollbar visibility
  forceVisible="y" // 'x', 'y', true (both), or false
  // Scroll direction (if you want horizontal only)
  direction="rtl" // 'rtl' or 'ltr' (right-to-left)
  // Timeout for auto-hide (milliseconds)
  timeout={1000}
  // Click on track to scroll
  clickOnTrack={true}
  // Custom class name
  className="my-custom-scrollbar"
  // Scroll event handler
  onScroll={(e) => console.log("Scrolled:", e)}
>
  {children}
</SimpleBar>
```

### Programmatic Scrolling

```jsx
import React, { useRef } from "react";
import SimpleBar from "simplebar-react";

function ScrollableList() {
  const scrollableNodeRef = useRef(null);

  const scrollToTop = () => {
    scrollableNodeRef.current.getScrollElement().scrollTop = 0;
  };

  const scrollToBottom = () => {
    const scrollElement = scrollableNodeRef.current.getScrollElement();
    scrollElement.scrollTop = scrollElement.scrollHeight;
  };

  const scrollToPosition = (position) => {
    scrollableNodeRef.current.getScrollElement().scrollTop = position;
  };

  return (
    <>
      <div className="scroll-controls">
        <button onClick={scrollToTop}>Top</button>
        <button onClick={scrollToBottom}>Bottom</button>
      </div>

      <SimpleBar ref={scrollableNodeRef} style={{ maxHeight: "400px" }}>
        <div>{/* Your content */}</div>
      </SimpleBar>
    </>
  );
}
```

### Recalculate on Content Change

SimpleBar uses MutationObserver to automatically detect content changes, but you can manually trigger recalculation:

```jsx
import React, { useRef, useEffect } from "react";
import SimpleBar from "simplebar-react";

function DynamicContent({ items }) {
  const scrollableNodeRef = useRef(null);

  useEffect(() => {
    // Manually recalculate scrollbar when items change
    if (scrollableNodeRef.current) {
      scrollableNodeRef.current.recalculate();
    }
  }, [items]);

  return (
    <SimpleBar ref={scrollableNodeRef} style={{ maxHeight: "400px" }}>
      <div>
        {items.map((item) => (
          <div key={item.id}>{item.content}</div>
        ))}
      </div>
    </SimpleBar>
  );
}
```

---

## Troubleshooting

### Issue 1: Scrollbar Not Appearing

**Problem**: Content is scrollable but scrollbar doesn't show.

**Solutions**:

1. Ensure you've imported the CSS:

   ```jsx
   import "simplebar-react/dist/simplebar.min.css";
   ```

2. Set a explicit height/maxHeight:

   ```jsx
   <SimpleBar style={{ maxHeight: '400px' }}>
   ```

3. Check if content is actually overflowing:
   ```jsx
   // Make sure content height exceeds container height
   ```

### Issue 2: Horizontal Scrollbar Cropped by Vertical

**Problem**: Horizontal scrollbar gets cut off when both scrollbars are present.

**Solution**: Already fixed in your custom CSS:

```css
.simplebar-track.simplebar-horizontal {
  right: calc(var(--sb-offset) + var(--sb-width)) !important;
}
```

### Issue 3: Scrollbar Styling Not Applied

**Problem**: Custom styles aren't overriding SimpleBar defaults.

**Solutions**:

1. Use `!important` on critical properties:

   ```css
   .simplebar-track.simplebar-vertical {
     width: 8px !important;
   }
   ```

2. Ensure custom CSS is imported AFTER SimpleBar's CSS:
   ```jsx
   import "simplebar-react/dist/simplebar.min.css"; // First
   import "./SimpleBarScrollbar.css"; // Second (your styles)
   ```

### Issue 4: Performance Issues with Large Lists

**Problem**: Lag or jank when scrolling large amounts of content.

**Solutions**:

1. Implement virtualization with `react-window` or `react-virtual`:

   ```bash
   npm install react-window
   ```

2. Use `autoHide` to reduce repaints:

   ```jsx
   <SimpleBar autoHide={true}>
   ```

3. Disable MutationObserver if content is static:
   ```jsx
   // Set data-simplebar-auto-hide="false" on container
   ```

### Issue 5: Scrollbar Not Updating After Content Change

**Problem**: Content added/removed but scrollbar doesn't recalculate.

**Solution**: Manually trigger recalculation:

```jsx
const scrollableNodeRef = useRef(null);

// After content changes
scrollableNodeRef.current?.recalculate();
```

### Issue 6: Scrolling Not Smooth on Mobile

**Problem**: Touch scrolling feels laggy or unresponsive.

**Solution**: Ensure proper touch-action CSS:

```css
.simplebar-content-wrapper {
  touch-action: auto !important;
}
```

---

## Migration Guide

### From Native CSS Scrollbars

**Before:**

```jsx
<div
  className="native-scrollbar-container"
  style={{ overflow: "auto", height: "400px" }}
>
  {content}
</div>
```

**After:**

```jsx
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import "./SimpleBarScrollbar.css";

<SimpleBar style={{ maxHeight: "400px" }}>{content}</SimpleBar>;
```

**Benefits:**

- ✅ Consistent appearance across browsers
- ✅ Better control over styling
- ✅ Automatic content change detection

### From Custom React Scrollbar

**Before:**

```jsx
<CustomScrollbar>{content}</CustomScrollbar>
```

**After:**

```jsx
<SimpleBar style={{ maxHeight: "400px" }}>{content}</SimpleBar>
```

**Benefits:**

- ✅ Less code to maintain
- ✅ Battle-tested library
- ✅ Better browser compatibility
- ✅ Automatic accessibility features

### From OverlayScrollbars

**Before:**

```jsx
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";

<OverlayScrollbarsComponent
  options={{ scrollbars: { theme: "os-theme-custom" } }}
>
  {content}
</OverlayScrollbarsComponent>;
```

**After:**

```jsx
import SimpleBar from "simplebar-react";

<SimpleBar style={{ maxHeight: "400px" }}>{content}</SimpleBar>;
```

**Benefits:**

- ✅ Smaller bundle size (~20KB vs ~50KB)
- ✅ Simpler API
- ✅ Easier to configure

**Trade-offs:**

- ⚠️ Slightly less feature-rich
- ⚠️ Non-native scrolling behavior

---

## Best Practices

### 2. Import Styles in Correct Order

```jsx
// ✅ Correct order
import "simplebar-react/dist/simplebar.min.css"; // Base styles first
import "./SimpleBarScrollbar.css"; // Custom overrides second
```

### 3. Use CSS Variables for Consistency

```css
/* ✅ Good - uses design tokens */
.simplebar-track.simplebar-vertical {
  width: var(--sb-width) !important;
}

/* ❌ Bad - hardcoded values */
.simplebar-track.simplebar-vertical {
  width: 8px !important;
}
```

### 4. Use Refs for Programmatic Control

```jsx
// ✅ Good - access SimpleBar API
const scrollableRef = useRef(null);
<SimpleBar ref={scrollableRef}>

// Later...
scrollableRef.current.recalculate();
```

### 5. Consider Auto-Hide for Cleaner UI

```jsx
// For less cluttered UI
<SimpleBar autoHide={true} timeout={1000}>
  {content}
</SimpleBar>
```

### 6. Memoize Content When Possible

```jsx
// ✅ Good - prevents unnecessary recalculations
const memoizedContent = useMemo(
  () => <div>{/* Expensive render */}</div>,
  [dependencies],
);

<SimpleBar>{memoizedContent}</SimpleBar>;
```

### 7. Use Semantic HTML

```jsx
// ✅ Good - maintains accessibility
<SimpleBar style={{ maxHeight: "400px" }}>
  <nav aria-label="Main navigation">
    <ul>{menuItems}</ul>
  </nav>
</SimpleBar>
```

### 8. Test on Multiple Browsers

- Chrome/Edge (Chromium)
- Firefox
- Safari (macOS/iOS)
- Mobile browsers (touch interactions)

---

## Performance Optimization

### 1. Virtualize Long Lists

For lists with hundreds/thousands of items:

```bash
npm install react-window
```

```jsx
import { FixedSizeList } from "react-window";
import SimpleBar from "simplebar-react";

function VirtualizedList({ items }) {
  return (
    <SimpleBar style={{ maxHeight: "400px" }}>
      <FixedSizeList
        height={400}
        itemCount={items.length}
        itemSize={50}
        width="100%"
      >
        {({ index, style }) => <div style={style}>{items[index].name}</div>}
      </FixedSizeList>
    </SimpleBar>
  );
}
```

### 2. Debounce Scroll Events

```jsx
import { debounce } from 'lodash';

const handleScroll = debounce((e) => {
  console.log('Scrolled to:', e.target.scrollTop);
}, 100);

<SimpleBar onScroll={handleScroll}>
```

### 3. Lazy Load Images

```jsx
<SimpleBar style={{ maxHeight: "600px" }}>
  {items.map((item) => (
    <img
      key={item.id}
      src={item.thumbnail}
      loading="lazy" // Native lazy loading
      alt={item.title}
    />
  ))}
</SimpleBar>
```

---

## Accessibility Considerations

### 1. Keyboard Navigation

SimpleBar preserves native keyboard scrolling:

- `Arrow Up/Down` - Scroll vertically
- `Arrow Left/Right` - Scroll horizontally
- `Page Up/Down` - Jump scroll
- `Home/End` - Scroll to top/bottom
- `Space` - Page down

### 2. Screen Reader Support

Ensure content remains accessible:

```jsx
<SimpleBar style={{ maxHeight: "400px" }} aria-label="Scrollable content area">
  <div role="region">{content}</div>
</SimpleBar>
```

### 3. Focus Management

```css
/* Ensure focus indicators are visible */
.simplebar-content:focus {
  outline: 2px solid #0066cc;
  outline-offset: 2px;
}
```

---

## Production Checklist

Before deploying to production:

- [ ] Imported SimpleBar CSS in correct order
- [ ] Applied Ontada Design System custom styles
- [ ] Set explicit heights on all scrollable containers
- [ ] Tested on Chrome, Firefox, Safari
- [ ] Tested on mobile devices (iOS/Android)
- [ ] Verified keyboard navigation works
- [ ] Checked screen reader compatibility
- [ ] Optimized performance for large content
- [ ] Added appropriate ARIA labels
- [ ] Tested with dynamic content changes
- [ ] Verified scrollbar corner positioning (both axes)
- [ ] Confirmed hover states match design
- [ ] Bundle size impact reviewed

---

## Additional Resources

### Official Documentation

- **SimpleBar GitHub**: https://github.com/Grsmto/simplebar
- **SimpleBar React Docs**: https://www.npmjs.com/package/simplebar-react

### Ontada Design System

- **Figma Spec**: https://www.figma.com/design/F2VsZ1PGoH4zCtYYOzYhzChw/Ontada-Design-System?node-id=60489-144411
- **Design Tokens**: See `src/styles/tokens.css`

### Related Tools

- **React Window** (virtualization): https://react-window.now.sh/
- **React Virtual**: https://tanstack.com/virtual/

---

## Support

For issues or questions:

1. Check the [Troubleshooting](#troubleshooting) section
2. Review [SimpleBar GitHub Issues](https://github.com/Grsmto/simplebar/issues)
3. Consult the POC evaluation matrix in `README.md`
4. Compare with other implementations in `IMPLEMENTATION_EXAMPLES.md`

---

---

## Multi-Repo Resources

For implementing ScrollableContainer across multiple repositories and micro-frontends:

### 📚 Comprehensive Guides

- **[MULTI_REPO_QUICK_START.md](./MULTI_REPO_QUICK_START.md)** - Streamlined workflow for multi-repo/MFE migration
  - Complete shared library setup
  - Repository discovery process
  - Migration paths (Library vs Consumer)
  - Progress tracking templates

- **[MIGRATION_TRACKER.md](./MIGRATION_TRACKER.md)** - Project management template
  - Repository inventory
  - Discovery details
  - Testing checklist
  - Deployment timeline

- **[QUICK_REFERENCE.md](./QUICK_REFERENCE.md)** - One-page cheat sheet
  - Discovery methods
  - Migration patterns
  - Common issues & fixes
  - Timeline estimates

### 🤖 Automated Discovery

- **[.copilot/skills/discover-scrollbars.md](./.copilot/skills/discover-scrollbars.md)** - GitHub Copilot skill
  - Invoke with: `@workspace /discover-scrollbars`
  - 8-step automated workflow
  - Migration plan generation
  - Risk assessment

- **[scripts/discover-scrollbars.sh](./scripts/discover-scrollbars.sh)** - Bash script (Linux/macOS/Git Bash)
- **[scripts/discover-scrollbars.bat](./scripts/discover-scrollbars.bat)** - Windows batch script

### 📦 Implementation Examples

See **[IMPLEMENTATION_EXAMPLES.md](./IMPLEMENTATION_EXAMPLES.md)** for comparison with other approaches:

- Native CSS Scrollbar (8.5/10)
- OverlayScrollbars (9/10)
- Custom React Scrollbar (6-9/10)

---

**Document Version**: 2.0  
**Last Updated**: 2026-09-01  
**Ontada Design System Version**: Current
