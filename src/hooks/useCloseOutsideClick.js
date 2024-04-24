import { useRef, useEffect } from 'react';

function useCloseOutsideClick(onClose) {
  const backdropRef = useRef(null);
  
  const handleCloseModal = (e) => {
    if (backdropRef.current && backdropRef.current == e.target) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleCloseModal);
    return () => {
      document.removeEventListener('mousedown', handleCloseModal);
    };
  }, [onClose]);

  return backdropRef;
}

export default useCloseOutsideClick;
