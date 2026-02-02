import Icon, { type IconColorType, type IconSizeType } from '../Icon';
import clsx from 'clsx';
import Image from 'next/image';

import s from './Avatar.module.scss';

export interface AvatarProps {
  url?: string | null;
  displayName: string;
  initials?: string;
  size?: 'small' | 'large';
  className?: string;
  isRound?: boolean;
  iconSize?: IconSizeType;
  iconColor?: IconColorType;
}

function Avatar(props: AvatarProps) {
  const { url, displayName, size = 'small', className = '', isRound, iconSize, iconColor } = props;
  const avatarClassName = clsx(s.avatar, s[size], { [s.round]: isRound }, className);

  const placeholderClassName = clsx(s.avatarPlaceholder, s[size], className, isRound && s.round);

  if (url) {
    return (
      <Image
        src={url}
        alt={displayName}
        className={avatarClassName}
        width={size === 'large' ? 240 : 56}
        height={size === 'large' ? 240 : 56}
      />
    );
  }
  if (!url) {
    return (
      <div className={placeholderClassName}>
        <Icon icon='person' size={iconSize ? iconSize : 'large'} color={iconColor} />
      </div>
    );
  }

  return (
    <Image
      src={url}
      alt={displayName}
      className={avatarClassName}
      width={size === 'large' ? 176 : 56}
      height={size === 'large' ? 176 : 56}
    />
  );
}

export default Avatar;
