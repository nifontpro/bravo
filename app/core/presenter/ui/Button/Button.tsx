import styles from './Button.module.scss';
import cn from 'classnames';
import { ButtonProps } from './Button.props';

const Button = ({
  appearance,
  children,
  size,
  className,
  ...props
}: ButtonProps): JSX.Element => {
  return (
    <button
      className={cn(styles.button, {
        [styles.white]: appearance == 'white',
        [styles.gray]: appearance == 'gray',
        [styles.blackWhite]: appearance == 'blackWhite',
        [styles.blackGray]: appearance == 'blackGray',
        [styles.thin]: size == 'thin',
        [styles.s]: size == 's',
        [styles.m]: size == 'm',
        [styles.l]: size == 'l',
        [styles.x]: size == 'x',
      }, className)}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
