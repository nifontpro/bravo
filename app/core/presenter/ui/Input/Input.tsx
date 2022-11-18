import styles from './Input.module.scss';
import cn from 'classnames';
import { InputProps } from './Input.props';
import { ForwardedRef, forwardRef } from 'react';

const Input = ({ error, className, ...props }: InputProps): JSX.Element => {
  return (
    <div className={cn(className, styles.inputWrapper)}>
      <input
        className={cn(styles.input, {
          [styles.error]: error,
        })}
        {...props}
      />
      {error && <span className={styles.errorMessage}>{error.message}</span>}
    </div>
  );
};
export default Input;
