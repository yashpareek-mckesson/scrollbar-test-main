import React from 'react';
import './NativeScrollbar.css';

const NativeScrollbar = ({ children, className = '', ...props }) => {
  return (
    <div className={`native-scrollbar-container ${className}`} {...props}>
      {children}
    </div>
  );
};

export default NativeScrollbar;
