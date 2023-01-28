import React, { useState } from 'react';

type Props = {};

const usePopup = () => {
  const [popup, setPopup] = useState(false);
  return {
    setPopup,
    popup,
  };
};

export default usePopup;
