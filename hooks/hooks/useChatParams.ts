'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';

type ChatTab = 'active' | 'archive';
type ChatStatus = 'exchange' | 'new' | 'blocked';
type ChatEntity = 'request' | 'specialist';

interface ChatParams {
  chat: string | null;
  tab: ChatTab;
  status: ChatStatus | null;
  request: string | null;
  specialist: string | null;
}

export function useChatParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentParams = useMemo((): ChatParams => {
    const chat = searchParams.get('chat');
    const tab = searchParams.get('tab');
    const status = searchParams.get('status');
    const request = searchParams.get('request');
    const specialist = searchParams.get('specialist');

    return {
      chat: chat || null,
      tab: tab === 'archive' ? 'archive' : 'active',
      status: status === 'exchange' || status === 'new' || status === 'blocked' ? status : null,
      request: request || null,
      specialist: specialist || null,
    };
  }, [searchParams]);

  const updateParams = useCallback(
    (updates: Partial<ChatParams>, isParent: boolean = false) => {
      const params = new URLSearchParams(searchParams.toString());

      if (updates.tab !== undefined) {
        params.set('tab', updates.tab);
      } else if (!params.has('tab')) {
        params.set('tab', 'active');
      }

      if ('request' in updates) {
        if (updates.request) {
          params.set('request', updates.request);
          params.delete('specialist');
        } else {
          params.delete('request');
        }
      }

      if ('specialist' in updates) {
        if (updates.specialist) {
          params.set('specialist', updates.specialist);
          params.delete('request');
        } else {
          params.delete('specialist');
        }
      }

      if ('chat' in updates) {
        if (updates.chat) {
          if (isParent) {
            const hasEntity = params.has('request') || params.has('specialist');
            if (hasEntity) {
              params.set('chat', updates.chat);
            }
          } else {
            params.set('chat', updates.chat);
          }
        } else {
          params.delete('chat');
        }
      }

      if ('status' in updates) {
        if (updates.status) {
          params.set('status', updates.status);
        } else {
          params.delete('status');
        }
      }

      const queryString = params.toString();
      router.push(`${pathname}?${queryString}`, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  const setChatId = useCallback(
    (chatId: string | null, isParent: boolean = false) => {
      updateParams({ chat: chatId }, isParent);
    },
    [updateParams],
  );

  const setTab = useCallback(
    (tab: ChatTab) => {
      updateParams({ tab, status: null });
    },
    [updateParams],
  );

  const setStatus = useCallback(
    (status: ChatStatus | null) => {
      updateParams({ status });
    },
    [updateParams],
  );

  const setChatEntity = useCallback(
    (entityType: ChatEntity, entityId: string | null, isParent: boolean = false) => {
      if (entityType === 'request') {
        updateParams({ request: entityId, chat: null }, isParent);
      } else {
        updateParams({ specialist: entityId, chat: null }, isParent);
      }
    },
    [updateParams],
  );

  const clearChat = useCallback(() => {
    updateParams({ chat: null });
  }, [updateParams]);

  const clearAll = useCallback(() => {
    router.replace(pathname, { scroll: false });
  }, [pathname, router]);

  return {
    chatId: currentParams.chat,
    tab: currentParams.tab,
    status: currentParams.status,
    requestId: currentParams.request,
    specialistId: currentParams.specialist,
    setChatId,
    setTab,
    setStatus,
    setChatEntity,
    clearChat,
    clearAll,
    updateParams,
  };
}
