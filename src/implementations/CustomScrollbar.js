import React, { useState, useRef, useEffect, useCallback } from 'react';
import './CustomScrollbar.css';

const CustomScrollbar = ({ children, className = '', ...props }) => {
  const contentRef = useRef(null);
  
  // Vertical
  const trackYRef = useRef(null);
  const thumbYRef = useRef(null);
  const [thumbHeight, setThumbHeight] = useState(20);
  const [scrollYRatio, setScrollYRatio] = useState(1);
  const [isDraggingY, setIsDraggingY] = useState(false);
  const [startY, setStartY] = useState(0);
  const [startScrollTop, setStartScrollTop] = useState(0);
  const [showScrollbarY, setShowScrollbarY] = useState(false);

  // Horizontal
  const trackXRef = useRef(null);
  const thumbXRef = useRef(null);
  const [thumbWidth, setThumbWidth] = useState(20);
  const [scrollXRatio, setScrollXRatio] = useState(1);
  const [isDraggingX, setIsDraggingX] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startScrollLeft, setStartScrollLeft] = useState(0);
  const [showScrollbarX, setShowScrollbarX] = useState(false);

  const updateScrollbars = useCallback(() => {
    if (!contentRef.current) return;
    const { clientHeight, scrollHeight, scrollTop, clientWidth, scrollWidth, scrollLeft } = contentRef.current;
    
    // Vertical Logic
    if (scrollHeight > clientHeight) {
      setShowScrollbarY(true);
      if (trackYRef.current) {
        const trackHeight = trackYRef.current.clientHeight;
        const newThumbHeight = Math.max((clientHeight / scrollHeight) * trackHeight, 20);
        setThumbHeight(newThumbHeight);
        
        const scrollableTrack = trackHeight - newThumbHeight;
        const scrollableContent = scrollHeight - clientHeight;
        const ratio = scrollableTrack / scrollableContent;
        setScrollYRatio(ratio);
        
        if (thumbYRef.current) {
          thumbYRef.current.style.transform = `translateY(${scrollTop * ratio}px)`;
        }
      }
    } else {
      setShowScrollbarY(false);
    }

    // Horizontal Logic
    if (scrollWidth > clientWidth) {
      setShowScrollbarX(true);
      if (trackXRef.current) {
        const trackWidth = trackXRef.current.clientWidth;
        const newThumbWidth = Math.max((clientWidth / scrollWidth) * trackWidth, 20);
        setThumbWidth(newThumbWidth);
        
        const scrollableTrack = trackWidth - newThumbWidth;
        const scrollableContent = scrollWidth - clientWidth;
        const ratio = scrollableTrack / scrollableContent;
        setScrollXRatio(ratio);
        
        if (thumbXRef.current) {
          thumbXRef.current.style.transform = `translateX(${scrollLeft * ratio}px)`;
        }
      }
    } else {
      setShowScrollbarX(false);
    }
  }, []);

  const handleScroll = useCallback(() => {
    if (!isDraggingY && !isDraggingX) updateScrollbars();
  }, [isDraggingY, isDraggingX, updateScrollbars]);

  useEffect(() => {
    updateScrollbars();
    window.addEventListener('resize', updateScrollbars);
    return () => window.removeEventListener('resize', updateScrollbars);
  }, [updateScrollbars]);
  
  useEffect(() => {
    if (!contentRef.current) return;
    const observer = new ResizeObserver(() => updateScrollbars());
    if (contentRef.current.firstElementChild) observer.observe(contentRef.current.firstElementChild);
    observer.observe(contentRef.current);
    return () => observer.disconnect();
  }, [updateScrollbars]);

  // Y Dragging
  const handleThumbYMouseDown = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingY(true);
    setStartY(e.clientY);
    setStartScrollTop(contentRef.current.scrollTop);
  }, []);

  const handleDocumentYMouseMove = useCallback((e) => {
    if (!isDraggingY) return;
    e.preventDefault();
    const deltaY = e.clientY - startY;
    if (contentRef.current) {
      contentRef.current.scrollTop = startScrollTop + (deltaY / scrollYRatio);
      if (thumbYRef.current) {
         thumbYRef.current.style.transform = `translateY(${contentRef.current.scrollTop * scrollYRatio}px)`;
      }
    }
  }, [isDraggingY, startY, scrollYRatio, startScrollTop]);

  // X Dragging
  const handleThumbXMouseDown = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingX(true);
    setStartX(e.clientX);
    setStartScrollLeft(contentRef.current.scrollLeft);
  }, []);

  const handleDocumentXMouseMove = useCallback((e) => {
    if (!isDraggingX) return;
    e.preventDefault();
    const deltaX = e.clientX - startX;
    if (contentRef.current) {
      contentRef.current.scrollLeft = startScrollLeft + (deltaX / scrollXRatio);
      if (thumbXRef.current) {
         thumbXRef.current.style.transform = `translateX(${contentRef.current.scrollLeft * scrollXRatio}px)`;
      }
    }
  }, [isDraggingX, startX, scrollXRatio, startScrollLeft]);

  const handleDocumentMouseUp = useCallback(() => {
    setIsDraggingY(false);
    setIsDraggingX(false);
  }, []);

  useEffect(() => {
    if (isDraggingY) document.addEventListener('mousemove', handleDocumentYMouseMove);
    else document.removeEventListener('mousemove', handleDocumentYMouseMove);
    return () => document.removeEventListener('mousemove', handleDocumentYMouseMove);
  }, [isDraggingY, handleDocumentYMouseMove]);

  useEffect(() => {
    if (isDraggingX) document.addEventListener('mousemove', handleDocumentXMouseMove);
    else document.removeEventListener('mousemove', handleDocumentXMouseMove);
    return () => document.removeEventListener('mousemove', handleDocumentXMouseMove);
  }, [isDraggingX, handleDocumentXMouseMove]);

  useEffect(() => {
    if (isDraggingY || isDraggingX) document.addEventListener('mouseup', handleDocumentMouseUp);
    else document.removeEventListener('mouseup', handleDocumentMouseUp);
    return () => document.removeEventListener('mouseup', handleDocumentMouseUp);
  }, [isDraggingY, isDraggingX, handleDocumentMouseUp]);

  const handleTrackYClick = useCallback((e) => {
    if (e.target === thumbYRef.current) return;
    const trackRect = trackYRef.current.getBoundingClientRect();
    const clickY = e.clientY - trackRect.top;
    if (contentRef.current) {
      contentRef.current.scrollTop = (contentRef.current.scrollHeight * (clickY / trackRect.height)) - (contentRef.current.clientHeight / 2);
      updateScrollbars();
    }
  }, [updateScrollbars]);

  const handleTrackXClick = useCallback((e) => {
    if (e.target === thumbXRef.current) return;
    const trackRect = trackXRef.current.getBoundingClientRect();
    const clickX = e.clientX - trackRect.left;
    if (contentRef.current) {
      contentRef.current.scrollLeft = (contentRef.current.scrollWidth * (clickX / trackRect.width)) - (contentRef.current.clientWidth / 2);
      updateScrollbars();
    }
  }, [updateScrollbars]);

  return (
    <div className={`custom-scrollbar-wrapper ${className}`} {...props}>
      <div className="custom-scrollbar-content" ref={contentRef} onScroll={handleScroll}>
        {children}
      </div>
      
      {showScrollbarY && (
        <div className="custom-scrollbar-track-y" ref={trackYRef} onMouseDown={handleTrackYClick}>
          <div 
            className={`custom-scrollbar-thumb-y ${isDraggingY ? 'is-dragging' : ''}`}
            ref={thumbYRef}
            style={{ height: `${thumbHeight}px` }}
            onMouseDown={handleThumbYMouseDown}
          />
        </div>
      )}

      {showScrollbarX && (
        <div className="custom-scrollbar-track-x" ref={trackXRef} onMouseDown={handleTrackXClick}>
          <div 
            className={`custom-scrollbar-thumb-x ${isDraggingX ? 'is-dragging' : ''}`}
            ref={thumbXRef}
            style={{ width: `${thumbWidth}px` }}
            onMouseDown={handleThumbXMouseDown}
          />
        </div>
      )}
    </div>
  );
};

export default CustomScrollbar;
