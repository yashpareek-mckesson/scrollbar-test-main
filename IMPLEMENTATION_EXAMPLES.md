# Scrollbar Implementation Examples & Comparison

This document provides ready-to-use code examples for each scrollbar implementation approach, along with their pros and cons to help you choose the best solution for your project.

---

## 1. Native CSS Scrollbar

### Example Implementation

```jsx
import React from "react";
import "./NativeScrollbar.css";

function MyComponent() {
  return (
    <div className="native-scrollbar-container" style={{ height: "400px" }}>
      {/* Your scrollable content here */}
      <div>
        <h1>Your Content</h1>
        <p>Long content that requires scrolling...</p>
      </div>
    </div>
  );
}
```

```css
/* NativeScrollbar.css */
.native-scrollbar-container {
  width: 100%;
  height: 100%;
  overflow: auto;

  /* Firefox - Ontada Design System
   * Note: Firefox has limited customization - only width and color control
   * Cannot achieve exact 8px width, 3px offset, or border-radius transitions
   */
  scrollbar-width: thin;
  scrollbar-color: rgba(186, 197, 204, 0.9) transparent;
}

/* Chrome, Edge, Safari - Ontada Design System Overlay Style
 * Figma Spec: https://www.figma.com/design/F2VsZ1PGoH4zCtYYOzYhzChw/Ontada-Design-System?node-id=60489-144411
 * 
 * RESPONSIVE SPECIFICATIONS:
 * 
 * Desktop/Tablet (≥768px):
 * - Width: 8px, Offset: 3px from edges
 * - Border-radius: 4px (normal) → 8px (hover)
 * 
 * Mobile (<768px):
 * - Width: 6px, Offset: 2px from edges  
 * - Border-radius: 3px (normal) → 6px (hover)
 * 
 * Note: These values are controlled by CSS custom properties in tokens.css
 * which automatically respond to screen size via @media queries.
 */

.native-scrollbar-container::-webkit-scrollbar {
  width: var(--sb-width); /* Responsive: 8px desktop, 6px mobile */
  height: var(--sb-width); /* Responsive: 8px desktop, 6px mobile */
}

/* Hide scrollbar arrow buttons (Windows) */
.native-scrollbar-container::-webkit-scrollbar-button {
  display: none;
  width: 0;
  height: 0;
}

.native-scrollbar-container::-webkit-scrollbar-track {
  background: transparent; /* Transparent track for overlay effect */
}

/* Vertical scrollbar track - creates offset from edges (responsive) */
.native-scrollbar-container::-webkit-scrollbar-track:vertical {
  margin-top: var(--sb-offset);
  margin-right: 0;
  margin-bottom: calc(
    var(--sb-offset) + var(--sb-width)
  ); /* Stop before horizontal scrollbar */
  margin-left: 0;
}

/* Horizontal scrollbar track - creates offset from edges (responsive) */
.native-scrollbar-container::-webkit-scrollbar-track:horizontal {
  margin-top: 0;
  margin-right: calc(
    var(--sb-offset) + var(--sb-width)
  ); /* Stop before vertical scrollbar */
  margin-bottom: 0;
  margin-left: var(--sb-offset);
}

/* Scrollbar thumb - Figma Design Tokens (Responsive)
 * Desktop (≥768px):
 *   - Normal: #bac5cc @ 90% opacity, 4px border-radius
 *   - Hover/Active: #627386 @ 80% opacity, 8px border-radius
 * Mobile (<768px):
 *   - Normal: #bac5cc @ 90% opacity, 3px border-radius
 *   - Hover/Active: #627386 @ 80% opacity, 6px border-radius
 * Minimum size: 60px to ensure visibility
 */
.native-scrollbar-container::-webkit-scrollbar-thumb {
  background-color: var(--sb-thumb-bg);
  border-radius: var(--sb-radius);
  border: 0;
  min-width: 60px; /* Minimum horizontal thumb width */
  min-height: 60px; /* Minimum vertical thumb height */
  background-clip: padding-box;
  transition:
    background-color 0.2s ease,
    border-radius 0.2s ease;
}

/* Hover state - border-radius expands (responsive via CSS variables) */
.native-scrollbar-container::-webkit-scrollbar-thumb:hover {
  background-color: var(--sb-thumb-bg-hover);
  border-radius: var(--sb-radius-active);
}

/* Active/dragging state */
.native-scrollbar-container::-webkit-scrollbar-thumb:active {
  background-color: var(--sb-thumb-bg-active);
  border-radius: var(--sb-radius-active);
}

/* Corner where both scrollbars meet - transparent for overlay effect */
.native-scrollbar-container::-webkit-scrollbar-corner {
  background: transparent;
}
```

