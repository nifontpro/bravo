import styles from './ButtonCircleIcon.module.scss';
import cn from 'classnames';
import { ButtonCircleIconProps, icons } from './ButtonCircleIcon.props';
import { ForwardedRef, forwardRef } from 'react';

const ButtonCircleIcon = forwardRef(
  (
    { appearance, icon, className, children, ...props }: ButtonCircleIconProps,
    ref: ForwardedRef<HTMLDivElement>
  ): JSX.Element => {
    const IconComp = icons[icon];

    return (
      <div className={cn(styles.wrapper)} {...props} ref={ref}>
        <button
          className={cn(
            styles.button,
            {
              [styles.black]: appearance == 'black',
              [styles.transparent]: appearance == 'transparent',
            },
            className
          )}
        >
          <IconComp />
        </button>
        {children}
      </div>
    );
  }
);

ButtonCircleIcon.displayName = 'ButtonCircleIcon';
export default ButtonCircleIcon;
