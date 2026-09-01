import React from "react";
import "./Scenarios.css";

/**
 * HorizontalCards Scenario
 * Tests: Horizontal scrolling with card-based gallery layout
 * Purpose: Validates horizontal scrolling with structured content components
 * Distinguishing feature: Card grid pattern with images and text
 */
const HorizontalCards = ({ Wrapper }) => {
  return (
    <div className="scenario-container">
      <div className="scenario-content-padding">
        <h2>Horizontal Cards Gallery</h2>
        <p>
          This scenario tests horizontal-only scrolling behavior using a gallery
          of cards.
        </p>

        <div className="horizontal-gallery-wrapper">
          <Wrapper>
            <div className="horizontal-gallery-inner">
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className="gallery-card">
                  <div className="card-image-placeholder">Image {i + 1}</div>
                  <div className="card-content">
                    <h4>Card Title {i + 1}</h4>
                    <p>
                      Short description of this horizontal card item to give it
                      some content weight.
                    </p>
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

export default HorizontalCards;