### ✅ Pros

- ✅ **Zero dependencies** - No external libraries required
- ✅ **Best performance** - Native browser rendering, no JavaScript overhead
- ✅ **Smallest bundle size** - Pure CSS solution
- ✅ **Native keyboard support** - Built-in accessibility
- ✅ **Easy to maintain** - Simple CSS-only implementation
- ✅ **No JavaScript execution** - Works even if JS fails
- ✅ **Excellent for static content** - Perfect for simple scrolling needs

### ❌ Cons

- ❌ **Limited Firefox styling** - Cannot achieve exact responsive offset or border-radius transitions
- ❌ **Browser inconsistencies** - Different rendering across browsers
- ❌ **No programmatic control** - Cannot detect scroll events easily without extra code
- ❌ **Safari limitations** - Some advanced styling features not supported
- ❌ **No smooth scroll animations** - Limited animation capabilities
- ❌ **Edge cases** - May look different on older browsers

### 📊 Best For

- Static content sites
- Performance-critical applications
- Projects with no build process
- Maximum browser compatibility needed
- Budget/resource-constrained projects

---

## 2. OverlayScrollbars Library

### Example Implementation

```bash
# Installation
npm install overlayscrollbars overlayscrollbars-react
```

```jsx
import React from "react";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import "overlayscrollbars/overlayscrollbars.css";
import "./OverlayScrollbar.css";

function MyComponent() {
  return (
    <OverlayScrollbarsComponent
      options={{
        scrollbars: {
          autoHide: "never",
          theme: "os-theme-custom",
        },
      }}
      defer
      style={{ height: "400px" }}
    >
      {/* Your scrollable content here */}
      <div>
        <h1>Your Content</h1>
        <p>Long content that requires scrolling...</p>
      </div>
    </OverlayScrollbarsComponent>
  );
}
```

```css
/* OverlayScrollbar.css */
.os-theme-custom {
  --os-size: 8px;
  --os-padding-perpendicular: 0;
  --os-padding-axis: 3px;
  --os-track-border-radius: 0;
  --os-track-bg: transparent;
  --os-track-bg-hover: transparent;
  --os-track-bg-active: transparent;

  --os-handle-border-radius: 4px;
  --os-handle-bg: rgba(186, 197, 204, 0.9);
  --os-handle-bg-hover: rgba(98, 115, 134, 0.8);
  --os-handle-bg-active: rgba(98, 115, 134, 0.8);
  --os-handle-min-size: 60;
  --os-handle-max-size: 100;
}

.os-theme-custom .os-scrollbar-handle:hover,
.os-theme-custom .os-scrollbar-handle:active {
  border-radius: 8px;
}
```

### ✅ Pros

- ✅ **100% cross-browser consistency** - Identical appearance everywhere
- ✅ **Native scrolling behavior** - Uses browser's native scroll mechanics
- ✅ **Excellent accessibility** - Full ARIA support, keyboard navigation
- ✅ **Highly customizable** - Extensive API and styling options
- ✅ **Active development** - Well-maintained with regular updates
- ✅ **TypeScript support** - Full type definitions included
- ✅ **Rich API** - Programmatic scroll control, events, methods
- ✅ **Mobile-friendly** - Works on touch devices
- ✅ **RTL support** - Built-in right-to-left language support
- ✅ **Auto-hide options** - Configurable scrollbar visibility

### ❌ Cons

- ❌ **External dependency** - Adds ~50KB to bundle (minified)
- ❌ **JavaScript required** - Won't work if JS is disabled
- ❌ **Learning curve** - More complex API than native CSS
- ❌ **Slight performance overhead** - JavaScript-based rendering
- ❌ **Additional maintenance** - Need to keep library updated

