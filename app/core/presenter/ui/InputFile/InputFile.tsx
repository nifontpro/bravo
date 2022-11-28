import styles from './InputFile.module.scss';
import cn from 'classnames';
import { InputFileProps } from './InputFile.props';
import { ForwardedRef, forwardRef } from 'react';

const InputFile = forwardRef(
  (
    { error, className, children, ...props }: InputFileProps,
    ref: ForwardedRef<HTMLInputElement>
  ): JSX.Element => {

    return (
      <div className={cn(className, styles.inputWrapper)}>
        <input type='file' className={styles.inputFile} ref={ref} {...props} />
        <label className={styles.fileButton}>
          <span className={styles.buttonText}>{children}</span>
        </label>
        {error && <span className={styles.errorMessage}>{error.message}</span>}
      </div>
    );
  }
);

InputFile.displayName = 'file';

export default InputFile;
