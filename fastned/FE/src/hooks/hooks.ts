import {useEffect, useRef} from 'react';

// This file used to define custom reusable hooks

const useOutsideClick = (callback: Function) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: {target: any}) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };
    document.addEventListener('click', handleClick, true);

    return () => {
      document.removeEventListener('click', handleClick, true);
    };
  }, [ref]);
  return ref;
};

export {useOutsideClick};
