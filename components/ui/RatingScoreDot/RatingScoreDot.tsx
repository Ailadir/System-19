import Container from '../Container';
import Text from '../Text';

import s from './RatingScoreDot.module.scss';

type RatingScoreDotProps = {
  rating: string;
};

function RatingScoreDot(props: RatingScoreDotProps) {
  const { rating } = props;

  return (
    <Container className={s.dot} borderRadius='100' padding='8' bgColor='accent'>
      <Text variant='p4' color='white'>
        {rating}
      </Text>
    </Container>
  );
}

export default RatingScoreDot;
