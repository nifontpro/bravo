import styles from './SpinnerSmall.module.scss';
import cn from 'classnames';
import { SpinnerSmallProps } from './SpinnerSmall.props';
import Button from '../Button/Button';

const SpinnerSmall = ({
  isFetching,
  handleNextPage,
  searchValue,
  activity,
  className,
  ...props
}: SpinnerSmallProps): JSX.Element => {
  return (
    <div className={cn(className, styles.wrapper)} {...props}>
      {isFetching ? (
        <div className={styles.wrapper}>
          <div className={styles.dot1}></div>
          <div className={styles.dot2}></div>
          <div className={styles.dot3}></div>
        </div>
      ) : activity && activity.length > 0 && searchValue == '' ? (
        <Button size='s' appearance='blackWhite' onClick={handleNextPage}>
          Еще
        </Button>
      ) : (
        <Button size='s' appearance='blackWhite' disabled>
          Конец
        </Button>
      )}
    </div>
  );
};
export default SpinnerSmall;
