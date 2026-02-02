import type { NavigateOptions } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

interface UseNavigationInterceptorOptions {
  enabled?: boolean;
  hasUnsavedChanges?: boolean;
  onNavigationAttempt?: (targetPath: string) => void;
}

export function useNavigationInterceptor({
  enabled = true,
  hasUnsavedChanges = false,
  onNavigationAttempt,
}: UseNavigationInterceptorOptions) {
  const router = useRouter();
  const pathname = usePathname();
  const originalPush = useRef(router.push);
  const originalReplace = useRef(router.replace);
  const originalBack = useRef(router.back);
  const originalForward = useRef(router.forward);

  useEffect(() => {
    const savedPush = originalPush.current;
    const savedReplace = originalReplace.current;
    const savedBack = originalBack.current;
    const savedForward = originalForward.current;

    if (!enabled || !hasUnsavedChanges) {
      router.push = savedPush;
      router.replace = savedReplace;
      router.back = savedBack;
      router.forward = savedForward;
      return;
    }

    router.push = (href: string, options?: NavigateOptions) => {
      if (href !== pathname) {
        onNavigationAttempt?.(href);
        return;
      }
      return savedPush(href, options);
    };

    router.replace = (href: string, options?: NavigateOptions) => {
      if (href !== pathname) {
        onNavigationAttempt?.(href);
        return;
      }
      return savedReplace(href, options);
    };

    router.back = () => {
      onNavigationAttempt?.('back');
    };

    router.forward = () => {
      onNavigationAttempt?.('forward');
    };

    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');

      if (!link) return;

      const href = link.getAttribute('href');
      if (!href) return;

      if (href.startsWith('http://') || href.startsWith('https://')) return;

      if (href === pathname) return;

      e.preventDefault();
      e.stopPropagation();
      onNavigationAttempt?.(href);
    };

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
      return '';
    };

    document.addEventListener('click', handleLinkClick, true);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      router.push = savedPush;
      router.replace = savedReplace;
      router.back = savedBack;
      router.forward = savedForward;

      document.removeEventListener('click', handleLinkClick, true);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [enabled, hasUnsavedChanges, pathname, onNavigationAttempt, router]);
}
