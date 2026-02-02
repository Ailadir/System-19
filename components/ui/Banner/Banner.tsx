import Button from '../Button';
import Icon, { IconType } from '../Icon';
import Text from '../Text';
import clsx from 'clsx';
import Image from 'next/image';

import s from './Banner.module.scss';

type BannerProps = {
  icon?: IconType;
  title?: string;
  description?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  onClick?: () => void;
  type?: 'progress' | 'critical' | 'success' | 'accent';
  noBanner?: boolean;
};

function Banner({
  icon,
  title,
  description,
  buttonText,
  onButtonClick,
  onClick,
  noBanner = false,
  type = 'success',
}: BannerProps) {
  const rootClassNames = clsx(s.root, s[type], onClick && s.clickable);
  const isAccent = type === 'accent';

  const imageSrc = isAccent ? '/banner/ExcludeAccent.svg' : '/banner/Exclude.svg';
  const imageWrapperClassNames = clsx(s.imageContainer, noBanner && s.noBanner);

  return (
    <div className={rootClassNames} onClick={onClick}>
      <div className={imageWrapperClassNames}>
        <Image src={imageSrc} alt={`${type} banner`} className={s.image} width={207} height={184} />
      </div>
      <div className={s.iconWrapper}>
        {icon && <Icon icon={icon} color={isAccent ? 'primaryInverse' : type} className={s.icon} />}
      </div>
      <Text variant='h4' semanticType='banner' color={isAccent ? 'accent' : 'white'}>
        {title}
      </Text>
      <Text
        variant='p3'
        weight='regular'
        semanticType='banner'
        color={isAccent ? 'accent' : 'white'}
      >
        {description}
      </Text>
      {buttonText && onButtonClick && (
        <>
          <div className={s.divider} />
          <Button
            variant={isAccent ? 'primary' : 'secondary'}
            onClick={onButtonClick}
            fullWidth
            borderType='round'
            className={isAccent ? '' : s.button}
          >
            <Text variant='p3' weight='regular' semanticType='search'>
              {buttonText}
            </Text>
          </Button>
        </>
      )}
    </div>
  );
}
export default Banner;
