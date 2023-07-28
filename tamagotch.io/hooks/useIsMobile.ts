import React, { useEffect, useState } from 'react';
import useWindowSize from './useWindowSize';

// Hook
const useIsMobile = () => {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const windowSize = useWindowSize();
  const [isMobile, setIsMobile] = useState(windowSize.width < 600);
  
  useEffect(() => {
    setIsMobile(windowSize.width < 600);
  }, [windowSize]); // Empty array ensures that effect is only run on mount
  return isMobile;
}

export default useIsMobile;