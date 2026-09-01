import React from "react";
import "./Scenarios.css";

/**
 * HorizontalOnly Scenario
 * Tests: Pure horizontal scrolling with fixed-height content
 * Purpose: Validates horizontal scrollbar positioning and behavior
 * Distinguishing feature: Multiple layout patterns (wide bar + timeline)
 */
const HorizontalOnly = ({ Wrapper }) => {
  return (
    <div className="scenario-container">
      <div className="scenario-content-padding">
        <h2>Horizontal-Only Scrolling</h2>
        <p>
          This scenario tests pure horizontal scrolling with no vertical
          overflow.
        </p>

        <div className="horizontal-only-wrapper">
          <Wrapper>
            <div className="horizontal-only-content">
              {/* Wide content row */}
              <div className="wide-content-bar">
                {Array.from({ length: 30 }).map((_, i) => (
                  <div key={i} className="wide-item">
                    Item {i + 1}
                  </div>
                ))}
              </div>
            </div>
          </Wrapper>
        </div>

        <div className="spacer-medium"></div>

        <h3>Wide Timeline Example</h3>
        <div className="horizontal-timeline-wrapper">
          <Wrapper>
            <div className="timeline-content">
              {Array.from({ length: 24 }).map((_, i) => (
                <div key={i} className="timeline-block">
                  <div className="timeline-hour">{i}:00</div>
                  <div className="timeline-events">
                    {i % 3 === 0 && (
                      <div className="timeline-event">
                        <strong>Event {Math.floor(i / 3) + 1}</strong>
                        <p>Meeting details</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Wrapper>
        </div>
      </div>
    </div>
  );
};

export default HorizontalOnly;
