import { useBreakpoint } from '@/shared/hooks';

export const useModalResponsive = () => {
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === 'mobile';

  const getSwipeableProps = () => {
    return isMobile ? { swipeable: true } : {};
  };

  return {
    isMobile,
    breakpoint,
    getSwipeableProps,
  };
};
