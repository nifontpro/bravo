import styles from './InputPhotoRefresh.module.scss';
import cn from 'classnames';
import { InputPhotoRefreshProps } from './InputPhotoRefresh.props';
import { ForwardedRef, forwardRef } from 'react';

const InputPhotoRefresh = forwardRef(
  (
    { error, className, children, ...props }: InputPhotoRefreshProps,
    ref: ForwardedRef<HTMLInputElement>
  ): JSX.Element => {

    return (
      <div className={cn(styles.inputWrapper, className)}>
        <input type='file' className={styles.inputFile} ref={ref} {...props} />
        {children}
        {error && <span className={styles.errorMessage}>{error.message}</span>}
      </div>
    );
  }
);

InputPhotoRefresh.displayName = 'file';

export default InputPhotoRefresh;
