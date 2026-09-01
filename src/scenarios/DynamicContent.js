import React, { useState } from 'react';
import './Scenarios.css';

const DynamicContent = ({ Wrapper }) => {
  const [items, setItems] = useState(Array.from({ length: 10 }));

  const addItems = () => setItems(prev => [...prev, ...Array.from({ length: 5 })]);
  const removeItems = () => setItems(prev => prev.slice(0, Math.max(0, prev.length - 5)));

  return (
    <div className="scenario-container">
      <Wrapper>
        <div className="scenario-content-padding">
          <h2>Dynamic Content</h2>
          <p>Tests how scrollbars react when content is added or removed dynamically (triggering resize observers/events).</p>
          
          <div className="button-group">
            <button onClick={addItems}>Add 5 Items</button>
            <button onClick={removeItems}>Remove 5 Items</button>
          </div>

          <div className="dynamic-list">
            {items.map((_, i) => (
              <div key={i} className="dynamic-item">
                Dynamic Item {i + 1}
              </div>
            ))}
            {items.length === 0 && <p>No items. Scrollbar should hide.</p>}
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default DynamicContent;
