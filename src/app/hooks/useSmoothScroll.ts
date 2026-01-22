import { useCallback } from 'react';

export const useSmoothScroll = () => {
  const scrollToElement = useCallback((target: string, offset: number = 100) => {
    const element = document.querySelector(target);
    if (!element) return;

    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  return { scrollToElement, scrollToTop };
};