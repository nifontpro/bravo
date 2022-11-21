import styles from './P.module.scss';
import cn from 'classnames';
import { PProps } from './P.props';

const P = ({ size = 'm', children, className, ...props }: PProps): JSX.Element => {
  return (
    <p
      className={cn(className, styles.p, {
        [styles.s]: size == 's',
        [styles.m]: size == 'm',
        [styles.l]: size == 'l',
      })}
      {...props}
    >
      {children}
    </p>
  );
};

export default P;
