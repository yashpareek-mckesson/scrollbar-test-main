import React from 'react';
import './Scenarios.css';

const LargeCanvas = ({ Wrapper }) => {
  // Generate a 20x20 grid of cells
  const gridSize = 20;

  return (
    <div className="scenario-container">
      <Wrapper>
        <div className="canvas-wrapper">
          <div className="canvas-content">
            <div className="canvas-header-info">
              <h2>Large 2D Canvas (Both Axes)</h2>
              <p>Scroll freely in both X and Y directions. This tests the interaction of vertical and horizontal scrollbars simultaneously.</p>
            </div>
            
            <div className="canvas-grid">
              {Array.from({ length: gridSize }).map((_, row) => (
                <div key={row} className="canvas-row">
                  {Array.from({ length: gridSize }).map((_, col) => (
                    <div key={`${row}-${col}`} className="canvas-cell">
                      R{row + 1}, C{col + 1}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default LargeCanvas;
