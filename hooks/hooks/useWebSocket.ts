'use client';

import { WEBSOCKET_CONFIG, pusherConfig } from '@/shared/config/websocket';
import type { WebSocketError, WebSocketState } from '@/shared/types/websocket';
import type Pusher from 'pusher-js';
import { useCallback, useEffect, useState } from 'react';

let pusherInstance: Pusher | null = null;
let PusherClass: typeof Pusher | null = null;

export interface UseWebSocketReturn {
  pusher: Pusher | null;
  connectionState: WebSocketState;
  error: WebSocketError | null;
  isLoading: boolean;
  reconnect: () => void;
  disconnect: () => void;
}

export function useWebSocket(): UseWebSocketReturn {
  const [connectionState, setConnectionState] = useState<WebSocketState>('disconnected');
  const [error, setError] = useState<WebSocketError | null>(null);
  const [pusher, setPusher] = useState<Pusher | null>(pusherInstance);
  const [isLoading, setIsLoading] = useState(!pusherInstance);

  useEffect(() => {
    if (typeof window === 'undefined') {
      setIsLoading(false);
      return;
    }

    if (pusherInstance) {
      setPusher(pusherInstance);
      setIsLoading(false);
      return;
    }

    const loadPusher = async () => {
      try {
        setIsLoading(true);

        if (!PusherClass) {
          const PusherModule = await import('pusher-js');
          PusherClass = PusherModule.default;

          PusherClass.logToConsole = true;
        }

        const newPusher = new PusherClass(WEBSOCKET_CONFIG.appKey, pusherConfig);
        pusherInstance = newPusher;
        setPusher(newPusher);

        console.info('[WebSocket] Pusher loaded and initialized');
      } catch (err) {
        console.error('[WebSocket] Failed to load Pusher:', err);
        setError({
          type: 'connection',
          message: 'Failed to load WebSocket library',
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadPusher();
  }, []);

  useEffect(() => {
    if (!pusher) return;

    const handleConnecting = () => {
      setConnectionState('connecting');
      setError(null);
    };

    const handleConnected = () => {
      setConnectionState('connected');
      setError(null);
      console.info('[WebSocket] Подключено к серверу');
    };

    const handleDisconnected = () => {
      setConnectionState('disconnected');
      console.info('[WebSocket] Отключено от сервера');
    };

    const handleFailed = () => {
      setConnectionState('failed');
      setError({
        type: 'connection',
        message: 'WebSocket  подключение не удалось',
      });
      console.error('[WebSocket] Ошибка подключения');
    };

    const handleUnavailable = () => {
      setConnectionState('unavailable');
      setError({
        type: 'connection',
        message: 'WebSocket сервер недоступен',
      });
      console.warn('[WebSocket] Сервер временно недоступен');
    };

    const handleError = (err: Error & { code?: number }) => {
      console.error('[WebSocket] Error:', err);
      setError({
        type: 'unknown',
        message: err.message || 'Неизвестная ошибка WebSocket',
        code: err.code,
      });
    };

    pusher.connection.bind('connecting', handleConnecting);
    pusher.connection.bind('connected', handleConnected);
    pusher.connection.bind('disconnected', handleDisconnected);
    pusher.connection.bind('failed', handleFailed);
    pusher.connection.bind('unavailable', handleUnavailable);
    pusher.connection.bind('error', handleError);

    return () => {
      pusher.connection.unbind('connecting', handleConnecting);
      pusher.connection.unbind('connected', handleConnected);
      pusher.connection.unbind('disconnected', handleDisconnected);
      pusher.connection.unbind('failed', handleFailed);
      pusher.connection.unbind('unavailable', handleUnavailable);
      pusher.connection.unbind('error', handleError);
    };
  }, [pusher]);

  const reconnect = useCallback(() => {
    if (!pusher) return;

    try {
      pusher.disconnect();
      pusher.connect();
      console.info('[WebSocket] Реконнект инициирован');
    } catch (err) {
      console.error('[WebSocket] Ошибка переподключения :', err);
      setError({
        type: 'connection',
        message: 'Ошибка переподключения WebSocket',
      });
    }
  }, [pusher]);

  const disconnect = useCallback(() => {
    if (!pusher) return;

    try {
      pusher.disconnect();
      console.info('[WebSocket] Ручное отключение выполнено');
    } catch (err) {
      console.error('[WebSocket] Ошибка при отключении:', err);
    }
  }, [pusher]);

  return {
    pusher,
    connectionState,
    error,
    isLoading,
    reconnect,
    disconnect,
  };
}
