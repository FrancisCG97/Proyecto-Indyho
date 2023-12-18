// ** React Imports
// ** Next Import
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const WindowWrapper = ({ children }) => {
  // ** State
  const [windowReadyFlag, setWindowReadyFlag] = useState(false);
  const location = useLocation();
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowReadyFlag(true);
    }
  }, [location.pathname]);
  if (windowReadyFlag) {
    return <>{children}</>;
  } else {
    return null;
  }
};

export default WindowWrapper;
