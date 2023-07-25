import { useEffect, useRef } from 'react';
import { ModalContextType } from '../ui/Modal';

export function useOutsideClick(
  context: ModalContextType,
  listenCapturing = true
) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        if (context) context?.close!();
      }
    }

    document.addEventListener('click', handleClick, listenCapturing);

    return () =>
      document.removeEventListener('click', handleClick, listenCapturing);
  }, [context, listenCapturing]);

  return ref;
}
