'use client';

/**
 * Chat Channel WebSocket Hook
 *
 * Manages real-time chat channel subscriptions and integrates with TanStack Query
 * for automatic cache invalidation and optimistic updates.
 *
 * @example
 * const { typingUsers, isSubscribed } = useChatChannel(chatId);
 */
import { useWebSocket } from './useWebSocket';
import { MessageType, MessageVisibility } from '@/shared/api';
import type { Message } from '@/shared/api/types/chat';
import type {
  MessageCreatedEvent,
  MessageReadEvent,
  TypingState,
  UserTypingEvent,
} from '@/shared/types/websocket';
import { useQueryClient } from '@tanstack/react-query';
import type { Channel } from 'pusher-js';
import { useCallback, useEffect, useState } from 'react';

export interface UseChatChannelOptions {
  /** Enable optimistic updates (instant UI updates) */
  optimisticUpdates?: boolean;
  /** Enable typing indicators */
  enableTyping?: boolean;
  /** Typing timeout in milliseconds (default: 3000) */
  typingTimeout?: number;
}

export interface UseChatChannelReturn {
  /** Currently typing users */
  typingUsers: TypingState[];
  /** Whether channel is successfully subscribed */
  isSubscribed: boolean;
  /** Send typing indicator */
  sendTyping: (isTyping: boolean) => void;
  /** Manual channel unsubscribe */
  unsubscribe: () => void;
}

/**
 * Hook to manage real-time chat channel subscriptions
 */
