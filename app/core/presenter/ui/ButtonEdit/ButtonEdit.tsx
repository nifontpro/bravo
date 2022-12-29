import styles from './ButtonEdit.module.scss';
import cn from 'classnames';
import { ButtonEditProps, icons } from './ButtonEdit.props';
import { ForwardedRef, forwardRef } from 'react';

const ButtonEdit = forwardRef(
  (
    { icon, className, children, ...props }: ButtonEditProps,
    ref: ForwardedRef<HTMLDivElement>
  ): JSX.Element => {
    const IconComp = icons[icon];

    return (
      <div className={cn(styles.wrapper)} {...props} ref={ref}>
        {icon == 'edit' && (
          <button className={cn(styles.buttonEdit, className)}>
            <IconComp />
          </button>
        )}{' '}
        {icon == 'remove' && (
          <button className={cn(styles.buttonRemove, className)}>
            <IconComp />
          </button>
        )}
        {icon == 'refresh' && (
          <button className={cn(styles.buttonRefresh, className)}>
            <IconComp />
          </button>
        )}
      </div>
    );
  }
);

ButtonEdit.displayName = 'ButtonEdit';
export default ButtonEdit;
