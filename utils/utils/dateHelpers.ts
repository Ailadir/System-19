export function formatDate(dateString: string | null | undefined): string {
  if (!dateString) return '';

  try {
    const date = new Date(dateString);
    return date
      .toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
      .replace(/ г\.?$/, '');
  } catch {
    return '';
  }
}

export function formatMessageTime(dateString: string | null | undefined): string {
  if (!dateString) return '';

  try {
    const date = new Date(dateString);
    return date.toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return '';
  }
}

export function formatOnlineStatus(
  isOnline?: boolean,
  lastActiveAt?: string | null,
): { text: string; isOnline: boolean } {
  if (isOnline) {
    return { text: 'онлайн', isOnline: true };
  }

  if (!lastActiveAt) {
    return { text: 'был давно', isOnline: false };
  }

  try {
    const now = new Date();
    const lastActiveDate = new Date(lastActiveAt);
    const diffMs = now.getTime() - lastActiveDate.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);
    const diffDays = diffHours / 24;

    if (diffHours < 24) {
      return { text: '2 часа назад', isOnline: false };
    }

    if (diffDays < 7) {
      return { text: '1 день назад', isOnline: false };
    }

    if (diffDays < 21) {
      return { text: '1 неделю назад', isOnline: false };
    }

    return { text: 'был давно', isOnline: false };
  } catch {
    return { text: 'был давно', isOnline: false };
  }
}

const RUSSIAN_MONTHS_GENITIVE = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря',
];

export function formatDateLabel(dateString: string | null | undefined): string {
  if (!dateString) return '';

  try {
    const messageDate = new Date(dateString);
    const now = new Date();

    const messageMidnight = new Date(messageDate);
    messageMidnight.setHours(0, 0, 0, 0);

    const todayMidnight = new Date(now);
    todayMidnight.setHours(0, 0, 0, 0);

    const diffTime = todayMidnight.getTime() - messageMidnight.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return 'Сегодня';
    }

    if (diffDays === 1) {
      return 'Вчера';
    }

    const messageYear = messageDate.getFullYear();
    const currentYear = now.getFullYear();

    if (messageYear === currentYear) {
      const day = messageDate.getDate();
      const month = RUSSIAN_MONTHS_GENITIVE[messageDate.getMonth()];
      return `${day} ${month}`;
    }

    const day = messageDate.getDate().toString().padStart(2, '0');
    const month = (messageDate.getMonth() + 1).toString().padStart(2, '0');
    const year = messageDate.getFullYear();
    return `${day}.${month}.${year}`;
  } catch {
    return '';
  }
}

export function isDifferentDay(
  dateString1: string | null | undefined,
  dateString2: string | null | undefined,
): boolean {
  if (!dateString1 || !dateString2) return false;

  try {
    const date1 = new Date(dateString1);
    const date2 = new Date(dateString2);

    date1.setHours(0, 0, 0, 0);
    date2.setHours(0, 0, 0, 0);

    return date1.getTime() !== date2.getTime();
  } catch {
    return false;
  }
}
