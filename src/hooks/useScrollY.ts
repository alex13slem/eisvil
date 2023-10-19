import {useEffect, useState} from 'react';
import {usePrevValue} from '.';

export const useScrollY = () => {
  const [currentY, setCurrentY] = useState(window.scrollY);
  const prevY = usePrevValue(currentY);
  const onTop = !currentY;

  const step = currentY - (prevY || currentY);

  const handlerScroll = () => {
    setCurrentY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handlerScroll);
    return () => window.removeEventListener('scroll', handlerScroll);
  }, []);

  return {currentY, prevY, step, onTop};
};
