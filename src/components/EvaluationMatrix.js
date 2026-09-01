import React from "react";
import "./EvaluationMatrix.css";

const implementations = [
  {
    id: "native",
    name: "Native CSS",
    subtitle: "::-webkit-scrollbar pseudo-elements",
    pros: [
      "Zero bundle impact - no JavaScript dependencies",
      "Best performance - browser-native implementation",
      "Simple implementation with just CSS",
      "Works with native keyboard navigation",
      "Lightweight and fast",
      "Full accessibility support built-in",
      "No runtime overhead",
      "Easy to maintain - just CSS rules",
    ],
    cons: [
      "Limited browser support (Chrome, Edge, Safari only)",
      "Firefox only supports basic scrollbar-width and scrollbar-color",
      "Inconsistent styling across different browsers",
      "Limited customization options compared to JS libraries",
      "Cannot achieve complex interactions (e.g., auto-hide on idle)",
      "No built-in smooth scrolling animations",
      "Different behavior on Windows vs macOS",
      "Cannot overlay scrollbar on content easily",
    ],
    recommendation:
      "Best for Chrome/Edge-first applications where bundle size matters",
  },
  {
    id: "overlay",
    name: "OverlayScrollbars",
    subtitle: "Full-featured JS library",
    pros: [
      "Excellent cross-browser consistency",
      "Rich customization options via CSS variables",
      "Auto-hide functionality built-in",
      "Smooth animations and transitions",
      "True overlay scrollbars (don't affect layout)",
      "Active maintenance and community support",
      "React wrapper available",
      "Comprehensive documentation",
      "Supports nested scrolling",
      "Touch-friendly on mobile devices",
    ],
    cons: [
      "Larger bundle size (~45KB minified)",
      "Additional JavaScript dependency",
      "Requires React wrapper component",
      "More complex setup than native CSS",
      "Potential performance overhead for many instances",
      "Learning curve for advanced customization",
      "May need custom accessibility implementation",
      "Can conflict with native scroll behaviors",
    ],
    recommendation:
      "Best for design-first applications needing consistent UX across all browsers",
  },
  {
    id: "simplebar",
    name: "SimpleBar",
    subtitle: "Lightweight JS scrollbar",
    pros: [
      "Smaller bundle than OverlayScrollbars (~20KB)",
      "Good cross-browser support",
      "Simpler API than OverlayScrollbars",
      "Easy to integrate",
      "React wrapper available",
      "Decent customization options",
      "Active maintenance",
      "Lower performance overhead",
    ],
    cons: [
      "Less feature-rich than OverlayScrollbars",
      "Limited animation capabilities",
      "Fewer customization options",
      "No auto-hide functionality built-in",
      "Less flexible styling system",
      "Smaller community than OverlayScrollbars",
      "May require additional CSS for complex layouts",
      "Documentation less comprehensive",
    ],
    recommendation:
      "Good middle ground between native CSS and full-featured libraries",
  },
  {
    id: "custom",
    name: "Custom React Implementation",
    subtitle: "Built from scratch",
    pros: [
      "Complete control over behavior and styling",
      "No external dependencies",
      "Tailored exactly to your needs",
      "Can optimize for specific use cases",
      "Full ownership of code",
      "No licensing concerns",
      "Easy to modify and extend",
      "Perfect alignment with design system",
    ],
    cons: [
      "Significant development time required",
      "Must handle all edge cases manually",
      "Need to implement accessibility features",
      "Must test across all browsers",
      "Ongoing maintenance burden",
      "Risk of bugs and performance issues",
      "Wheel reinvention - solving solved problems",
      "May miss browser-specific optimizations",
      "No community support or updates",
      "Complex to handle touch devices properly",
    ],
    recommendation:
      "Only for applications with unique requirements that cannot be met by existing solutions",
  },
];

const EvaluationMatrix = () => {
  return (
    <div className="pros-cons-container">
      <div className="pros-cons-header">
        <h1>Scrollbar Implementation Comparison</h1>
        <p className="subtitle">
          Comprehensive pros and cons analysis of different scrollbar approaches
        </p>
      </div>

      <div className="implementations-grid">
        {implementations.map((impl) => (
          <div key={impl.id} className="implementation-card">
            <div className="card-header">
              <h2>{impl.name}</h2>
              <p className="impl-subtitle">{impl.subtitle}</p>
            </div>

            <div className="pros-section">
              <h3 className="section-title pros-title">✓ Pros</h3>
              <ul className="pros-list">
                {impl.pros.map((pro, index) => (
                  <li key={index}>{pro}</li>
                ))}
              </ul>
            </div>

            <div className="cons-section">
              <h3 className="section-title cons-title">✗ Cons</h3>
              <ul className="cons-list">
                {impl.cons.map((con, index) => (
                  <li key={index}>{con}</li>
                ))}
              </ul>
            </div>

            <div className="recommendation">
              <h4>Recommendation</h4>
              <p>{impl.recommendation}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="summary-section">
        <h2>Quick Decision Guide</h2>
        <div className="decision-grid">
          <div className="decision-card">
            <h3>Choose Native CSS if:</h3>
            <ul>
              <li>Your users primarily use Chrome/Edge</li>
              <li>Bundle size is critical</li>
              <li>You need maximum performance</li>
              <li>Simple scrollbar styling is sufficient</li>
            </ul>
          </div>

          <div className="decision-card">
            <h3>Choose OverlayScrollbars if:</h3>
            <ul>
              <li>You need cross-browser consistency</li>
              <li>Design requires overlay scrollbars</li>
              <li>Advanced features (auto-hide) are needed</li>
              <li>User experience is top priority</li>
            </ul>
          </div>

          <div className="decision-card">
            <h3>Choose SimpleBar if:</h3>
            <ul>
              <li>You want a balance of features and size</li>
              <li>Cross-browser support is important</li>
              <li>Advanced features aren't required</li>
              <li>You prefer simpler APIs</li>
            </ul>
          </div>

          <div className="decision-card">
            <h3>Build Custom if:</h3>
            <ul>
              <li>You have very unique requirements</li>
              <li>You have time and resources</li>
              <li>Existing solutions don't fit</li>
              <li>You need complete control</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvaluationMatrix;
