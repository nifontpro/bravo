import styles from './P.module.scss';
import cn from 'classnames';
import { PProps } from './P.props';

const P = ({ size = 'm', fontstyle, color, children, className, ...props }: PProps): JSX.Element => {
  return (
    <p
      className={cn(styles.p, {
        [styles.xs]: size == 'xs',
        [styles.s]: size == 's',
        [styles.m]: size == 'm',
        [styles.l]: size == 'l',
        [styles.xl]: size == 'xl',
        [styles.thin]: fontstyle == 'thin',
        [styles.bold]: fontstyle == 'bold',
        [styles.gray]: color == 'gray',
      }, className)}
      {...props}
    >
      {children}
    </p>
  );
};

export default P;
