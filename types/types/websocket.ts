/**
 * WebSocket event types from Laravel broadcasting
 */
export type WebSocketEventType =
  | 'message.created'
  | 'message.read'
  | 'user.typing'
  | 'user.online'
  | 'user.offline';

/**
 * Message created event payload
 */
export interface MessageCreatedEvent {
  id: number;
  text: string;
  sender_id: string;
  sent_at: string;
}

/**
 * Message read event payload
 */
export interface MessageReadEvent {
  message_id: number;
  read_by_user_id: string;
  read_at: string;
}

/**
 * User typing event payload
 */
export interface UserTypingEvent {
  user_id: string;
  is_typing: boolean;
}

/**
 * User online status event payload
 */
export interface UserOnlineEvent {
  user_id: string;
  is_online: boolean;
}

/**
 * WebSocket channel names
 */
export type ChannelName =
  | `private-chat.${number}` // Private chat channel
  | `presence-chat.${number}` // Presence channel for online status
  | `private-user.${string}`; // Private user channel

/**
 * WebSocket connection state
 */
export type WebSocketState = 'connecting' | 'connected' | 'disconnected' | 'failed' | 'unavailable';

/**
 * WebSocket error types
 */
export interface WebSocketError {
  type: 'connection' | 'authorization' | 'subscription' | 'unknown';
  message: string;
  code?: number;
}

/**
 * Typing indicator state
 */
export interface TypingState {
  userId: string;
  isTyping: boolean;
  timestamp: number;
}
