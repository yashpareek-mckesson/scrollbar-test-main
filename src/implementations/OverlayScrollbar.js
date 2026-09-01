import React from 'react';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import 'overlayscrollbars/overlayscrollbars.css';
import './OverlayScrollbar.css';

const OverlayScrollbar = ({ children, className = '', ...props }) => {
  return (
    <OverlayScrollbarsComponent 
      className={`os-scrollbar-container ${className}`} 
      options={{
        scrollbars: {
          autoHide: 'never', // Disable auto-hide for consistent visual testing
          theme: 'os-theme-custom' // We will define this theme in CSS
        }
      }}
      defer
      {...props}
    >
      {children}
    </OverlayScrollbarsComponent>
  );
};

export default OverlayScrollbar;