### 📊 Best For

- **Production applications** - Recommended for most projects
- Cross-browser consistency critical
- Enterprise applications
- Design system implementations
- Projects requiring programmatic control
- Accessibility-first applications

**⭐ RECOMMENDED SOLUTION** for implementing Ontada Design System scrollbars

---

## 3. SimpleBar Library

### Example Implementation

```bash
# Installation
npm install simplebar-react
```

```jsx
import React from "react";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import "./SimpleBarScrollbar.css";

function MyComponent() {
  return (
    <SimpleBar style={{ maxHeight: "400px" }}>
      {/* Your scrollable content here */}
      <div>
        <h1>Your Content</h1>
        <p>Long content that requires scrolling...</p>
      </div>
    </SimpleBar>
  );
}
```

```css
/* SimpleBarScrollbar.css */
.simplebar-scrollbar::before {
  background-color: rgba(186, 197, 204, 0.9);
  border-radius: 4px;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  opacity: 1 !important;
  transition:
    border-radius 0.2s ease,
    background-color 0.2s ease;
}

.simplebar-track {
  background-color: transparent !important;
  border-radius: 0;
}

.simplebar-track.simplebar-vertical {
  width: 8px !important;
  right: 3px !important;
  top: 3px !important;
  bottom: calc(3px + 8px) !important;
}

.simplebar-track.simplebar-horizontal {
  height: 8px !important;
  bottom: 3px !important;
  left: 3px !important;
  right: calc(3px + 8px) !important;
}

.simplebar-scrollbar.simplebar-hover::before,
.simplebar-track.simplebar-dragging .simplebar-scrollbar::before {
  background-color: rgba(98, 115, 134, 0.8);
  border-radius: 8px;
}
```

### ✅ Pros

- ✅ **Popular & proven** - Widely used in production (6M+ downloads/month)
- ✅ **Simple API** - Easy to implement and configure
- ✅ **Cross-browser consistent** - Reliable appearance across browsers
- ✅ **Good documentation** - Well-documented with examples
- ✅ **Lightweight** - Smaller bundle size than some alternatives (~20KB)
- ✅ **Framework agnostic** - Vanilla JS version available
- ✅ **Mobile support** - Works on touch devices
- ✅ **Auto-recalculate** - Uses MutationObserver for content changes

### ❌ Cons

- ❌ **Non-native scrolling** - Uses custom scroll mechanics (not browser native)
- ❌ **Momentum issues** - Different scroll feel on some devices
- ❌ **Complex overrides** - Can be tricky to override default styles
- ❌ **Performance concerns** - MutationObserver can impact performance with frequent DOM changes
- ❌ **Less customizable** - Limited API compared to OverlayScrollbars
- ❌ **Maintenance status** - Updates less frequent than alternatives
- ❌ **Horizontal scrollbar alignment** - Requires careful CSS to avoid cropping

### 📊 Best For

- Projects already using SimpleBar
- When native scroll behavior is not critical
- Simple content with infrequent changes
- Budget-conscious projects (smaller bundle)
- Quick prototypes

---

## 4. Custom React Scrollbar

### Example Implementation

