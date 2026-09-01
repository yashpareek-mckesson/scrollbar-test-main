import React from 'react';
import './Scenarios.css';

const NestedScroll = ({ Wrapper }) => {
  return (
    <div className="scenario-container">
      <Wrapper>
        <div className="scenario-content-padding">
          <h2>Nested Scrollable Containers</h2>
          <p>Tests how implementations handle a scrollable area inside another scrollable area.</p>
          
          <div className="text-block">
            <h3>Outer Scroll Content (Top)</h3>
            <p>Scroll down to see the nested container.</p>
            {Array.from({ length: 5 }).map((_, i) => (
              <p key={i}>Filler text to push the nested container down. Lorem ipsum dolor sit amet.</p>
            ))}
          </div>

          <div className="nested-container-wrapper">
            <h3>Nested Container</h3>
            <div className="nested-container-fixed-height">
              {/* We use the same Wrapper for the nested container */}
              <Wrapper>
                <div className="nested-inner-padding">
                  {Array.from({ length: 15 }).map((_, i) => (
                    <div key={i} className="nested-item">
                      Nested Item {i + 1}
                    </div>
                  ))}
                </div>
              </Wrapper>
            </div>
          </div>

          <div className="text-block">
            <h3>Outer Scroll Content (Bottom)</h3>
            {Array.from({ length: 10 }).map((_, i) => (
              <p key={i}>Filler text after the nested container. Lorem ipsum dolor sit amet.</p>
            ))}
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default NestedScroll;
