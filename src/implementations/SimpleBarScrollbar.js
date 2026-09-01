import React from 'react';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import './SimpleBarScrollbar.css';

const SimpleBarScrollbar = ({ children, className = '', ...props }) => {
  return (
    <SimpleBar className={`simplebar-scrollbar-container ${className}`} {...props}>
      {children}
    </SimpleBar>
  );
};

export default SimpleBarScrollbar;
