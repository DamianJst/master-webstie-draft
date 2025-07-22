// src/hooks/useMouseTracker.js
import { useRef, useEffect } from 'react';

export function useMouseTracker() {
  const mouse = useRef([0, 0]);

  useEffect(() => {
    const onMouseMove = ({ clientX: x, clientY: y }) => {
      mouse.current = [
        x - window.innerWidth / 2, 
        y - window.innerHeight / 2
      ];
    };

    window.addEventListener('mousemove', onMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return mouse;
}