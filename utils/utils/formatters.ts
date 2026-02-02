export const extractTelegramUsername = (input: string | undefined): string => {
  if (!input) return '';

  let cleanUsername = input;

  if (input.includes('t.me/') || input.includes('telegram.me/')) {
    try {
      const maybeUrl = input.startsWith('http') ? input : `https://${input}`;
      const url = new URL(maybeUrl);
      cleanUsername = url.pathname.replace(/^\/+|\/+$/g, '');
    } catch {}
  }

  if (cleanUsername.startsWith('@')) {
    cleanUsername = cleanUsername.slice(1);
  }

  return cleanUsername;
};

export const detectTelegramFormat = (input: string | undefined): 'url' | 'at' | 'plain' => {
  if (!input) return 'plain';

  if (input.includes('t.me/') || input.includes('telegram.me/') || input.startsWith('http')) {
    return 'url';
  }

  if (input.startsWith('@')) {
    return 'at';
  }

  return 'plain';
};

export const formatTelegramUsername = (
  username: string | undefined,
  format?: 'at' | 'url',
): string => {
  if (!username) return '';

  const cleanUsername = extractTelegramUsername(username);
  if (!cleanUsername) return '';

  const detectedFormat = format || detectTelegramFormat(username);

  if (detectedFormat === 'url') {
    return `https://t.me/${cleanUsername}`;
  }
  return `@${cleanUsername}`;
};

export const formatTelegramForDisplay = (
  storedUsername: string | undefined,
  userInput?: string,
): string => {
  if (!storedUsername) return '';

  if (userInput) {
    const format = detectTelegramFormat(userInput);
    return formatTelegramUsername(storedUsername, format === 'plain' ? 'at' : format);
  }

  return `@${storedUsername}`;
};
