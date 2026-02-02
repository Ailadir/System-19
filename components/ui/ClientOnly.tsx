'use client';

import { useEffect, useState } from 'react';

/**
 * ClientOnly component - only renders children after client-side hydration
 * Use this for components that depend on client-side state (auth, localStorage, etc.)
 * to avoid hydration mismatches
 */
export default function ClientOnly({ children }: { children: React.ReactNode }) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <>{children}</>;
}
