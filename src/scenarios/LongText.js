import React from 'react';
import './Scenarios.css';

const LongText = ({ Wrapper }) => {
  return (
    <div className="scenario-container">
      <Wrapper>
        <div className="scenario-content-padding">
          <h2>Long Vertical Content</h2>
          <p>This scenario tests standard vertical scrolling behavior, including mouse wheel, trackpad, and keyboard interaction.</p>
          
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="text-block">
              <h3>Section {i + 1}</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <p>
                Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, 
                nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. 
                Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor. 
                Ut ullamcorper, ligula eu tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam. 
                Maecenas fermentum consequat mi. Donec fermentum. Pellentesque malesuada nulla a mi.
              </p>
            </div>
          ))}
        </div>
      </Wrapper>
    </div>
  );
};

export default LongText;
