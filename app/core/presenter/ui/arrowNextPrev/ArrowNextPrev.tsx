import styles from './ArrowNextPrev.module.scss';
import cn from 'classnames';
import { ArrowNextPrevProps } from './ArrowNextPrev.props';
import ArrowIcon from './arrow.svg'

const ArrowNextPrev = ({ size = 'm', direction, className, ...props }: ArrowNextPrevProps): JSX.Element => {
  return (
    <div className={cn(className, styles.arrow, {
      [styles.s]: size == 's',
      [styles.m]: size == 'm',
      [styles.l]: size == 'l',
      [styles.right]: direction == 'right',
      [styles.left]: direction == 'left',
    })} {...props}>
        <ArrowIcon/>
    </div>
  );
};

export default ArrowNextPrev;