export function useChatChannel(
  chatId: number,
  options: UseChatChannelOptions = {},
): UseChatChannelReturn {
  const { optimisticUpdates = true, enableTyping = true, typingTimeout = 3000 } = options;

  const { pusher, isLoading } = useWebSocket();
  const queryClient = useQueryClient();

  const [channel, setChannel] = useState<Channel | null>(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [typingUsers, setTypingUsers] = useState<TypingState[]>([]);

  /**
   * Subscribe to private chat channel
   */
  useEffect(() => {
    if (isLoading || !pusher || !chatId) {
      console.log(
        '[WebSocket] Not subscribing - isLoading:',
        isLoading,
        'pusher:',
        !!pusher,
        'chatId:',
        chatId,
      );
      return;
    }

    const channelName = `private-chat.${chatId}`;
    console.log('[WebSocket] Attempting to subscribe to:', channelName);

    try {
      // Subscribe to private channel (requires authentication)
      const privateChannel = pusher.subscribe(channelName);
      console.log('[WebSocket] Subscribe called, waiting for authorization...');

      // Handle subscription success
      privateChannel.bind('pusher:subscription_succeeded', () => {
        setIsSubscribed(true);
        console.info(`[WebSocket] Subscribed to ${channelName}`);
      });

      // Handle subscription error
      privateChannel.bind('pusher:subscription_error', (error: Error) => {
        setIsSubscribed(false);
        console.error(`[WebSocket] Subscription failed for ${channelName}:`, error);
      });

      setChannel(privateChannel);

      // Cleanup on unmount
      return () => {
        privateChannel.unbind_all();
        pusher.unsubscribe(channelName);
        setIsSubscribed(false);
        setChannel(null);
        console.info(`[WebSocket] Unsubscribed from ${channelName}`);
      };
    } catch (error) {
      console.error('[WebSocket] Failed to subscribe to channel:', error);
      setIsSubscribed(false);
    }
  }, [isLoading, pusher, chatId]);

  /**
   * Handle new message event from Laravel broadcasting
   */
  useEffect(() => {
    if (!channel || !isSubscribed) return;

    const handleNewMessage = (event: MessageCreatedEvent) => {
      console.info('[WebSocket] New message received:', event);

      const queryKey = ['chats', 'messages', chatId];

      if (optimisticUpdates) {
        // Optimistic update: Add message to cache immediately
        queryClient.setQueryData(queryKey, (oldData: unknown) => {
          const typedOldData = oldData as Message[] | undefined;
          if (!typedOldData || !Array.isArray(typedOldData)) return oldData;

          // Transform backend event to frontend Message type
          const newMessage: Message = {
            id: event.id,
            chat_id: chatId,
            text: event.text,
            type: MessageType.TEXT,
            sent_at: event.sent_at,
            read_at: null,
            sender: {
              role: 'parent', // This will be updated when we refetch
              user_id: event.sender_id,
            },
            visibility: MessageVisibility.BOTH,
            is_technical: false,
          };

          return [newMessage, ...typedOldData];
        });
      }

      // Invalidate query to refetch fresh data from server
      // This ensures consistency even if optimistic update had stale data
      queryClient.invalidateQueries({ queryKey });
    };

    channel.bind('message.created', handleNewMessage);

    return () => {
      channel.unbind('message.created', handleNewMessage);
    };
  }, [channel, isSubscribed, chatId, optimisticUpdates, queryClient]);

  /**
   * Handle message read event
   */
  useEffect(() => {
    if (!channel || !isSubscribed) return;

    const handleMessageRead = (event: MessageReadEvent) => {
      console.info('[WebSocket] Message read:', event);

      const queryKey = ['chats', 'messages', chatId];

      // Update read status in cache
      queryClient.setQueryData(queryKey, (oldData: unknown) => {
        const typedOldData = oldData as Message[] | undefined;
        if (!typedOldData || !Array.isArray(typedOldData)) return oldData;

        return typedOldData.map((msg: Message) =>
          msg.id === event.message_id ? { ...msg, read_at: event.read_at } : msg,
        );
      });
    };

    channel.bind('message.read', handleMessageRead);

    return () => {
      channel.unbind('message.read', handleMessageRead);
    };
  }, [channel, isSubscribed, chatId, queryClient]);

  /**
   * Handle typing indicator events
   */
  useEffect(() => {
    if (!channel || !isSubscribed || !enableTyping) return;

    const handleUserTyping = (event: UserTypingEvent) => {
      console.info('[WebSocket] User typing:', event);

      setTypingUsers((prev) => {
        const now = Date.now();

        // Remove existing typing state for this user
        const filtered = prev.filter((t) => t.userId !== event.user_id);

        // Add new typing state if user is typing
        if (event.is_typing) {
          return [
            ...filtered,
            {
              userId: event.user_id,
              isTyping: true,
              timestamp: now,
            },
          ];
        }

        return filtered;
      });
    };

    channel.bind('user.typing', handleUserTyping);

    return () => {
      channel.unbind('user.typing', handleUserTyping);
    };
  }, [channel, isSubscribed, enableTyping]);

  /**
   * Auto-remove stale typing indicators
   */
  useEffect(() => {
    if (!enableTyping) return;

    const interval = setInterval(() => {
      const now = Date.now();

      setTypingUsers((prev) => prev.filter((t) => now - t.timestamp < typingTimeout));
    }, 1000);

    return () => clearInterval(interval);
  }, [enableTyping, typingTimeout]);

  /**
   * Send typing indicator to other participants
   */
  const sendTyping = useCallback(
    (isTyping: boolean) => {
      if (!channel || !isSubscribed || !enableTyping) return;

      try {
        // Trigger client event (requires Pusher client events to be enabled)
        channel.trigger('client-typing', {
          is_typing: isTyping,
        });
      } catch (error) {
        console.error('[WebSocket] Failed to send typing indicator:', error);
      }
    },
    [channel, isSubscribed, enableTyping],
  );

  /**
   * Manual unsubscribe from channel
   */
  const unsubscribe = useCallback(() => {
    if (!pusher || !channel) return;

    try {
      pusher.unsubscribe(`private-chat.${chatId}`);
      setIsSubscribed(false);
      setChannel(null);
      setTypingUsers([]);
      console.info('[WebSocket] Manual unsubscribe');
    } catch (error) {
      console.error('[WebSocket] Failed to unsubscribe:', error);
    }
  }, [pusher, channel, chatId]);

  return {
    typingUsers,
    isSubscribed,
    sendTyping,
    unsubscribe,
  };
}
