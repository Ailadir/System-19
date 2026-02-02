import { StarRatingProps } from './StarRating.types';
import Icon from '../Icon';
import Text from '../Text';

import s from './StarRating.module.scss';

function StarRating({ rating, reviewCount }: StarRatingProps) {
  const validRating = rating && rating > 0 ? rating : 0;
  const fullStars = Math.floor(validRating);
  const emptyStars = 5 - fullStars;
  const hasReviews = reviewCount !== undefined && reviewCount !== null && reviewCount > 0;

  return (
    <div className={s.root}>
      <div className={s.stars}>
        {Array.from({ length: fullStars }, (_, i) => (
          <Icon key={`filled-${i}`} icon='star' color='accent' className={s.star} />
        ))}
        {Array.from({ length: emptyStars }, (_, i) => (
          <Icon key={`empty-${i}`} icon='star' color='disabled' className={s.star} />
        ))}
      </div>
      {hasReviews ? (
        <Text variant='p3' semanticType='profile' color='secondary' weight='regular'>
          {reviewCount} отзыв{reviewCount === 1 ? '' : reviewCount < 5 ? 'а' : 'ов'}
        </Text>
      ) : (
        <Text variant='p3' semanticType='profile' color='secondary' weight='regular'>
          Без отзывов
        </Text>
      )}
    </div>
  );
}

export default StarRating;
