import styles from './SpinnerSmallBtnPagination.module.scss';
import cn from 'classnames';
import { SpinnerSmallBtnPaginationProps } from './SpinnerSmallBtnPagination.props';
import Button from '../Button/Button';

const SpinnerSmallBtnPagination = ({
  isFetching,
  handleNextPage,
  searchValue,
  content,
  btnSubmitTitle,
  btnEndTitle,
  endDate,
  startDate,
  className,
  ...props
}: SpinnerSmallBtnPaginationProps): JSX.Element => {
  return (
    <div className={cn(styles.wrapper, className)} {...props}>
      {isFetching ? (
        <div className={styles.wrapper}>
          <div className={styles.dot1}></div>
          <div className={styles.dot2}></div>
          <div className={styles.dot3}></div>
        </div>
      ) : content && content.length > 0 && searchValue == '' && startDate == 10000000 && endDate == 16732673054000 ? (
        <Button size='s' appearance='blackWhite' onClick={handleNextPage}>
          {btnSubmitTitle}
        </Button>
      ) : (
        <Button size='s' appearance='blackWhite' disabled>
          {btnEndTitle}
        </Button>
      )}
    </div>
  );
};
export default SpinnerSmallBtnPagination;