```jsx
import React, { useRef, useState, useEffect } from "react";
import "./CustomScrollbar.css";

const CustomScrollbar = ({ children }) => {
  const contentRef = useRef(null);
  const thumbYRef = useRef(null);
  const thumbXRef = useRef(null);
  const [thumbYHeight, setThumbYHeight] = useState(0);
  const [thumbXWidth, setThumbXWidth] = useState(0);
  const [thumbYTop, setThumbYTop] = useState(0);
  const [thumbXLeft, setThumbXLeft] = useState(0);
  const [isDragging, setIsDragging] = useState(null);

  const updateScrollbars = () => {
    if (!contentRef.current) return;

    const {
      scrollHeight,
      clientHeight,
      scrollTop,
      scrollWidth,
      clientWidth,
      scrollLeft,
    } = contentRef.current;

    // Vertical scrollbar
    const verticalRatio = clientHeight / scrollHeight;
    setThumbYHeight(Math.max(clientHeight * verticalRatio, 60));
    setThumbYTop((scrollTop / scrollHeight) * clientHeight);

    // Horizontal scrollbar
    const horizontalRatio = clientWidth / scrollWidth;
    setThumbXWidth(Math.max(clientWidth * horizontalRatio, 60));
    setThumbXLeft((scrollLeft / scrollWidth) * clientWidth);
  };

  useEffect(() => {
    updateScrollbars();
    const content = contentRef.current;
    content?.addEventListener("scroll", updateScrollbars);
    window.addEventListener("resize", updateScrollbars);

    return () => {
      content?.removeEventListener("scroll", updateScrollbars);
      window.removeEventListener("resize", updateScrollbars);
    };
  }, [children]);

  const handleMouseDown = (axis) => (e) => {
    e.preventDefault();
    setIsDragging(axis);
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e) => {
      if (!contentRef.current) return;

      if (isDragging === "y") {
        const { clientHeight, scrollHeight } = contentRef.current;
        const deltaY = e.movementY;
        const scrollDelta = (deltaY / clientHeight) * scrollHeight;
        contentRef.current.scrollTop += scrollDelta;
      } else if (isDragging === "x") {
        const { clientWidth, scrollWidth } = contentRef.current;
        const deltaX = e.movementX;
        const scrollDelta = (deltaX / clientWidth) * scrollWidth;
        contentRef.current.scrollLeft += scrollDelta;
      }
    };

    const handleMouseUp = () => setIsDragging(null);

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div className="custom-scrollbar-wrapper">
      <div ref={contentRef} className="custom-scrollbar-content">
        {children}
      </div>

      <div className="custom-scrollbar-track-y">
        <div
          ref={thumbYRef}
          className={`custom-scrollbar-thumb-y ${isDragging === "y" ? "is-dragging" : ""}`}
          style={{
            height: `${thumbYHeight}px`,
            transform: `translateY(${thumbYTop}px)`,
          }}
          onMouseDown={handleMouseDown("y")}
        />
      </div>

      <div className="custom-scrollbar-track-x">
        <div
          ref={thumbXRef}
          className={`custom-scrollbar-thumb-x ${isDragging === "x" ? "is-dragging" : ""}`}
          style={{
            width: `${thumbXWidth}px`,
            transform: `translateX(${thumbXLeft}px)`,
          }}
          onMouseDown={handleMouseDown("x")}
        />
      </div>
    </div>
  );
};

export default CustomScrollbar;
```

```css
/* CustomScrollbar.css */
.custom-scrollbar-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.custom-scrollbar-content {
  width: 100%;
  height: 100%;
  overflow: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.custom-scrollbar-content::-webkit-scrollbar {
  display: none;
}

.custom-scrollbar-track-y {
  position: absolute;
  top: 3px;
  right: 3px;
  bottom: calc(3px + 8px);
  width: 8px;
  background-color: transparent;
  z-index: 10;
  pointer-events: none;
}

.custom-scrollbar-thumb-y {
  position: absolute;
  top: 0;
  right: 0;
  width: 8px;
  background-color: rgba(186, 197, 204, 0.9);
  border-radius: 4px;
  cursor: pointer;
  pointer-events: auto;
  transition:
    background-color 0.2s ease,
    border-radius 0.2s ease;
}

.custom-scrollbar-track-x {
  position: absolute;
  left: 3px;
  bottom: 3px;
  right: calc(3px + 8px);
  height: 8px;
  background-color: transparent;
  z-index: 10;
  pointer-events: none;
}

.custom-scrollbar-thumb-x {
  position: absolute;
  left: 0;
  bottom: 0;
  height: 8px;
  background-color: rgba(186, 197, 204, 0.9);
  border-radius: 4px;
  cursor: pointer;
  pointer-events: auto;
  transition:
    background-color 0.2s ease,
    border-radius 0.2s ease;
}

.custom-scrollbar-thumb-y:hover,
.custom-scrollbar-thumb-x:hover {
  background-color: rgba(98, 115, 134, 0.8);
  border-radius: 8px;
}

.custom-scrollbar-thumb-y.is-dragging,
.custom-scrollbar-thumb-x.is-dragging {
  background-color: rgba(98, 115, 134, 0.8);
  border-radius: 8px;
}
```

