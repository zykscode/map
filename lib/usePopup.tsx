import { useState } from 'react';

const usePopup = () => {
  const [popup, setPopup] = useState(false);
  return {
    setPopup,
    popup,
  };
};

export default usePopup;