### ✅ Pros

- ✅ **Full control** - Complete customization of behavior and appearance
- ✅ **No external dependencies** - Pure React implementation
- ✅ **Framework integration** - Deep integration with React lifecycle
- ✅ **Learning opportunity** - Great for understanding scrollbar mechanics
- ✅ **Tailored features** - Add exactly what you need, nothing more
- ✅ **Performance optimization** - Can optimize for specific use cases
- ✅ **Zero license concerns** - Your code, your rules
- ✅ **Debuggable** - Full visibility into implementation

### ❌ Cons

- ❌ **High maintenance** - You own all bugs and edge cases
- ❌ **Time-consuming** - Significant development effort required
- ❌ **Accessibility challenges** - Must implement ARIA, keyboard navigation manually
- ❌ **Mobile complications** - Touch events require additional code
- ❌ **Cross-browser testing** - Need to test and fix browser-specific issues
- ❌ **Missing features** - No momentum scrolling, smooth scroll, etc. by default
- ❌ **Performance risks** - Easy to create performance bottlenecks
- ❌ **Non-native feel** - Hard to replicate native scroll behavior
- ❌ **Increased bundle** - More application code

### 📊 Best For

- Highly specific requirements not met by libraries
- Educational purposes
- Unique interaction patterns
- Very specific performance optimizations
- When you need absolute control

**⚠️ NOT RECOMMENDED** for production unless you have specific requirements that libraries cannot meet

---

## Quick Comparison Table

| Feature            | Native CSS   | OverlayScrollbars | SimpleBar   | Custom React  |
| ------------------ | ------------ | ----------------- | ----------- | ------------- |
| **Bundle Size**    | 0 KB         | ~50 KB            | ~20 KB      | ~5-10 KB      |
| **Cross-browser**  | ⚠️ Good      | ✅ Excellent      | ✅ Good     | ⚠️ Depends    |
| **Performance**    | ✅ Excellent | ✅ Good           | ⚠️ Good     | ⚠️ Varies     |
| **Maintenance**    | ✅ None      | ✅ Low            | ✅ Low      | ❌ High       |
| **Accessibility**  | ✅ Native    | ✅ Excellent      | ✅ Good     | ❌ Manual     |
| **Customization**  | ⚠️ Limited   | ✅ Extensive      | ⚠️ Moderate | ✅ Complete   |
| **Setup Time**     | ✅ Minutes   | ✅ ~15 min        | ✅ ~10 min  | ❌ Hours/Days |
| **Native Scroll**  | ✅ Yes       | ✅ Yes            | ❌ No       | ⚠️ Partial    |
| **Mobile Support** | ✅ Native    | ✅ Excellent      | ✅ Good     | ⚠️ Manual     |

---

## Recommendation Summary

### 🥇 For Production: **OverlayScrollbars**

- Best balance of features, consistency, and maintenance
- Recommended for Ontada Design System implementation
- Score: 9/10

### 🥈 For Simple Projects: **Native CSS**

- When you need zero dependencies
- Acceptable browser inconsistencies
- Score: 8.5/10

### 🥉 For Existing SimpleBar Users: **SimpleBar**

- If already in your project
- Score: 7.5/10

### ⚠️ For Special Cases: **Custom React**

- Only when you have unique requirements
- Score: Varies (6-9/10 depending on implementation)

---

## Migration Path

If you're currently using one approach and want to switch:

1. **Native CSS → OverlayScrollbars**: Easy upgrade for better consistency
2. **SimpleBar → OverlayScrollbars**: Similar API, improved features
3. **Custom → OverlayScrollbars**: Reduce maintenance burden
4. **Any → Native CSS**: Simplification strategy for basic needs

---

## Additional Resources

- **OverlayScrollbars**: https://github.com/KingSora/OverlayScrollbars
- **SimpleBar**: https://github.com/Grsmto/simplebar
- **MDN Scrollbar Styling**: https://developer.mozilla.org/en-US/docs/Web/CSS/::-webkit-scrollbar
- **Ontada Design System**: See Figma link in project README

---

**Last Updated**: 2026-08-31
